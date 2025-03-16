import { Gem, Gift, Palette } from "react-bootstrap-icons";
import picture from "../../../assets/images/ezgif-1-4368d5a12e.jpg";


const Index = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-2xl px-8"

>
        <section className="py-16">
          <div className="container mx-auto text-start">
            <h2 className="text-4xl font-bold text-red-900 mb-8">
              آثار برجسته
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 hover:cursor-pointer">
              <div className="transition-transform transform hover:scale-105 duration-300 bg-slate-950 rounded-full">
                <img
                  src={picture}
                  className="w-full h-60 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="transition-transform transform hover:scale-105 duration-300 bg-slate-950 rounded-full">
                <img
                  src={picture}
                  className="w-full h-60 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="transition-transform transform hover:scale-105 duration-300 bg-slate-950 rounded-full">
                <img
                  src={picture}
                  className="w-full h-60 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="transition-transform transform hover:scale-105 duration-300 bg-slate-950 rounded-full">
                <img
                  src={picture}
                  className="w-full h-60 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white drop-shadow-md mb-8">
              ویژگی های سفارشات خاص
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white/30 text-red-900 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-purple-800 hover:text-white duration-300 cursor-pointer">
                <div className="mb-4 text-4xl flex justify-center text-red-900">
                  <Palette />
                </div>
                <h3 className="text-xl font-semibold mb-4">انتخاب آزادانه</h3>
                <p className="text-gray-100">
                  دوست داری طراحی خاص خودت رو داشته باشی؟ می‌تونی اندازه، شکل و
                  جزئیات رو انتخاب کنی و به ما بگی که چطور می‌خوای!
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/30 text-pink-900 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-pink-800 hover:text-white duration-300 cursor-pointer">
                <div className="mb-4 text-4xl flex justify-center text-pink-700">
                  <Gem />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  بهره‌وری از خواص سنگ‌ها
                </h3>
                <p className="text-gray-100">
                  ما بهت کمک می‌کنیم با توجه به ماه تولدت، تقویم نجومی و اطلاعات
                  دیگه، بهترین سنگ‌ها رو برای تو پیشنهاد کنیم.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/30 text-red-900 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-pink-700 hover:text-white duration-300 cursor-pointer">
                <div className="mb-4 text-4xl flex justify-center text-red-700">
                  <Gift />
                </div>
                <h3 className="text-xl font-semibold mb-4">امتیازات ویژه</h3>
                <p className="text-gray-100">
                  سفارشات خاص علاوه بر طراحی، شامل امتیازات ویژه هم می‌شن! مثل
                  جعبه اختصاصی، کاتالوگ ویژه و تعمیر رایگان.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="submit-form" className="py-20 bg-gray-200">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              Submit Your Artwork
            </h2>
            <form className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-lg mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-lg mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="artwork"
                  className="block text-gray-700 text-lg mb-2"
                >
                  Upload Artwork
                </label>
                <input
                  type="file"
                  id="artwork"
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Submit Artwork
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
