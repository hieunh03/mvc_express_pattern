import { Container, Injectable, Module, Router } from '@helpers/helper.di'
import { PingModule } from '@modules/module.ping'
import { FileModule } from '@modules/module.file'

@Module([
  {
    token: 'PingModule',
    useFactory: (): Router => {
      return Container.resolve(PingModule).route.main()
    }
  },
  {
    token: 'FileModule',
    useFactory: (): Router => {
      return Container.resolve(FileModule).route.main()
    }
  }
])
@Injectable()
export class AppModule {}
