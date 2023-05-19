"use client";

import { FormEvent, useState } from "react";

import { FormInput } from "@/components/base-component/Form";
import Button from "@/components/base-component/Button";
import { twMerge } from "tailwind-merge";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className={twMerge([
          "p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",

          "before:hidden before:xl:block before:content-[''] before:w-[87%] before:-mt-[38%] before:-mb-[100%] before:-ml-[3%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",

          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[23%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-3 gap-4 xl:grid">
            <div className="flex hidden min-h-screen xl:flex"></div>
            <div className="flex col-span-2 h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
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
                      className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
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
