import database from "../database";
import { ChatEntity, GetChatDto } from "./chat.dto";

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

  async getAllByChannelId({ channel_id, limit = 10, offset = 0 }: GetChatDto) {
    try {
      const result = await database.query(`
        select c.id, c.senttime, c.content, u.nickname 
        from chats c
          inner join users u
          on c.user_id=u.id
        where channel_id='${channel_id}'
        order by senttime
        limit ${limit}
        offset ${offset}
      `);
      return result?.rows;
    } catch (error) {
      throw new Error('채팅을 읽어오던 중 문제가 발생했습니다.')
    }
  }
}

const chatStorage = new ChatStorage();
export default chatStorage;