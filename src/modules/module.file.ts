import { Inject, Injectable, Module } from '@helpers/helper.di'
import { S3Service } from '@services/s3.service'
import { FileController } from '@controllers/file.controller'
import { FileRoute } from '@routes/file.route'

@Module([
  { token: 'S3Service', useClass: S3Service },
  { token: 'FileController', useClass: FileController },
  { token: 'FileRoute', useClass: FileRoute }
])
@Injectable()
export class FileModule {
  constructor(@Inject('FileRoute') public route: FileRoute) {}
}
