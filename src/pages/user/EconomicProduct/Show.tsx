import { useEffect } from "react";
import { StarFill } from "react-bootstrap-icons";
// import { AttributeValue, ProductMedia, Tag } from "../../../types/admin";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { generateUrl } from "../../../services/general";
import { PRODUCT_DETAILS_API } from "../../../types/url";
import { useShowProduct } from "../../../hooks/useProducts";

// interface Response {
//   details: ProductInfo;
//   attributes: AttributeValue[];
//   tags: Tag[];
//   medias: ProductMedia[];
// }

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Show() {
  // const [product, setProduct] = useState<{
  //   details: ProductInfo;
  //   attributes: AttributeValue[];
  //   medias: ProductMedia[];
  // }>({
  //   details: {} as ProductInfo,
  //   attributes: [],
  //   medias: [],
  // });

  const comments = [
    {
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      userName: "Ali Reza",
      rating: 4.5,
      text: "This product is amazing! The quality is top-notch and the design is sleek.",
    },
    {
      userAvatar: "https://randomuser.me/api/portraits/women/42.jpg",
      userName: "Sara Mohammadi",
      rating: 5,
      text: "I love it! The material feels premium and it fits perfectly. Highly recommend!",
    },
    {
      userAvatar: "https://randomuser.me/api/portraits/men/34.jpg",
      userName: "Reza Jamshidi",
      rating: 3.5,
      text: "Good product, but the delivery was delayed. Quality is fine, but expected better packaging.",
    },
    {
      userAvatar: "https://randomuser.me/api/portraits/women/35.jpg",
      userName: "Niloofar Kian",
      rating: 4,
      text: "Nice product overall. Worth the price. Could have been better in terms of color variety.",
    },
  ];

  const relatedProducts = [
    {
      name: "Smartphone XYZ",
      price: "1,500,000",
      image: "https://via.placeholder.com/300",
    },
    {
      name: "Wireless Headphones",
      price: "1,200,000",
      image: "https://via.placeholder.com/300",
    },
    {
      name: "Smartwatch 360",
      price: "950,000",
      image: "https://via.placeholder.com/300",
    },
    {
      name: "Bluetooth Speaker",
      price: "800,000",
      image: "https://via.placeholder.com/300",
    },
  ];

  const { productId } = useParams();

  const {
    mutate: showProductInfo,
    data: product,
    isPending,
  } = useShowProduct();

  useEffect(() => {
    showProductInfo(Number(productId));
  }, [productId]);

  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="text-sm">
              <a
                href={product?.title}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product?.name}
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Images */}
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-lg"
        >
          {product?.media.map((media, index) => (
            <SwiperSlide key={index}>
              <img
                src={generateUrl(PRODUCT_DETAILS_API, {
                  productId: productId || "",
                  productName: media.name,
                })}
                className="aspect-[3/4] w-full h-full rounded-lg object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        {/* Product Title */}
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product?.name}
          </h1>
        </div>

        {/* Product Description */}
        <div className="py-10 lg:col-span-3 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-8 lg:pr-8 lg:pt-6">
          <h3 className="text-lg font-semibold text-gray-900">توضیحات</h3>
          <p className="text-base text-gray-600 mt-4">{product?.description}</p>
        </div>

        {/* Related Products */}
        <div className="py-10 lg:col-span-3 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-8 lg:pr-8 lg:pt-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            محصولات مرتبط
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((product, index) => (
              <div
                key={index}
                className="group relative border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:transform hover:scale-105"
              >
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-56 rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.price} تومان</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section and Price */}
        <div className="py-10 lg:col-span-3 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-8 lg:pr-8 lg:pt-6">
          <div className="flex flex-wrap lg:flex-nowrap">
            {/* Comments */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900">
                نظرات کاربران
              </h2>
              <div className="mt-6 space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={
                        comment.userAvatar ||
                        "https://randomuser.me/api/portraits/men/32.jpg"
                      }
                      alt="User Avatar"
                    />
                    <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-900">
                        {comment.userName}
                      </p>
                      <div className="flex items-center mt-2">
                        <StarFill className="text-yellow-500" size={18} />
                        <span className="ml-2 text-sm text-gray-600">
                          {comment.rating}/5
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="my-16">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Leave a Comment
                  </h3>
                  <form className="mt-4 space-y-4">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      rows={4}
                      placeholder="Write your review..."
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarFill
                            key={rating}
                            className="cursor-pointer text-gray-300 hover:text-yellow-500"
                            size={20}
                          />
                        ))}
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Price and Rating */}
            <div className="lg:w-1/3 lg:pl-8 lg:mr-4">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {Number(product?.price).toLocaleString()} تومان
              </p>
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarFill
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
