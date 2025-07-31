import express from 'express';
import {
	loginValidationRules,
	registerValidationRules,
} from '../helpers/validators';
import asyncHandler from '../utils/async-handler';
import { authService } from '../services/authService';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = express.Router();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     description: Authenticates the user using email and password and returns an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR...
 *                 message:
 *                   type: string
 *                   example: Login successful.
 *                 responseStatus:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Invalid credentials
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
 *                   example: Invalid email or password
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
	'/login',
	loginValidationRules,
	asyncHandler(async (req) => {
		return authService.loginService(req);
	})
);


/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: User Registration
 *     tags: [Auth]
 *     description: Registers a new user and returns a success message with an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR...
 *                 message:
 *                   type: string
 *                   example: Registration successful.
 *                 responseStatus:
 *                   type: number
 *                   example: 201
 *       409:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: Email already in use or validation failed
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
	'/sign-up',
	registerValidationRules,
	asyncHandler(async (req) => {
		return authService.registerService(req);
	})
);


/**
 * @swagger
 * /auth/fetch-profile:
 *   get:
 *     summary: Fetch logged-in user's profile
 *     tags: [Auth]
 *     description: Returns the profile details of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
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
 *                       example: 688b5e68d6c07c9ad5ac0bfd
 *                     email:
 *                       type: string
 *                       example: pp757439@gmail.com
 *                     userName:
 *                       type: string
 *                       example: Pratik Patel
 *                     __v:
 *                       type: number
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: User profile fetched successfully.
 *                 responseStatus:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized
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
	'/fetch-profile',
	isAuthenticated,
	asyncHandler(async (req) => {
		return authService.fetchProfile(req);
	})
);


export default router;
