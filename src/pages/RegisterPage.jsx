import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import uploadFile from "../Helper/UploadFile";
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [UploadPhoto, setUploadPhoto] = useState("");

  const nav = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
    phone:""
  });

  const HandleInputElement = (e) => {
    const { name, value } = e.target;

    setData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  const HandleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const response = await uploadFile(file);
    setUploadPhoto(file);
    setData((Preve) => {
      return {
        ...Preve,
        profile_pic: response?.url,
      };
    });
  };

  const HandleUploadCancel = (e) => {
    setUploadPhoto(null);
    e.preventDefault();
    e.stopPropagation();
  };

  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(data);

    const URL = `${import.meta.env.VITE_BACKEND_URL}ChatApp/Register`;

    try {
        console.log("res - > " + URL);

        // Assuming data is a JavaScript object
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const apires = await response.json();
        console.log(apires)
        
        if(apires.success){
          toast.success(apires?.message)
          console.log(apires)
          nav('/Email')
        }else {
          toast.error(apires?.message)
        }

    } catch (error) {
      toast.error(error.message)
    }
};


  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <div className="w-4/12 pl-8 pt-2 pb-2 pr-8 m-2 shadow-2xl grid gap-4">
          <form onSubmit={HandleSubmit}>
            <h2 className="font-bold text-2xl text-center mb-3">
              Welcome To Chat App
            </h2>

            <div className="grid grid-flow-row">
              <label htmlFor="name">Name : </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={HandleInputElement}
                placeholder="Enter Your Name"
                className="p-3 text-[18px] m-2 border-2 focus:outline-blue-300"
                required
              />
            </div>

            <div className="grid grid-flow-row">
              <label htmlFor="email">Email : </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={HandleInputElement}
                placeholder="Enter Your Email"
                className="p-3 text-[18px] m-2 border-2 focus:outline-blue-300"
                required
              />
            </div>

            <div className="grid grid-flow-row">
              <label htmlFor="">phone : </label>
              <input
                type="Number"
                name="phone"
                id="phone"
                onChange={HandleInputElement}
                placeholder="Enter Your phone Number"
                className="p-3 text-[18px] m-2 border-2 focus:outline-blue-300"
                required
              />
            </div>

            <div className="grid grid-flow-row">
              <label htmlFor="password">Password : </label>
              <input
                type="text"
                name="password"
                id="password"
                onChange={HandleInputElement}
                placeholder="Enter Your password"
                className="p-3 text-[18px] m-2 border-2 focus:outline-blue-300"
                required
              />
            </div>

            <div className="grid grid-flow-row mt-3">
              <label htmlFor="profile_pic">
                Profile Pic :
                <div className="h-20 bg-slate-300 mt-1 rounded border hover:border-blue-300 font-medium text-md items-center flex justify-center cursor-pointer ">
                  {UploadPhoto?.name
                    ? UploadPhoto?.name
                    : "Upload Your Profile Pic"}
                  {UploadPhoto?.name ? (
                    <button onClick={HandleUploadCancel}>
                      <svg
                        className="m-3 p-1"
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 30 30"
                        height="2em"
                        width="2em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                      </svg>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </label>
              <input
                type="file"
                name="profile_pic"
                id="profile_pic"
                className="p-3 text-[18px]  m-2 border-2 focus:outline-blue-300 hidden"
                onChange={HandleUploadPhoto}
              />
            </div>

            <div className="grid grid-flow-row mt-8">
              <button
                type="submit"
                className="text-lg bg-blue-400 text-white hover:bg-blue-300 font-semibold w-auto p-2 rounded-md "
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-center">
            Already Have An Account ?{" "}
            <NavLink
              to={"/Email"}
              className={"font-semibold hover:text-blue-400"}
            >
              Login
            </NavLink>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
