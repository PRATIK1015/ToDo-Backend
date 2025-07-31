import { Todo } from '../models/todo.model';

const createTodo = async (data: {
	title: string;
	description?: string;
	dueDate: Date;
	userId: string;
}
) => {

	const todo = await Todo.create({
		title: data.title,
		description: data.description,
		dueDate: new Date(data.dueDate),
		user: data.userId,
	});

	return todo;
};

const getAllTodosByUserId = async (userId: string) => {
	const todos = await Todo.find({ user: userId, isDeleted: false, }).sort({ dueDate: 1 });
	return todos;
};
const getTodoById = async (todoId: string) => {
	const todo = await Todo.findOne({ _id: todoId, isDeleted: false });
	return todo;
};

const updateTodoById = async (
	todoId: string,
	updateData: Partial<{
		title: string;
		description: string;
		dueDate: Date;
		completed: boolean;
	}>
) => {
	return await Todo.findOneAndUpdate(
		{ _id: todoId, isDeleted: false },
		updateData,
		{ new: true }
	);
};

const deleteTodoById= async (todoId: string) => {
	return await Todo.findByIdAndUpdate(todoId, { isDeleted:true});
};


export const todoRepository = {
	createTodo,
	getAllTodosByUserId,
	getTodoById,
	updateTodoById,
	deleteTodoById

};
