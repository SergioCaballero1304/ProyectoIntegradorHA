import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Nav from '../components/Nav';
import axios from 'axios';

function Profile() {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [userData, setUserData] = useState([]);

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

    const navigate = useNavigate();

    const toEditProfile = () => {
        navigate('/profile/edit');
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
                                <input type="text" readOnly />
                            </div>
                            <div className="form-lastName">
                                <label>Apellido</label>
                                <input type="text" readOnly />
                            </div>
                            <div className="form-email">
                                <label>Correo electrónico</label>
                                <input type="text" placeholder={userData.email} readOnly />
                            </div>
                            <div className="form-address">
                                <label>Dirección</label>
                                <input type="text" placeholder={userData.address} readOnly />
                            </div>
                            <div className="form-phone">
                                <label>Teléfono</label>
                                <input type="text" placeholder={userData.phone} readOnly />
                            </div>
                        </form>
                    </div>
                    <div>
                        <button onClick={toEditProfile}>Editar mis datos</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
