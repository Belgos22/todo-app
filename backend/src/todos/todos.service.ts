import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(todo);
  }

async update(id: number, done: boolean): Promise<Todo | null> {
  const todo = await this.todosRepository.findOneBy({ id });
  if (!todo) {
    throw new NotFoundException(`Tâche #${id} introuvable`);
  }
  await this.todosRepository.update(id, { done });
  return this.todosRepository.findOneBy({ id });
}
  async remove(id: number): Promise<void> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Tâche #${id} introuvable`);
    }
    await this.todosRepository.delete(id);
  }
}
