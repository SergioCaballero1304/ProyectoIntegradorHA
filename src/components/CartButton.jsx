import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';
import { useNavigate } from 'react-router';
import { clearCart } from '../store/cartSlice';
import '../App.css';

function CartButton() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openOffCanvas = () => {
        setIsOpen(!isOpen);
    };

    const closeOffCanvas = () => {
        setIsOpen(false);
    };

    const handleToOrders = () => {
        if (!user) {
            dispatch(clearCart());
            navigate('/login');
        } else {
            navigate('/orders');
        }
    };

    const cart = useSelector((state) => state.cart.items);

    return (
        <>
            <i className="bi bi-cart cart-icon" onClick={openOffCanvas}>
                <span className="cart-number">{cart.reduce((total, movie) => total + (movie.quantity || 1), 0)}</span>
            </i>
            <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={closeOffCanvas} />
            <div className={`offcanvas ${isOpen ? 'show' : ''}`}>
                <div className="close-cart">
                    <i
                        className="bi bi-x-lg close-cart-icon"
                        onClick={closeOffCanvas}
                        style={{ cursor: 'pointer' }}
                    ></i>
                </div>
                <div className="cart-title">
                    <h1>Carrito ({cart.reduce((total, movie) => total + (movie.quantity || 1), 0)} item)</h1>
                </div>
                <hr />

                <div className="cart-item">
                    {cart.length === 0 ? (
                        <p className="empty-cart">El carrito está vacío.</p>
                    ) : (
                        <ul>
                            {cart.map((movie) => (
                                <li key={movie.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                        className="cart-movie-img"
                                    />
                                    <div className="cart-item-info">
                                        <div className="cart-movie-name">{movie.title}</div>
                                        <div className="cart-item-details">
                                            <p>
                                                Precio: $
                                                {movie.vote_average
                                                    ? (movie.vote_average * 30 * movie.quantity).toFixed(0)
                                                    : 0}{' '}
                                                Cantidad: {movie.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <i
                                        className="bi bi-trash cart-trash"
                                        onClick={() => dispatch(removeFromCart(movie.id))}
                                    ></i>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <hr />
                <div className="total-price">
                    <p>
                        Total: $
                        {cart
                            .reduce(
                                (total, movie) =>
                                    total + (movie.vote_average ? movie.vote_average * 30 : 0) * (movie.quantity || 1),
                                0
                            )
                            .toFixed(0)}
                    </p>
                </div>
                {cart.length === 0 ? (
                    ''
                ) : (
                    <button onClick={handleToOrders} className="cart-btn">
                        Continuar al pago
                    </button>
                )}
            </div>
        </>
    );
}

export default CartButton;
