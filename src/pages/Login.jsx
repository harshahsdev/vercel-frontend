import { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/api/user/login", { email, password }, { withCredentials: true });

            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                // ✅ IMPORTANT
                window.dispatchEvent(new Event("user-updated"));

                navigate("/", { replace: true });
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "login failed. Please try again.");
        }
    }

    return (
        <div className='flex min-h-full flex-col justify-center  bg-gray-900 px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-white'>
                    Sign in to your account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={handleLogin} className='space-y-6'>
                    <div>
                        <label htmlFor="email" className='block text-sm/6 font-medium text-gray-100'>
                            Email address
                        </label>
                        <div className="mt-2">
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-white'
                        onChange={(e) => setemail(e.target.value)}
                    />
                    </div>
                    </div>

                    <div>
                         <label htmlFor="email" className='block text-sm/6 font-medium text-gray-100'>
                            Password
                        </label>
                        <div className="mt-2">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-white'
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    </div>
                    </div>

                    <button className='w-full bg-indigo-500 text-white py-2 rounded'>
                        Sign in
                    </button>

                    <Link to="/register" className='text-indigo-400 text-center block'>
                        Register
                    </Link>

                </form>
            </div>
        </div>
    )
}

export default Login;