import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Nav from '../components/Nav';
import axios from 'axios';

function EditProfile() {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
                    console.log(response.data);
                    setUserData(response.data);
                    setFormData({
                        firstName: response.data.firstName || '',
                        lastName: response.data.lastName || '',
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

    return (
        <>
            <Nav />
            <div className="profile-body">
                <div className="my-profile">
                    <h1>Mi perfil</h1>
                    <div className="form-container">
                        <form>
                            <div className="form-name">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-lastName">
                                <label>Apellido</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-email">
                                <label>Correo electrónico</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={userData.email}
                                />
                            </div>
                            <div className="form-address">
                                <label>Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder={userData.address}
                                />
                            </div>
                            <div className="form-phone">
                                <label>Teléfono</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder={userData.phone}
                                />
                            </div>
                        </form>
                        {toggle && (
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese nueva contraseña"
                                />
                            </div>
                        )}
                        <button onClick={handleToggleDiv}>
                            {toggle ? 'No cambiar contraseña' : 'Cambiar contraseña'}
                        </button>
                    </div>
                    <button onClick={handleSave}>Guardar cambios</button>
                    <button onClick={handleCancel}>Cancelar y volver</button>
                    <button>Borrar usuario</button>
                </div>
            </div>
        </>
    );
}

export default EditProfile;
