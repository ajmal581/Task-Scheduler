import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { TaskStatus } from './task.entity';
import { IsEnum, IsNotEmpty, IsString , IsOptional, MinLength  } from 'class-validator';
import { Request } from 'express';
import { User } from 'src/users/user.entity';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number; 
  };
}


class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @MinLength(10, { message: 'Task description was too short' })
  description: string;
}

class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Task description was too short' })
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status must be one of: pending, in-progress, completed' })
  status: TaskStatus;
}



@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateTaskDto) {
    const userId = req.user.userId;

    return this.tasksService.createTask({ id: userId } as User, dto);
  }

  @Get()
  getAll(@Req() req: AuthenticatedRequest & { user: { userId: number } },
  @Query('status') status?: string) {
    return this.tasksService.findAllForUser(req.user.userId, status);
  }

  @Get()
  getTasks(@Req() req: AuthenticatedRequest & { user: { userId: number } }){
    return this.tasksService.findTasks(req.user.userId);
  }

  @Get(':id')
  getTaskId(@Req() req: AuthenticatedRequest, @Param('id') id: number,){
    return this.tasksService.findTaskId(req.user.userId, id);
  }

  @Patch(':id')
  update(@Req() req: AuthenticatedRequest, @Param('id') id: number, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(req.user.userId, id, dto);
  }

  @Delete(':id')
  delete(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    return this.tasksService.deleteTask(req.user.userId, id);
  }
}
