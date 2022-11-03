import database from "../database";
import { UpdateUserDto, UserEntity } from "./user.dto";

class UserStorage {
  async getById(id: string) {
    try {
      const result = await database.query(`select * from users where id='${id}'`);
      return result?.rows[0] || null;
    } catch (error) {
      return null;
    }
  }

  async create({ id, password, salt, nickname, status }: UserEntity) {
    try {
      return await database.query(`
        insert into users (id, password, salt, nickname, status) values ('${id}', '${password}', '${salt}', '${nickname}', '${status}')
      `);
    } catch (error) {
      throw new Error('사용자 생성 중 오류가 발생했습니다.');
    }
  }

  async update({ id, nickname, status }: UpdateUserDto) {
    let query = `
      update users set nickname='${nickname}', status='${status}' where id='${id}'
    `;

    if (nickname && !status) {
      query = `update users set nickname='${nickname}' where id='${id}'`;
    }
    if (!nickname && status) {
      query = `update users set status='${status}' where id='${id}'`;
    }
    try {
      return await database.query(query); 
    } catch (error) {
      throw new Error('사용자 수정 중 오류가 발생했습니다.');
    }
  }
}

const userStorage = new UserStorage();
export default userStorage;