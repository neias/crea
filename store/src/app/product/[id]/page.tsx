"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { FormInput } from "@/components/base-component/Form";
import Button from "@/components/base-component/Button";
import StarRating from "@/components/star-rating";
import Comments from "@/components/Comments";
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

                <div className="px-5 pt-3 pb-5 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="flex w-full text-xs text-slate-500 sm:text-sm ">
                    <div className="mr-2">Comments:</div>
                    <div className="ml-auto">Score:</div>
                  </div>
                  <form onSubmit={commentSubmit}>
                    <div className="items-center w-full mt-3">
                      <div className="flex flex-col text-slate-600">
                        <div className="flex mb-3">
                          <FormInput
                            type="text"
                            className="w-3/4 pr-10 mr-3 border-transparent bg-slate-100"
                            placeholder="Post a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <FormInput
                            type="number"
                            min="0"
                            max="5"
                            className="w-1/4 pr-10 border-transparent bg-slate-100"
                            placeholder="Score"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                          />
                        </div>
                        <Button
                          variant="secondary"
                          className="mt-3 text-xs"
                          type="submit"
                        >
                          Comment
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default ProductDetailPage;
