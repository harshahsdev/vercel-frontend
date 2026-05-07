import React from 'react';

export default function RatingInput({ rating, onChange }) {
  return (
    <div className='flex gap-2 text-2xl cursor-pointer'>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}