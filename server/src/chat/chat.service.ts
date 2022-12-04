import { CreateChatDto, GetChatDto } from "./chat.dto";
import chatStorage from "./chat.storage";
import { generateShortUuid } from 'custom-uuid';

class ChatService {
  async create(chat: CreateChatDto) {
    const time = new Date().toISOString().split('T');
    const senttime = `${time[0]} ${time[1].slice(0, -2)}`;
    
    return await chatStorage.create({
      ...chat,
      id: generateShortUuid(),
      senttime,
    });
  }

  async getByChatId(chat_id: string) {
    return await chatStorage.getByChatId(chat_id);
  }

  async getAllByChannelId(getChat: GetChatDto) {
    return await chatStorage.getAllByChannelId(getChat);
  }
}

const chatService = new ChatService();
export default chatService;