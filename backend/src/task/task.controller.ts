import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Request } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createTask(@Request() req, @Body() taskDto: Record<string, any>) {
        return this.taskService.create(
            req.user.sub,
            taskDto.description,
        );
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getTaskList(@Request() req) {
        return this.taskService.findAllByUser(req.user.sub)
    }

    @Patch(':id/description')
    @HttpCode(HttpStatus.OK)
    updatedTaskDescription(
        @Request() req,
        @Param('id') id: string,
        @Body() taskDto: Record<string, any>,
    ) {
        return this.taskService.updateDescription(
            req.user.sub,
            id,
            taskDto.description,
        );
    }

    @Patch(':id/status')
    @HttpCode(HttpStatus.NO_CONTENT)
    updateTaskStatus(
        @Request() req,
        @Param('id') id: string,
        @Body() taskStatusDto: Record<string, any>,
    ) {
        return this.taskService.updateStatus(
            req.user.sub,
            id,
            taskStatusDto.status,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeTask(@Request() req, @Param('id') id: string) {
        return this.taskService.remove(
            req.user.sub,
            id,
        )
    }
}
