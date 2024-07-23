import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../Helper/Avatar";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setToken } from "../Redux/UserSlice";

const CheckPasswordPage = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location);

  const nav = useNavigate();

  const [data, setData] = useState({
    password: "",
    userId: location?.state?._id.toString(),
  });

  useEffect(() => {
    if (!location?.state?.name) {
      nav("/Email");
    }
  }, [!location?.state?.name]);

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

    const URL = `${import.meta.env.VITE_BACKEND_URL}ChatApp/CheckPassword`;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const apires = await response.json();

      if (apires.success) {
        toast.success(apires?.message);
        nav("/", {
          state: apires?.data,
        });

        console.log("apires", apires);

        dispatch(setToken(apires?.token));

        localStorage.setItem("token", apires?.token);
      } else {
        toast.error(apires?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-8">
        <div className="w-4/12 pl-8 pt-2 pb-2 pr-8 m-2 shadow-2xl grid gap-4">
          <form onSubmit={HandleSubmit}>
            <div>
              <Avatar
                imageUrl={location?.state?.profile_pic}
                width={150}
                height={150}
                name={location?.state?.name?.charAt(0).toUpperCase()}
              />
              <h1 className="text-center font-bold text-xl pt-4 pb-4">
                {location?.state?.name}
              </h1>
            </div>
            {/* <h2 className="font-bold text-xl mt-5 text-center mb-3">
              Now Login
            </h2> */}

            <div className="grid grid-flow-row">
              <label htmlFor="password">Password : </label>
              <input
                type="text"
                name="password"
                id="password"
                onChange={HandleInputElement}
                placeholder="Enter Your Password"
                className="p-3 text-[18px] m-2 border-2 focus:outline-blue-300"
                required
              />
            </div>

            <div className="grid grid-flow-row mt-8 mb-5">
              <button
                type="submit"
                className="text-lg bg-blue-400 text-white hover:bg-blue-300 font-semibold w-auto p-2 rounded-md "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckPasswordPage;
