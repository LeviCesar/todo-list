import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  async create(userId: string, description: string): Promise<{ id: string }> {
    return { id: '' };
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
  ): Promise<boolean> {
    return true;
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
