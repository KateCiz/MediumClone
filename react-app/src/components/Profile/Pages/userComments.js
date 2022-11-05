import CommentsPreview from "./commentsPreview";


function UserComments({comments, sessionUserId}){
    return(
        <div className="comments-div">
                {comments?.map((comment,i) => {
                    return (
                        <div className="comment" key={i}>
                            <CommentsPreview comment={comment} sessionUserId={sessionUserId}/>
                        </div>
                    );
                })}
        </div>
    )
};

export default UserComments;
