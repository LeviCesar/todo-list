
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(email: string, password: string): Promise<{ id: string }> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    try {
      const user = await this.userModel.create({ 
        email: email, 
        hashPasswd: hash, 
      });

      return { id: user.id };
    } catch {
      throw new ConflictException("user already exist");
    }

  }

  async findOne(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }
}
