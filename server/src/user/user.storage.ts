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
    return await database.query(`
      insert into users (id, password, salt, nickname, status) values ('${id}', '${password}', '${salt}', '${nickname}', '${status}')
    `);
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

    console.log(query);

    return await database.query(query);
  }

  async updateStatus() {
    
  }
}

const userStorage = new UserStorage();
export default userStorage;