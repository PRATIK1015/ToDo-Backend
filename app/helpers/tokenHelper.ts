import jwt from 'jsonwebtoken';
import { configData } from './../config/config';


// Generate AccessToken
export const generateAccessToken = (payload: any) => {
	const token = jwt.sign(payload, configData?.accessTokenSecretKey as string, {
		expiresIn: 24 * 60 * 60, // in seconds,
	});

	return token;
};


// Verify Access Token
export const verifyAccessToken = (accessToken: string) => {
	const verified = jwt.verify(accessToken, configData?.accessTokenSecretKey as string);

	return verified;
};

