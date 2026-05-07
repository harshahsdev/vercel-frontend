import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        setUser(storedUser && token ? storedUser : null);
      } catch {
        setUser(null);
      }
    };

    loadUser();

    // ✅ listen to your custom event
    window.addEventListener("user-updated", loadUser);

    return () => window.removeEventListener("user-updated", loadUser);
  }, []);

  const handleSearch = () => {
    const value = search.trim();
    if (!value) return;
    navigate(`/search?q=${value}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);

    window.dispatchEvent(new Event("user-updated"));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-md">

      <div className='text-xl font-bold text-blue-500'>
        Namma Huliyar...
      </div>

      <div className='w-1/2 flex gap-2'>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Enter"){
              handleSearch(e);
            }
          }}
          className="bg-gray-100 border px-4 py-2 rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      <div className='flex items-center gap-4'>

        {user ? (
          user?.subscription?.plan === "premium" ? (
            <span className="flex items-center gap-1 text-yellow-600 font-bold">
              <FaCrown />
              Premium
            </span>
          ) : (
            <Link to="/subscription" className="flex items-center gap-1 text-yellow-600">
              <FaCrown />
              Subscribe
            </Link>
          )
        ) : (
          <Link to="/login" className="flex items-center gap-1 text-yellow-600">
            <FaCrown />
            Subscribe
          </Link>
        )}

        {user ? (
          <button onClick={handleLogout} className='text-red-500'>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}

      </div>
    </div>
  )
}

export default Navbar;