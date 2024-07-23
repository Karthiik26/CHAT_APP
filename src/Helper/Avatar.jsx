import React from "react";

const Avatar = ({ name, imageUrl, userId, email, width, height }) => {
  let avatarName = "";
  if (name) {
    const SplitName = name?.split(" ");
    if (SplitName.length > 1) {
      avatarName = SplitName[0][0] + SplitName[1][0];
    } else {
      avatarName = SplitName[0][0];
    }
  }


  const BGavatar = [
    'bg-blue-200',
    'bg-yellow-100',
    'bg-gray-200',
    'bg-green-200',
    'bg-pink-300',
    'bg-red-200',
  ]

  const random = Math.floor(Math.random() * 5 );
  console.log(random);

  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="rounded-full shadow-xl border-2 overflow-hidden text-slate-800"
          style={{ width: width + "px", height: height + "px" }}
        >
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                style={{ width: width + "px", height: height + "px" }}
                alt={name}
                className=" overflow-hidden rounded-full"
              />
            </>
          ) : name ? (
            <>
              <div
                style={{ width: width + "px", height: height + "px" }}
                className={` flex justify-center items-center overflow-hidden rounded-full text-2xl font-bold ${BGavatar[random]}`}
              >
                {avatarName}
              </div>
            </>
          ) : (
            <>null</>
          )}
        </div>
      </div>
    </>
  );
};

export default Avatar;
