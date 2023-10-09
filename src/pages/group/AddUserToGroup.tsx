import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const AddUserToGroup = ({docId}:any) =>{
    const [userId, setUserId] = useState("");
    const {updateDocument, response}:any = useFirestore('groups');

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();
        
        await updateDocument(docId.id, {
            usersInGroup: {id: [...docId.usersInGroup.id, userId]}
        })

        if(!response.error){
            setUserId('')
        }
    }
    return(
        <div>
            <h2>Add User To Group</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>User's ID:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setUserId(e.target.value)}
                        value={userId}
                    />
                </label>
                <button className="btn">Add User</button>
            </form>
        </div>
    )
}

export default AddUserToGroup;