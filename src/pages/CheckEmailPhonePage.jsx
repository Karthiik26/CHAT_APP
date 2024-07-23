import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CheckEmailPhonePage = () => {

  const [data, setData] = useState({
    email: "",
    phone: "",
  });

  const nav = useNavigate()

  const HandleInputElement = (e) => {
    const { name, value } = e.target;

    setData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log(data);

    const URL = `${import.meta.env.VITE_BACKEND_URL}ChatApp/LoginUser`;

    try {
      console.log("res - > " + URL);

      // Assuming data is a JavaScript object
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const apires = await response.json();

      console.log(apires);
      
      if (apires.success) {
        toast.success(apires?.message);
        nav("/Password", {
          state : apires?.data
        });
      } else {
        toast.error(apires?.message);
      }
        
    } catch (error) {
      toast.error(error.message);
      console.log("error" + error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-8">
        <div className="w-4/12 flex-col justify-center items-center pl-8 pt-2 pb-2 pr-8 m-2 shadow-2xl grid gap-4">
          <form onSubmit={HandleSubmit}>
            <h2 className="font-bold text-xl mt-5 text-center mb-3">
              Welcome Back To Chat App
            </h2>

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

            <div className="grid grid-flow-row mt-8">
              <button
                type="submit"
                className="text-lg bg-blue-400 text-white hover:bg-blue-300 font-semibold w-auto p-2 rounded-md "
              >
                Let's Go
              </button>
            </div>
          </form>

          <p className="text-center m-3">
            New User ?{" "}
            <NavLink
              to={"/Register"}
              className={"font-semibold hover:text-blue-400"}
            >
              Register
            </NavLink>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default CheckEmailPhonePage;
