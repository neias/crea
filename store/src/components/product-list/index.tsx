import Image from "next/image";

const ProductList = ({ product }) => {
  return (
    <div
      className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
      key={product.id}
    >
      <div className="box">
        <div className="p-5">
          <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10">
            <Image
              src={product.image}
              className="rounded-md"
              width={200}
              height={100}
              alt="Picture of the author"
            />
          </div>
          <span className="z-10 px-2 py-1 m-5 text-lg">{product.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
