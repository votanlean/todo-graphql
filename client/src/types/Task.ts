export type Task = {
  id: number,
  name: string,
  done: boolean,
}

export interface AlertMessage {
  open: boolean;
  severity: string;
  message: string;
}
