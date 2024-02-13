import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDateFormats } from "@angular/material/core";
import { User } from "../../../../models/user.model";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { UsersService } from "../../../../services/users.service";
import { UserCreationDTO } from "../../../../models/user-creation-dto.model";
import { MaterialModule } from "../../../shared/material/material.module";

const MAT_DATE_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  providers: [provideMomentDateAdapter(MAT_DATE_FORMAT)]
})
export class CreateUserDialogComponent {

  public readonly today = new Date();

  public readonly maxCharacters = {
    name: 50,
    emailId: 40
  };

  public readonly userFormGroup;

  public isEditDialog = false;

  constructor(
    private readonly dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly inputUser: User,
    private readonly usersService: UsersService
  ) {
    this.userFormGroup = this.initUserForm(inputUser);
    this.isEditDialog = !!inputUser;
  }

  private initUserForm(inputUser: User): FormGroup {
    return new FormGroup({
      firstName: new FormControl(inputUser?.firstName || '', [Validators.required, Validators.maxLength(this.maxCharacters.name)]),
      lastName: new FormControl(inputUser?.lastName || '', Validators.maxLength(this.maxCharacters.name)),
      emailId: new FormControl(inputUser?.emailId ||  '', [Validators.required, Validators.email, Validators.maxLength(this.maxCharacters.emailId)]),
      dob: new FormControl(inputUser?.dob || '')
    });
  }

  public closeDialog(newUser?: User): void {
    this.dialogRef.close(newUser);
  }

  public createUser(): void {
    const newUser: UserCreationDTO = {
      firstName: this.userFormGroup.controls['firstName'].value,
      lastName: this.userFormGroup.controls['lastName'].value,
      emailId: this.userFormGroup.controls['emailId'].value,
      dob: this.userFormGroup.controls['dob'].value,
    };
    this.usersService.createUser(newUser).subscribe({
      next: (user) => this.closeDialog(user)
    });
  }

  public editUser(): void {
    const newUser: User = {
      id: this.inputUser.id,
      firstName: this.userFormGroup.controls['firstName'].value,
      lastName: this.userFormGroup.controls['lastName'].value,
      emailId: this.userFormGroup.controls['emailId'].value,
      dob: this.userFormGroup.controls['dob'].value,
    };
    this.usersService.updateUser(newUser).subscribe({
      next: (user) => this.closeDialog(user)
    });
  }

}
