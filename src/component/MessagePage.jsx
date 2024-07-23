import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import Avatar from "../Helper/Avatar";
import uploadFile from "../Helper/UploadFile";
import Loading from "../component/Loading";
import "../App.css";
import moment from "moment";

const MessagePage = () => {
  // const [MessageData, setMessageData] = useState(true);
  const Params = useParams();
  const user = useSelector((state) => state.user);
  const SocketConnection = useSelector((state) => state.user.SocketConnection);
  const [OpenMeadiaButton, setOpenMeadiaButton] = useState(false);
  const [OpenTopButton, setOpenTopButton] = useState(false);

  const [DataUser, setDataUser] = useState({
    id: "",
    name: "",
    email: "",
    online: false,
    profil_pic: "",
    phone: "",
    msgByUserId: "",
  });

  const [MessageData, setMessageData] = useState({
    text: "",
    videoUrl: "",
    imageUrl: "",
  });

  console.log(Params.userId);
  const [AllMessages, setAllMessages] = useState([]);
  useEffect(() => {
    if (SocketConnection) {
      SocketConnection.emit("message-page", Params.userId);

      SocketConnection.emit("seen", Params.userId);

      SocketConnection.on("message-user", (data) => {
        setDataUser(data);
      });

      SocketConnection.on("message", (data) => {
        setAllMessages(data);
        console.log(data);
      });
    }
  }, [SocketConnection, Params]);

  const [Loader, setLoader] = useState(false);

  const HandleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoader(true);
    const response = await uploadFile(file);
    setLoader(false);
    setOpenMeadiaButton(false);
    console.log(response);
    setMessageData((Preve) => {
      return {
        ...Preve,
        imageUrl: response?.url,
      };
    });
  };

  const handleclearImage = () => {
    setMessageData((Preve) => {
      return {
        ...Preve,
        imageUrl: "",
      };
    });
  };

  const HandleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoader(true);
    const response = await uploadFile(file);
    setLoader(false);
    setOpenMeadiaButton(false);
    console.log(response);
    setMessageData((Preve) => {
      return {
        ...Preve,
        videoUrl: response?.url,
      };
    });
  };

  const handleclearVideo = () => {
    setMessageData((Preve) => {
      return {
        ...Preve,
        videoUrl: "",
      };
    });
  };

  const HandleMessageBox = async (e) => {
    const { name, value } = e.target;
    setMessageData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
    console.log(MessageData);
  };

  const HandleSendMessage = (e) => {
    e.preventDefault();

    if (MessageData.text || MessageData.imageUrl || MessageData.videoUrl) {
      if (SocketConnection) {
        SocketConnection.emit("new message", {
          sender: user?._id,
          receiver: Params.userId,
          text: MessageData.text,
          imageUrl: MessageData.imageUrl,
          videoUrl: MessageData.videoUrl,
          msgByUserId: user?._id,
        });
        setMessageData({
          text: "",
          videoUrl: "",
          imageUrl: "",
        });
      }
    }
  };

  const CurrentRef = useRef();

  useEffect(() => {
    if (CurrentRef.current) {
      CurrentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [AllMessages]);

  return (
    <div className="BGIMG">
      {/* header */}
      <section className=" top-0 bg-white py-2 justify-between flex items-center w-full h-16">
        <div className="mx-4 flex flex-row justify-center items-center ">
          <div className={'mx-4'} >
            <NavLink to={"/"}  >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1.5em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
              </svg>
            </NavLink>
          </div>
          <div>
            <Avatar
              imageUrl={DataUser.profil_pic}
              width={48}
              height={48}
              name={DataUser.name}
            />
          </div>
          <div  className={'mx-4'}  >
            <div className="font-bold leading-8 tracking-wider text-[22px]">
              {DataUser.name}
            </div>
            {DataUser.online ? (
              <div className=" font-bold text-sm text-green-600">Online</div>
            ) : (
              <div className=" font-bold text-sm text-red-600">Offline</div>
            )}
          </div>
        </div>
        <div className="mx-4 flex justify-center items-center flex-row">
          <button
            className=" hover:text-slate-400"
            onClick={() => setOpenTopButton(!OpenTopButton)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="1.5em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {OpenTopButton && (
          <div className="bg-white w-40 p-2 absolute right-10 top-16 rounded-lg ml-12 overflow-hidden border-2">
            <form>
              <div>
                <label
                  htmlFor="HandleUploadImage"
                  className="flex cursor-pointer flex-row justify-center px-3 py-2 hover:bg-gray-300 gap-3 items-center rounded "
                >
                  <div className="text-teal-600"></div>
                  <p>Image</p>
                </label>
              </div>

              <div>
                <label
                  htmlFor="HandleUploadVideo"
                  className="flex cursor-pointer flex-row justify-center px-3 py-2 hover:bg-gray-300 gap-3 items-center rounded "
                >
                  <div className="text-purple-700"></div>
                  <p>Video</p>
                </label>
              </div>
            </form>
          </div>
        )}
      </section>

      {/* main */}
      <section className="h-[calc(100vh-140px)] md:h-[calc(100vh-240px)] overflow-hidden overflow-y-scroll scrollbar">
        {AllMessages?.map((msg, index) => {
          return (
            <div
              ref={CurrentRef}
              className={`bg-white p-1 rounded mx-2 my-2 w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                user?._id === msg?.msgByUserId ? "ml-auto" : ""
              } `}
            >
              <div
                className={` ${
                  user?._id === msg?.msgByUserId
                    ? "bg-green-200 px-2 font-semibold text-md py-1"
                    : "bg-gray-300 px-2 font-semibold text-md py-1"
                }`}
              >
                {msg?.imageUrl && (
                  <div className="bg-neutral-50">
                    <img
                      src={msg?.imageUrl}
                      alt="Img Not Found"
                      width={280}
                      height={350}
                    />
                  </div>
                )}

                {msg?.videoUrl && (
                  <div className="bg-neutral-50">
                    <video
                      src={msg?.videoUrl}
                      width={280}
                      height={350}
                      controls
                      muted
                      autoPlay
                    />
                  </div>
                )}

                <p> {msg.text}</p>
                <p
                  className={` ${
                    user?._id === msg?.msgByUserId
                      ? "ml-auto text-[15px] w-fit font-bold p-1"
                      : "mr-auto text-[15px] w-fit font-bold p-1"
                  }`}
                >
                  {moment(msg.createdAt).format("hh:mm")}
                </p>
              </div>
            </div>
          );
        })}

        {MessageData.imageUrl ? (
          <div className="flex justify-center sticky bottom-0 text-left flex-col items-center bg-gray-300 opacity-95 w-full h-full">
            <div>
              <button
                onClick={handleclearImage}
                className="font-sans cursor-pointer text-3xl flex text-red-600 font-bold"
              >
                x
              </button>
              <div className="bg-white p-3">
                <img
                  src={MessageData.imageUrl}
                  width={300}
                  height={300}
                  alt="image not found"
                  className=" aspect-auto h-full w-full max-w-sm p-4"
                />
              </div>
            </div>
          </div>
        ) : null}
        {MessageData.videoUrl ? (
          <div className="flex sticky bottom-0 justify-center items-center bg-gray-200 opacity-90 w-full h-full">
            <div>
              <button
                onClick={handleclearVideo}
                className="font-sans cursor-pointer text-3xl flex text-red-600 font-bold"
              >
                x
              </button>
              <div className="bg-white p-3">
                <video
                  src={MessageData?.videoUrl}
                  width={300}
                  height={300}
                  controls
                  muted
                  autoPlay
                  className=" aspect-video h-full w-full max-w-sm p-4"
                ></video>
              </div>
            </div>
          </div>
        ) : null}
        {Loader && (
          <div className="w-full h-full sticky bottom-0 flex justify-center items-center">
            <Loading />
          </div>
        )}
      </section>

      {/* footer */}
      <section className="bg-white py-2 flex items-center w-full h-full">
        <div className="flex justify-center items-center my-2 ml-4 w-11 h-11 rounded-full hover:bg-teal-400 hover:text-white">
          <button onClick={() => setOpenMeadiaButton(!OpenMeadiaButton)}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="2em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 11L13 11 13 5 11 5 11 11 5 11 5 13 11 13 11 19 13 19 13 13 19 13z"></path>
            </svg>
          </button>
        </div>
        <div className="w-full h-full flex gap-3 mr-4">
          <form onSubmit={HandleSendMessage} className="flex w-full h-full">
            <input
              type="text"
              name="text"
              placeholder="Type Message Here......"
              onChange={HandleMessageBox}
              value={MessageData.text}
              className="w-full h-full flex py-3 text-xl px-2 outline-none"
            />
            {/* <div className="flex justify-center items-center  ml-4 w-14 h-14 rounded-full hover:bg-teal-400 hover:text-white"> */}
            <button
              type="submit"
              className="text-green-800 text-center rounded-full hover:text-green-400"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1.8em"
                width="1.8em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
            {/* </div> */}
          </form>
        </div>

        {/* Upload Pic or video */}
        {OpenMeadiaButton && (
          <div className="bg-white w-40 p-2 absolute bottom-20 rounded-lg ml-12 overflow-hidden border-2">
            <form>
              <div>
                <label
                  htmlFor="HandleUploadImage"
                  className="flex cursor-pointer flex-row justify-center px-3 py-2 hover:bg-gray-300 gap-3 items-center rounded "
                >
                  <div className="text-teal-600">
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
                  </div>
                  <p>Image</p>
                </label>
              </div>

              <div>
                <label
                  htmlFor="HandleUploadVideo"
                  className="flex cursor-pointer flex-row justify-center px-3 py-2 hover:bg-gray-300 gap-3 items-center rounded "
                >
                  <div className="text-purple-700">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM328 352c0 4.4-3.6 8-8 8H208c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h112c4.4 0 8 3.6 8 8v48zm560 273l-104-59.8V458.9L888 399v226z"></path>
                    </svg>
                  </div>
                  <p>Video</p>
                </label>
              </div>

              <input
                type="file"
                onChange={HandleUploadImage}
                alt="Upload Image"
                className="hidden"
                id="HandleUploadImage"
              />
              <input
                type="file"
                onChange={HandleUploadVideo}
                alt="Upload Video"
                className="hidden"
                id="HandleUploadVideo"
              />
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default MessagePage;

// 578 7 ton 35000 