// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api/api";
// import Review from "../pages/Review.jsx";
// import { ShowRating } from "../component/ShowRating.jsx";

// export default function BusinessDetails() {
//   const { slug } = useParams();

//   const [business, setBusiness] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [avg, setAvg] = useState(0);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await API.get(`/business/${slug}`);
//       setBusiness(res.data);

//       const rev = await API.get(`/review/business/${res.data._id}`);
//       setReviews(rev.data);

//       const avgRes = await API.get(`/review/business/${res.data._id}/average`);
//       setAvg(avgRes.data.averageRating);
//       setTotal(avgRes.data.totalReviews);
//     };

//     fetchData();
//   }, [slug]);

//   if (!business) return <p>Loading...</p>;

//   return (
//     <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">

//       {/* LEFT */}
//       <div className="md:col-span-2">

//         <h1 className="text-2xl font-bold">{business.name}</h1>

//         <ShowRating rating={avg} />
//         <p className="text-sm text-gray-500">({total} reviews)</p>

//         <img
//           src={business.images?.[0]}
//           alt={business.name}
//           className="w-full h-60 object-cover rounded my-4"
//         />

//         {business.description && (
//           <p className="text-gray-600 mb-4">{business.description}</p>
//         )}

//         <p><strong>Address:</strong> {business.location}</p>
//         <p><strong>Phone:</strong> {business.phone}</p>

//         <div className="mt-6">
//           <Review businessId={business._id} />
//         </div>

//         <h3 className="text-xl font-semibold mt-6 mb-3">Reviews</h3>

//         {reviews.length === 0 && <p>No reviews yet</p>}

//         {reviews.map((r) => (
//           <div key={r._id} className="border-b py-3">
//             <p className="font-semibold">{r.userId?.name}</p>

//             <div className="text-yellow-400">
//               {"★".repeat(r.rating)}
//               {"☆".repeat(5 - r.rating)}
//             </div>

//             <p className="text-gray-600">{r.comment}</p>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT */}
//       <div className="bg-white shadow-md p-5 rounded-xl h-fit">

//         <h3 className="text-xl font-semibold mb-3">Contact</h3>

//         <button className="text-blue-500 mb-4">
//           📞 {business.phone}
//         </button>

//         <hr />

//         <h4 className="mt-4 font-semibold">Address</h4>
//         <p className="text-gray-600 text-sm">
//           {business.location}
//         </p>

//       </div>

//     </div>
//   );
// }