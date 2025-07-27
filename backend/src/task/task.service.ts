import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
    async createTask(
        userId: string, 
        description: string,
    ): Promise<{ id: string }> {
        return { id: "" };
    }

    async getTaskList(
        userId: string,
    ): Promise<{ tasks: Array<{ id: string, description: string, status: boolean }> }> {
        return {
            tasks: [
                { id: "1", description: "to-do list", status: false },
                { id: "2", description: "sleep", status: false }
            ]
        }
    }

    async updateTaskDescription(
        userId: string, 
        id: string, 
        description: string,
    ): Promise<boolean> {
        return true;
    }

    async updateTaskStatus(
        userId: string, 
        id: string, 
        status: boolean,
    ): Promise<boolean> {
        return true;
    }

    async removeTask(
        userId: string, 
        id: string,
    ): Promise<boolean> {
        return true;
    }
}
