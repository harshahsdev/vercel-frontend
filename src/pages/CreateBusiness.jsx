import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import backgroundimg from '../assets/backgroundimg.png';

const CreateBusiness = () => {
    const navigate = useNavigate();

    const [form, setform] = useState({
        name: "",
        description: "",
        category: "",
        location: "",
        phone: "",
        lat: "",
        lng: "",
    });
    const [images, setimages] = useState([]);

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.category || !form.location || !form.phone) {
    alert("Please fill all required fields");
    return;
  }

  try {
    if (!/^[0-9]{10}$/.test(form.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    if (!form.lat || !form.lng) {
      alert("Please provide latitude and longitude or use My Location");
      return;
    }

    const lat = Number(form.lat);
    const lng = Number(form.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      alert("Latitude and longitude must be valid numbers");
      return;
    }

    const payload = {
      name: form.name,
      description: form.description,
      category: form.category.toLowerCase(),
      location: form.location,
      phone: form.phone,
      coordinates: {
        lat,
        lng
      }
    };
    console.log("Submitting business payload:", payload);

    // ✅ 1. Create business FIRST
    const createRes = await API.post("/business", payload);

    const businessId = createRes.data._id;

    // ✅ 2. Upload images AFTER getting ID
    if (images.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await API.post(`/business/${businessId}/upload-image`, formData);
    }

    alert("Business created successfully 🚀");
    navigate("/");

  } catch (e) {
    console.error("Create business failed:", e.response?.data || e.message, e);
    const message = e.response?.data?.message || "Error creating business";
    alert(message);
  }
};
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setform((prev) => ({
                    ...prev,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }));
            },
            (err) => {
                console.error(err);
                alert("Location access denied ❌");
            }
        );
    };
    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${backgroundimg})` }}>
            {/* <div className="absolute inset-0 bg-black/40"></div> */}
            <div className="flex flex-col items-center justify-center border border-gray-300 p-6 mt-1  w-1/2 mx-auto shadow-lg rounded-xl ">
                <h1 className='text-center  text-gray-800 font-bold text-shadow-2xl '>Add Business</h1>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-3  gap-10 mt-5'>
                        <input
                            className='border rounded p-2'
                            type="text"
                            name="name"
                            placeholder='Business Name'
                            value={form.name}
                            onChange={handleChange}
                        />
                        <input className='border rounded p-2'
                         type="text"
                         name='description'
                         placeholder='Description'
                         value={form.description}
                         onChange={handleChange}
                          />

                        <select className='border rounded p-2' name="category" value={form.category} onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option value="hardware">Hardware</option>
                            <option value="hotel">Hotel</option>
                            <option value="shop">Shop</option>
                            <option value="Medical">Medical</option>
                            <option value="cafe">cafe</option>
                            <option value="textile">Textiles</option>
                        </select>
                        <input className='border rounded p-2'
                            type="text"
                            name='location'
                            placeholder='Address'
                            value={form.location}
                            onChange={handleChange}
                        />
                        <input className='border rounded p-2' type="text"
                            name='phone'
                            placeholder='Phone'
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <input className='border rounded p-2' type="text"
                            name='lat'
                            placeholder='Latitude'
                            value={form.lat}
                            onChange={handleChange} />

                        <input className='border rounded p-2' type="text"
                            name='lng'
                            placeholder='Longitude'
                            value={form.lng}
                            onChange={handleChange} />


                        <button type="button" className='border rounded p-2 bg-blue-500 text-gray' onClick={getLocation}>
                            Use My Location 📍
                        </button>
                        <div className="border-dashed border-2 border-gray-300  rounded text-center">
                            <p className="text-gray-500">Upload Business Images</p>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setimages(e.target.files)}
                                className="mt-2"
                            />
                        </div>
                        <button type='submit' className='border rounded p-2 bg-green-500 text-white'>
                            Create
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBusiness