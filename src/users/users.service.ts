import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { CreateUser } from '../@core/application/user/create-user';
import { ListUsers } from '../@core/application/user/list-users';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ChangeUserPassword } from '../@core/application/user/change-user-password';
import { GetUser } from '../@core/application/user/get-user';
import { UpdateUserProfile } from '../@core/application/user/update-user-profile';

@Injectable()
export class UsersService {
  constructor(
    readonly createUser: CreateUser,
    readonly listUsers: ListUsers,
    readonly changeUserPassword: ChangeUserPassword,
    readonly getUser: GetUser,
    readonly updateUserProfile: UpdateUserProfile,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.createUser.execute(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async findAll() {
    return await this.listUsers.execute();
  }

  async findOne(id: string) {
    try {
      return await this.getUser.execute(id);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async changePassword(
    id: string,
    changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    try {
      return await this.changeUserPassword.execute(
        id,
        changeUserPasswordDto.oldPassword,
        changeUserPasswordDto.newPassword,
      );
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async updateProfile(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    try {
      return await this.updateUserProfile.execute(id, updateUserProfileDto);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
