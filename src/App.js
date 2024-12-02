import React, { useState } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';

const App = () => {
  const [movies, setMovies] = useState([
    {
      title: 'The Exorcist',
      description: 'A young girl becomes possessed by a mysterious entity, and her mother seeks the help of two priests to save her.',
      posterURL: 'https://miro.medium.com/v2/resize:fit:2000/1*bCqeFW802tlo4ObTKiWW6A.png', // Replace with a real URL
      rating: 9.0, // Highest rating
    },
    {
      title: 'Hell Hole',
      description: 'A group of friends discovers a portal to another world where they must fight for their survival.',
      posterURL: 'https://decider.com/wp-content/uploads/2024/08/HELL-HOLE-2024-SHUDDER-MOVIE-REVIEW.jpg?quality=75&strip=all', // Replace with a real URL
      rating: 7.5, // Second highest rating
    },
    {
      title: 'Smile 1',
      description: 'A young woman discovers a terrifying secret that leads her to confront her deepest fears.',
      posterURL: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/09/Smile-header.jpg', // Replace with a real URL
      rating: 5.0, // Lower rating
    },
    {
      title: 'Smile 2',
      description: 'The sequel continues the chilling story as new horrors emerge to haunt the protagonist.',
      posterURL: 'https://i.ytimg.com/vi/wdDNUVJ7m0w/maxresdefault.jpg', // Replace with a real URL
      rating: 5.0, // Same as Smile 1
    },
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: '',
  });
  const [editingIndex, setEditingIndex] = useState(null); // Track which movie is being edited

  const addMovie = (movie) => {
    setMovies([...movies, movie]);
    setFilteredMovies([...movies, movie]); // Update filtered movies to include the new movie
  };

  const updateMovie = (index, updatedMovie) => {
    const updatedMovies = movies.map((movie, i) => (i === index ? updatedMovie : movie));
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies); // Update filtered movies to include the edited movie
  };

  const deleteMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies); // Update filtered movies after deletion
  };

  const filterMovies = ({ title, rating }) => {
    const filtered = movies.filter((movie) => {
      return (
        (title ? movie.title.toLowerCase().includes(title.toLowerCase()) : true) &&
        (rating ? movie.rating >= rating : true)
      );
    });
    setFilteredMovies(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!newMovie.title || !newMovie.description || !newMovie.posterURL || !newMovie.rating) {
      alert('Please fill in all fields.');
      return;
    }

    if (newMovie.rating < 0 || newMovie.rating > 10) {
      alert('Rating must be between 0 and 10.');
      return;
    }

    // If editing an existing movie
    if (editingIndex !== null) {
      updateMovie(editingIndex, {
        ...newMovie,
        rating: parseFloat(newMovie.rating), // Ensure rating is a number
      });
      alert('Movie updated successfully!');
      setEditingIndex(null); // Reset editing index
    } else {
      // Add the new movie
      addMovie({
        ...newMovie,
        rating: parseFloat(newMovie.rating), // Ensure rating is a number
      });
      alert('Movie added successfully!'); // Feedback for the user
    }

    setNewMovie({ title: '', description: '', posterURL: '', rating: '' }); // Reset form fields
  };

  const handleEdit = (index) => {
    setNewMovie(movies[index]); // Set movie data in form for editing
    setEditingIndex(index); // Set the index of the movie being edited
  };

  return (
    <div className="app">
      <h1>Movie App</h1>
      <Filter onFilter={filterMovies} />
      <MovieList movies={filteredMovies} onDelete={deleteMovie} onEdit={handleEdit} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newMovie.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newMovie.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="posterURL"
          placeholder="Poster URL"
          value={newMovie.posterURL}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={newMovie.rating}
          onChange={handleChange}
          required
          min="0"
          max="10"
        />
        <button type="submit">{editingIndex !== null ? 'Update Movie' : 'Add Movie'}</button>
      </form>
    </div>
  );
};

export default App;
