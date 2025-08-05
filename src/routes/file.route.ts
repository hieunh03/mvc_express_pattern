import { Router } from 'express'
import { Inject, Route } from '@helpers/helper.di'
import { FileController } from '@controllers/file.controller'
import { authenticateToken } from '@middlewares/auth.middleware'

@Route()
export class FileRoute {
  constructor(@Inject('FileController') private fileController: FileController) {}

  main(): Router {
    const router = Router()

    router.post('/get-presigned-url', authenticateToken, this.fileController.getPresignedUrl())

    router.get('/list-files', authenticateToken, this.fileController.listFiles())

    return router
  }
}
