import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import CartButton from './CartButton';
import '../App.css';

function Nav() {
    const user = useSelector((state) => state.auth.user);

    return (
        <header>
            <nav>
                <div className="brand">
                    <Link to="/" className="home">
                        VIDEO<span>CLUB</span>
                    </Link>
                </div>
                <div className="pages">
                    <Link to="/" className="home">
                        Home
                    </Link>
                    <Link to="/about" className="about">
                        Sobre este proyecto
                    </Link>
                    {user ? (
                        <Link to="/profile" className="profile">
                            Perfil
                        </Link>
                    ) : (
                        <Link className="profile" to="/login">
                            Iniciar sesión
                        </Link>
                    )}

                    <CartButton />
                </div>
            </nav>
        </header>
    );
}

export default Nav;
