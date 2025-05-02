import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../../../assets/images/emerald logo.png";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { registerUser } from "../../../services/userService";
import { useNavigate, useSearchParams } from "react-router-dom";

interface FormValues {
  name: string;
  family_name: string;
  phone: string;
  password: string;
  confirm_password: string;
  address: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const phone = localStorage.getItem("username");
    if (phone) {
      setValue("phone", phone);
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    
    registerUser({
      name: data.name + " " + data.family_name,
      password: data.password,
      phone: data.phone,
      address: data.address,
    })
      .then((response) => {
        toast.success("ثبت نام با موفقیت انجام شد");
        localStorage.removeItem("username");
        localStorage.setItem("user", response.token);
        navigate(searchParams.get("backUrl") || "/");
      })
      .catch((error: AxiosError) => toast.error(error.message));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-gray-100 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <img alt="Logo" src={logo} className="h-20 w-20 mb-4" />
          <div className="w-full text-right">
            <h2 className="text-2xl font-bold text-gray-900">فرم ثبت‌نام</h2>
            <p className="mt-1 text-sm text-gray-500">
              لطفاً اطلاعات خود را وارد کنید
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name & Family Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-900">
                نام
              </label>
              <input
                {...register("name")}
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-900">
                نام خانوادگی
              </label>
              <input
                {...register("family_name")}
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              شماره تلفن
            </label>
            <input
              disabled={true}
              {...register("phone")}
              type="tel"
              className="mt-2 w-full bg-gray-300 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              رمز عبور
            </label>
            <input
              {...register("password", {
                required: "رمز عبور الزامی است",
                minLength: {
                  value: 6,
                  message: "رمز باید حداقل ۶ کاراکتر باشد",
                },
              })}
              type="password"
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              تکرار رمز عبور
            </label>
            <input
              {...register("confirm_password", {
                required: "تکرار رمز عبور الزامی است",
                validate: (value) =>
                  value === watch("password") || "رمز عبور مطابقت ندارد",
              })}
              type="password"
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              آدرس
            </label>
            <textarea
              {...register("address", { required: "آدرس الزامی است" })}
              rows={3}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-green-500 focus:ring-2 focus:ring-green-500"
          >
            عضویت
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
