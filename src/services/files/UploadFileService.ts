import { getRepository } from 'typeorm';

// CUSTOM IMPORTS
import File from '../../models/File';

interface Request {
  fileName: string;
}

class UpdateUserAvatarService {
  public async execute({ fileName }: Request): Promise<File> {
    const fileRepository = getRepository(File);

    const file = await fileRepository.create({ url: fileName });

    return file;
  }
}

export default UpdateUserAvatarService;
