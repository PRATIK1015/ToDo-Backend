import express from 'express';
import {
	createTodoValidationRules,
	deleteTodoValidationRules,
	editTodoValidationRules,
} from '../helpers/validators';
import asyncHandler from '../utils/async-handler';
import { todoService } from '../services/todoService';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = express.Router();


/**
 * @swagger
 * /todo/create:
 *   post:
 *     summary: Create a new Todo
 *     tags: [Todo]
 *     description: Creates a new todo for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete interview prep
 *               description:
 *                 type: string
 *                 example: Cover JavaScript, Node.js, and MongoDB today
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-08-01T17:00:00.000Z
 *     responses:
 *       200:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64e3cfcfb7cc7e001f9c70b1
 *                     title:
 *                       type: string
 *                       example: Complete interview prep
 *                     description:
 *                       type: string
 *                       example: Cover JavaScript, Node.js, and MongoDB today
 *                     dueDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-08-01T17:00:00.000Z
 *                     isCompleted:
 *                       type: boolean
 *                       example: false
 *                     user:
 *                       type: string
 *                       example: 688b5e68d6c07c9ad5ac0bfd
 *                 message:
 *                   type: string
 *                   example: Todo created successfully.
 *                 responseStatus:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Title is required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

router.post(
	'/create',
	isAuthenticated,
	createTodoValidationRules,
	asyncHandler(async (req) => {
		return todoService.createTodo(req);
	})
);


/**
 * @swagger
 * /todo/get-all:
 *   get:
 *     summary: Get all Todos of authenticated user
 *     tags: [Todo]
 *     description: Returns a list of all todos created by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todos fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64e3cfcfb7cc7e001f9c70b1
 *                       title:
 *                         type: string
 *                         example: Complete interview prep
 *                       description:
 *                         type: string
 *                         example: Cover JavaScript, Node.js, and MongoDB today
 *                       dueDate:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-01T17:00:00.000Z
 *                       isCompleted:
 *                         type: boolean
 *                         example: false
 *                       user:
 *                         type: string
 *                         example: 688b5e68d6c07c9ad5ac0bfd
 *                 message:
 *                   type: string
 *                   example: Todos fetched successfully.
 *                 responseStatus:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: User/todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */


router.get(
	'/get-all',
	isAuthenticated,
	asyncHandler(async (req) => {
		return todoService.getAllTodo(req);
	})
);


/**
 * @swagger
 * /todo/{todoId}:
 *   put:
 *     summary: Edit a Todo
 *     tags: [Todo]
 *     description: Updates the details of an existing Todo by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Todo to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Update Node.js revision
 *               description:
 *                 type: string
 *                 example: Cover Event Loop and Streams
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-08-02T18:30:00.000Z
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64e3cfcfb7cc7e001f9c70b1
 *                     title:
 *                       type: string
 *                       example: Update Node.js revision
 *                     description:
 *                       type: string
 *                       example: Cover Event Loop and Streams
 *                     dueDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-08-02T18:30:00.000Z
 *                     isCompleted:
 *                       type: boolean
 *                       example: true
 *                     user:
 *                       type: string
 *                       example: 688b5e68d6c07c9ad5ac0bfd
 *                 message:
 *                   type: string
 *                   example: Todo updated successfully.
 *                 responseStatus:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid todoId
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Todo not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

router.put(
	'/:todoId',
	isAuthenticated,
	editTodoValidationRules,
	asyncHandler(async (req) => {
		return todoService.editTodo(req);
	})
);

/**
 * @swagger
 * /todo/{todoId}:
 *   delete:
 *     summary: Delete a Todo
 *     tags: [Todo]
 *     description: Deletes a Todo by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Todo to delete
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Todo deleted successfully.
 *                 responseStatus:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Invalid Todo ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid todoId
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Todo not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

router.delete(
	'/:todoId',
	isAuthenticated,
	deleteTodoValidationRules,
	asyncHandler(async (req) => {
		return todoService.deleteTodo(req);
	})
);


export default router;
