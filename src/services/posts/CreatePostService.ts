import { getRepository } from 'typeorm';

// CUSTOM IMPORTS
import Post from '../../models/Post';
import User from '../../models/User';

interface Request {
  userId: string;
  description?: string;
  photo?: string;
  link?: string;
}

class CreatePostService {
  async execute({ description, link, photo, userId }: Request): Promise<Post> {
    const postRepository = getRepository(Post);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    const post = postRepository.create({
      user_id: userId,
      user,
      link,
      description,
      photo,
    });

    delete post.user_id;

    await postRepository.save(post);

    return post;
  }
}

export default CreatePostService;
