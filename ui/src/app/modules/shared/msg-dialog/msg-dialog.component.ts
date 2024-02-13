import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MsgDialogButton } from "./models/msg-dialog-button.enum";
import { MsgDialogOptions } from "./models/msg-dialog-options";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MaterialModule } from "../material/material.module";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './msg-dialog.component.html',
  standalone: true,
  styleUrl: './msg-dialog.component.scss',
  imports: [MaterialModule]
})
export class MsgDialogComponent {

  public buttons: Array<MsgDialogButton>;
  public message: string;

  constructor(
    private readonly dialogRef: MatDialogRef<MsgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) msgDialogOptions: MsgDialogOptions
  ) {
    const buttons = msgDialogOptions.buttons;
    this.buttons = buttons?.length > 0 ? buttons : [MsgDialogButton.OK];
    this.message = msgDialogOptions.message
  }

  public closeDialog(messageButtonType?: MsgDialogButton): void {
    this.dialogRef.close(messageButtonType);
  }

  protected readonly MsgDialogButton = MsgDialogButton;
}
