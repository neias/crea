import { FormEvent, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import Comments from "@/components/comments";
import AddComment from "@/components/comment-add";
import ProductDetail from "@/components/product-detail";
import { useRouter } from "next/router";
import { format } from "date-fns";
import ErrorSchema from "@/types/Error";

const apiHost = process.env.API_HOST;

const ProductDetailPage = () => {
  const router = useRouter();
  const [openTab, setOpenTab] = useState(1);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(0);

  const [id, setId] = useState<string | undefined>(undefined);

  const queryClient = useQueryClient();

  useEffect(() => {
    setId(router.query.id as string);
  }, [router.query]);

  const { data, error, isLoading } = useQuery(
    ["products", id],
    async () => {
      const res = await fetch(`${apiHost}/products/${id}`, {
        credentials: "include",
        method: "GET",
      });

      if (res.status === 401) {
        throw { auth: false, message: "No token provided." };
      }

      const jsonData = await res.json();
      return jsonData.product;
    },
    { enabled: !!id }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    const validationResult = ErrorSchema.safeParse(error);
    if (validationResult.success) {
      const mathedError = validationResult.data;

      if (!mathedError.auth) {
        router.push("/login");
      }
    }
  }

  // TODO: useMutation should be added
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
        productId: data.id,
        addedDate: formattedDate,
        username: "User",
      }),
    });
    if (response.ok) {
      queryClient.invalidateQueries("products");
      // TODO: successfuly notification
    } else {
      console.error(response.errors);
    }
  };

  return (
    data && (
      <>
        <ProductDetail product={data} />
        <div>
          <div className="flex mb-4">
            <button
              className={`py-2 px-4 bg-white text-gray-800 font-semibold ${
                openTab === 1 ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setOpenTab(1)}
            >
              Datail
            </button>
            <button
              className={`py-2 px-4 bg-white text-gray-800 font-semibold ${
                openTab === 2 ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setOpenTab(2)}
            >
              Comment
            </button>
          </div>

          <div className="w-full">
            {openTab === 1 && <div className="border p-4">{data.details}</div>}
            {openTab === 2 && (
              <div className="border p-4">
                <div className="pb-10 mt-5">
                  <Comments productId={id} />
                </div>
                <AddComment
                  commentSubmit={commentSubmit}
                  comment={comment}
                  setComment={setComment}
                  score={score}
                  setScore={setScore}
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
