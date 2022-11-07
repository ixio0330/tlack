import BadRequest from '../error/badRequest';
import crypto from '../utils/crypto';
import { CreateUserDto, UpdateUserDto, UserEntity } from './user.dto';
import userStorage from './user.storage';

class UserService {
  async getById(id: string) {
    const user = await userStorage.getById(id);
    if (user === null) {
      throw new BadRequest('존재하지 않는 사용자입니다.');
    }
    return user as UserEntity;
  }

  async create(user: CreateUserDto) {
    if (await userStorage.getById(user.id)) {
      throw new BadRequest('이미 존재하는 사용자입니다.');
    }
    
    const { hashPassword, salt } = await crypto.createHashedPassword(user.password);
    await userStorage.create({
      ...user,
      password: hashPassword,
      salt,
      status: 'online',
    });
  }

  async update(user: UpdateUserDto) {
    await this.getById(user.id);
    await userStorage.update(user);
  }
}

const userService = new UserService();
export default userService;