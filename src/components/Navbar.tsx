import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

//styles and images
import './Navbar.css';
import Temple from '../assets/temple.svg';
import Hub from '../assets/thehublogo.png';

const Navbar = () =>{
    const {logout, isPending} = useLogout();
    const {user}:any = useAuthContext();
    return(
        <div className='navbar'>
            <ul>
                <li className="logo">
                    <img src={Hub} alt="hub logo" />
                    <span>The Hub</span>
                </li>
                {!user &&
                <>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Sign Up</Link></li>
                </>
                }
                {user && (
                    <li>
                        {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                        {isPending && <button className='btn' disabled>Logging out...</button>}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Navbar;