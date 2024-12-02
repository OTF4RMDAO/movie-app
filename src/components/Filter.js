// src/components/Filter.js
import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const handleFilterChange = () => {
    onFilter({ title, rating: rating ? parseFloat(rating) : '' });
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          handleFilterChange();
        }}
      />
      <input
        type="number"
        placeholder="Filter by rating"
        value={rating}
        onChange={(e) => {
          setRating(e.target.value);
          handleFilterChange();
        }}
      />
    </div>
  );
};

export default Filter;
