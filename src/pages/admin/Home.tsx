import atra from "../../assets/images/atra.jpg";
export default function Home() {

    return (
        <div className="grid grid-cols-6 gap-4 drop-shadow-lg">
            <div className="col-span-4 bg-amber-300 rounded-md flex p-4 shadow-lg">
                <img
                    src={atra}
                    className="w-80 h-80 rounded-full object-cover border-4 border-white shadow-md"
                    alt="atra"
                />
                <div className="grid grid-cols-2 gap-6 my-4 mx-8 items-center">
                    <h1 className="text-4xl font-semibold col-span-2 mb-4">
                        آترا جون خوش اومدی!
                    </h1>

                    {/* Container for headings and buttons */}
                    <div className="col-span-2 flex flex-col gap-y-6">
                        {/* Row 1 */}
                        <div className="flex items-center justify-between">
                            <h6 className="text-lg font-medium">تعداد سفارش های پیگیری نشده</h6>
                            <button
                                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-200 ease-in-out bg-transparent rounded-lg py-2 px-4 me-2"
                            >
                                نمایش
                            </button>
                        </div>

                        {/* Row 2 */}
                        <div className="flex items-center justify-between">
                            <h6 className="text-lg font-medium">تعداد تمعیری های پیگیری نشده</h6>
                            <button
                                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-200 ease-in-out bg-transparent rounded-lg py-2 px-4 me-2"
                            >
                                نمایش
                            </button>
                        </div>

                        {/* Row 3 */}
                        <div className="flex items-center justify-between">
                            <h6 className="text-lg font-medium">تعداد پیام های پیگیری نشده</h6>
                            <button
                                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-200 ease-in-out bg-transparent rounded-lg py-2 px-4 me-2"
                            >
                                نمایش
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-blue-900 rounded-md p-4 shadow-lg col-span-2">
                {/* Placeholder for additional content */}
            </div>
        </div>
    );

}