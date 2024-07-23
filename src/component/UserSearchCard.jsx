import React from "react";
import Avatar from "../Helper/Avatar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const UserSearchCard = ({ user, onClose }) => {
  const OnlineRedux = useSelector((state) => state.user.OnlineUser);
  const isOnline = OnlineRedux.includes(user?._id);

  return (
    <>
      {
        <div className="z-80" >
                  <NavLink
          onClick={onClose}
          to={`/${user?._id}`}
          className="hover:border hover:shadow-xl hover:border-blue-600 border-b-2 flex justify-between gap-3 items-center m-2 px-4 py-2 cursor-pointer"
        >
          <div className="flex justify-center item-center flex-row gap-3" >
            <div>
              <Avatar
                width={70}
                height={70}
                imageUrl={user?.profile_pic}
                name={user?.name}
                userId={user?._id}
              />
            </div>
            <div className="flex gap-3 flex-col float-left">
              <div>{user?.name}</div>
              <div>{user?.email}</div>
            </div>
          </div>
          <div>
            {isOnline ? (
              <div className=" font-sans text-sm font-extrabold leading-4 text-green-600">
                Online <sup className="text-xl mb-0">.</sup>{" "}
              </div>
            ) : (
              <div className=" font-sans text-sm font-extrabold leading-4 text-red-600">
                Offline <sup className="text-xl mb-0"></sup>{" "}
              </div>
            )}
          </div>
        </NavLink>
        </div>
      }
    </>
  );
};

export default UserSearchCard;
