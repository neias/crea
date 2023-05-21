"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FormInput } from "@/components/base-component/Form";
import Button from "@/components/base-component/Button";

const apiHost = process.env.API_HOST;

const StarRating = ({ score }) => {
  const filledStars = Math.floor(score);
  const halfStars = score % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStars;

  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className="text-yellow-500"
        />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStarHalf}
          className="text-yellow-500"
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="text-gray-200" />
      ))}
    </div>
  );
};

const ProductDetailPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [openTab, setOpenTab] = useState(1);
  const [comments, setComments] = useState([]);

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
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="pt-5 mt-5 border-t border-slate-200/60 dark:border-darkmode-400"
                    >
                      <div className="flex">
                        <div className="flex-1 ml-3">
                          <div className="flex items-center">
                            <a href="" className="font-medium text-sm">
                              {comment.username}
                            </a>
                            <a
                              href=""
                              className="ml-auto text-xs text-slate-500"
                            >
                              Score
                              <StarRating
                                score={Math.floor(comment.score) / 2}
                              />
                            </a>
                          </div>
                          <div className="text-xs text-slate-500 ">
                            {new Date(comment.addedDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </div>
                          <div className="mt-2">{comment.comment}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-5 pt-3 pb-5 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="flex w-full text-xs text-slate-500 sm:text-sm ">
                    <div className="mr-2">Comments:</div>
                    <div className="ml-auto">Score:</div>
                  </div>
                  <div className="flex items-center w-full mt-3">
                    <div className="flex-none w-8 h-8 mr-3 image-fit">
                      {/* <img
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src={faker.photos[0]}
                  /> */}
                    </div>
                    <div className="relative flex-1 text-slate-600">
                      <FormInput
                        type="text"
                        className="pr-10 border-transparent bg-slate-100"
                        placeholder="Post a comment..."
                      />
                      <Button
                        variant="secondary"
                        className="mt-3 text-xs"
                        type="submit"
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
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
