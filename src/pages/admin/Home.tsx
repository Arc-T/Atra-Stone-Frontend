
// interface Orders {
//   id: number;
//   user: string;
//   product: string;
//   address: string;
//   date: string;
// }
export default function Home() {
  // const [orders, setOrders] = useState([] as Orders[]);

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4 bg-white rounded-md flex p-4 shadow-lg">
          <div className="flex-grow">
            <img
              src="/src/assets/images/atra.jpg"
              className="max-w-xs"
              alt="atra"
            />
          </div>
          <div className="flex-grow grid grid-cols-2 gap-6 my-4 mx-8 items-center">
            <h1 className="text-4xl font-semibold col-span-2 mb-4">
              آترا جون خوش اومدی!
            </h1>
            <div className="col-span-2 flex flex-col gap-y-6">
              <div className="flex items-center justify-between">
                <h6 className="text-lg font-medium">
                  تعداد سفارش های پیگیری نشده
                </h6>
                <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-200 ease-in-out bg-transparent rounded-lg py-2 px-4 me-2">
                  نمایش
                </button>
              </div>
              <div className="flex items-center justify-between">
                <h6 className="text-lg font-medium">
                  تعداد تمعیری های پیگیری نشده
                </h6>
                <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-200 ease-in-out bg-transparent rounded-lg py-2 px-4 me-2">
                  نمایش
                </button>
              </div>
              <div className="flex items-center justify-between">
                <h6 className="text-lg font-medium">
                  تعداد پیام های پیگیری نشده
                </h6>
                <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-200 ease-in-out bg-transparent rounded-lg py-2 px-4 me-2">
                  نمایش
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-md p-4 col-span-2 h-full">
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full">
              <div className="bg-white text-center rounded shadow-md font-thin text-gray-700">
                مشتریان
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="bg-white text-center rounded shadow-md font-thin text-gray-700">
                سفارشات
              </span>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full">
              <span className="bg-white text-center rounded shadow-md font-thin text-gray-700">
                کالاها
              </span>
            </div>
            <div className="flex flex-col w-full">
              <span className="bg-white text-center rounded shadow-md font-thin text-gray-700">
                فروش
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white justify-between rounded-md p-4 col-span-6 h-full shadow-lg">
          <p className="text-center text-2xl font-semibold mb-4 text-gray-800">
            سفارشات این ماه
          </p>
          <div className="overflow-x-auto rounded-lg my-4">
            <table className="min-w-full border-collapse bg-white">
              <thead>
                <tr className="bg-red-700 text-white text-lg">
                  <th className="text-right py-4 px-6 border-l">ردیف</th>
                  <th className="text-right py-4 px-6 border-l">کاربر</th>
                  <th className="text-right py-4 px-6 border-l">سفارش</th>
                  <th className="text-right py-4 px-6 border-l">آدرس</th>
                  <th className="text-right py-4 px-6 border-l">تاریخ</th>
                  <th className="text-right py-4 px-6">عملیات</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 px-6 text-gray-500 border-b bg-gray-50"
                  >
                    سفارشی ثبت نشده است
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
