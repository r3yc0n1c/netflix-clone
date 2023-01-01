import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import "./Row.css";
import movieTrailer from 'movie-trailer';

const baseURL = process.env.REACT_APP_MOVIEDB_IMAGE_CDN;

const Row = ({ title, fetchURL, isLarge }) => {
    const [movies, setMovies] = useState([])
    const [trailerURL, setTrailerURL] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(fetchURL);
            // console.log(response.data.results);
            setMovies(response.data.results);
            return response;
        };

        fetchData();
    }, [fetchURL]);

    // console.log(movies);
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        if (trailerURL) {
            setTrailerURL('')
        } else {
            /* // Clever programmer
            movieTrailer(movie?.name || "")
            .then(url=>{
                // console.log('url-',url);
                const urlParams = new URLSearchParams(new URL(url).search)
                // console.log(urlParams);
                setTrailerURL(urlParams.get('v'))
            })
            .catch(err => console.log(err))
            */

            //
            console.log(movie);
            movieTrailer(null, { tmdbId: movie.id })
                .then((url) => {
                    console.log("url is " + url);
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log("urlParamsn" + urlParams);
                    setTrailerURL(urlParams.get("v"));
                })
                .catch((error) => {
                    console.log(error)
                    setTrailerURL('')
                })
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row__posters'>
                {movies.map(movie => {
                    return <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLarge && "row__posterLarge"}`}
                        src={`${baseURL}${isLarge ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                })}
            </div>
            {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
        </div>
    )
}

export default Row