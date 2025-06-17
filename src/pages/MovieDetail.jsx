import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import '../App.css';

function MovieDetail() {
    const [movieDetail, setMovieDetail] = useState({});
    const params = useParams();

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${import.meta.env.VITE_API_KEY}`)
            .then((response) => {
                setMovieDetail(response.data);
                console.log(response.data);
            });
    }, []);

    return (
        <>
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
                        <span>Date: {movieDetail.release_date} | </span>
                        <span>Language: {movieDetail.original_language?.toUpperCase()} | </span>
                        <span>Rating: {movieDetail.vote_average}</span>
                        <p>{movieDetail.overview}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieDetail;
