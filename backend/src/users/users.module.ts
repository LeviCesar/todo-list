
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
