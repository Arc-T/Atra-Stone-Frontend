import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../../../assets/images/emerald logo.png";
import { register } from "../../../services/userService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface FormValues {
  name: string;
  family_name: string;
  password: string;
}

const Register = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // register(data)
    //   .then(() => toast.success("Successfully registered"))
    //   .catch((error: AxiosError) => toast.error(error.message));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-white px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl ring-1 ring-gray-100 animate-fade-in">
        <div className="flex flex-col items-center">
          <img alt="Logo" src={logo} className="h-24 w-24" />
          <div className="w-full text-right my-8">
            <h2 className="text-3xl font-bold text-gray-900">فرم ثبت نام</h2>
            <p className="mt-1 text-sm text-gray-500">
              لطفاً اطلاعات ورود خود را وارد کنید
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-4 mb-4">
            <div className="flex-col w-1/2">
              <label className="block text-sm font-medium text-gray-900">
                نام
              </label>
              <input
                {...register("name")}
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm text-center"
              />
            </div>
            <div className="flex-col w-1/2">
              <label className="block text-sm font-medium text-gray-900">
                نام خانوادگی
              </label>
              <input
                {...register("family_name")}
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm text-center"
              />
            </div>
          </div>
          <div className="flex-col w-full mb-4">
            <label className="block text-sm font-medium text-gray-900">
              رمز عبور
            </label>
            <input
              {...register("password", { required: "رمز عبور الزامی است" })}
              type="password"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm text-center"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
          >
            عضویت
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
