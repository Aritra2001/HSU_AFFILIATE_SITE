import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useStudentsContext } from '../hooks/useStudentsContext';
import 'react-toastify/dist/ReactToastify.css';

const AddStudents = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [payment, setPayment] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useStudentsContext()
    var json = ''

    const notify = () => {
    
        if(json.hasOwnProperty('error') === false) {
          toast.success('Student Added Successfully!')
        }
        else {
          toast.error(json.error)
        }
    }

    const handelClick = async (e) => {
        e.preventDefault()

        const student = { name, email, phone, payment, amount }

        setLoading(true)
        const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/', {

    method: 'POST',
      body: JSON.stringify(student),
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
        setName('')
        setEmail('')
        setPhone('')
        setPayment('')
        setAmount('')
        console.log("New Student Added!")
        dispatch({type: 'CREATE_STUDENT', payload: json})
    } catch(error) {
        console.log(error)
    }
}
}

  return (
    <div className='w-[386px] h-[533px] relative bg-zinc-900 rounded-[20px] border border-white mt-[2rem] flex justify-center'>
        <div className='flex gap-8 flex-col items-center'>
            <p className="w-32 text-white text-xl font-semibold font-['Poppins'] mt-[2rem]">
                Add Student
            </p>
            <ul className='flex flex-col gap-8'>
                <li className='flex gap-4 items-center'>
                    <label htmlFor="">Name</label>
                    <input type="text" className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4' value={name} onChange={(e) => setName(e.target.value)} autoFocus/>
                </li>
                <li className='flex gap-4 items-center'>
                    <label htmlFor="">Email</label>
                    <input type="email" className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4' value={email} onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li className='flex gap-4 items-center'>
                    <label htmlFor="">Phone</label>
                    <input type="number" className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </li>
                <li className='flex gap-4 items-center'>
                    <label htmlFor="">Payment</label>
                    <select className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4 text-white' value={payment} onChange={(e) => setPayment(e.target.value)} style={{ color: payment ? "#fff" : "#696969" }}>
                        <option value="null">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Later">Later</option>
                        <option value="Installment">Installment</option>
                    </select>
                </li>
                <li className='flex gap-4 items-center'>
                    <label htmlFor="">Amount</label>
                    <input type="number" className='w-[196px] h-[39px] opacity-70 bg-stone-950 rounded-[10px] border border-zinc-300 indent-4' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </li>
            </ul>
            <ToastContainer theme="dark"/>
            <button className="w-[295px] h-[39px] bg-gradient-to-b from-violet-600 to-violet-950 rounded-[11px] text-white text-base font-semibold font-['Poppins'] -mt-[1.5rem]" onClick={handelClick} disabled={loading} >{loading ? <>Loading...</> : <>ADD</>}</button>
        </div>
    </div>
  );
}

export default AddStudents;
