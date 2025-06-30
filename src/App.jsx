import { Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Orders from './pages/Orders';
import MovieDetail from './pages/MovieDetail';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/detail/:id" element={<MovieDetail />} />
            </Routes>
            <ToastContainer theme="dark" />
        </>
    );
}

export default App;
