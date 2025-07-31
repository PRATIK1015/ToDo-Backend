import { Todo } from "../models/todo.model";
import { logger } from "./logger";


export function invalidText(value: any) {
  return (
    value == null ||
    value == undefined ||
    value.toString().trim().length == 0 ||
    value === "null"
  );
}


export const markExpiredTodosAsCompleted = async () => {
	try {
		const result = await Todo.updateMany(
			{
				dueDate: { $lt: new Date() },
				completed: false,
				isDeleted: false,
			},
			{ $set: { completed: true } }
		);
		console.log("first")

	} catch (err) {
		logger.error(`Error while updating expired todos: ${err}`);
	}
};