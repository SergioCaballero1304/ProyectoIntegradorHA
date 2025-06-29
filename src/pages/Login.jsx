import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(loginStart());

        try {
            const response = await axios.post('https://ha-videoclub-api-g1.vercel.app/tokens', {
                email: formData.email,
                password: formData.password,
            });

            if (!response.data.token) {
                throw new Error(response.data.message);
            }

            dispatch(
                loginSuccess({
                    token: response.data.token,
                    user: {
                        id: response.data.userId,
                        email: formData.email,
                    },
                })
            );

            navigate('/home');
        } catch (error) {
            dispatch(loginFailure(error.response?.data?.message || 'Error al iniciar sesión'));
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <div className="login-container">
            <h1>Ingresa tu usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Correo electrónico:
                        <br />
                        <input
                            type="text"
                            placeholder="customer@server.com"
                            value={formData.email}
                            onChange={(event) => handleInputChange('email', event.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Contraseña:
                        <br />
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(event) => handleInputChange('password', event.target.value)}
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Iniciando' : 'Iniciar Sesión'}
                </button>
                <p>
                    ¿No tienes cuenta? <Link to="/register">Registrate aquí.</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
