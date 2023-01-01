import React, { useEffect, useState } from 'react'
import axios from './axios';
import requests from './Requests';
import './Banner.css';

const getRandInt = max => {
    // returns random integer in [0, max)
    return Math.floor(Math.random() * max);
}

const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

const Banner = () => {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(requests.fetchNetflixOriginals);
            const i = getRandInt(response.data.results.length);
            console.log(response.data.results[i]);
            setMovie(response.data.results[i]);
            return response;
        };
        fetchData();
    }, []);

    console.log(movie);

    return (
        <header className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                    )`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner--fadeTop" />

            <div className="banner__contents">
                <h1>{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            {/* <div className="banner--fadeBottom" /> */}
        </header>
    )
}

export default Banner