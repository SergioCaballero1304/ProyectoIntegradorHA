import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Nav from '../components/Nav';

function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}`)
            .then((response) => {
                setMovies(response.data.results);
            });
    }, []);

    return (
        <>
            <main>
                <Nav />
                <section className="home-section">
                    <div className="search">
                        <i className="bi bi-search movie-icon"></i>
                        <input type="text" placeholder="¿Que te gustaría ver?" />
                    </div>
                </section>
                <div className="cards">
                    {movies.map((movie) => {
                        return (
                            <div className="movies" key={movie.id}>
                                <Link to={`/detail/` + movie.id} key={movie.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </main>
            <footer>Sergio Caballero, 2025</footer>
        </>
    );
}

export default Home;
