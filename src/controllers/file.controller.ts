import { Response, Handler } from 'express'
import { Inject, Controller } from '@helpers/helper.di'
import { S3Service } from '@services/s3.service'
import { AuthenticatedRequest } from '@middlewares/auth.middleware'

@Controller()
export class FileController {
  constructor(@Inject('S3Service') private s3Service: S3Service) {}

  getPresignedUrl(): Handler {
    return async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      try {
        const { fileName, fileType } = req.body
        const userId = req.user?.uid

        if (!userId) {
          res.status(401).json({ error: 'User not authenticated' })
          return
        }

        const url = await this.s3Service.getPresignedUrl(fileName, fileType, userId)
        res.json({ url })
      } catch (err) {
        console.error('Error generating presigned URL', err)
        res.status(500).json({ error: 'Failed to generate URL' })
      }
    }
  }

  listFiles(): Handler {
    return async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      try {
        const userId = req.user?.uid

        if (!userId) {
          res.status(401).json({ error: 'User not authenticated' })
          return
        }

        const files = await this.s3Service.listFiles(userId)
        res.json(files)
      } catch (err) {
        console.error('Error listing files', err)
        res.status(500).json({ error: 'Failed to list files' })
      }
    }
  }
}
