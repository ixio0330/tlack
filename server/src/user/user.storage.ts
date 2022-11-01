import database from "../database";
import { UpdateUserDto, UserEntity } from "./user.dto";

class UserStorage {
  async getById(id: string) {
    try {
      const result = await database.query(`select * from user where id='${id}'`);
      return result?.rows[0] || null;
    } catch (error) {
      return null;
    }
  }

  async create({ id, password, salt, nickname, status }: UserEntity) {
    return await database.query(`
      insert into user (id, password, salt, nickname, status)
      values ('${id}', '${password}', '${salt}', '${nickname}', '${status}')
    `);
  }

  async update({id, nickname, status}: UpdateUserDto) {
    return await database.query(`
      update user set nickname='${nickname}', status='${status}', where id='${id}'
    `);
  }
}

const userStorage = new UserStorage();
export default userStorage;