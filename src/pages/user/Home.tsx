import background from "../../assets/images/4.jpg";
import productBackground from "../../assets/images/ffss.png";
import customProductBackground from "../../assets/images/tyt.avif";
import academyBackground from "../../assets/images/tt.avif";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Content Section (Product Cards) */}
        <div className="relative max-w-6xl mx-auto p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Economic Products Card */}
            <div className="relative group bg-white opacity-85 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-3xl animate-fade-in-up delay-100">
              {/* Main Card */}
              <div className="p-8 bg-emerald-600 rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                  محصولات اقتصادی
                </h2>
              </div>
              <img
                src={customProductBackground}
                alt="Economic Products"
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="p-6 sm:p-8">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  این قسمت میتونی تمام محصولات رو ببینی 🤩 تمام سعی خودمودن رو
                  کردیم که قیمت ها منصفانه باشه تا شما استفاده کنید
                </p>
              </div>

              {/* Overlay Card (hidden by default, shown on hover) */}
              <div className="absolute inset-0 bg-emerald-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white p-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    تمام جزئیات محصولات
                  </h3>
                  <p className="text-base sm:text-lg mb-6">
                    اینجا تمام اطلاعات و ویژگی های محصولات اقتصادی رو مشاهده
                    کنید. ما در اینجا بهترین کیفیت را با بهترین قیمت ارائه می
                    دهیم!
                  </p>
                  <button className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors duration-200">
                    <Link to={"/products"}>مشاهده محصولات</Link>
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Products Card */}
            <div className="relative group bg-white opacity-85 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-100">
              {/* Main Card */}
              <div className="p-8 bg-red-800 rounded-lg">
                <h2 className="text-2xl font-bold sm:text-3xl text-white text-center">
                  محصولات سفارشی
                </h2>
              </div>
              <img
                src={productBackground}
                alt="Custom Products"
                className="w-48 sm:w-64 h-48 sm:h-64 mx-auto mb-6"
              />
              <div className="p-6 sm:p-8">
                <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                  این قسمت برای سفارش های خاص طراحی شده 😎 اینجا میتونی طرح مورد
                  نظرتو برای ما ارسال کنی و ما برای شما انجام میدیم
                </p>
              </div>

              {/* Overlay Card (hidden by default, shown on hover) */}
              <div className="absolute inset-0 bg-red-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white p-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    تمام جزئیات سفارشات
                  </h3>
                  <p className="text-base sm:text-lg mb-6">
                    اطلاعات بیشتر درباره سفارشات سفارشی و نحوه ثبت سفارشات برای
                    محصولات خاص
                  </p>
                  <button className="w-full bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-900 transition-colors duration-200">
                    <Link to={"/order-product"}> مشاهده بیشتر</Link>
                  </button>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="relative group bg-white opacity-85 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-3xl animate-fade-in-up delay-100">
              {/* Main Card */}
              <div className="p-8 bg-sky-600 rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                  آموزش
                </h2>
              </div>
              <img
                src={academyBackground}
                alt="Education"
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="p-6 sm:p-8">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  توی این قسمت میتونی تموم آموزش های مربوط به انرژی های سنگ،
                  خواص درمانی و خیلی چیزای دیگه رو یاد بگیری
                </p>
              </div>

              {/* Overlay Card (hidden by default, shown on hover) */}
              <div className="absolute inset-0 bg-sky-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white p-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    تمام جزئیات آموزش
                  </h3>
                  <p className="text-base sm:text-lg mb-6">
                    تمامی اطلاعات و ویژگی های دوره های آموزشی را در اینجا مشاهده
                    کنید. برای یادگیری بیشتر به آکادمی ما بپیوندید.
                  </p>
                  <button className="w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors duration-200">
                    <Link to={"/academy"}> مشاهده بیشتر</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
