import { Routes, Route, Navigate } from 'react-router-dom';
import {Toaster} from "react-hot-toast"
import HomePage from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import './App.css';
import { useAuthContext } from './contexts/authcontexts';

function App() {
  const {authUser}=useAuthContext()
  return (
    
    
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authUser?<Navigate to="/"/> : <SignUp/>} />
        </Routes>
   <Toaster/>
      </div>
  );
}

export default App;


