import { ReactElement, useEffect, useState } from "react";

import ProductList from "../../components/product-list";

const apiHost = process.env.API_HOST;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${apiHost}/products`, {
      credentials: "include",
      method: "GET",
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
  }, []);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium">Product List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* BEGIN: Product List */}

        {products.map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
        {/* BEGIN: Product List */}
      </div>
    </>
  );
};

export default ProductsPage;
