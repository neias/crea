"use client";

// import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const ProductDetailPage = () => {
  // const router = useRouter();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Get your product detail data from API
    // Example product detail data:
    const exampleProductDetail = {
      id: 1, //router.query.id,
      name: "product 1", //`Product ${router.query.id}`,
      description: "urun aciklamasi falan filan", // `Description of product ${router.query.id}`,
    };
    setProduct(exampleProductDetail);
  }, []);

  const submitComment = async (e: FormEvent) => {
    e.preventDefault();
    // Your API call here to submit comment
    setComment("");
  };

  return (
    product && (
      <div>
        {/* <img src={`https://example.com/${product.id}.jpg`} alt={product.name} /> */}
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        {/* Comment section */}

        <form onSubmit={submitComment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    )
  );
};

export default ProductDetailPage;
