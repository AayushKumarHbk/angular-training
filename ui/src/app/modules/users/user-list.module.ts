import { NgModule } from '@angular/core';
import { UserListContainerComponent } from './components/user-list-container/user-list-container.component';
import { MaterialModule } from "../shared/material/material.module";
import { CommonModule } from "@angular/common";
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersService } from "../../services/users.service";
import { MsgDialogComponent } from "../shared/msg-dialog/msg-dialog.component";


@NgModule({
  declarations: [
    UserListContainerComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MsgDialogComponent,
    CreateUserDialogComponent
  ],
  providers: [UsersService]
})
export class UserListModule {
}
