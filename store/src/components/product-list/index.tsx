import Image from "next/image";
import Link from "next/link";

const ProductList = ({ product }) => {
  return (
    <div
      className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
      key={product.id}
    >
      <div className="box">
        <div className="p-5">
          <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit">
            <Image
              src={product.image}
              className="rounded-md"
              width={200}
              height={100}
              alt="Picture of the author"
            />
          </div>

          <span className="z-10 px-2 py-1 m-5 text-lg">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
