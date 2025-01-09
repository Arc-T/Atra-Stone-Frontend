import { Bag, Box, Gem, People } from "react-bootstrap-icons";
import welcome_logo from "../../assets/images/atra.jpg";

export default function Home() {
  // const [orders, setOrders] = useState([] as Orders[]);

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4 bg-white rounded-md flex p-4 shadow-lg">
          <div className="flex-grow">
            <img src={welcome_logo} className="max-w-xs" alt="atra" />
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

        <div className="flex flex-col justify-between rounded-md col-span-2 h-full ">
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full h-full items-center justify-between bg-white rounded-md shadow-lg p-4">
              <div className="flex items-center justify-center w-full">
                <div className="bg-red-700 text-white p-2 rounded-md mb-6">
                  {/* Replace this SVG with your specific icon */}
                  <People height={48} width={48}/>
                </div>
                {/* <span className="text-white text-sm font-medium">↓ 23%</span> */}
              </div>
              <div className="text-center mt-4">
                <p className="text-lg font-bold">234</p>
                <p className="text-gray-600 text-sm">سفارشات</p>
              </div>
            </div>

            <div className="flex flex-col w-full h-full items-center justify-between bg-white rounded-md shadow-lg p-4">
              <div className="flex items-center justify-center w-full">
                <div className="bg-red-700 text-white p-2 rounded-md mb-6">
                  {/* Replace this SVG with your specific icon */}
                  <Box height={48} width={48}/>
                </div>
                {/* <span className="text-white text-sm font-medium">↓ 23%</span> */}
              </div>
              <div className="text-center mt-4">
                <p className="text-lg font-bold">234</p>
                <p className="text-gray-600 text-sm">سفارشات</p>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full items-center justify-between bg-white rounded-md shadow-lg p-4">
              <div className="flex items-center justify-center w-full mb-6">
                <div className="bg-red-700 text-white p-2 rounded-md">
                  {/* Replace this SVG with your specific icon */}
                  <Gem height={48} width={48}/>
                </div>
                {/* <span className="text-white text-sm font-medium">↓ 23%</span> */}
              </div>
              <div className="text-center mt-4">
                <p className="text-lg font-bold">234</p>
                <p className="text-gray-600 text-sm">سفارشات</p>
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-between bg-white rounded-md shadow-lg p-4">
              <div className="flex items-center justify-center w-full mb-6">
                <div className="bg-red-700 text-white p-2 rounded-md">
                  {/* Replace this SVG with your specific icon */}
                  <Bag height={48} width={48}/>
                </div>
                {/* <span className="text-white text-sm font-medium">↓ 23%</span> */}
              </div>
              <div className="text-center mt-4">
                <p className="text-lg font-bold">234</p>
                <p className="text-gray-600 text-sm">سفارشات</p>
              </div>
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
