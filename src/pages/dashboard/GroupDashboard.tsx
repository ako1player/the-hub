import { useState } from 'react';
import { useParams } from 'react-router-dom';
import GroupList from '../../components/GroupList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useDocument } from '../../hooks/useDocument';
//styles
import './Dashboard.css'

const GroupDashboard = () =>{
    const {user}:any = useAuthContext();
    const {documents, error}:any = useCollection('groups',null,null);
    
    return(
        <div>
            <h2 className="page-title">My Groups</h2>
            {error && <p className='error'>{error}</p>}
            {documents && <GroupList groups={documents} user={user}/>}
        </div>
    )
}

export default GroupDashboard;