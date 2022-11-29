import Message from './models/message.js';
import { MessageModel, UserModel, ChatBoxModel } from "./models/chatbox"

const makeName = (name, to) => {return [name, to].sort().join("_"); };

const validateUser = async(name) => {
	console.log("Finding..." + name);
	const existing = await UserModel.findOne({ name });
	console.log(existing);
	if (existing) return existing;
};

const validateChatBox = async(name, participants) => {
	let box = await ChatBoxModel.findOne({ name });
	if (!box)
		box = await new ChatBoxModel({ name, users: participants }).save();
	return box.populate(["users", {path: "messages", populate: "sender"}]);
};

const chatBoxes = {};

export default {
	onMessage: (wss, ws) => (
		async(byteString) => {
			const {data} = byteString;
			const [task, payload] = JSON.parse(data);
			switch(task) {
				case 'MESSAGE': {
					const {name, to, body} = payload;
					const chatBoxName = makeName(name, to);
					if (!chatBoxes[chatBoxName])
						chatBoxes[chatBoxName] = new Set();
					chatBoxes[chatBoxName].add(ws);
					const message = new MessageModel({sender: name, body: body, chatBox: chatBoxName});
					try {
						await message.save();
					} catch (e) {
						throw new Error("Message DB save error: " + e);
					}
					break;
				}
				case "clear": {
					Message.deleteMany({}, () => {
						broadcaseMessage(
							ws,
							["cleared"],
							{
								type: "info",
								msg: "Message cache cleared."
							});
					});
					break;
				}
				default: break;
			}
		}
	)
}







/*const sendData = (data, ws) => { ws.send(JSON.stringify(data));}
const sendStatus = (payload, ws) => { sendData(["status", payload], ws);}
const broadcaseMessage = (wss, data, status) => {
  wss.clients.forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
  })
};
export default {
	initData: (ws) => {
		Message.find().sort({created_at: -1}).limit(100).exec((err, res) => {
			console.log(res);
			if (err) throw err;
			sendData(["init", res], ws);
		});
	},
	onMessage: (ws) => 	(
		async(byteString) => {
			const {data} = byteString;
			const [task, payload] = JSON.parse(data);
			switch(task) {
				case 'input': {
					const {name, body} = payload;
					const message = new Message({name, body});
					try {
						await message.save();
					} catch (e) {
						throw new Error("Message DB save error: " + e);
					}
					broadcaseMessage(
						ws,
						["output", [payload]],
						{
							type: "success",
							msg: "Message sent."
						}); 
					break;
				}
				case "clear": {
					Message.deleteMany({}, () => {
						broadcaseMessage(
							ws,
							["cleared"],
							{
								type: "info",
								msg: "Message cache cleared."
							});
					});
					break;
				}
				default: break;
			}
		}
	)
}*/