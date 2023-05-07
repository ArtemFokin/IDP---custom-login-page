export enum MESSAGE_TYPE {
  ACCOUNT_NOT_FOUND = "ACCOUNT_NOT_FOUND",
}

export const sendAccountNotFound = (email: string) => {
  window.parent?.postMessage(
    {
      type: MESSAGE_TYPE.ACCOUNT_NOT_FOUND,
      message: email,
    },
    "*"
  );
};
