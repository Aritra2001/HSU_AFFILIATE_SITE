import React from 'react';
import { MdDelete } from "react-icons/md";


const StudentDetails = ({ student }) => {

  const handelEdit = () => {

  }
  return (
    <div>
        <table className="text-white text-[15px] font-medium font-['Poppins'] ml-[4rem] flex mt-[2vh]">
        <tbody className='grid grid-rows-1'>
          <tr className='grid grid-flow-col gap-20'>
            <td className='capitalize'>{student.name}</td>
            <td className='email'>{student.email}</td>
            <td className='phone'>{student.phone}</td>
            <td className=''>{student.payment}</td>
            <td className='-ml-[6rem] cursor-pointer' onClick={handelEdit}><MdDelete size={20} /></td>
          </tr>
        </tbody>
        </table>
        <div className="w-[770px] h-[0px] border border-neutral-600 ml-[4rem] flex mt-1"></div>
    </div>
  );
}

export default StudentDetails;
