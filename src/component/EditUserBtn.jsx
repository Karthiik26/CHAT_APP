import React, { useEffect, useState } from "react";
import Avatar from "../Helper/Avatar";
import uploadFile from "../Helper/UploadFile";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/UserSlice";

const EditUserBtn = ({ onclose, user }) => {

  const nav = useNavigate();
  const dispatch = useDispatch();

  const [Data, setData] = useState({
    name: user?.name,
    profile_pic: user?.Profile_pic,
  });


  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setData((preve) => {
      return {
        ...preve,
        ...user,
      };
    });
  }, [user]);

  const HandleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const response = await uploadFile(file);
    setData((Preve) => {
      return {
        ...Preve,
        profile_pic: response?.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}ChatApp/UpdateUser`;

    try {

      const response = await fetch(URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(Data)
      });

      const apires = await response.json();
      console.log(apires)
      
      if(apires.success){
        toast.success(apires?.message)
        console.log(apires?.data)
        dispatch(setUser(apires?.data))
      }else {
        toast.error(apires?.message)
      }

  } catch (error) {
    toast.error(error.message)
  }
  };

  console.log(Data);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="w-full max-w-sm rounded-md p-4 bg-white m-1">
        <button className="flex justify-start" onClick={onclose}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 22 24"
            height="2em"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
          </svg>
        </button>

        <h2 className="font-bold text-xl text-center">Profile Details</h2>
        <p className="font-medium text-sm text-center">Edit User Details</p>

        <form onSubmit={handleSubmit}>
          <div className="p-2">
            <label htmlFor="Name" className="text-md font-sans font-semibold">
              Name :{" "}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={Data.name}
              onChange={HandleOnChange}
              className="w-full py-2 px-2 my-2 focus:outline-blue-500 border-0.5 border font-sans text-md font-medium"
            />
          </div>

          <div className="p-2">
            <label className="text-md font-sans font-semibold">
              Profile Pic :{" "}
            </label>
            <div className="flex justify-start items-center m-4">
              <Avatar width={70} height={70} name={Data?.name} imageUrl={Data?.profile_pic} />

              <label htmlFor="profile_pic">
                <div className="mx-8 p-2 bg-amber-300 text-center font-semibold rounded-lg cursor-pointer">
                  Change Photo
                </div>
              </label>
              <input
                type="file"
                id="profile_pic"
                className="hidden"
                onChange={HandleUploadPhoto}
              />
            </div>
          </div>

          <div className="py-[1px] bg-slate-300 w-full"></div>

          <div className="flex justify-end gap-3 my-4">
            <button onClick={onclose} className="border-2 border-red-500 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white font-sans font-semibold text-md">
              Cancel
            </button>
            <button className="border-2 border-green-500 px-3 py-2 rounded-lg text-green-500 hover:bg-green-500 hover:text-white font-sans font-semibold text-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserBtn;
