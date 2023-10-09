import { useParams } from 'react-router-dom';
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';
//styles
import './OnlineUsers.css';

const OnlineUsers = () =>{
    const {id} = useParams();
    const {documents, error} = useCollection('users', null, null);
    const {documents:groups, error:groupError} = useCollection('groups', null, null);
    // get userid from groups collection
    // match userid to users collection
    // const gr = groups?.map((gru:any) =>{
    //     if(gru.id === id){
    //         console.log(gru.createdBy.id)
    //     }
    // })
    return(
        <div className='user-list'>
            <h2>All Users</h2>
            {error && <div>{error}</div>}
            {documents && groups?.map((g:any) => (
            (g.id === id) ? 
                documents?.map((user:any) =>(
                    (user.id === g.usersInGroup.id?.find((f:any)=> f.includes(user.id)) || user.id === g.createdBy.id) ?
                        <div key={user.id} className="user-list-item">
                            {user.online && <span className='online-user'></span>}
                            <span>{user.displayName}</span>
                            <Avatar src={user.photoURL} />
                        </div>
                       :
                    ''
                ))
                :
                ''
            )
            )}
            {/* {documents && documents.map((user:any) => (
                <div key={user.id} className="user-list-item">
                    {user.online && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))} */}

        </div>
    )
}

export default OnlineUsers;