import database from "../database";
import { ChatEntity } from "./chat.dto";

class ChatStorage {
  async create({ id, user_id, channel_id, content, senttime }: ChatEntity) {
    try {
      await database.query(`
        insert into chats (id, user_id, channel_id, content, senttime)
        values ('${id}', '${user_id}', '${channel_id}', '${content}', '${senttime}')
      `);
    } catch (error) {
      console.log(error);
      throw new Error('채팅 저장 중 문제가 발생했습니다.');
    }
  }

  async getAllByChannelId() {

  }
}

const chatStorage = new ChatStorage();
export default chatStorage;