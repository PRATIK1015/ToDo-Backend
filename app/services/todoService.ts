
import { RequestExtended } from '../interfaces/global';
import { userRepository } from '../repositories/userRepository';
import ApiException from '../utils/errorHandler';
import { ErrorCodes } from '../utils/response';
import { todoRepository } from '../repositories/todoRepository';


const createTodo = async (req: RequestExtended) => {
	const { title, description, dueDate } = req.body;
	const { id:userId } = req.user

	const user = await userRepository.getUserById(userId);
	if (!user) {
		throw new ApiException(ErrorCodes.USER_NOT_FOUND);
	}

	await todoRepository.createTodo({
		title,
		description,
		dueDate,
		userId: userId
	})

	return {
		message: 'Todo created successfully.',
	};


};
const getAllTodo = async (req: RequestExtended) => {

	const { id:userId } = req.user

	const user = await userRepository.getUserById(userId);
	if (!user) {
		throw new ApiException(ErrorCodes.USER_NOT_FOUND);
	}

	const todos = await todoRepository.getAllTodosByUserId(userId)

	return {
		data: todos,
		message: 'Get all todo successfully.',
	};

};

const editTodo = async (req: RequestExtended) => {
	const { title, description, dueDate, completed } = req.body;
	const { todoId } = req.params;
	const { id: userId } = req.user;

	const user = await userRepository.getUserById(userId);

	if (!user) {
		throw new ApiException(ErrorCodes.USER_NOT_FOUND);
	}

	const todo = await todoRepository.getTodoById(todoId);
	if (!todo) {
		throw new ApiException(ErrorCodes.TODO_NOT_FOUND);
	}
	
	if (todo.user.toString() !== userId) {
		throw new ApiException(ErrorCodes.UNAUTHORIZED);
	}

	await todoRepository.updateTodoById(todoId, {
		...(title && { title }),
		...(description && { description }),
		...(dueDate && { dueDate }),
		...(completed !== undefined && { completed }),
	});

	return {
		message: 'Todo edited successfully.',
	};
};

const deleteTodo = async (req: RequestExtended) => {
	const { todoId } = req.params;
	const { id: userId } = req.user;

	const user = await userRepository.getUserById(userId);
	if (!user) {
		throw new ApiException(ErrorCodes.USER_NOT_FOUND);
	}

	const todo = await todoRepository.getTodoById(todoId);
	if (!todo) {
		throw new ApiException(ErrorCodes.TODO_NOT_FOUND);
	}

	if (todo.user.toString() !== userId) {
		throw new ApiException(ErrorCodes.UNAUTHORIZED);
	}

	await todoRepository.deleteTodoById(todoId);

	return {
		message: 'Todo deleted successfully.',
	};
};

export const todoService = {
	createTodo,
	editTodo,
	getAllTodo,
	deleteTodo
};
