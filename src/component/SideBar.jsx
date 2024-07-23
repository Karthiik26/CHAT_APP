import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import Avatar from "../Helper/Avatar";
import { useSelector, useDispatch } from "react-redux";
import EditUserBtn from "./EditUserBtn";
import SearchUsers from "./SearchUsers";
import { logout } from "../Redux/UserSlice";

const SideBar = () => {
  const user = useSelector((state) => state.user);
  const SocketConnection = useSelector((state) => state.user.SocketConnection);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const OnlineRedux = useSelector((state) => state.user.OnlineUser);

  const GettingIsOnlineOrNot = (receiversId) =>{
   return OnlineRedux.includes(receiversId);
  }

  console.log("OnlineRedux",OnlineRedux)

  const [EditUserBtnfunc, setEditUserBtn] = useState(false);
  const [allUsers, setallUsers] = useState([]);
  const [SearchUserB, setSearchUserB] = useState(false);

  const HandleLogOut = async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}ChatApp/LogOut`;

    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });

    const mainres = await response.json();

    if (mainres.success) {
      console.log(mainres);
      dispatch(logout());
      nav("/Email");
    }
  };

  useEffect(() => {
    if (SocketConnection) {
      SocketConnection.emit("sidebar", user?._id);

      SocketConnection.on("Conversation", (data) => {
        console.log(data);
        const ConversationData = data.map((conversationUser, index) => {
          if (conversationUser.sender?._id === conversationUser.receiver?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          } else if (conversationUser?.receiver?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });

        setallUsers(ConversationData);
      });
    }
  }, [SocketConnection, user]);

  return (
    <>
      {/* side bar */}
      <div class="w-full h-full grid grid-cols-[64px,1fr]">
        <div class="w-16 h-full py-2 lg:max-w-fit max-h-full bg-gray-200 rounded-sm">
          <div class="flex flex-col justify-between h-full">
            <div class="flex justify-center items-center flex-col gap-1">
              <NavLink
                title="Home"
                className="w-16 h-16 flex justify-center items-center hover:bg-slate-500 text-black hover:text-white  rounded-sm"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="2em"
                  width="2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                    clip-rule="evenodd"
                  ></path>
                  <path d="M5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                </svg>
              </NavLink>

              <button
                title="Add Users"
                onClick={() => setSearchUserB(!SearchUserB)}
                className="w-16 h-16 flex justify-center items-center hover:bg-slate-500 text-black hover:text-white sidebaractive"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 22 22"
                  height="2em"
                  width="2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    d="M6,8c0,1.178,0.822,2,2,2s2-0.822,2-2S9.178,6,8,6S6,6.822,6,8z"
                  ></path>
                  <path d="M19 8L17 8 17 11 14 11 14 13 17 13 17 16 19 16 19 13 22 13 22 11 19 11zM4 8c0 2.28 1.72 4 4 4s4-1.72 4-4-1.72-4-4-4S4 5.72 4 8zM10 8c0 1.178-.822 2-2 2S6 9.178 6 8s.822-2 2-2S10 6.822 10 8zM4 18c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v1h2v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2V18z"></path>
                </svg>
              </button>
            </div>
            <div className="flex justify-center flex-col gap-1 items-center">
              <button
                title={user?.name}
                className="m-2"
                onClick={() => setEditUserBtn(true)}
              >
                <Avatar
                  width={50}
                  height={50}
                  name={user?.name}
                  imageUrl={user?.profile_pic}
                  userId={user?._id}
                />
              </button>

              <button
                title="LogOut"
                onClick={HandleLogOut}
                className="w-16 h-16 flex justify-center items-center sidebaractive hover:bg-slate-500 text-black hover:text-white"
              >
                <svg
                  className="-ml-3"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 22"
                  height="2em"
                  width="2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 13L16 11 7 11 7 8 2 12 7 16 7 13z"></path>
                  <path d="M20,3h-9C9.897,3,9,3.897,9,5v4h2V5h9v14h-9v-4H9v4c0,1.103,0.897,2,2,2h9c1.103,0,2-0.897,2-2V5C22,3.897,21.103,3,20,3z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* message name box */}
        <div className="w-full shadow-lg h-16">
          <div className="h-16 items-center flex">
            <h2 className="text-2xl text-left font-bold p-4">Messages</h2>
          </div>
          <div className="py-[0.5px] bg-slate-300 w-full"></div>

          <div className=" h-[calc(100vh-66px)] overflow-x-hidden overflow-y-auto scrollbar">
            {allUsers.length === 0 && (
              <div className="flex flex-col justify-center items-center mt-10">
                <div>
                  <svg
                    stroke="currentColor"
                    className="text-slate-400"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 640 512"
                    height="5em"
                    width="5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>
                  </svg>
                </div>
                <div className="text-2xl text-center text-slate-400">
                  Explore Users To Start Conversation
                </div>
              </div>
            )}

            {allUsers.map((data, index) => {
              return (
                <div>
                  <NavLink to={`/${data?.userDetails?._id}`}>
                    <div className="flex gap-4 flex-row py-3 px-2 m-2.5 max-w-3xl shadow-md lg:w-[320px] md:w-full hover:bg-gray-200 rounded border-4 hover:border-blue-500">
                      <Avatar
                        imageUrl={data?.userDetails?.profile_pic}
                        name={data?.userDetails?.name}
                        width={80}
                        height={80}
                      />
                      <div className="flex">
                        <div className="flex flex-col gap-2 text-left items-start">
                          <div className="flex gap-5 items-center">
                            <p className="font-sans font-bold text-xl">
                              {data?.userDetails?.name}
                            </p>
                          </div>
                          <div className="flex gap-1 items-center">
                            {data?.lastMsg?.imageUrl && (
                              <div className="font-sans flex items-center gap-1 font-semibold text-md text-slate-500">
                                <span>
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 16 16"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M14.002 2h-12a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zm-12-1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2h-12z"
                                      clip-rule="evenodd"
                                    ></path>
                                    <path d="M10.648 7.646a.5.5 0 01.577-.093L15.002 9.5V14h-14v-2l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"></path>
                                    <path
                                      fill-rule="evenodd"
                                      d="M4.502 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                                {!data?.lastMsg?.text && <span>Image</span>}
                              </div>
                            )}
                            {data?.lastMsg?.videoUrl && (
                              <div className="font-sans flex items-center gap-1 font-semibold text-md text-slate-500">
                                <span>
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 16 16"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"></path>
                                    <path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"></path>
                                  </svg>
                                </span>
                                {!data?.lastMsg?.text && <span>Video</span>}
                              </div>
                            )}
                            {data?.lastMsg?.text && data?.unseenMsg !== 0 ? (
                              <p className="font-sans font-bold text-md  text-green-500 truncate text-ellipsis line-clamp-1">
                                {data?.lastMsg?.text}
                              </p>
                            ) : data?.lastMsg?.text && data?.unseenMsg === 0 ? (
                              <p className="font-sans font-semibold text-md  text-slate-500 truncate text-ellipsis line-clamp-1">
                                {data?.lastMsg?.text}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="w-fit ml-auto flex flex-col justify-center items-center gap-6">
                        <div>
                          {GettingIsOnlineOrNot(data?.userDetails?._id) ? (
                            <div className=" font-sans text-sm font-extrabold leading-4 text-green-600">
                              Online <sup className="text-xl mb-0">.</sup>{" "}
                            </div>
                          ) : (
                            <div className=" font-sans text-sm font-extrabold leading-4 text-red-600">
                              Offline <sup className="text-xl mb-0"></sup>{" "}
                            </div>
                          )}
                        </div>
                        <div>
                        {data?.unseenMsg !== 0 ? (
                              <p className="bg-green-500 text-white ml-auto rounded-full text-right p-1 w-6 flex items-center justify-center h-6 text-md">
                                {data?.unseenMsg}
                              </p>
                            ) : (
                              ""
                            )}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>

        {/* users search option */}
        {SearchUserB && (
          <SearchUsers
            onclose={() => {
              setSearchUserB(false);
            }}
          />
        )}

        {/* edit user */}
        {EditUserBtnfunc && (
          <EditUserBtn onclose={() => setEditUserBtn(false)} user={user} />
        )}
      </div>
    </>
  );
};

export default SideBar;
