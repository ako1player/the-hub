import { NavLink } from 'react-router-dom';
//styles
import './Sidebar.css';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

const Sidebar = () =>{
    const {user}:any = useAuthContext();
    const [toggle, setToggle] =useState(false);

    const handleToggle = () =>{
        setToggle(true);
    }
    return(
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    <Avatar src={user.photoURL} />
                    <p>Hey {user.displayName}</p>
                    {!toggle ? 
                    <button className='btn' onClick={handleToggle}>Show User ID</button>
                    :
                        <h6>{user.uid}</h6>
                    }
                    {toggle && <button className='btn' onClick={()=>setToggle(false)}>Hide</button>}
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink to='/'>
                                <img src={DashboardIcon} alt="dashboard icon"/>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt="add icon"/>
                                <span>Create a new group</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar;