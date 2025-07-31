import { body, param } from 'express-validator';
import mongoose from 'mongoose';

export const loginValidationRules = [
	body('email').notEmpty().withMessage('Email is required'),
	body('email').isEmail().withMessage('Invalid email address'),
	body('password').notEmpty().withMessage('Password is required'),
];

export const registerValidationRules = [
	body('userName').notEmpty().withMessage('userName is required'),
	body('email').notEmpty().withMessage('Email is required'),
	body('email').isEmail().withMessage('Invalid email address'),
	body('password').notEmpty().withMessage('Password is required'),
];

export const createTodoValidationRules = [
	body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
	body('description').optional().isString().withMessage('Description must be a string'),
	body('dueDate').notEmpty().withMessage('Due date is required').isISO8601().withMessage('Due date must be a valid ISO8601 date string'),
];

export const editTodoValidationRules = [
	param('todoId').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid todoId'),
	body('title').optional().isString().withMessage('Title must be a string'),
	body('description').optional().isString().withMessage('Description must be a string'),
	body('dueDate').optional().isISO8601().withMessage('Due date must be a valid ISO8601 date string'),
	body('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
];

export const deleteTodoValidationRules = [
	param('todoId')
	  .custom((value) => mongoose.Types.ObjectId.isValid(value))
	  .withMessage('Invalid todoId'),
  ];
