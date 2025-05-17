import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../../../assets/images/emerald logo.png";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getCreateData, registerUser } from "../../../services/userService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Province } from "../../../types/admin";
import { PersonFill, PersonFillGear } from "react-bootstrap-icons";

interface FormValues {
  name: string;
  family_name: string;
  phone: string;
  password: string;
  gender: "MALE" | "FEMALE";
  confirm_password: string;
  address: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [fetchedData, setFetchedData] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>(0);
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
    getCreateData()
      .then((response) => setFetchedData(response))
      .catch(() =>
        toast.error("خطایی در دریافت اطلاعات رخ داده است !")
      );
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    console.log(selectedProvince);
    registerUser({
      name: data.name + " " + data.family_name,
      password: data.password,
      phone: data.phone,
      gender: data.gender,
      province: selectedProvince,
      address: data.address,
    })
      .then((response) => {
        toast.success("ثبت نام با موفقیت انجام شد");
        localStorage.removeItem("username");
        localStorage.setItem("user", JSON.stringify(response.user_info));
        localStorage.setItem("token", response.token);
        navigate(searchParams.get("backUrl") || "/");
      })
      .catch((error: AxiosError) => toast.error(error.message));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-white px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl ring-1 ring-gray-200 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img alt="Logo" src={logo} className="h-16 w-16" />
          <div className="flex-1 text-right">
            <h2 className="text-3xl font-bold text-gray-800">فرم ثبت‌نام</h2>
            <p className="mt-1 text-sm text-gray-500">
              لطفاً اطلاعات خود را وارد کنید
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              نام
            </label>
            <input
              {...register("name")}
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Family Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              نام خانوادگی
            </label>
            <input
              {...register("family_name")}
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Phone (full width) */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              شماره تلفن
            </label>
            <input
              disabled
              {...register("phone")}
              type="tel"
              className="mt-1 w-full rounded-lg bg-gray-100 border border-gray-300 px-3 py-2 text-sm text-gray-600 shadow-sm"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              تکرار رمز عبور
            </label>
            <input
              {...register("confirm_password", {
                required: "تکرار رمز عبور الزامی است",
                validate: (value) =>
                  value === watch("password") || "رمز عبور مطابقت ندارد",
              })}
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Province */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              استان
            </label>
            <select
              value={selectedProvince ?? ""}
              onChange={(e) => setSelectedProvince(Number(e.target.value))}
              className="mt-1 w-full p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-indigo-400"
            >
              <option value="" disabled>
                انتخاب استان
              </option>
              {fetchedData?.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              جنسیت
            </label>
            <div className="mt-2 flex gap-6">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  {...register("gender", { required: "جنسیت الزامی است" })}
                  type="radio"
                  value="MALE"
                  className="form-radio text-indigo-600"
                />
                <PersonFill className="text-blue-600" />
                مرد
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  {...register("gender", { required: "جنسیت الزامی است" })}
                  type="radio"
                  value="FEMALE"
                  className="form-radio text-indigo-600"
                />
                <PersonFillGear className="text-pink-600" />
                زن
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Address (full width) */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              آدرس
            </label>
            <textarea
              {...register("address", { required: "آدرس الزامی است" })}
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Submit Button (full width) */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              ثبت‌نام
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
