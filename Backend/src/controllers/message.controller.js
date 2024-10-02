import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {
    try {

        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        // console.log(message);
        // console.log(receiverId);


        // console.log(req.user._id);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }
        )

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        // console.log(senderId);
        // console.log(conversation);
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {

            conversation.messages.push(newMessage._id)
        }

        await conversation.save();
        await newMessage.save();

        res.status(201).json({ newMessage })
    } catch (error) {
        res.status(400).json({ error: "Error while sending mesage" })
        console.log(error.message);
    }
}
export const getMessage = async (req, res) => {
    try {


        const { id: userToChatId } = req.params
        const senderId = req.user._id

        // console.log(message);
        // console.log(receiverId);


        // console.log(req.user._id);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }
        ).populate("messages")

        res.status(201).json(conversation.messages)

    } catch (error) {
        res.status(400).json({ error: "Error while sending mesage" })
        console.log(error.message);
    }
}
