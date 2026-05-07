import React from 'react'
import API from '../api/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Subscription = () => {   // ✅ FIXED NAME
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const handleUpgrade = async () => {
        try {
            setloading(true);

            const token = localStorage.getItem("token");

            await API.post("/user/subscribe", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // ✅ SAFE update (no /me dependency)
            const currentUser = JSON.parse(localStorage.getItem("user"));

            const updatedUser = {
                ...currentUser,
                subscription: { plan: "premium" }
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));

            // ✅ IMPORTANT
            window.dispatchEvent(new Event("user-updated"));

            alert("Upgraded to Premium 🎉");
            navigate("/", { replace: true });

        } catch (err) {
            alert("Upgrade failed. Please try again.");
        } finally {
            setloading(false);
        }
    }

    return (
        <div className='p-6 flex flex-col items-center'>
            <h1 className='text-3xl font-bold mb-6'>Choose Your Plan</h1>

            <div className='grid grid-cols-2 gap-6'>

                <div className='border p-5 rounded shadow'>
                    <h2 className='text-xl font-bold mb-2'>Free</h2>
                    <ul className='text-sm'>
                        <li>✔ Basic listing</li>
                        <li>✔ Normal visibility</li>
                    </ul>
                </div>

                <div className='border p-5 rounded shadow border-yellow-500'>
                    <h2 className='text-xl font-bold text-yellow-600 mb-2'>Premium ⭐</h2>

                    <button
                        onClick={handleUpgrade}
                        disabled={loading}
                        className='mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600'>
                        {loading ? "Processing..." : "Upgrade Now"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Subscription;