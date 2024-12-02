import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onDelete, onEdit }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard 
          key={index}
          movie={movie}
          onDelete={() => onDelete(index)} // Pass index to delete
          onEdit={() => onEdit(index)} // Pass index to edit
        />
      ))}
    </div>
  );
};

export default MovieList;
