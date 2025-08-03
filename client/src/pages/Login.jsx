import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Login = () => {
  const [mode, setMode] = useState('Sign Up') // "Sign Up" or "Login"
  const navigate = useNavigate()
  const {backendUrl,setIsLoggedIn} = useContext(AppContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (mode === 'Sign Up') {
      // Handle sign-up logic
      console.log('Sign Up:', { name, email, password })
    } else {
      // Handle login logic
      console.log('Login:', { email, password })
    }

    // Add backend integration here
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      
      {/* Logo */}
      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        alt="App Logo" 
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" 
      />

      {/* Form Card */}
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {mode === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-center text-sm mb-6">
          {mode === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Name Field (Only for Sign Up) */}
          {mode === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="User Icon" />
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent outline-none w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Email Icon" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Password Icon" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forget Password */}
          <p 
            onClick={() => navigate('/reset-password')} 
            className="mb-4 text-end text-sm text-indigo-500 cursor-pointer"
          >
            Forgot Password?
          </p>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white"
          >
            {mode}
          </button>
        </form>

        {/* Toggle Mode */}
        <p className="text-gray-400 text-center text-xs mt-4">
          {mode === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span 
                onClick={() => setMode('Login')} 
                className="text-indigo-500 cursor-pointer underline"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span 
                onClick={() => setMode('Sign Up')} 
                className="text-indigo-500 cursor-pointer underline"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default Login
