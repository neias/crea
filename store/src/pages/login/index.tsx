import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { twMerge } from "tailwind-merge";
import { FormInput } from "@/components/base-component/Form";
import Button from "@/components/base-component/Button";

// import { useLogin } from "../../hooks/useLogin";

import styles from "./styles.module.css";

const apiHost = process.env.API_HOST;

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation((data) => {
    return fetch(`${apiHost}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((response) => response.json());
  });

  const onSubmit = async (data) => {
    try {
      // Checking input data for schema compliance
      loginSchema.parse(data);

      const m = await loginMutation.mutateAsync(data);

      console.log(m);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setError(err.path[0], {
            type: "manual",
            message: err.message,
          });
        });
      }
    }
  };

  return (
    <>
      <div className={styles["login-main"]}>
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-3 gap-4 xl:grid">
            <div className="flex hidden min-h-screen xl:flex"></div>
            <div className="flex col-span-2 h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <div className={styles["login-box"]}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2 className={styles["login-title"]}>Sign In</h2>
                  <div className="mt-8 intro-x">
                    <FormInput
                      type="text"
                      className={twMerge([
                        "block px-4 py-3 min-w-full xl:min-w-[350px]",
                        errors.username && "border-red-500",
                      ])}
                      placeholder="Username"
                      {...register("username")}
                    />
                    {errors.username && (
                      <p className="text-red-500">{errors.username.message}</p>
                    )}
                    <FormInput
                      type="password"
                      className={twMerge([
                        "block px-4 py-3 min-w-full xl:min-w-[350px] mt-4",
                        errors.username && "border-red-500",
                      ])}
                      placeholder="Password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                      variant="primary"
                      className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3 max-xl:mb-3"
                      type="submit"
                      disabled={loginMutation.isLoading}
                    >
                      {loginMutation.isLoading ? "Loading..." : "Login"}
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
