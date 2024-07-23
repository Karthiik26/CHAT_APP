const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getDetailsFromToken = require("../helper/getDetailsFromToken");
const getConversation = require('../helper/GetConversation');
const UserModel = require("../module/UserModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const {
  ConverationModel,
  MessageModel,
} = require("../module/ConversationModel");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// socket running at http://localhost:4545/

const OnlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("connect user", socket.id);

  const token = socket.handshake.auth.token;
  const user = await getDetailsFromToken(token);
  //   console.log(user);

  // create room
  socket.join(user?._id?.toString());

  //   UserOnline Or Not Checking And Pushing That Users Into array and emiting to other users
  OnlineUser.add(user?._id?.toString());

  //   send to all users
  io.emit("onlineUser", Array.from(OnlineUser));

  //   Send To particular user
  socket.on("message-page", async (userid) => {
    console.log("userid", userid);
    const UserDetails = await UserModel.findById(userid).select("-password");

    const payload = {
      id: UserDetails?._id,
      name: UserDetails?.name,
      email: UserDetails?.email,
      online: OnlineUser.has(userid),
      profil_pic: UserDetails?.profile_pic,
      phone: UserDetails?.phone,
    };

    socket.emit("message-user", payload);

    // Get previous messages

    const getConversationMessage = await ConverationModel.findOne({
      $or: [
        { sender: user?._id, receiver: userid },
        { sender: userid, receiver: user?._id },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    socket.emit("message", getConversationMessage?.messages);
  });

  // Socket new message
  socket.on("new message", async (data) => {
    let CheckConversation = await ConverationModel.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    });

    if (!CheckConversation) {
      const CreateConversation = await ConverationModel({
        sender: data?.sender,
        receiver: data?.receiver,
      });
      CheckConversation = await CreateConversation.save();
    }

    const message = new MessageModel({
      text: data?.text,
      imageUrl: data.imageUrl,
      videoUrl: data?.videoUrl,
      msgByUserId: data?.msgByUserId,
    });

    const saveMessage = await message.save();

    const UpdateConversation = await ConverationModel.updateOne(
      { _id: CheckConversation?._id },
      {
        $push: { messages: saveMessage?._id },
      }
    );

    const getConversationMessage = await ConverationModel.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    io.to(data?.receiver).emit(
      "message",
      getConversationMessage?.messages || []
    );
    io.to(data?.sender).emit("message", getConversationMessage?.messages || []);

    const conversationReceiver = await getConversation(data?.receiver);
    const conversationSender = await getConversation(data?.sender);

    io.to(data?.receiver).emit("Conversation", conversationReceiver);
    io.to(data?.sender).emit("Conversation", conversationSender);
  });

  // Conversation
  socket.on("sidebar", async (currentuserid) => {
    // console.log(currentuserid.toString());
    // Validate currentuserid
    // if (!ObjectId.isValid(currentuserid)) {
    //   console.log("Invalid currentuserid:", currentuserid);
    //   return;
    // }

    const conversation = await getConversation(currentuserid);
    socket.emit("Conversation", conversation);
  });

  socket.on("seen", async (receiversId) => {
    console.log("receiversId", receiversId);

    let CheckConversation = await ConverationModel.findOne({
      $or: [
        { sender: user?._id?.toString(), receiver: receiversId },
        { sender: receiversId, receiver: user?._id?.toString() },
      ],
    });

    const ConversationMessageId = CheckConversation?.messages || [];

    const Updatemessage = await MessageModel.updateMany(
      { _id: {"$in": ConversationMessageId }, msgByUserId: receiversId },
      { $set: { seen: true } }
    );

    const conversationReceiver = await getConversation(receiversId);
    const conversationSender = await getConversation(user?._id?.toString());

    io.to(receiversId).emit("Conversation", conversationReceiver);
    io.to(user?._id?.toString()).emit("Conversation", conversationSender);

  });

  socket.on("disconnect", () => {
    OnlineUser.delete(user?._id?.toString());
    console.log("disconnect user", socket.id);
  });
});

module.exports = {
  server,
  app,
};
