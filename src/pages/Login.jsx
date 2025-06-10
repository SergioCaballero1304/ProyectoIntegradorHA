import { Link } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://ha-videoclub-api-g1.vercel.app/tokens', {
                email: formData.email,
                password: formData.password,
            });
            response.data.token;
            //response.data.userId
            dispatch();
        } catch (error) {
            console.log(error);
        }
    };

    const dispatch = useDispatch();

    return (
        <div className="login-container">
            <h1>Ingresa tu usuario</h1>
            <form>
                <div className="form-group">
                    <label>
                        Correo:
                        <br />
                        <input type="text" placeholder="customer@server.com" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Contraseña:
                        <br />
                        <input type="password" placeholder="••••••••" />
                    </label>
                    <button type="submit" onSubmit={handleSubmit}>
                        Iniciar Sesión
                    </button>
                    <p>
                        ¿No tienes cuenta? <Link to="/register">Registrate aquí.</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
