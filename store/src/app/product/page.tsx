"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const apiHost = process.env.API_HOST;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    fetch(`${apiHost}/products`, {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Invalid token");
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => setProducts(res.products))
      .catch((e) => {
        console.log(e);
        //        router.push("./login");
      });

    const exampleProductsData = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `Product ${i + 1}`,
    }));
    setProducts(exampleProductsData);
  }, [page]);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium">Product List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* BEGIN: Product List */}
        {products.map((product) => (
          <div
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            key={product.id}
          >
            <div className="box">
              <div className="p-5">
                <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10">
                  <Image
                    src="https://res.cloudinary.com/kc-cloud/image/upload/v1618066744/vue-fundamentals/ae235_fh03xw.jpg"
                    className="rounded-md"
                    width={200}
                    height={100}
                    alt="Picture of the author"
                  />
                </div>
                <span className="z-10 px-2 py-1 m-5 text-lg">Featured</span>
              </div>
            </div>
          </div>
        ))}
        {/* BEGIN: Product List */}
      </div>
    </>
  );
};

export default ProductsPage;
