"use client";

import { FormEvent, useEffect, useState } from "react";

import Comments from "@/components/comments";
import AddComment from "@/components/comment-add";
import ProductDetail from "@/components/product-detail";
import { format } from "date-fns";

const apiHost = process.env.API_HOST;

const ProductDetailPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [openTab, setOpenTab] = useState(1);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(0);

  const { id } = params;

  useEffect(() => {
    fetch(`${apiHost}/products/${id}`, {
      credentials: "include",
      method: "GET",
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Invalid Token");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [id]);

  const handleTabTwo = (productId) => {
    setOpenTab(2);

    fetch(`${apiHost}/comments/${productId}`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Invalid Token");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => setComments(data.comments));
  };

  const commentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");

    const response = await fetch(`${apiHost}/comments`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        score,
        productId: product.id,
        addedDate: formattedDate,
        username: "User",
      }),
    });
    if (response.ok) {
      // successfuly notification
      handleTabTwo(product.id);
    } else {
      console.error(response.errors);
    }
  };

  return (
    product && (
      <>
        <ProductDetail product={product} />

        <div>
          <div className="flex mb-4">
            <button
              className={`py-2 px-4 bg-white text-gray-800 font-semibold ${openTab === 1 ? "border-b-2 border-blue-500" : ""
                }`}
              onClick={() => setOpenTab(1)}
            >
              Datail
            </button>
            <button
              className={`py-2 px-4 bg-white text-gray-800 font-semibold ${openTab === 2 ? "border-b-2 border-blue-500" : ""
                }`}
              onClick={() => handleTabTwo(product.id)}
            >
              Comment
            </button>
          </div>

          <div className="w-full">
            {openTab === 1 && (
              <div className="border p-4">{product.details}</div>
            )}
            {openTab === 2 && (
              <div className="border p-4">
                <div className="pb-10 mt-5">
                  <Comments comments={comments} />
                </div>
                <AddComment
                  commentSubmit={commentSubmit}
                  comment={comment}
                  score={score}
                />
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default ProductDetailPage;
