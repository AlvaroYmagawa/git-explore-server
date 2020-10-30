import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

// CUSTOM IMPORTS
import User from '../../models/User';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

class CreateUserService {
  async execute({ name, email, password, admin }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const isUSerExists = await userRepository.findOne({
      where: { email },
    });

    if (isUSerExists) {
      throw new AppError('Email address already used.', 400);
    }

    // Hashing password
    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      admin,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
