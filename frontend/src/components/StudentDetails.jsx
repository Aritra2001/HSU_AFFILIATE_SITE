import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from "react-toastify";
import { useStudentsContext } from '../hooks/useStudentsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowAltCircleDown } from "react-icons/fa";

const StudentDetails = ({ student, isLastStudent, students }) => {
  const { dispatch } = useStudentsContext()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { user } = useAuthContext()
  var json = ''

  const notify = () => {
    
    if(json.hasOwnProperty('error') === false) {
      toast.success(`${json.name} deleted Successfully!`)
    }
    else {
      toast.error(json.error)
    }
  }

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handelDivClick = () => {
    if(isDeleteModalOpen) {
      cancelDelete()
    }
  }

  const confirmDelete = async () => {

    const response = await fetch('https://hsu-affiliate-site-ph69.vercel.app/api/students/' + student._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    json = await response.json()
    notify()
    if(response.ok) {
      dispatch({type: 'DELETE_STUDENT', payload: json})
    }

    // Close the modal after the deletion is done
    setDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    // Cancel the delete action
    setDeleteModalOpen(false);
  };

  const downloadTable = () => {
    // Initialize CSV content with header
    let csvContent = 'Name,Email,Phone,Payment\n';
  
    // Append each student's data to the CSV content
    students.forEach((student) => {
      csvContent += `${student.name},${student.email},${student.phone},${student.payment}\n`;
    });
  
    // Create and trigger the download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  return (
    <div onClick={handelDivClick}>
      <table className="text-white text-[15px] font-medium font-['Poppins'] ml-[4rem] flex mt-[2vh]">
        <tbody className="grid grid-rows-1">
          <tr className="grid grid-flow-col gap-20">
            <td className="capitalize">{student.name}</td>
            <td className="email">{student.email}</td>
            <td className="phone">{student.phone}</td>
            <td className="ml-">{student.payment}</td>
            <td className="-ml-[4.8rem] cursor-pointer" onClick={handleDelete}>
              <MdDelete size={20} />
            </td>
          </tr>
        </tbody>
      </table>
      {isLastStudent && (<button className=' w-[7rem] text-white bg-violet-600 p-2 rounded-xl mt-7 ml-[24rem] mt-[10vh] flex justify-center items-center gap-2' onClick={downloadTable}><FaArrowAltCircleDown size={20}/>Excel</button>)}

      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 font-['Poppins']">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Are you sure you want to delete this data?</p>
            <div className="flex justify-end mt-4 text-[16px]">
              <button onClick={confirmDelete} className="mr-2 text-red-500">
                Confirm
              </button>
              <ToastContainer theme='dark' />
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      
      {!isLastStudent && (<div className="w-[770px] h-[0px] border border-neutral-600 ml-[4rem] flex mt-1"></div>)}
    </div>
  );
};

export default StudentDetails;

