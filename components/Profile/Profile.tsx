import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/';
import { handleGetUserPosts } from '../../utils/handleGetUserPosts';
import { CommentT, SinglePostType } from '../../types/types';
import MiniaturePost from './MiniaturePost';
import { handleGetUserComments } from '../../utils/handleGetUserComments';
import MiniatureComment from './MiniatureComment';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Profile() {
  const [profilePostsData, setProfilePostsData] = useState<
    null | SinglePostType[]
  >(null);
  const [profileComments, setProfileComments] = useState<null | CommentT[]>(
    null,
  );
  const { user } = useUser();
  const username = user?.nickname ? user.nickname : ' ';

  useEffect(() => {
    handleGetUserPosts({ username }).then((res) => {
      setProfilePostsData(res);
    });
    handleGetUserComments({ username }).then((res) => {
      setProfileComments(res);
    });
  }, [username]);

  return profilePostsData && profileComments ? (
    <div className="meme-stream my-12">
      <div className="my-4">
        <h2 className="h3">{user?.nickname}</h2>
      </div>
      {/* display posts */}
      <div>
        <h2 className="text-center h3 mb-4 ">posts:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profilePostsData?.map((post) => (
            <MiniaturePost
              key={post.id}
              fileURL={post.fileURL}
              id={post.id}
              memeTitle={post.memeTitle}
              upvoteCount={post.upvoteCount}
              downvoteCount={post.downvoteCount}
            />
          ))}
        </div>
      </div>
      {/* display comments */}
      <div>
        <h2 className="text-center h3 mb-4 ">comments:</h2>
        <div className="flex-col">
          {profileComments?.map((comment, index) => (
            <MiniatureComment
              key={comment.id}
              index={index}
              commentContent={comment.commentContent}
              date={comment.date}
              id={comment.id}
              postId={comment.postId}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default Profile;
