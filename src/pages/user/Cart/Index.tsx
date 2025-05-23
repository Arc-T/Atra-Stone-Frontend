import { useEffect, useState } from "react";
import { ProductInfo } from "../../../types/admin";
import { getCartProducts } from "../../../services/productService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Trash3Fill, CartXFill } from "react-bootstrap-icons";
import { generateUrl } from "../../../services/general";
import { PRODUCT_DETAILS_API } from "../../../types/url";
import useCartStore from "../../../contexts/cartStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValues {
  title: string;
  quantity: number;
  price: number;
  category_id: number;
  description: string;
}

const Index = () => {
  const [cartProducts, setCartProducts] = useState([] as ProductInfo[]);
  const { removeFromCart } = useCartStore();
  const navigate = useNavigate();
  const { handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (formBody) => {
    console.log(formBody);
    if (localStorage.getItem("user")) navigate("/checkout/cart/summary");
    else navigate("/user/login/?backUrl=/checkout/cart/summary");
  };

  useEffect(() => {
    const products = localStorage
      .getItem("cart")
      ?.split(",")
      .map((data) => ({
        id: Number(data),
      }));

    if (products && products.length > 0) {
      getCartProducts(products)
        .then((response) => {
          console.log(response);
          setCartProducts(response);
        })
        .catch((error: AxiosError) => toast.error("خطا: " + error.message));
    }
  }, []);

  const handleRemove = (id: number) => {
    const updatedProducts = cartProducts.filter((product) => product.id !== id);
    setCartProducts(updatedProducts);
    removeFromCart(id);
  };

  const totalPrice = cartProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-7xl mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-8">سبد خرید شما</h1>

      {cartProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
          <CartXFill size={80} className="text-gray-400 mb-6" />
          <p className="text-xl mb-4">سبد خرید شما خالی است</p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg transition">
            بازگشت به فروشگاه
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Products List */}
            <div className="lg:col-span-2 space-y-5">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={generateUrl(PRODUCT_DETAILS_API, {
                      productId: product.id,
                      productName: product.media[0].name,
                    })}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.title}
                    </h2>
                    <p className="text-base text-green-700 font-medium mt-2">
                      {product.price.toLocaleString()} تومان
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="text-red-500 hover:text-red-600 transition"
                    title="حذف محصول"
                  >
                    <Trash3Fill size={22} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border border-gray-100 rounded-xl p-6 shadow sticky top-24 h-fit bg-white space-y-6">
              <h2 className="text-xl font-bold text-center text-gray-800">
                خلاصه سفارش
              </h2>

              <div className="space-y-4">
                <p className="text-base font-medium text-gray-700">
                  روش تحویل:
                </p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border rounded-lg hover:border-cyan-500 transition cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="post"
                      defaultChecked
                      className="accent-cyan-600"
                    />
                    <span className="text-gray-800">ارسال با پست</span>
                  </label>
                  {/* <label className="flex items-center gap-3 p-3 border rounded-lg hover:border-cyan-500 transition cursor-pointer">
                    <input
                      type="radio"
                      disabled
                      name="delivery"
                      value="in_person"
                      className="accent-cyan-600"
                    />
                    <span className="text-gray-800">
                      خرید حضوری (اصفهان، زرینشهر)
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg hover:border-cyan-500 transition cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="snap"
                      disabled
                      className="accent-cyan-600"
                    />
                    <span className="text-gray-800">
                      ارسال با اسنپ (ویژه اصفهان)
                    </span>
                  </label> */}
                </div>
              </div>

              {/* <div className="space-y-2">
              <label
                htmlFor="discountCode"
                className="text-base font-medium text-gray-700"
              >
                کد تخفیف:
              </label>
              <div className="flex gap-2">
                <input
                  id="discountCode"
                  type="text"
                  placeholder="کد را وارد کنید"
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 rounded-lg transition">
                  اعمال
                </button>
              </div>
            </div> */}

              <div className="flex justify-between text-gray-600 text-base">
                <span>مجموع قیمت:</span>
                <span className="font-semibold text-gray-900">
                  {totalPrice.toLocaleString()} تومان
                </span>
              </div>

              <button className="bg-cyan-600 hover:bg-cyan-700 w-full text-white py-3 rounded-lg text-lg font-medium transition">
                ثبت سفارش
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Index;
