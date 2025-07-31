import { User } from '../models/user.model';

const getUserByEmail = async (email: string) => {

	const user = await User.findOne({ email: email });

	return user;
};

const createUser = async (data:{userName: string;email: string;password: string;}) => {

	const user = new User(data);
    return await user.save();
};

const getUserById = async (id: string) => {

	const user = await User.findById(id);
  return user;
};
  

export const userRepository = {
	getUserByEmail,
	createUser,
	getUserById
	
};
