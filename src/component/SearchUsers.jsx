import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import UserSearchCard from "./UserSearchCard";
import { toast } from 'react-hot-toast';
import "../App.css"
import { useSelector } from "react-redux";

const SearchUsers = ({ onclose }) => {
  const [LoadingData, setLoadingData] = useState(false);
  const [SearchUserData, setSearchUserData] = useState([]);
  const [searchquery, setsearchquery] = useState('')
  const user = useSelector((state) => state?.user);

  const HandleSearch = async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}ChatApp/Search-User`;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({search:searchquery, loggedInUserId:user._id})
        });

        const apires = await response.json();
        console.log(apires)
        
        if(apires?.success){
          console.log(apires?.data)
          setSearchUserData(apires?.data)
        }else {
          toast.error(apires?.message)
        }

    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    HandleSearch();
  }, [searchquery])

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-700 bg-opacity-80 p-2">
      <div className="flex justify-center items-center w-full max-w-lg mx-auto mt-20 flex-col">
        <div className="w-full max-w-full float-left">
          <button
            className="bg-white px-4 py-4 my-2 rounded-full"
            onClick={onclose}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                clip-rule="evenodd"
              ></path>
              <path
                fill-rule="evenodd"
                d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="w-full flex justify-center overflow-hidden items-center flex-row rounded bg-white">
          <div className="w-full h-14">
            <input
              type="text"
              name="search"
              id="search"
              value={searchquery}
              onChange={(e)=>{setsearchquery(e.target.value)}}
              placeholder="Search User By Name, email......."
              className="max-w-full w-96 outline-none py-5 h-full px-4 text-center font-sans font-semibold text-xl"
            />
          </div>
          <div className="flex justify-center items-center">
            <button onClick={HandleSearch} className=" cursor-pointer hover:bg-blue-300 opacity-30  p-4">
              <svg
                className="hover:text-black"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full h-[550px] overflow-x-hidden overflow-y-auto scrollbar p-4 bg-white mt-4 rounded">
          
          {
          SearchUserData.length === 0 && !LoadingData && (
            <p className="text-center opacity-70 text-xl font-sans font-semibold m-2">
              User Not Found
            </p>
          )}

          {
          LoadingData && (
            <div className="flex justify-center items-center m-2">
              <Loading />
            </div>
          )}

          {
          SearchUserData.length !== 0 && !LoadingData && (
            SearchUserData.map((user,index)=>{
              return (
                <UserSearchCard key={user._id} user={user} onClose={onclose} />
              )
            })
          )}

      
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
