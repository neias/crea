"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Get your products data from API
    // Example products data:
    const exampleProductsData = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `Product ${i + 1}`,
    }));
    setProducts(exampleProductsData);
  }, [page]);

  return (
    <div>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          {product.name}
        </Link>
      ))}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default ProductsPage;
