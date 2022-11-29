import { useUser } from "@auth0/nextjs-auth0";

interface CommentsI {
  commentsCount: number;
}

const Comments = ({ commentsCount }: CommentsI) => {
  const { user } = useUser();
  console.log(user);
  return (
    <section className="bg-white w-full py-8">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion ({commentsCount})
          </h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button type="submit" className="button">
            Post comment
          </button>
        </form>
      </div>
    </section>
  );
};

export default Comments;
