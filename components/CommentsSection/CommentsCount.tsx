interface CommentsCountI {
  commentsCount?: number;
}

const CommentsCount = ({ commentsCount }: CommentsCountI) => {
  return (
    <div className="w-8/12 mx-auto mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
          Discussion ({commentsCount ? commentsCount : 0})
        </h2>
      </div>
    </div>
  );
};

export default CommentsCount;
