const { ConverationModel } = require("../module/ConversationModel");

const getConversation = async (currentuserid) => {
  if (currentuserid) {
    const CurrentUserConversation = await ConverationModel.find({
      $or: [{ sender: currentuserid }, { receiver: currentuserid }],
    })
      .sort({ updatedAt: -1 })
      .populate("messages")
      .populate("sender")
      .populate("receiver");

    // console.log("CurrentUserConversation", CurrentUserConversation);

    const conversation = CurrentUserConversation.map((convers) => {
      const countunseenMsg = convers.messages.reduce((preve, curr) => {
        if (curr?.msgByUserId.toString() !== currentuserid) {
          return preve + (curr.seen ? 0 : 1);
        } else {
          return preve;
        }
      }, 0);
      return {
        _id: convers?._id,
        sender: convers?.sender,
        receiver: convers?.receiver,
        unseenMsg: countunseenMsg,
        lastMsg: convers.messages[convers?.messages?.length - 1],
      };
    });

    return conversation;
    // socket.emit("Conversation", conversation);
  } else {
    return [];
  }
};

module.exports = getConversation;
