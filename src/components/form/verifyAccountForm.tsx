"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount } from "@/hooks";
import { toast } from "../ui/toast";
import { useVerifyDoctorAccount } from "@/hooks/doctor.hook";

const Resend_Cooldown = 120;

export const VerifyAccountForm = ({
  mode = "patient",
}: {
  mode: "doctor" | "patient";
}) => {
  const searchParams = useSearchParams();
  //  const email = searchParams.get("email") || "";
  const rawEmail = searchParams.get("email") || "";
  const email = decodeURIComponent(rawEmail).trim();
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(Resend_Cooldown);
  const router = useRouter();

  const { mutate: verifyPatient } = useVerifyAccount();
  const { mutate: verifyDoctor } = useVerifyDoctorAccount();

  const verify = mode === "doctor" ? verifyDoctor : verifyPatient;

  useEffect(() => {
    if (!email) {
      router.push("/");
      return;
    }
  }, [email]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOtp = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);

    const verifyData = {
      email,
      otp,
    };
    if (!verifyData.email) {
      router.push("/");
      return;
    }

    verify(verifyData, {
      onSuccess: (res: any) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again",
            type: "error",
          });
          return;
        }
        if (mode === "doctor") {
          toast.add({
            title: "Verification Successful",
            description:
              "An admin will approve your account. This may take time. Please check your email in few days",
            type: "success",
          });
          router.push("/");
          return;
        }
        toast.add({
          title: "Verification Successful",
          description: "Welcome Onboard! You can now login",
          type: "success",
        });
        router.push("/");
      },
      onError: (err: any) => {
        toast.add({
          title: "Verification Failure",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please verify your account by entering the OTP sent to {email}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOtp();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">Enter your OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) setIsInvalid(false);
              }}
              autoComplete="off"
              value={otp}
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid OTP. Please Try Again!" }]}
              />
            )}
            <FieldDescription> Resend in{resendTimer}</FieldDescription>
          </Field>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button disabled={resendTimer > 0} type="button" variant="outline">
          Resend
        </Button>
        <Button type="submit" form="otp-form">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};
