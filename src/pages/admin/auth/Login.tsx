import { Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ADMIN_HOMEPAGE } from "../../../types/url.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useUser.ts";

interface FormValues {
  phone: string;
  password: string;
}

export default function Login() {

  if (localStorage.getItem("user"))
    return <Navigate to={`/${ADMIN_HOMEPAGE}`} />;

  const { state } = useLocation();

  const { mutate: authenticateAdmin } = useAuth();

  const onSubmit: SubmitHandler<FormValues> = (data) => authenticateAdmin(data);

  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <>
      <ToastContainer position="top-left" rtl={true} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        {state && (
          <span className={"bg-red-700 text-white p-3 rounded-lg"}>
            {state}
          </span>
        )}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm my-6">
          <img
            alt="Your Company"
            src={
              "https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            }
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            ورود به حساب کاربری ادمین
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm/6 font-medium text-gray-900"
              >
                شماره موبایل
              </label>
              <div className="mt-2">
                <input
                  {...register("phone")}
                  id="mobile"
                  type="text"
                  autoComplete="mobile tel"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  رمز عبور
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    فراموشی رمز عبور؟
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ورود
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
