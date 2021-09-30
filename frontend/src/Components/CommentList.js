const CommentList = ({ comments }) => {
    const renderComments =
        comments && comments.length > 0
            ? comments.map((comment) => {
                  if (comment.status === 'rejected') {
                      comment.content = 'The comment has been rejected';
                  }
                  if (comment.status === 'pending') {
                      comment.content = 'The comment is awaiting moderation';
                  }
                  return (
                      <ul key={comment.id}>
                          <li>{comment.content}</li>
                      </ul>
                  );
              })
            : null;

    return <>{renderComments}</>;
};

export default CommentList;
