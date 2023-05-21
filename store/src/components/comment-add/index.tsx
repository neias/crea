import { FormInput } from "@/components/base-component/Form";
import Button from "@/components/base-component/Button";

const addComment = ({ commentSubmit, comment, score }) => {
  return (
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
            <Button variant="secondary" className="mt-3 text-xs" type="submit">
              Comment
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default addComment;
