import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Home from './pages/Home';
import './App.css';

function App() {
    return (
        <>
            <Nav />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
