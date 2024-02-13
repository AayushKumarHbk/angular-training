import { MsgDialogButton } from "../../modules/shared/msg-dialog/models/msg-dialog-button.enum";
import { MatDialogConfig } from "@angular/material/dialog";
import { MsgDialogOptions } from "../../modules/shared/msg-dialog/models/msg-dialog-options";


export function getMsgDialogConfig(message: string, buttons: MsgDialogButton[]): MatDialogConfig<MsgDialogOptions> {
  return {
    height: '15vh',
    width: '50vh',
    disableClose: true,
    data: { message, buttons }
  };
}
