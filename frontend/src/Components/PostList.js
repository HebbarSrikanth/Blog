import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const { data } = await axios.get('http://posts.com/posts');
    data && setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {posts && Object.values(posts).length > 0 ? (
          Object.values(posts).map((post) => {
            return (
              <div key={post.id} className="card" style={{ width: '30%', marginBottom: '1.2%' }}>
                <div className="card-body">
                  <h5>{post.title}</h5>
                  <CommentList comments={post.comments} />
                  <hr />
                  <CommentCreate postId={post.id} />
                </div>
              </div>
            );
          })
        ) : (
          <h6>No Posts</h6>
        )}
      </div>
    </>
  );
};

export default PostList;
