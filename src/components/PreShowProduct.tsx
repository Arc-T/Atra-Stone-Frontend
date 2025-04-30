import { X } from "react-bootstrap-icons";
import { Media } from "../types/admin";
import { MEDIA_SHOW_URL } from "../types/url";

export interface ProductProps {
  media: Media | null;
  quantity: number;
  title: string;
  price: number;
}

interface props {
  product: ProductProps;
  onClose(): void;
}

const PreShowProduct = ({ product, onClose }: props) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-gray-800 bg-opacity-50 transition-opacity animate-fade"
        aria-hidden="true"
      ></div>

      {/* Modal container */}
      <div className="relative w-full max-w-sm transform overflow-hidden rounded-xl bg-white shadow-xl transition-all animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 z-10 right-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition flex items-center justify-center"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Modal content */}
        <div className="border-b border-gray-200">
          <div className="relative border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {product.media && (
              <img
                src={product.media && `${MEDIA_SHOW_URL}${product.media.name}`}
                className="w-full aspect-square bg-gray-100 object-cover"
              />
            )}
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-900 truncate">
                {product.title}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-md font-semibold text-gray-700">
                  {Number(product.price).toLocaleString()} تومان
                </p>
                <p className="text-md text-gray-500">{product.count} عدد</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreShowProduct;
