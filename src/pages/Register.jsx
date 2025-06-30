import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                'https://ha-videoclub-api-g1.vercel.app/users',
                {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    address: formData.address,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success('Cuenta creada correctamente.', {
                position: 'top-center',
                autoClose: 2000,
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <div className="register-container">
            <h1>Ingresa tus datos</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Juan"
                        value={formData.firstname}
                        onChange={(event) => handleInputChange('firstname', event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Pérez"
                        value={formData.lastname}
                        onChange={(event) => handleInputChange('lastname', event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Dirección</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Calle 123"
                        value={formData.address}
                        onChange={(event) => handleInputChange('address', event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="091234567"
                        value={formData.phone}
                        onChange={(event) => handleInputChange('phone', event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        id="registerEmail"
                        name="email"
                        placeholder="customer@server.com"
                        value={formData.email}
                        onChange={(event) => handleInputChange('email', event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        id="registerPassword"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(event) => handleInputChange('password', event.target.value)}
                        required
                    />
                </div>
                <button type="submit" onSubmit={handleSubmit}>
                    Crear Cuenta
                </button>
            </form>
            <p>
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="login-link">
                    Inicia sesión aquí
                </Link>
            </p>
        </div>
    );
}

export default Register;
