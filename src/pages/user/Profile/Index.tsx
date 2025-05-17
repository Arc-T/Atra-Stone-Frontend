const Index = () => {
  return (
    <section className="md:col-span-3 bg-white rounded-2xl shadow p-6 space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">
        اطلاعات حساب کاربری
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <label className="block mb-1 text-gray-700">نام</label>
          <input
            type="text"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="مثلاً علی"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">نام خانوادگی</label>
          <input
            type="text"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="مثلاً رضایی"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">شماره موبایل</label>
          <input
            type="text"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="09123456789"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">ایمیل</label>
          <input
            type="email"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="example@email.com"
          />
        </div>
      </form>

      <div className="text-left">
        <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
          ذخیره تغییرات
        </button>
      </div>
    </section>
  );
};

export default Index;
