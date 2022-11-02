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
    const { hashPassword, salt } = await crypto.createHashedPassword(user.password);
    try {
      await userStorage.create({
        ...user,
        password: hashPassword,
        salt,
        status: 'offline',
      });
    } catch (error) {
      throw new Error('사용자 생성 중 오류가 발생했습니다.');
    }
  }

  async update(user: UpdateUserDto) {
    try { 
      await userStorage.update(user);
    } catch (error) {
      throw new Error('사용자 수정 중 오류가 발생했습니다.');
    }
  }
}

const userService = new UserService();
export default userService;