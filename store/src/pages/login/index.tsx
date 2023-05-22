"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/base-component/Form";
import Button from "@/components/base-component/Button";

import { useLogin } from "../../hooks/useLogin";

import styles from "./styles.module.css";

const apiHost = process.env.API_HOST;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  /* const { mutate, isLoading, isSuccess, isError, error } = useLogin(
   *   username,
   *   password
   * ); */

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //    mutate();
  };

  /* if (isSuccess) {
   *   router.push("/products");
   * } */

  return (
    <>
      <div className={styles["login-main"]}>
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-3 gap-4 xl:grid">
            <div className="flex hidden min-h-screen xl:flex"></div>
            <div className="flex col-span-2 h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <div className={styles["login-box"]}>
                <form onSubmit={onSubmit}>
                  <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                    Sign In
                  </h2>
                  <div className="mt-8 intro-x">
                    <FormInput
                      type="text"
                      className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
                      placeholder="Username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                    <FormInput
                      type="password"
                      className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                      variant="primary"
                      className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3 max-xl:mb-3"
                      type="submit"
                    >
                      Login
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                      type="submit"
                    >
                      Register
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
