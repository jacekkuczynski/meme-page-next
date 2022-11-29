import { useUser } from "@auth0/nextjs-auth0";

const CommentsForm = () => {
  const { user } = useUser();
  return (
    <section className="bg-white w-full py-8">
      <div className="w-full mx-auto px-4">
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

export default CommentsForm;
