import { CreateTodoDto } from '../dtos/todos/create-todo.dto';
import { TodoEntity } from '../entities/todo.entity';


export abstract class TodoRepository {
    abstract create( CreateTodoDto: CreateTodoDto): Promise <TodoEntity>;

    //todo: paginacion
    abstract getAll(): Promise<TodoEntity[]>;


    abstract findById( id: number ): Promise<TodoEntity>;
    abstract updateById( updateTodoDto: any): Promise<TodoEntity>;
    abstract deleteById( id: number ): Promise<TodoEntity>
}