"use client";

import styles from "../Signing.module.css";
import cn from "classnames";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UserAPI } from "@/api/users";
import { UserFormData } from "@/types/usersTypes";
import { getTokens, publicError, signIn } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { isError } from "@/types/errorsTypes";

export default function LoginPage() {
  const router = useRouter();
  const errorMsg = useAppSelector((state) => state.user.errorMsg);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    username: "unknown",
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

    if (emptyEmail || emptyPassword) {
      if (emptyEmail && emptyPassword)
        dispatch(
          publicError({
            endpoint: "",
            status: 0,
            message: "Не заполнены поля\nE-mail и пароль",
          })
        );
      else {
        let message = "";

        if (emptyEmail) message = "E-mail";
        else if (emptyPassword) message = "пароль";

        dispatch(
          publicError({
            endpoint: "",
            status: 0,
            message: `Не заполнено поле ${message}`,
          })
        );
      }

      return;
    }

    await dispatch(signIn(formData));
    await dispatch(getTokens(formData));

    if (!UserAPI.error.message) router.push("/");

    dispatch(publicError(UserAPI.error));
  }

  function handleRedirectToSigningUp(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();

    router.push("./up");
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
        className={styles.modalInput}
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChangeFormData}
      />

      {isError(errorMsg) && (
        <div className={styles.errorBlock}>{errorMsg.message}</div>
      )}

      <button
        className={cn(styles.modalEnter, styles.gaped)}
        onClick={handleSubmit}
      >
        Войти
      </button>
      <button
        className={styles.modalAdditional}
        onClick={handleRedirectToSigningUp}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
