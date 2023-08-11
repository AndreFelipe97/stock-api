import { Request, Response } from 'express';
import UpdateAvatarService from '../services/UpdateAvatarService';

export default class UpdateAvatarController {
  public async update(request: Request, response: Response) {
    const updateAvatarService = new UpdateAvatarService();

    const userId = request.user.id;
    const avatarFilename = request.file?.filename;

    const user = await updateAvatarService.execute({ userId, avatarFilename });

    return response.json(user);
  }
}
