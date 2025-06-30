import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../store/authSlice';
import Nav from '../components/Nav';
import axios from 'axios';
import '../App.css';
import { clearCart } from '../store/cartSlice';

function Profile() {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [userData, setUserData] = useState([]);
    const [orders, setOrders] = useState([]);

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

            axios
                .get('https://ha-videoclub-api-g1.vercel.app/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const userOrders = Array.isArray(response.data)
                        ? response.data.filter((order) => order.userId === user.id)
                        : [];
                    setOrders(userOrders);
                });
        }
    }, [user, token]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toEditProfile = () => {
        navigate('/profile/edit');
    };

    const handleLogOut = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate('/');
    };

    return (
        <>
            <Nav />
            <div className="profile-body">
                <div className="my-profile">
                    <h1>Mi perfil</h1>
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
                                <label>Teléfono</label>
                                <input type="text" placeholder={userData.phone} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Dirección</label>
                                <input type="text" placeholder={userData.address} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Correo electrónico</label>
                                <input type="text" placeholder={userData.email} readOnly />
                            </div>
                        </form>
                    </div>
                    <div className="btns">
                        <button onClick={toEditProfile} className="edit-btn">
                            Editar mis datos
                        </button>
                        <button onClick={handleLogOut} className="logout-btn">
                            Cerrar sesión
                        </button>
                    </div>
                    <div className="orders-container">
                        <h2>Mis órdenes</h2>
                        <div className="orders-lists">
                            {orders.filter((order) => Array.isArray(order.items) && order.items.length > 0).length ===
                            0 ? (
                                <p className="empty-orders">Aún no tienes órdenes.</p>
                            ) : (
                                orders
                                    .filter((order) => Array.isArray(order.items) && order.items.length > 0)
                                    .map((order) => (
                                        <div key={order.id} className="order-item">
                                            <div className="order-item-info">
                                                <ul>
                                                    <strong>Usuario</strong>
                                                    <li>Fecha: {new Date(order.createdAt).toLocaleDateString()}</li>
                                                    <li>Orden: {order.id}</li>
                                                    <li>
                                                        Nombre: {order.firstname} {order.lastname}
                                                    </li>
                                                    <li>Dirección: {order.address}</li>
                                                    <li>Teléfono: {order.phone}</li>
                                                </ul>
                                                <ul>
                                                    <strong>Items</strong>
                                                    {Array.isArray(order.items) ? (
                                                        order.items.map((item) => (
                                                            <li key={item.movie_id}>
                                                                {item.title} (Cantidad: {item.qty})
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li>No hay items en esta orden.</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
