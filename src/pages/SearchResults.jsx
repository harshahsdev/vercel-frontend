import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/api";
import { ShowRating } from "../component/ShowRating.jsx";
import Review from "../pages/Review.jsx";

export default function SearchResults() {
  const [business, setBusiness] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setreviews] = useState([]);
  const [avg, setavg] = useState(0);
  const [total, settotal] = useState(0);
  const [rating, setrating] = useState(0);


  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const handleDirections = ()=>{ 

    if(!business?.location) return; 

      const encodedLocation = encodeURIComponent(business.location); 

      const url = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`; 
      window.open(url, "_blank"); 

 } 

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/business/search?search=${query}`);
        const firstBusiness = res.data[0];
        
        if (!firstBusiness) {
          setBusiness(null);
          return;
        }
        
        setBusiness(firstBusiness);

        const rev = await API.get(`/review/business/${firstBusiness._id}`);
        setreviews(rev.data);

        const avgRes = await API.get(`/review/business/${firstBusiness._id}/average`);
        setavg(avgRes.data.averageRating);
        settotal(avgRes.data.totalReviews);
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };
    if (query) fetchData();
  }, [query]);

  if (!business) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="md:col-span-2">

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-4">
          {["overview", "photos", "services"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 ${activeTab === tab ? "border-blue-500 text-blue-500" : "border-transparent"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ❌ Removed banner here */}

        {/* Photos Section */}
        {activeTab === "photos" && (
          <>
            <h2 className="text-xl font-semibold mb-3">Photos</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {business.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-lg h-40 w-full object-cover"
                />
              ))}
            </div>
          </>
        )}

        {/* Overview */}
        {activeTab === "overview" && (
          <div>

            {/* About */}
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <h2 className="text-lg font-semibold mb-2">{business.name}</h2>
              <div className="flex-2xl items-center gap-2 mt-1">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">{business.averageRating?.toFixed(1)} ★ 
                </span>
                <span className="text gray-600 text-sm">
                  {business.totalReviews} Ratings     </span>
                <span className="text-gray-500 mt-1">📍{business.location}</span>
              </div>

              <p className="text-gray-600 mt-5 max-w-xl break-words">
                {business.description || "No description available"}
              </p>
              <div >



              </div>

              {/* <div className="mt-3 text-sm text-gray-500">
        <p><strong>Category:</strong> {business.category}</p>
        <p><strong>Location:</strong> {business.location}</p>
        <p><strong>Phone:</strong> {business.phone}</p>
      </div> */}
            </div>

            {/* Rating */}
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              {/* <ShowRating rating={avg} /> */}
              {/* <p className="text-sm text-gray-500">({total} reviews)</p> */}
              <div className="mt-1">
                <Review businessId={business._id} />
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Reviews</h3>

              {reviews.length === 0 && <p>No reviews yet</p>}

              {reviews.map((r) => (
                <div key={r._id} className="border-b py-3">
                  <p className="font-semibold">{r.userId?.name}</p>

                 

                  <p className="text-gray-600">{r.comment}</p>
                </div>
              ))}
{/* 
              <div className="text-yellow-500 text-lg">
                {"★".repeat(4)}{"☆".repeat(1)}
              </div> */}

              {/* <p className="text-gray-500 text-sm">
                Good rating from users
              </p> */}
            </div>

            {/* Photos Preview */}
            {/* <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Photos</h2>

      <div className="grid grid-cols-3 gap-2">
        {business.images?.slice(0, 3).map((img, i) => (
          <img
            key={i}
            src={img}
            className="h-24 w-full object-cover rounded"
          />
        ))}
      </div>
    </div> */}

            {/* Quick Actions */}
            {/* <div className="bg-white p-4 rounded-lg shadow flex gap-4 text-blue-500">
      <button>📞 Call</button>
      <button>📍 Directions</button>
      <button>🔗 Share</button>
    </div> */}

          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <p className="text-gray-500">Reviews section coming...</p>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white shadow-md p-5 rounded-xl h-fit">

        <h3 className="text-xl font-semibold mb-3">Contact</h3>

        <button className="text-blue-500 mb-4">
          📞 {business.phone}
        </button>

        <hr />

        <h4 className="mt-4 font-semibold">Address</h4>
        <p className="text-gray-600 text-sm">
          {business.location}
        </p>

        <div className="flex gap-4 mt-3 text-blue-500 text-sm">
          <button onClick={()=> handleDirections()} 
            className="border px-3 py-2 rounded ">Get Direction</button>
          
        </div>

        

      </div>

    </div>
  );
}

