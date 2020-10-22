import { getRepository } from 'typeorm';

// CUSTOM IMPORTS
import User from '../../models/User';
import AppError from '../../errors/AppError';

interface Request {
  userId: string;
}

class ShowUserService {
  async execute({ userId }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    return user;
  }
}

export default ShowUserService;
