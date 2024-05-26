import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('userInfo')
        location.reload()
        navigate('/')
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome Back!</h1>
                <p className="text-gray-600 mb-6">You have successfully logged in.</p>
                <button
                    onClick={logout}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Welcome