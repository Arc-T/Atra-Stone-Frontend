import profile from "../../assets/images/dark_prev_ui.png";

export default function Home() {
  return (
    // <div className="relative isolate px-6 pt-14 lg:px-8">
    //   <div
    //     aria-hidden="true"
    //     className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    //   >
    //     <div
    //       style={{
    //         clipPath:
    //           "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
    //       }}
    //       className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
    //     />
    //   </div>
    //   <div
    //     aria-hidden="true"
    //     className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    //   >
    //     <div
    //       style={{
    //         clipPath:
    //           "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
    //       }}
    //       className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
    //     />
    //   </div>
    //   <div className="mx-auto font-[Shabnam] max-w-2xl py-32 sm:py-48 lg:py-56">
    //     <div className="text-center">
    //       <h1 className="text-balance text-5xl tracking-tight text-gray-900 sm:text-7xl">
    //         گالری آنلاین آترا
    //       </h1>
    //       <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
    //         گالری آنلاین، وب سایتی جهت نمایش گوهر های فروشگاه ما می باشد. جهت هر
    //         گونه خرید، میتوانید از پشتیبانی پیگیری نمایید
    //       </p>
    //       <div className="mt-10 flex items-center justify-center gap-x-6">
    //         <Link
    //           to={"/gallery"}
    //           className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //         >
    //           گالری
    //         </Link>
    //         <a href="#" className="text-sm/6 font-semibold text-gray-900">
    //           بیشتر بدانید <span aria-hidden="true">→</span>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    //   <div
    //     aria-hidden="true"
    //     className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    //   >
    //     <div
    //       style={{
    //         clipPath:
    //           "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
    //       }}
    //       className="relative right-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:right-[calc(50%+36rem)] sm:w-[72.1875rem]"
    //     />
    //   </div>
    // </div>
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          به فروشگاه آترا خوش اومدی !
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          بخش مورد نظرتو انتخاب کن تا بتونیم بیشتر کمکت کنیم
        </p>
      </header>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <div className="bg-emerald-500 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-white">
              محصولات اقتصادی
            </h2>
          </div>
          <img
            src={profile}
            alt="Education"
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <p className="text-gray-100 mt-4">
              این قسمت میتونی تمام محصولات رو ببینی 🤩 تمام سعی خودمودن رو کردیم
              که قیمت ها منصفانه باشه تا شما استفاده کنید
            </p>
          </div>
        </div>
        <div className="bg-violet-500 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-white">
              محصولات سفارشی
            </h2>
          </div>
          <img
            src={profile}
            alt="Products"
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <p className="text-gray-100 mt-4">
              این قسمت برای سفارش های خاص طراحی شده😎 اینجا میتونی طرح مورد
              نظرتو برای ما ارسال کنی و ما برای شما انجام میدیم
            </p>
          </div>
        </div>
        <div className="bg-pink-500 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-white">آموزش</h2>
          </div>
          <img
            src={profile}
            alt="Customized Products"
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <p className="text-gray-100 mt-4">
              توی این قسمت میتونی تموم آموزش های مربوط به انرژی های سنگ، خواص
              درمانی و خیلی چیزای دیگه رو یاد بگیری
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
