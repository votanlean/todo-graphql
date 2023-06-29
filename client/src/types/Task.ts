export type Task = {
  id: string,
  name: string,
  done: boolean,
}

export interface AlertMessage {
  open: boolean;
  severity: string;
  message: string;
}
