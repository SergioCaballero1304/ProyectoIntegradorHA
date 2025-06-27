import { Link } from 'react-router';
import CartButton from './CartButton';
import '../App.css';

function Nav() {
    return (
        <header>
            <nav>
                <div className="brand">
                    <Link to="/home" className="home">
                        VIDEO<span>CLUB</span>
                    </Link>
                </div>
                <div className="pages">
                    <Link to="/home" className="home">
                        Home
                    </Link>
                    <Link to="/about" className="about">
                        Sobre este proyecto
                    </Link>
                    <CartButton />
                </div>
            </nav>
        </header>
    );
}

export default Nav;
