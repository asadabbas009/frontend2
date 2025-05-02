// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaFacebook, FaWhatsapp, FaTelegram } from 'react-icons/fa';

// const SignUp = () => {
//     const [role, setRole] = useState('teacher');
//     const [formData, setFormData] = useState({
//         username: '',
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setError('');
//         setMessage('');

//         if (formData.password !== formData.confirmPassword) {
//             setError('Passwords do not match.');
//             return;
//         }

//         try {
//             const apiUrl = process.env.REACT_APP_API_URL;
//             const response = await axios.post(`${apiUrl}/api/signup`, {
//                 username: formData.username,
//                 name: formData.name,
//                 email: formData.email,
//                 password: formData.password,
//                 role,
//             });

//             setMessage(response.data.message);
//         } catch (err) {
//             setError(err.response?.data?.error || 'An error occurred during signup.');
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col md:flex-row bg-gradient-hero items-center justify-center text-black overflow-hidden">
//             <div className="hidden ml-2 md:flex md:w-1/2 h-full  bg-cover bg-center rounded-lg shadow-lg"
//                 style={{ backgroundImage: "url('/images/sign-up-img.jpg')", height: "100vh", backgroundSize: "cover", backgroundPosition: "center" }}>
//             </div>

//             <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12">
//                 <div className="bg-opacity-90 bg-white shadow-lg rounded-2xl p-10 md:p-14 w-full max-w-lg">
//                     <div className="flex justify-center mb-6 text-lg">
//                         <button
//                             className={`w-1/2 py-3 font-bold rounded-l-lg transition-all duration-300 ${role === 'teacher' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white scale-105 shadow-lg' : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:shadow-lg'}`}
//                             onClick={() => setRole('teacher')}
//                         >
//                             Faculty
//                         </button>
//                         <button
//                             className={`w-1/2 py-3 font-bold rounded-r-lg transition-all duration-300 ${role === 'student' ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white scale-105 shadow-lg' : 'bg-gray-300 text-gray-700 hover:bg-green-500 hover:shadow-lg'}`}
//                             onClick={() => setRole('student')}
//                         >
//                             Student
//                         </button>
//                     </div>

//                     <h2 className="text-2xl font-semibold text-center mb-6">
//                         Create Your Account
//                     </h2>
//                     {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
//                     {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div>
//                             <label className="block text-gray-700 font-bold mb-2">Full Name</label>
//                             <input 
//                                 type="text" 
//                                 name="name" 
//                                 value={formData.name} 
//                                 onChange={handleChange} 
//                                 required 
//                                 placeholder="Enter your full name" 
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 font-bold mb-2">Username</label>
//                             <input 
//                                 type="text" 
//                                 name="username" 
//                                 value={formData.username} 
//                                 onChange={handleChange} 
//                                 required 
//                                 placeholder="Choose a unique username" 
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 font-bold mb-2">Email Address</label>
//                             <input 
//                                 type="email" 
//                                 name="email" 
//                                 value={formData.email} 
//                                 onChange={handleChange} 
//                                 required 
//                                 placeholder="Enter your email address (e.g., example@email.com)" 
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 font-bold mb-2">Password</label>
//                             <input 
//                                 type="password" 
//                                 name="password" 
//                                 value={formData.password} 
//                                 onChange={handleChange} 
//                                 required 
//                                 placeholder="Create a strong password (min. 8 characters)" 
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
//                             <input 
//                                 type="password" 
//                                 name="confirmPassword" 
//                                 value={formData.confirmPassword} 
//                                 onChange={handleChange} 
//                                 required 
//                                 placeholder="Re-enter your password" 
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
//                             />
//                         </div>
//                         <button 
//                             type="submit" 
//                             className="w-full py-3 font-bold text-white rounded-lg bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                         >
//                             Create Account
//                         </button>
//                     </form>

//                     <p className="mt-6 text-gray-600 text-center text-base">
//                         Already have an account? <a href="/login" className="text-blue-500 font-semibold">Login</a>
//                     </p>

//                     <div className="flex justify-center mt-6 space-x-6 text-gray-500 text-2xl">
//                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
//                             <FaFacebook />
//                         </a>
//                         <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
//                             <FaWhatsapp />
//                         </a>
//                         <a href="https://t.me/your-telegram-id" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
//                             <FaTelegram />
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;


import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaWhatsapp, FaTelegram } from 'react-icons/fa';

const SignUp = () => {
    const [role, setRole] = useState('teacher');
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        academic_year: '', // added field
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Prepare data – include academic_year only if role is student
        const data = {
            username: formData.username,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role,
            ...(role === 'student' && { academic_year: formData.academic_year }),
        };

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/api/signup`, data);
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during signup.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-hero items-center justify-center text-black overflow-hidden">
            <div className="hidden ml-2 md:flex md:w-1/2 h-full bg-cover bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: "url('/images/sign-up-img.jpg')", height: "100vh", backgroundSize: "cover", backgroundPosition: "center" }}>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12">
                <div className="bg-opacity-90 bg-white shadow-lg rounded-2xl p-10 md:p-14 w-full max-w-lg">
                    <div className="flex justify-center mb-6 text-lg">
                        <button
                            type="button"
                            className={`w-1/2 py-3 font-bold rounded-l-lg transition-all duration-300 ${role === 'teacher' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white scale-105 shadow-lg' : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:shadow-lg'}`}
                            onClick={() => setRole('teacher')}
                        >
                            Faculty
                        </button>
                        <button
                            type="button"
                            className={`w-1/2 py-3 font-bold rounded-r-lg transition-all duration-300 ${role === 'student' ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white scale-105 shadow-lg' : 'bg-gray-300 text-gray-700 hover:bg-green-500 hover:shadow-lg'}`}
                            onClick={() => setRole('student')}
                        >
                            Student
                        </button>
                    </div>

                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Create Your Account
                    </h2>
                    {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                placeholder="Enter your full name" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                                placeholder="Choose a unique username" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                placeholder="Enter your email address" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
                            />
                        </div>
                        {role === 'student' && (
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Academic Year</label>
                                <input 
                                    type="number" 
                                    name="academic_year" 
                                    value={formData.academic_year} 
                                    onChange={handleChange} 
                                    required={role === 'student'}
                                    placeholder="Enter your academic year" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                                placeholder="Create a strong password" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                required 
                                placeholder="Re-enter your password" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full py-3 font-bold text-white rounded-lg bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="mt-6 text-gray-600 text-center text-base">
                        Already have an account? <a href="/login" className="text-blue-500 font-semibold">Login</a>
                    </p>

                    <div className="flex justify-center mt-6 space-x-6 text-gray-500 text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <FaFacebook />
                        </a>
                        <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                            <FaWhatsapp />
                        </a>
                        <a href="https://t.me/your-telegram-id" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                            <FaTelegram />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
