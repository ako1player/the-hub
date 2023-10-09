import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectList from '../../components/ProjectList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useDocument } from '../../hooks/useDocument';
//styles
import './Dashboard.css'
import ProjectFilter from './ProjectFilter';

const Dashboard = () =>{
    const {user}: any = useAuthContext();
    const {id} = useParams();
    // const { document, error:errorDocument}:any = useDocument('groups', id);
    const {documents, error} = useCollection('projects',['groupId', "==", id ],null);
    const [currentFilter, setCurrentFilter] = useState('all');

    const changeFilter = (newFilter:any) =>{
        setCurrentFilter(newFilter);
    }

    const projects = documents ? documents.filter((document:any) =>{
        switch(currentFilter){
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false;
                document.assignedUsersList.forEach((u:any) =>{
                    if(user.uid === u.id){
                        assignedToMe = true;
                    }
                })
                return assignedToMe;
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                console.log(document.category, currentFilter)
                return document.category === currentFilter
            default:
                return true
        }
    }) : null;
    
    return(
        <div>
            {error && <p className='error'>{error}</p>}
            {documents && (
                <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>
            )}
            {projects && <ProjectList projects={projects} />}
        </div>
    )
}

export default Dashboard;