/* interfaces */

export interface ErrorMessage {
  status: number;
  message: string;
  endpoint: string;
}

/* functions */

export function getEmptyError(): ErrorMessage {
  return {
    status: 0,
    message: "",
    endpoint: "",
  };
}

export function isError(data: ErrorMessage | any): data is ErrorMessage {
  return (<ErrorMessage>data).message !== undefined;
}
