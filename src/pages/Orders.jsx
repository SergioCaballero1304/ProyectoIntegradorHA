import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import '../App.css';
import { clearCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

function Orders() {
    const cart = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.id && token) {
            axios
                .get(`https://ha-videoclub-api-g1.vercel.app/users/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUserData(response.data);
                });
        }
    }, [user, token]);

    const orderData = cart.map((item) => ({
        movie_id: item.id,
        title: item.title,
        qty: item.quantity,
    }));

    const handleCreateOrder = async () => {
        setLoading(true);
        try {
            await axios.post(
                'https://ha-videoclub-api-g1.vercel.app/orders',
                {
                    type: 'movie',
                    items: orderData,
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    address: userData.address,
                    phone: userData.phone,
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(clearCart());
            toast.success('Compra realizada con éxito.', {
                position: 'top-center',
                autoClose: 2000,
            });
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />

            <div className="profile-body">
                <div className="my-profile">
                    <h1>Ya casi es tuyo!</h1>
                    <div className="form-container">
                        <form>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" placeholder={userData.firstname} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Apellido</label>
                                <input type="text" placeholder={userData.lastname} readOnly />
                            </div>

                            <div className="form-group">
                                <label>Dirección</label>
                                <input type="text" placeholder={userData.address} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input type="text" placeholder={userData.phone} readOnly />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="orders-items-lists">
                    <ul>
                        {cart && cart.length > 0 ? (
                            cart.map((item) => (
                                <li key={item.id} className="order-item-li">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        alt={item.title}
                                        className="order-movie-img"
                                    />
                                    <div className="confirm-item-info">
                                        <div className="cart-movie name">{item.title}</div>
                                        <div className="cart-item-details">
                                            <span>
                                                Precio: $
                                                {item.vote_average
                                                    ? (item.vote_average * 30 * item.quantity).toFixed(0)
                                                    : 0}
                                            </span>
                                            <span>Cantidad: {item.quantity}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="empty-order-list">No hay items en el carrito.</p>
                        )}
                    </ul>
                    <p className="total-price">
                        Total: $
                        {cart
                            .reduce(
                                (total, item) =>
                                    total + (item.vote_average ? item.vote_average * 30 : 0) * (item.quantity || 1),
                                0
                            )
                            .toFixed(0)}
                    </p>
                    <button
                        className="save-btn"
                        onClick={handleCreateOrder}
                        disabled={loading}
                        style={{ width: '100%', marginTop: '20px' }}
                    >
                        {loading ? 'Procesando...' : 'Confirmar compra'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Orders;
