/* eslint-disable @typescript-eslint/no-explicit-any */
import CommentItem from "./CommentItem";

interface CommentFeedProps {
    comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
    return (
        <>
            {comments.map((comment) => (
                <CommentItem key={comment.id} data={comment} />
            ))}            postId
        </>
    )
}

export default CommentFeed