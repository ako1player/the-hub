import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const NewGroup = () =>{
    const [name, setName] = useState('');
    const [formError, setFormError] = useState<null | string>(null);
    const {addDocument, response}:any = useFirestore('groups');
    const {user}:any = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();
        setFormError(null);

        if(!name){
            setFormError("Please input a group name");
            return
        }

        const createdBy = {
            displaName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const group = {
            name,
            createdBy,
            usersInGroup: {id: []},
            projects: []
        }

        //submit to firebase
        await addDocument(group);
        if(!response.error){
            navigate('/');
        }
    }

     return(
        <div>
            <h2 className="page-title"></h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Group Name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <button className="btn">Create Group</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default NewGroup;