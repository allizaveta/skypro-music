"use client";
import classNames from "classnames";
import Link from "next/link";
import styles from "./autorize.module.css";
import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { useAppDispatch } from "@/hooks";
import { getTokens, getUser } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await Promise.all([
        dispatch(getTokens(formData)).unwrap(),
        dispatch(getUser(formData)).unwrap(),
      ]);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Произошла ошибка");
      }
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
            <Link href={"/"}>
              <div className={styles.modalLogo}>
                <Image
                  src="/Image/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
            />
            {error && <div className={styles.Error}>{error}</div>}
            <button onClick={handleSubmit} className={styles.modalBtnEnter}>
              <Link href="">Войти</Link>
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href={"/signup"}>Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
