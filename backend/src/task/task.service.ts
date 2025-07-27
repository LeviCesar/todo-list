import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  async create(userId: string, description: string): Promise<{ id: string }> {
    if (userId == null) {
      throw new BadRequestException("userId can't be empty")
    }

    if (description == null) {
      throw new BadRequestException("description can't be empty")
    }

    const user = await this.taskModel.create({
      description,
      userId
    });

    return { id: user.id }
  }

  async findAllByUser(
    userId: string,
  ): Promise<{
    tasks: Array<{ id: string, description: string, status: boolean }>;
  }> {
    const tasks = await this.taskModel.findAll({
      where: { userId },
      attributes: ['id', 'description', 'status'],
      raw: true,
    });

    return { tasks } 
  }

  async updateDescription(
    userId: string,
    id: string,
    description: string,
  ): Promise<{ description: string }> {
    await this.taskModel.update(
      { description: description },
      {
        where: {
          userId: userId,
          id: id,
        },
      },
    );

    return { description };
  }

  async updateStatus(
    userId: string,
    id: string,
    status: boolean,
  ): Promise<boolean> {
    return true;
  }

  async remove(userId: string, id: string): Promise<boolean> {
    return true;
  }
}
