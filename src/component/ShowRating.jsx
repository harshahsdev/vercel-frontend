import { useState } from "react";
import RatingInput from "../pages/RatingInput.jsx";

export function ShowRating({ rating }) {
  return (
    <div className="text-yellow-400 text-lg">
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </div>
  );
}