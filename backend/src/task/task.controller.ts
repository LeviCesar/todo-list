import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Request } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post()
    @HttpCode(201)
    createTask(@Request() req, @Body() taskDto: Record<string, any>) {
        return this.taskService.createTask(
            req.user.sub,
            taskDto.description,
        );
    }

    @Get()
    @HttpCode(200)
    getTaskList(@Request() req) {
        return this.taskService.getTaskList(req.user.sub)
    }

    @Patch(':id/description')
    @HttpCode(204)
    updatedTaskDescription(
        @Request() req,
        @Param('id') id: string,
        @Body() taskDto: Record<string, any>,
    ) {
        return this.taskService.updateTaskDescription(
            req.user.sub,
            id,
            taskDto.description,
        );
    }

    @Patch(':id/status')
    @HttpCode(204)
    updateTaskStatus(
        @Request() req,
        @Param('id') id: string,
        @Body() taskStatusDto: Record<string, any>,
    ) {
        return this.taskService.updateTaskStatus(
            req.user.sub,
            id,
            taskStatusDto.status,
        );
    }

    @Delete(':id')
    @HttpCode(204)
    removeTask(@Request() req, @Param('id') id: string) {
        return this.taskService.removeTask(
            req.user.sub,
            id,
        )
    }
}
