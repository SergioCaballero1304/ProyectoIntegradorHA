import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import MovieDetail from './pages/MovieDetail';
import './App.css';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/detail/:id" element={<MovieDetail />} />
            </Routes>
        </>
    );
}

export default App;
