import { useState } from "react";
import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProjectComments = ({project}:any) =>{
    const [newComment, setNewComment] = useState('');
    const {user}:any = useAuthContext();
    const {updateDocument, response}:any = useFirestore('projects');

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();
        
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })

        if(!response.error){
            setNewComment('')
        }
    }

    return(
        <div className="project-comments" onSubmit={handleSubmit}>
            <h4>Project Comments</h4>
            <ul>
                {project.comments.length > 0 && project.comments.map((comment:any) =>(
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true})}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form className="add-comment">
                <label>
                    <span>Add new comments: </span>
                    <textarea
                        required
                        onChange={(e)=> setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}

export default ProjectComments;