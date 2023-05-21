import Image from "next/image";
import StarRating from "@/components/star-rating";

const ProductDetail = ({ product }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
          />
        </div>
        <div className="p-8">
          <StarRating score={Math.floor(product.score) / 2} />
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {product.name}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            {product.description}
          </p>
          <p className="mt-2 text-gray-500">Score: {product.score}</p>
          <div className="uppercase tracking-wide text-sm text-red-600 font-semibold">
            {product.price}
          </div>
          <p className="mt-2 text-gray-500">
            Arrival Date:{" "}
            {new Date(product.arrivalDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
