import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin , userData , getUserData} = useContext(AppContext)
  const navigate = useNavigate()
  const inputRefs = React.useRef([])
  const handelInput = (e,index )=>{
    if(e.target.vaule.lenght > 0 && index < inputRefs.current.lenght - 1 ){
      inputRefs.current[lenght + 1 ].focus();
    }

  }
  const handleKeyDown = (e,index)=>{
    if(e.key === 'Backspace' && e.target.vaule === '' && index > 0){
      inputRefs.current[lenght - 1 ].focus();

    }
  }
  const handlePaste = (e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.array.forEach((char , index ) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].vaule = char;
      }
      
    });

  }
  const onSubmitHandler = async (e) =>{
    try{
      e.preventDefault();
      const optArray = inputRefs.current.map(e => e.vaule)
      const opt = optArray.join('')

      const {data} =await axios.post(backendUrl + '/auth/verify-account',{
        otp
      })
      if(data.success){
        toast.success('Email verified successfully');
        getUserData()
        navigate('/login')
      }else{
        toast.error(data.message);
      }
    } catch (error){
      toast.error(error.message);
    }
  }
  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedin, userData, ])
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      {/* Logo */}
      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        alt="App Logo" 
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" 
      />
    <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8  rounded-lg shadow-lg w-96 text-sm '>
      <h1 className='text-2xl font-semibold text-white mb-4'>Verify Email</h1>
      <p className='text-white mb-6'>Enter the OTP sent to your email</p>
      <div onPaste={handelPaste} className='flex justify-between items-center'>
        {Array(6).fill(0).map((_,index)=>(
          <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-[#333A5C ] text-white text-center text-xl rounded-md ' ref={e => inputRefs.current[index] = e} onInput={(e) => handelInput(e, index)}  onKeyDown={(e)=> handleKeyDown(e,index)}/>
        ))}
      </div>
      <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full' type="submit">Verify</button>
    </form>
    </div>
  )
}

export default EmailVerify