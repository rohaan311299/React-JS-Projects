import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./row.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
    // State
    const [movies, setMovies]=useState([]);

    // a snippet of code which runs based on a specific condition/variable
    useEffect(()=>{
        //when the row loads it will feed info
        //if [], run once when row loads and dont run it again
        async function fetchData(){
            const request=await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    // console.log(movies);

    return (
        <div className="row">
            {/* Title */}
            <h2>{title}</h2>
            <div className="row_posters">
                {/* several row_poster(s) */}
                {movies.map((movie)=>{
                    return (
                        <img
                            key={movie.id}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name} 
                            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        />
                    );
                })}
            </div>

            {/* container -> posters */}

            
        </div>
    );
}

export default Row;
