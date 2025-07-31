
import { Request } from 'express';
import { comparePassword, hashPassword } from '../helpers/passwordHelper';
import { generateAccessToken } from '../helpers/tokenHelper';
import { RequestExtended } from '../interfaces/global';
import { userRepository } from '../repositories/userRepository';
import ApiException from '../utils/errorHandler';
import { ErrorCodes } from '../utils/response';


const loginService = async (req: Request) => {
	const { email, password } = req.body;

	const user = await userRepository.getUserByEmail(email);
	if (!user) {
		throw new ApiException(ErrorCodes.USER_NOT_FOUND);
	}

	const isPasswordValid = await comparePassword(
		password,
		user.password as string
	);
	if (!isPasswordValid) {
		throw new ApiException(ErrorCodes.INVALID_CREDENTIALS);
	}

	const newAccessToken = generateAccessToken({
		id: user.id,
		email: user.email
	})

	return {
		accessToken: newAccessToken,
		message: 'Login successful.',
	};


};
const registerService = async (req: Request) => {
	
	const { userName, email, password } = req.body;

	const isUserExist = await userRepository.getUserByEmail(email);
	if (isUserExist) {
		throw new ApiException(ErrorCodes.USER_ALREADY_EXISTS);
	}

	const hashedPassword = await hashPassword(password);

	await userRepository.createUser({ userName, email, password: hashedPassword });


	return {
		message: 'User registered successfully.',
	};

};

const fetchProfile = async (req: RequestExtended) => {
	const { id } = req.user;
	const user = await userRepository.getUserById(id);

	if (!user) {
		throw new ApiException(ErrorCodes.USER_NOT_FOUND);
	}

	const { password, createdAt, updatedAt, ...rest } = user.toObject();
	return {
		data: rest,
		message: 'User profile fetched successfully.',
	};
};


export const authService = {
	loginService,
	fetchProfile,
	registerService
};
