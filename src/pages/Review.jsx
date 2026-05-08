import React from 'react'
import { useState } from 'react';
import API from '../api/api';
import RatingInput from './RatingInput';

export default function Review({ businessId }) {
    const [rating, setrating] = useState(0);
    const [comment, setcomment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating) {
            alert("please select rating");
            return;
        }

        try {
            await API.post("/api/review/create", {
                businessId,
                rating,
                comment
            });
            alert("Review added successfully");
            setrating(0);
            setcomment("");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                error.response?.data?.Message ||
                "Failed to submit review. Please try again."
            );
            console.error("Review submission error:", error);
        }
    }
    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <RatingInput rating={rating} onChange={setrating} />

            <textarea placeholder='write your review...'
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                className='w-full border p-2 rounded'
            />
            <button 
            disabled={!rating}
            className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit Review
            </button>
        </form>

    )
}

