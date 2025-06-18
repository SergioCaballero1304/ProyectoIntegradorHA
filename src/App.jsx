import { Routes, Route, Link } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import MovieDetail from './pages/MovieDetail';
import './App.css';

function App() {
    return (
        <>
            <header>
                <nav>
                    <div className="brand">
                        VIDEO<span>CLUB</span>
                    </div>
                    <div className="pages">
                        <Link to="/home" className="home">
                            Home
                        </Link>
                        <Link to="/about" className="about">
                            Sobre este proyecto
                        </Link>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:id" element={<MovieDetail />} />
            </Routes>
        </>
    );
}

export default App;
