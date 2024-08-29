import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";



export class TodoDatasourceImpl implements TodoDatasource{

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto! 
        });

        return TodoEntity.fromObject( todo );
    }

    async getAll(): Promise<TodoEntity[]> {
        const alltodo = await prisma.todo.findMany();
        
        return alltodo.map( todo => TodoEntity.fromObject(todo));
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if ( !todo ) throw `Todo with id ${ id } not found`;
        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById( updateTodoDto.id);

        const todoupdate = await prisma.todo.update({
            where: { id : updateTodoDto.id },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject(updateTodoDto);

    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById( id );
        const deleted = await prisma.todo.delete({
            where: { id }
        });
        
        return TodoEntity.fromObject( deleted );

    }

}