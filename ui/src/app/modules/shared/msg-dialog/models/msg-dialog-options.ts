import { MsgDialogButton } from "./msg-dialog-button.enum";

export interface MsgDialogOptions {
  message: string;
  buttons: Array<MsgDialogButton>;
}
