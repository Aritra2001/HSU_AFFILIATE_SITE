import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

const StudentDetails = ({ student }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handelDivClick = () => {
    if(isDeleteModalOpen) {
      cancelDelete()
    }
  }

  const confirmDelete = () => {
    // Perform the delete action here
    // You can call your delete API or dispatch a delete action, etc.

    // Close the modal after the deletion is done
    setDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    // Cancel the delete action
    setDeleteModalOpen(false);
  };

  return (
    <div onClick={handelDivClick}>
      <table className="text-white text-[15px] font-medium font-['Poppins'] ml-[4rem] flex mt-[2vh]">
        <tbody className="grid grid-rows-1">
          <tr className="grid grid-flow-col gap-20">
            <td className="capitalize">{student.name}</td>
            <td className="email">{student.email}</td>
            <td className="phone">{student.phone}</td>
            <td className="">{student.payment}</td>
            <td className="-ml-[6rem] cursor-pointer" onClick={handleDelete}>
              <MdDelete size={20} />
            </td>
          </tr>
        </tbody>
      </table>

      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 font-['Poppins']">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Are you sure you want to delete this data?</p>
            <div className="flex justify-end mt-4 text-[16px]">
              <button onClick={confirmDelete} className="mr-2 text-red-500">
                Confirm
              </button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="w-[770px] h-[0px] border border-neutral-600 ml-[4rem] flex mt-1"></div>
    </div>
  );
};

export default StudentDetails;

