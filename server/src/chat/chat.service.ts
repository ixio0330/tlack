import { CreateChatDto, GetChatDto } from "./chat.dto";
import chatStorage from "./chat.storage";
import { generateShortUuid } from 'custom-uuid';

class ChatService {
  async create(chat: CreateChatDto) {
    return await chatStorage.create({
      ...chat,
      id: generateShortUuid(),
      senttime: new Date().toISOString(),
    });
  }

  async getAllByChannelId(getChat: GetChatDto) {
    return await chatStorage.getAllByChannelId(getChat);
  }
}

const chatService = new ChatService();
export default chatService;