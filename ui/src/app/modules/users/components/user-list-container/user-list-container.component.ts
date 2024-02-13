import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "../create-user-dialog/create-user-dialog.component";
import { MsgDialogComponent } from "../../../shared/msg-dialog/msg-dialog.component";
import { MsgDialogButton } from "../../../shared/msg-dialog/models/msg-dialog-button.enum";
import { concatMap, filter, map } from "rxjs";
import { UsersService } from "../../../../services/users.service";
import { User } from "../../../../models/user.model";
import { getMsgDialogConfig } from "../../../../components/utils/msg-dialog-utils";

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrl: './user-list-container.component.scss'
})
export class UserListContainerComponent {

  constructor(
    private readonly matDialog: MatDialog,
    private readonly usersService: UsersService
  ) {
  }

  public openCreateUserDialog(): void {
    const config: MatDialogConfig = {
      height: '70vh',
      width: '60vh',
      disableClose: true
    };
    this.matDialog.open<CreateUserDialogComponent, User, User>(CreateUserDialogComponent, config).afterClosed().pipe(
      filter((user): user is User => !!user),
      map((user) => {
        const message = `User '${user.firstName}' created successfully !`;
        const buttons = [MsgDialogButton.OK];
        return getMsgDialogConfig(message, buttons)
      }),
      concatMap((config) => this.matDialog.open(MsgDialogComponent, config).afterClosed())
    ).subscribe();
  }

  public deleteAllUsers(): void {
    const message = 'Are you sure you want to delete all users?';
    const buttons = [MsgDialogButton.NO, MsgDialogButton.YES];

    this.matDialog.open(MsgDialogComponent, getMsgDialogConfig(message, buttons)).afterClosed().pipe(
      filter((msgButtonClicked: MsgDialogButton) => msgButtonClicked === MsgDialogButton.YES),
      concatMap(() => this.usersService.deleteAllUsers())
    ).subscribe();
  }

}
