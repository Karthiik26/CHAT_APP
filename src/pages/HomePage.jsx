import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setUser,
  setOnlineUser,
  setSocketConnection,
} from "../Redux/UserSlice";
import SideBar from "../component/SideBar";
import io from "socket.io-client";

const HomePage = () => {
  const redux = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(redux);
  }, [redux]);

  console.log("location", location);

  // useEffect(() => {
  //   if(!localStorage.getItem("token")){
  //     nav("/Email");
  //   }else{
  //     nav("/");
  //   }
  // }, []);

  useEffect(() => {
    HandleUserDataGetting();
  }, []);

  const HandleUserDataGetting = async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}ChatApp/GetUserDetails`;

    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });

    const mainres = await response.json();

    dispatch(setUser(mainres?.data));

    if (mainres?.data?.logout) {
      dispatch(logout());
      nav("/Email");
    }
  };

  // Socket connection
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketConnection.on("onlineUser", (data) => {
      console.log(data);
      dispatch(setOnlineUser(data));
    });
    // console.log(socketConnection.connect);

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const basePath = location.pathname === "/";

  return (
    <div className="grid lg:grid-cols-[400px,1fr] h-screen max-h-screen">
      <section className={`bg-gray-50 ${!basePath && "hidden"} lg:block`}>
        <SideBar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      {basePath && (
        <div className={`${basePath && "hidden"} lg:block`}>
          <div className="lg:flex flex-col gap-2 justify-center items-center h-screen hidden">
            <svg
              stroke="currentColor"
              fill="currentColor"
              className="text-gray-400"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="10em"
              width="10em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20,2H4C2.897,2,2,2.897,2,4v12c0,1.103,0.897,2,2,2h3v3.767L13.277,18H20c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M20,16h-7.277L9,18.233V16H4V4h16V16z"></path>
              <path d="M17.207 7.207L15.793 5.793 11 10.586 8.707 8.293 7.293 9.707 11 13.414z"></path>
            </svg>
            <h2 className=" text-[52px] font-semibold font-sans text-center text-gray-400 px-4 py-2">
              CHAT APP
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
