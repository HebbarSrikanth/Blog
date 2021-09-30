import React from 'react';
import PostCreate from './Components/PostCreate';
import PostList from './Components/PostList';

const App = () => {
    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h2>Create Post</h2>
            <PostCreate />
            <hr />
            <h2>Posts</h2>
            <PostList />
        </div>
    );
};

export default App;
