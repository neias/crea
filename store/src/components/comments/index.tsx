import StarRating from "@/components/star-rating";

const Comments = ({ comments }) => {
  return (
    <>
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
