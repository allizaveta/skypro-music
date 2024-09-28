"use client";

import styles from "../Signing.module.css";
import cn from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserAPI } from "@/api/users";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getTokens, publicError, signUp } from "@/store/features/userSlice";
import { UserFormData } from "@/types/usersTypes";
import { isError } from "@/types/errorsTypes";

export default function LoginPage() {
  const router = useRouter();
  const errorMsg = useAppSelector((state) => state.user.errorMsg);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    username: "",
  });

  function handleChangeFormData(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const emptyEmail = !formData.email;
    const emptyPassword = !formData.password;
    const emptyUsername = !formData.username;

    if (emptyEmail || emptyPassword || emptyUsername) {
      let message: string = "";
      let delimiter: string = "";

      const fillDelimiter = (field: string) => {
        if (message) delimiter = " и ";

        message = `${message}${delimiter}${field}`;
      };

      if (emptyEmail && emptyPassword && emptyUsername) {
        message = "E-mail, пароль и имя пользователя";
        delimiter = "3";
      } else {
        if (emptyEmail) message = "E-mail";

        if (emptyPassword) fillDelimiter("пароль");

        if (emptyUsername) fillDelimiter("имя пользователя");
      }

      if (!delimiter)
        dispatch(
          publicError({
            endpoint: "",
            status: 0,
            message: `Не заполнено поле ${message}`,
          })
        );
      else
        dispatch(
          publicError({
            endpoint: "",
            status: 0,
            message: `Не заполнены поля\n${message}`,
          })
        );

      return;
    }

    await dispatch(signUp(formData));
    await dispatch(getTokens(formData));

    if (!UserAPI.error.message) router.push("/");

    dispatch(publicError(UserAPI.error));
  }

  return (
    <>
      <input
        className={cn(styles.modalInput, styles.gaped)}
        type="email"
        name="email"
        placeholder="Электронная почта"
        autoFocus={true}
        value={formData.email}
        onChange={handleChangeFormData}
      />
      <input
        className={cn(styles.modalInput, styles.gaped)}
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChangeFormData}
      />
      <input
        className={styles.modalInput}
        type="text"
        name="username"
        placeholder="Имя пользоателя"
        value={formData.username}
        onChange={handleChangeFormData}
      />

      {isError(errorMsg) && (
        <div className={styles.errorBlock}>{errorMsg.message}</div>
      )}

      <button
        className={cn(styles.modalEnter, styles.gaped)}
        onClick={handleSubmit}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
