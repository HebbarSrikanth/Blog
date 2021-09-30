import { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [content, setContent] = useState('');

  const inputHandler = (e) => {
    if (e.target.value.trim() !== '' || e.target.value !== null) setContent(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://posts.com/posts/create', { title: content });
    console.log('Posted successfully', data);
    setContent('');
  };

  return (
    <>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            placeholder="Posts"
            value={content}
            onChange={inputHandler}
            style={{ width: '30%' }}
          />
        </div>
        <button className="btn btn-primary" style={{ marginTop: '1%' }}>
          Submit
        </button>
      </form>
    </>
  );
};

export default PostCreate;
