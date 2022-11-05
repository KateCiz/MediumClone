import Comment from "../../comments/Comment";


function UserComments({comments, sessionUserId}){
    return(
        <div className="comments-div">
                {comments?.map((comment,i) => {
                    return (
                        <div className="comment" key={i}>
                            {/* {comment.content}
                            <p>{comment.created_date}</p> */}
                            {/* <div className="comment-body edit area">
                                <button onClick={editComment}>Edit</button>
                                <button onClick={() => destroyComment(comment.id, comment.parent_id)}>Delete</button>
                            </div> */}
                            <Comment comment={comment} sessionUserId={sessionUserId}/>
                        </div>
                    );
                })}
        </div>
    )
};

export default UserComments;
