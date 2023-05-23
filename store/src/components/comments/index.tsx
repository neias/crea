import { useQuery } from "react-query";
import { z } from "zod";
import { useRouter } from "next/router";

import StarRating from "@/components/star-rating";
import ErrorSchema from "@/types/Error";

const apiHost = process.env.API_HOST;

const Comments = ({ productId }) => {
  const router = useRouter();
  const { data, error, isLoading } = useQuery("products", async () => {
    const res = await fetch(`${apiHost}/comments/${productId}`, {
      credentials: "include",
    });

    if (res.status === 401) {
      throw { auth: false, message: "No token provided." };
    }

    const jsonData = await res.json();

    return jsonData.comments;
  });

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

  return (
    <>
      {data.map((comment) => (
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
                <a href="" className="ml-auto text-xs text-slate-500">
                  Score
                  <StarRating score={Math.floor(comment.score) / 2} />
                </a>
              </div>
              <div className="text-xs text-slate-500 ">
                {new Date(comment.addedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="mt-2">{comment.comment}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Comments;
