import React from 'react';

const MovieCard = ({ movie, onDelete, onEdit }) => {
    return (
        <div className="movie-card">
            <img src={movie.posterURL} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Rating: {movie.rating}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default MovieCard;
