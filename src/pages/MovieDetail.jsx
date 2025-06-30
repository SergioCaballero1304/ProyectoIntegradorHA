import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Nav from '../components/Nav';
import axios from 'axios';
import '../App.css';
import { toast } from 'react-toastify';

function MovieDetail() {
    const [movieDetail, setMovieDetail] = useState({});
    const [movieTeaser, setMovieTeaser] = useState({});
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${import.meta.env.VITE_API_KEY}`)
            .then((response) => {
                setMovieDetail(response.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${import.meta.env.VITE_API_KEY}`)
            .then((response) => {
                if (response.data.results && response.data.results.length > 0) {
                    setMovieTeaser(response.data.results[0]);
                }
            });
    }, []);

    const handleAddToCart = () => {
        dispatch(addToCart(movieDetail));
        toast.success(`${movieDetail.title} se agregó al carrito`, {
            position: 'top-center',
            autoClose: 2000,
        });
    };

    return (
        <>
            <Nav />
            <div className="movie-detail">
                <div
                    className="movie-detail-image"
                    style={
                        movieDetail.backdrop_path
                            ? {
                                  background: `linear-gradient(80deg, rgba(0, 0, 0, 0.88) 45%, rgba(0, 0, 0, 0) 90%), url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
                                  backgroundSize: 'cover',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: '0% 0%',
                              }
                            : {}
                    }
                >
                    <div className="movie-detail-info">
                        <h1>{movieDetail.title}</h1>
                        <div className="movie-span">
                            <span>Date: {movieDetail.release_date}</span>
                            <span> | </span>
                            <span>Language: {movieDetail.original_language?.toUpperCase()}</span>
                            <span> | </span>
                            <span>
                                Rating:{' '}
                                {movieDetail.vote_average !== undefined ? movieDetail.vote_average.toFixed(1) : ''}
                            </span>
                        </div>
                        <p>{movieDetail.overview}</p>
                        <div className="movie-icons">
                            <a
                                href={`https://www.youtube.com/embed/${movieTeaser.key}`}
                                style={{ color: 'white' }}
                                title="Ver tráiler"
                            >
                                <i className="bi bi-film icons"></i>
                            </a>
                            <i
                                className="bi bi-play-circle-fill icons"
                                title="Reproducir película"
                                style={{ cursor: 'pointer' }}
                            ></i>
                            <i
                                className="bi bi-cart-plus-fill icons"
                                onClick={handleAddToCart}
                                title="Agregar al carrito"
                                style={{ cursor: 'pointer' }}
                            ></i>
                            <span className="movie-price">{`$${(movieDetail.vote_average * 30).toFixed(0)}`}</span>
                        </div>
                        <div className="movie-teaser">
                            <iframe
                                src={`https://www.youtube.com/embed/${movieTeaser.key}`}
                                title={movieTeaser.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieDetail;
