import { NextFunction, Response } from 'express';
import { RequestExtended } from '../interfaces/global';
import ApiException from '../utils/errorHandler';
import { ErrorCodes } from '../utils/response';
import { verifyAccessToken } from '../helpers/tokenHelper';
import { invalidText } from '../utils/utils';

export const isAuthenticated = async (
	req: RequestExtended,
	res: Response,
	next: NextFunction
) => {
	try {
		const authHeader = req.headers.authorization || req.headers.Authorization;

		if (
			typeof authHeader !== 'string' ||
			(!authHeader?.startsWith('Bearer ') && !authHeader?.startsWith('bearer '))
		) {
			throw new ApiException(ErrorCodes.UNAUTHORIZED);
		}

		const token = authHeader.split(' ')[1];

		const payload: any = verifyAccessToken(token);

		if (!payload) {
			throw new ApiException(ErrorCodes.UNAUTHORIZED);
		}

		req.user = {
			id: payload.id,
			email: payload.email
		};

		next();
	} catch (err) {
		const error: any = err;
		if (error.errorDescription) {
			error.errorDescription = error.errorDescription.trim();
		}
		if (error.message === 'invalid token') {
			error.status = 401;
			error.message = 'Invalid token format. Please provide a valid JWT.';
		}
		if (error.message === 'jwt malformed') {
			error.status = 401;
			error.message = 'Invalid token format. Please provide a valid JWT.';
		}
		if (error.name === 'JsonWebTokenError') {
			error.status = 401;
			error.message = 'Invalid token format. Please provide a valid JWT';
		}
		if (error.name === 'TokenExpiredError') {
			error.status = 401;
			error.message = 'This token has been expired.';
		}
		if (invalidText(error.status)) {
			error.status = 500;
		}
		return res.status(error.status).json({
			error: error.status == 500 ? { description: error.message } : error,
			message: error.status == 500 ? 'Something went wrong' : error.message,
			responseStatus: error.status,
		});
	}
};
