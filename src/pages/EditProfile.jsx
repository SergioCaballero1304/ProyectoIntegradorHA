import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../store/authSlice';
import Nav from '../components/Nav';
import axios from 'axios';
import '../App.css';
import { clearCart } from '../store/cartSlice';

function EditProfile() {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phone: '',
        password: '',
    });

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
                    setFormData({
                        firstname: response.data.firstname || '',
                        lastname: response.data.lastname || '',
                        email: response.data.email || '',
                        address: response.data.address || '',
                        phone: response.data.phone || '',
                        password: response.data.password || '',
                    });
                });
        }
    }, [user, token]);

    const [toggle, setToggle] = useState(false);

    const handleToggleDiv = () => {
        setToggle((prevState) => !prevState);
    };

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/profile');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const dataToSend = { ...formData };
            if (!toggle || !formData.password) {
                delete dataToSend.password;
            }
            await axios.patch(`https://ha-videoclub-api-g1.vercel.app/users/${user.id}`, dataToSend, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/profile');
        } catch (error) {
            alert('Error al actualizar los datos');
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const handleopenModal = () => {
        setIsOpen(true);
    };

    const handlecloseModal = () => {
        setIsOpen(false);
    };

    const handleYes = async () => {
        try {
            await axios.delete(`https://ha-videoclub-api-g1.vercel.app/users/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(logout());
            dispatch(clearCart());
            navigate('/');
        } catch (error) {
            alert('Error al borrar el usuario');
        }
    };
    return (
        <>
            <Nav />
            <div className="profile-body">
                <div className="my-profile">
                    <h1>Mi perfil</h1>
                    <div className="edit-form-container">
                        <form>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Correo electrónico</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={userData.email}
                                />
                            </div>
                            <div className="form-group">
                                <label>Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder={userData.address}
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder={userData.phone}
                                />
                            </div>
                            {toggle && (
                                <div className="form-group">
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese nueva contraseña"
                                    />
                                </div>
                            )}
                        </form>
                        <button
                            onClick={handleToggleDiv}
                            className={`password-btn${toggle ? ' password-btn-cancel' : ''}`}
                        >
                            {toggle ? 'No cambiar contraseña' : 'Cambiar contraseña'}
                        </button>
                    </div>
                    <button onClick={handleSave} className="save-btn">
                        Guardar cambios
                    </button>
                    <button onClick={handleCancel} className="cancel-btn">
                        Cancelar y volver
                    </button>
                    <button onClick={handleopenModal} className="delete-btn">
                        Borrar usuario
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="modal-overlay" onClick={handlecloseModal}>
                    <div className="modal-content">
                        <p>¿Deseas borrar tu usuario?</p>
                        <div>
                            <button onClick={handleYes} className="yes-btn">
                                Borrar
                            </button>
                            <button onClick={handlecloseModal} className="no-btn">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditProfile;
