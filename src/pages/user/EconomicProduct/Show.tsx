import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { generateUrl } from "../../../services/general";
import { PRODUCT_DETAILS_API } from "../../../types/url";
import { useShowProduct } from "../../../hooks/useProducts";
import { toast } from "react-toastify";
import useCartStore from "../../../contexts/cartStore";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Show() {
  const { productId } = useParams();
  const { mutate: showProductInfo, data: product } = useShowProduct();
  const { addToCart } = useCartStore();

  useEffect(() => {
    showProductInfo(Number(productId));
  }, [productId]);

  const handleAddToCart = (productId: number) => {
    const result = addToCart(productId);
    if (result.success) {
      toast.success("محصول به سبد خرید اضافه شد ✅");
    } else {
      toast.error(result.error);
    }
  };
  
  return (
    <div className="bg-white min-h-screen" dir="rtl">
      {/* Product Images */}
      <div className="mx-auto mt-6 max-w-5xl px-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={3} // Show 3 images
          className="rounded-lg overflow-hidden shadow-md"
        >
          {product &&
            product.media.map((media: any, idx: number) => (
              <SwiperSlide key={idx}>
                <img
                  src={
                    typeof media === "string"
                      ? media
                      : generateUrl(PRODUCT_DETAILS_API, {
                          productId: productId || "",
                          productName: media.name,
                        })
                  }
                  className="w-full aspect-square object-cover"
                  alt={product?.name || "محصول"}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Product Info */}
      <div className="mx-auto max-w-5xl p-4">
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          {product?.name}
        </h1>
        <p className="text-gray-700 mt-4 leading-relaxed">
          {product?.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-3xl font-extrabold text-green-600">
            {Number(product?.price).toLocaleString()} تومان
          </p>
          <button
            onClick={() => product?.id && handleAddToCart(product.id)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-md transition"
          >
            + اضافه به سبد خرید
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-6">
          {[0, 1, 2, 3, 4].map((idx) => (
            <StarFill
              key={idx}
              className={classNames(
                4 > idx ? "text-yellow-400" : "text-gray-300",
                "size-5"
              )}
            />
          ))}
          <span className="text-gray-600 text-sm mr-2">{4}/5</span>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">محصولات مرتبط</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((related) => (
              <div
                key={related}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={`/images/related${related}.jpg`}
                  alt="محصول مرتبط"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold">محصول مرتبط {related}</h3>
                <p className="text-green-600 font-semibold mt-2">
                  {(related * 150_000).toLocaleString()} تومان
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">نظرات کاربران</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((comment) => (
              <div
                key={comment}
                className="border p-4 rounded-lg shadow-sm bg-gray-50"
              >
                <p className="text-gray-800">
                  کاربر {comment}: این محصول فوق العاده بود!
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
