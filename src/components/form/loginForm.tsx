"use client";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { loginZodSchema } from "@/validation";
import { Eye, EyeClosed } from "lucide-react";
import { useGoogleAuth, useLogin } from "@/hooks";
import Logo from "../layout/public/logo";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginComponent from "../modules/google-login/page";
import Link from "next/link";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const { mutate: googleLogin } = useGoogleAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "testeradmin@phhealthcare.com",
      password: "Tester@admin123",
    },
    validators: {
      onSubmit: loginZodSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      login(loginData, {
        onSuccess: (res) => {
          console.log("login success", res);
          toast.add({
            title: "Login Successful",
            description: "You are now logged in",
          });
          router.push("/");
        },
        onError: (err) => {
          console.log("login error", err);
          toast.add({
            title: "Login Failed",
            description: "Please try again",
            type: "error",
          });
        },
      });
    },
  });

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "Google Login Failed",
        description: "Please try again",
        type: "error",
      });
      return;
    }
    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          console.log("google auth success");
          toast.add({
            title: "Google Login Successful",
            description: "You are now logged in",
            type: "success",
          });
          router.push("/");
        },

        onError: (err: any) => {
          console.log("google auth error", err);
          toast.add({
            title: "Google Login Failed",
            description: err.message || "Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google Login Failed",
      description: "Please try again",
      type: "error",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="mb-5 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Logo />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Login in to your PH HealthCare account
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Email"
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="border p-2"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Password"
                      className="border p-2"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1.5"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button disabled={isLoginPending} type="submit">
            {isLoginPending ? (
              <>
                <Spinner />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </FieldGroup>
      </form>{" "}
      <br />
      <FieldSeparator>Or</FieldSeparator>
      <br />
      <GoogleLoginComponent />
      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
