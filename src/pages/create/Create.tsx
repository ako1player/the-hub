import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
//styles
import './Create.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

const categories = [
    {value: 'development', label: 'Development'},
    {value: 'design', label: 'Design'},
    {value: 'sales', label: 'Sales'},
    {value: 'marketing', label: 'Marketing'},
]

const Create = ({id}:any) =>{
    //form elements
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState<any>('');
    const [assignedUsers, setAssignedUsers] = useState<any>([]);
    const [formError, setFormError] = useState<null | string>(null);

    
    const {documents}:any = useCollection('users', null, null)
    const {documents:groups} = useCollection('groups', null, null);
    // const {document} = useDocument("groups", id)
    const [users, setUsers] = useState<any>();
    const {user}:any = useAuthContext();

    const {addDocument, response}:any = useFirestore('projects');
    const navigate = useNavigate();

    useEffect(()=>{
        //gets list of users in group
        const users:any = [];
             groups?.map((group:any) =>{
                if(group.id === id){
                documents?.map((user:any) =>{
                    if(user.id === group.usersInGroup.id?.find((f:any)=> f.includes(user.id)) || user.id === group.createdBy.id){
                        console.log(user)
                        return users.push(user)
                    }
                })
            }
        })

        //displays users in assign users section in the form
        if(documents){
        const options = users.map((u:any) =>{
            return { value: u, label: u.displayName }
        })
        setUsers(options);
        }
    },[documents])

    const handleSubmit = async(e:React.FormEvent) =>{
        e.preventDefault();
        setFormError(null);

        if(!category){
            setFormError('Please select a project category');
            return
        }

        if(assignedUsers.length < 1){
            setFormError('Please assign project to at least 1 user');
            return;
        }

        const createdBy = {
            displaName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u:any) =>{
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList,
            groupId: id,
        }

        //submit to firebase
        await addDocument(project);
        if(!response.error){
            navigate(`/groups/${id}`);
            setName('');
            setDetails('');
            setDueDate('');
            setCategory('');
            setAssignedUsers('');
        }
    }

    return(
        <div className='create-form'>
            <h2 className="page-title">Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input 
                    type='text' 
                    required
                    onChange={(e)=> setName(e.target.value)}
                    value={name}
                    />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea  
                    required
                    onChange={(e)=> setDetails(e.target.value)}
                    value={details}
                    />
                </label>
                <label>
                    <span>Set due date:</span>
                    <input 
                    type='date' 
                    required
                    onChange={(e)=> setDueDate(e.target.value)}
                    value={dueDate}
                    />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select
                    onChange={(option:any)=> setCategory(option)}
                    options={categories}
                    value={category}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select
                    onChange={(option:any) => setAssignedUsers(option)}
                    options={users}
                    value={assignedUsers}
                    isMulti
                    />
                </label>
                <button className='btn'>Add Project</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default Create;