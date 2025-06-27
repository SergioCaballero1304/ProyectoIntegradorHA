import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';
import '../App.css';

function CartButton() {
    const [isOpen, setIsOpen] = useState(false);

    const openOffCanvas = () => {
        setIsOpen(!isOpen);
    };

    const closeOffCanvas = () => {
        setIsOpen(false);
    };

    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    return (
        <>
            <i className="bi bi-cart cart-icon" onClick={openOffCanvas}>
                <span className="cart-number">{cart.reduce((total, movie) => total + (movie.quantity || 1), 0)}</span>
            </i>
            <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={closeOffCanvas} />
            <div className={`offcanvas ${isOpen ? 'show' : ''}`}>
                <h1>Carrito ({cart.reduce((total, movie) => total + (movie.quantity || 1), 0)} item)</h1>
                <div className="cart-item">
                    {cart.length === 0 ? (
                        <p>El carrito está vacío</p>
                    ) : (
                        cart.map((movie) => (
                            <div key={movie.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="cart-movie-img"
                                />
                                <h2>{movie.title}</h2>
                                <p>
                                    Precio: ${movie.vote_average ? (movie.vote_average * 30).toFixed(0) : 0} Cantidad:{' '}
                                    {movie.quantity}
                                </p>
                                <i
                                    className="bi bi-trash"
                                    onClick={() => dispatch(removeFromCart(movie.id))}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                                <hr />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default CartButton;
