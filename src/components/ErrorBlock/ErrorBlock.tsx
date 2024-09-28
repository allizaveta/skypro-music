import { ErrorMessage } from "@/types/errorsTypes";
import styles from "./ErrorBlock.module.css";

interface Props {
  errorMsg: ErrorMessage | null;
}

export default function ErrorBlock({ errorMsg }: Props) {
  if (!errorMsg) return null;

  function printStatus() {
    return (
      <>
        Получен статус <b>{errorMsg?.status}</b>
      </>
    );
  }

  return (
    <div className={styles.errorBlock}>
      <h4>Ошибка!</h4>

      {errorMsg.status && errorMsg.message ? (
        <p>
          {printStatus()}. {errorMsg.message}.
        </p>
      ) : errorMsg.message ? (
        <p>{errorMsg.message}.</p>
      ) : errorMsg.status && errorMsg.endpoint ? (
        <p>
          {printStatus()} от адреса <b>{errorMsg.endpoint}</b>.
        </p>
      ) : errorMsg.status ? (
        <p>{printStatus()}. Неизвестная ошибка.</p>
      ) : (
        <p>Неизвестная ошибка</p>
      )}
    </div>
  );
}
