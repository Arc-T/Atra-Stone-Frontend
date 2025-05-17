import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../../../assets/images/emerald logo.png";
import { useEffect, useState } from "react";
import { ArrowRight } from "react-bootstrap-icons";
import {
  authenticate,
  authenticateWithOtp,
} from "../../../services/userService";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface FormValues {
  username: string;
  code: string;
}

const Login = () => {
  const [timer, setTimer] = useState(120);
  const [isSmsSent, setIsSmsSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [searchParams] = useSearchParams();
  const backUrl = searchParams.get("backUrl");
  const [userDetails, setUserDetails] = useState({
    username: "",
    is_registered: false,
  });

  useEffect(() => {
    if (!isSmsSent || timer === 0) return;
    console.log(backUrl);
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isSmsSent, timer]);

  const handleResendCode = () => {
    if (userDetails.username) {
      sendSms(userDetails.username);
      setTimer(120);
    } else {
      toast.error("شماره تلفن یافت نشد.");
    }
  };

  const handleBack = () => {
    setIsSmsSent(false);
    setTimer(120);
    reset({ username: "" });
  };

  const sendSms = (phone: string) => {
    setIsSmsSent(true);
    authenticate({ username: phone })
      .then((response) => {
        reset();
        setTimer(response.ttl);
        setUserDetails({
          username: response.phone,
          is_registered: response.is_registered,
        });
      })
      .catch((error: AxiosError) =>
        toast.error("خطا در ارسال پیامک: " + error.message)
      );
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!isSmsSent) {
      setIsSmsSent(true);
      sendSms(data.username);
    } else {
      authenticateWithOtp({
        username: userDetails.username,
        code: data.code,
      })
        .then((response) => {
          if (userDetails.is_registered) {
            localStorage.setItem("user", JSON.stringify(response.user_info));
            localStorage.setItem("token", response.token);
            window.location.replace(`${backUrl}`);
          } else {
            localStorage.setItem("username", userDetails.username);
            window.location.replace(`/user/sign-up/?backUrl=${backUrl}`);
            // navigate(`/user/sign-up/?backUrl=${params.backUrl}`);
          }
        })
        .catch((error: AxiosError) => toast.error(error.message));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-white px-4 py-12">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl ring-1 ring-gray-100 space-y-8 animate-fade-in">
        {/* Back Icon */}
        {isSmsSent && (
          <button
            type="button"
            onClick={handleBack}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowRight size={24} />
          </button>
        )}

        {/* Logo + Title */}
        <div className="flex flex-col items-center space-y-4">
          <img alt="Logo" src={logo} className="h-24 w-24" />
          <div className="w-full text-right">
            <h2 className="text-3xl font-bold text-gray-900">ورود / ثبت‌نام</h2>
            <p className="mt-1 text-sm text-gray-500">
              لطفاً اطلاعات ورود خود را وارد کنید
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {!isSmsSent ? (
            <div className="space-y-4">
              <div>
                <input
                  {...register("username", {
                    required: "شماره موبایل الزامی است",
                    pattern: {
                      value: /^09\d{9}$/,
                      message: "شماره موبایل معتبر نیست",
                    },
                  })}
                  type="tel"
                  placeholder="شماره موبایل"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-center"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              >
                ارسال کد تایید
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Code Input */}
              <div>
                {/* Resend Timer */}
                <div className="flex items-center justify-between text-sm text-gray-700 mb-1">
                  <label htmlFor="code" className="font-medium">
                    کد تایید
                  </label>
                  {timer > 0 ? (
                    <span className="text-gray-500">
                      ارسال مجدد کد تا{" "}
                      <span className="font-semibold text-gray-700">
                        {String(Math.floor(timer / 60)).padStart(2, "0")}:
                        {String(timer % 60).padStart(2, "0")}
                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      ارسال مجدد کد
                    </button>
                  )}
                </div>

                <input
                  {...register("code")}
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="کد 4 رقمی"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 tracking-widest text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
              >
                تایید کد
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
