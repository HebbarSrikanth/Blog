import { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const inputHandler = (e) => {
    if (e.target.value.trim() !== '' || e.target.value !== null) setContent(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    console.log('Commented successfully', data);
    setContent('');
  };

  return (
    <>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            placeholder="Comments"
            value={content}
            onChange={inputHandler}
          />
        </div>
        <button className="btn btn-primary" style={{ marginTop: '2%' }}>
          Submit
        </button>
      </form>
    </>
  );
};

export default CommentCreate;
