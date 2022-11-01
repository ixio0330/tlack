type UserStatus = 'online' | 'offline' | 'empty' | 'busy';

export interface UserEntity {
  id: string;
  nickname: string;
  status: UserStatus;
  password: string;
  salt: string;
}

export interface CreateUserDto {
  id: string;
  nickname: string;
  password: string;
}

export interface UpdateUserDto {
  id: string;
  nickname?: string;
  status?: UserStatus;
}
