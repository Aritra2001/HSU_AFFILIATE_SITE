import { FaEyeSlash,FaEye } from 'react-icons/fa';
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  var json = ''

  const submitHandler = async (e) => {
    e.preventDefault()

    const user = {email, dob}
    setLoading(true)
    const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/login', {

      method: 'POST',
      body: JSON.stringify(user),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    setLoading(false)
    json = await response.json()
    notify()

    if(!response) {
      try {
        setError(json.error)
        console.log(error)
      } catch(e) {
        throw new Error(e)
      }
    }

    if(response.ok) {
      try {
        setError(null)
        setEmail('')
        setDob('')
        console.log('Login Successfull!')
      } catch(e) {
        throw new Error(e)
      }
    }
    
  }

  const notify = () => {
    
    if(json.hasOwnProperty('error') === false) {
      toast.success('Login Successfull!')
    }
    else {
      toast.error(json.error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className='h-screen bg-center text-white flex flex-col gap-10 items-center justify-center'>
      <div className="border border-[#d9d9d9] p-10 rounded-lg bg-[#1f1f1f] w-3/4 flex flex-col gap-8 md:w-[400px] " >
        
        <input type="email" className='p-2 bg-transparent border rounded-md indent-[1rem]' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <div className='container relative w-full'>  
          <input type={showPassword ? 'text' : 'password'} className='w-full p-2 bg-transparent border rounded-md password-input-wrapper indent-[1rem]' placeholder='Date of Birth' onChange={(e)=>setDob(e.target.value)} value={dob}/>
          <button
            className="absolute inset-y-0 right-0 flex items-center px-4 text-white"
            onClick={togglePasswordVisibility}
            >
            {!showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <ToastContainer theme="dark"/>
        <button className='px-3 capitalize text-base bg-[#6637ED] h-8 rounded-md md:text-lg md:h-10' onClick={submitHandler} disabled={loading}>{loading ? <>Loading...</> : <>Login</>}</button>
          <p className='text-xs text-center md:text-sm'>Create a affiliate account? <span className='underline cursor-pointer'>Become Affiliate</span></p>
      </div>
    </div>
  )
}

export default Login