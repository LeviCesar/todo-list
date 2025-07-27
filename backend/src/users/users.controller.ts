import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() userDto: Record<string, any>) {
        return this.userService.create(userDto.email, userDto.password)
    }
}
