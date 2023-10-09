import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OnlineUsers from './components/OnlineUsers';
import NewGroup from './pages/create/NewGroup';
import Group from './pages/group/Group';
import GroupDashboard from './pages/dashboard/GroupDashboard';
import Room from './pages/agora/Room';

function App() {
  const {user, authIsReady}:any = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
        {user && <Sidebar /> }
          <div className="container">
          <Navbar />
            <Routes>
              <Route path='/' element={user ? <GroupDashboard /> : <Navigate to='/login' />}/>
              <Route path='/create' element={user ? <NewGroup /> : <Navigate to='/login' />}/>
              <Route path='/login' element={user ? <Navigate to='/' /> : <Login />}/>
              <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />}/>
              <Route path='/agora' element={<Room />} />
              <Route path='/projects/:id' element={user ? <Project /> : <Navigate to='/login' />}/>
              <Route path='/groups/:id' element={user ? <Group /> : <Navigate to='/login' />}/>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
