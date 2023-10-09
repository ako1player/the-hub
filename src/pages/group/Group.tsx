import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import { useCollection } from '../../hooks/useCollection';
import GroupList from '../../components/GroupList';
import Modal from '../../components/Modal';
import { useState } from 'react';
import Create from '../create/Create';
import ProjectList from '../../components/ProjectList';
import Dashboard from '../dashboard/Dashboard';
import OnlineUsers from '../../components/OnlineUsers';
import AddUserToGroup from './AddUserToGroup';

const Group = () =>{
    const [toggleModal, setToggleModal] = useState(true);
    const [toggleModalUser, setToggleModalUser] = useState(true);

    const {id} = useParams();
    const { document, error}:any = useDocument('groups', id);
    
    const handleClose = () =>{
        setToggleModal(true);
        setToggleModalUser(true);
      }

    if(error){
        return <div className='error'>{error}</div>
    }
    if(!document){
        return <div className='loading'>Loading...</div>
    }

    return(
        <div className='project-details'>
            <h2 className="page-title">{document.name}</h2>
            <div>
            <button className='btn' onClick={() => setToggleModal(!toggleModal)}>Create A New Project</button>
            <button className='btn' onClick={() => setToggleModalUser(!toggleModalUser)}>Add A User To The Group</button>
            </div>
            <Dashboard />
            <OnlineUsers />
            {!toggleModal &&
                <Modal handleClose={handleClose}>
                    <Create id={id} />
                </Modal>
            }
            {!toggleModalUser &&
                <Modal handleClose={handleClose}>
                    <AddUserToGroup docId={document}/>
                </Modal>
            }
        </div>
    )
}

export default Group;