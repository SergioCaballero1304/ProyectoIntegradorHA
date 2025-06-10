import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import './App.css';

function App() {
    return (
        <>
            <Nav />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;
