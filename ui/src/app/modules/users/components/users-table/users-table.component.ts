import { AfterViewInit, Component } from '@angular/core';
import { User } from "../../../../models/user.model";
import { UsersService } from "../../../../services/users.service";
import { catchError, concatMap, filter, map, Observable, of, startWith, switchMap } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MsgDialogOptions } from "../../../shared/msg-dialog/models/msg-dialog-options";
import { MsgDialogButton } from "../../../shared/msg-dialog/models/msg-dialog-button.enum";
import { MsgDialogComponent } from "../../../shared/msg-dialog/msg-dialog.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { CreateUserDialogComponent } from "../create-user-dialog/create-user-dialog.component";
import { getMsgDialogConfig } from "../../../../components/utils/msg-dialog-utils";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements AfterViewInit {

  public readonly displayedColumns = ['id', 'firstName', 'lastName', 'emailId', 'dob', 'actions'];
  public readonly users$ = this.getUsers();

  constructor(
    private readonly matDialog: MatDialog,
    private readonly usersService: UsersService
  ) {
  }

  ngAfterViewInit() {
    // this.getUsers();
  }

  private getUsers(): Observable<User[]> {
    return this.usersService.userActionPerformed$.pipe(
      startWith(true),
      switchMap(() => this.usersService.getUsers()),
      map(users => users || []),
      catchError(() => of([]))
    );
  }

  public editUser(user: User): void {
    const config: MatDialogConfig = {
      height: '70vh',
      width: '60vh',
      disableClose: true,
      data: user
    };
    this.matDialog.open<CreateUserDialogComponent, User, User>(CreateUserDialogComponent, config).afterClosed().pipe(
      filter((user): user is User => !!user),
      map((user) => {
        const message = `User '${user.firstName}' updated successfully !`;
        const buttons = [MsgDialogButton.OK];
        return getMsgDialogConfig(message, buttons);
      }),
      concatMap((config) => this.matDialog.open(MsgDialogComponent, config).afterClosed())
    ).subscribe();
  }

  public deleteUser(userId: string): void {
    const config: MatDialogConfig<MsgDialogOptions> = {
      height: '20vh',
      width: '50vh',
      disableClose: true,
      data: {
        message: `Are you sure you want to delete user '${userId}' ?`,
        buttons: [MsgDialogButton.NO, MsgDialogButton.YES]
      }
    };
    this.matDialog.open(MsgDialogComponent, config).afterClosed().pipe(
      filter((msgButtonClicked: MsgDialogButton) => msgButtonClicked === MsgDialogButton.YES),
      concatMap(() => this.usersService.deleteUser(userId))
    ).subscribe();
  }
}
