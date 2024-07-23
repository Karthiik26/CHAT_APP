import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <>
      <header className="p-1 shadow-xl">
        <div className="flex justify-center m-0 items-center">
          <div className="text-4xl ml-3 mr-3 font-bold p-1" >Chat App</div>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 -5 30 30"
            height="5em"
            width="5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20,2H4C2.897,2,2,2.897,2,4v12c0,1.103,0.897,2,2,2h3v3.767L13.277,18H20c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M20,16h-7.277L9,18.233V16H4V4h16V16z"></path>
            <path d="M17.207 7.207L15.793 5.793 11 10.586 8.707 8.293 7.293 9.707 11 13.414z"></path>
          </svg>
        </div>
      </header>

      {children}
    </>
  );
};

export default AuthLayout;
