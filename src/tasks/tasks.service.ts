import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  createTask(user: User, data: Partial<Task>) {
    const task = this.repo.create({...data, user });
    return this.repo.save(task);
  }

  findAllForUser(userId: number, status?: string) {
    const query = this.repo.createQueryBuilder('task')
      .orderBy('task.id','ASC')
      .where('task.userId = :userId', { userId });


    if (status) query.andWhere('task.status = :status', { status });

    return query.getMany();
  }

  findTasks(userId: number) {
    const query = this.repo.createQueryBuilder('task')
      .orderBy('task.id','ASC')
      .where('task.userId = :userId', { userId }) ;

      

    
    return query.getMany();
  }

  findTasks1234(userId: number) {
    const query = this.repo.createQueryBuilder('task')
      .orderBy('task.id','ASC')
       ;

      

    
    return query.getMany();
  }

  async findTaskId(userId: number,  id: number) {
    const task = await this.repo.findOne({ where: { id, user: { id: userId } } });
    if (!task) {
      //throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(userId: number, id: number, data: Partial<Task>) {
    const task = await this.repo.findOne({ where: { id, user: { id: userId } } });
    if (!task) return null;
    Object.assign(task, data);
    return this.repo.save(task);
  }

  async deleteTask(userId: number, id: number) {
    return this.repo.delete({ id, user: { id: userId } });
  }
}
