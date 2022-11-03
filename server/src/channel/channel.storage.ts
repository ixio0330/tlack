import database from "../database";
import { ChannelEntity, InviteChannelDto } from "./channel.dto";

class ChannelStorage {
  async getChannelListLength(workspace_id: string) {
    try {
      const result = await database.query(`select count(workspace_id) from channels where workspace_id='${workspace_id}'`);
      return parseInt(result?.rows[0].count);
    } catch (error) {
      throw new Error('채널 개수 조회 중 오류가 발생했습니다.');
    }
  }

  async create({ id, name, description, workspace_id }: ChannelEntity) {
    try {
      await database.query(`
        insert into channels (id, name, description, workspace_id) values
        ('${id}', '${name}', ${description ? `'${description}'` : null}, '${workspace_id}')
      `);
    } catch (error) {
      console.log(error);
      throw new Error('채널 생성 중 오류가 발생했습니다.');
    }
  }

  async invite({ users, channel_id }: InviteChannelDto) {
    try {
      let query = 'insert into invites_channel (user_id, channel_id) values ';
      users.forEach((user, index) => {
        if (users.length - 1 === index) {
          query += ` ('${user}', '${channel_id}')`;
          return;
        }
        query += `('${user}', '${channel_id}'),`;
      });
      return await database.query(query);
    } catch (error) {
      throw new Error('채널에 사용자 초대 중 오류가 발생했습니다.');
    }
  }

  async getAllChannels(workspace_id: string) {
    try {
      const result = await database.query(`select * from channels where workspace_id='${workspace_id}'`);
      return result?.rows;
    } catch (error) {
      throw new Error('채널 조회 중 오류가 발생했습니다.');
    }
  }
}

const channelStorage = new ChannelStorage();
export default channelStorage;