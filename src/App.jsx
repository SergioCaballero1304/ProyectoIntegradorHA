import { Routes, Route, Link } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';

function App() {
    return (
        <>
            <header>
                <nav>
                    <Link to="/home" className="home">
                        Home
                    </Link>
                    <Link to="/about" className="about">
                        Sobre este proyecto
                    </Link>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>

            <footer>Sergio Caballero, 2025</footer>
        </>
    );
}

export default App;
