//styles
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from './Avatar';
import './ProjectList.css'

const GroupList = ({groups, user}:any) =>{

    return(
        <div className='project-list'>
            {groups.map((group:any)=>(
                (user.uid === group.createdBy.id || user.uid === group.usersInGroup.id?.find((f:any)=> f.includes(user.uid))) ?
                (
                    <Link to={`/groups/${group.id}`} key={group.id}>
                        <h4>{group.name}</h4>
                        <div className="assigned-to">
                            <ul>
                            <li>
                                <p>Created by:</p>
                                <Avatar src={group.createdBy.photoURL} />
                                <p>{group.createdBy.displaName}</p>
                            </li>
                            </ul>
                        </div>
                    </Link>
                ) 
                :
                ''
            ))}
        </div>
    )
}

export default GroupList;