import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'
import express, { Express } from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import zlib from 'zlib'
import hpp from 'hpp'
import staticGzip from 'express-static-gzip'

import { Container, Injectable, Router } from '@helpers/helper.di'
import { AppModule } from '@/app.module'
import { initializeFirebase } from '@configs/firebase.config'

@Injectable()
class TestApp {
  private app: Express

  constructor() {
    this.app = express()
  }

  private config(): void {
    this.app.set('views', path.resolve(__dirname, '../src/views'))
    this.app.set('view engine', 'ejs')
    this.app.disable('x-powered-by')
    
    // Initialize Firebase
    initializeFirebase()
    
    Container.resolve<AppModule>(AppModule)
  }

  private middleware(): void {
    this.app.use(express.static('.'))
    this.app.use(bodyParser.json({ limit: '1mb' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(hpp({ checkBody: true, checkQuery: true }))
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'HEAD'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
      })
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION
      })
    )
    this.app.use(
      staticGzip('.', {
        enableBrotli: true,
        index: false,
        customCompressions: [
          { encodingName: 'gz', fileExtension: 'css' },
          { encodingName: 'gz', fileExtension: 'js' },
          { encodingName: 'gz', fileExtension: 'html' },
          { encodingName: 'gz', fileExtension: 'png' },
          { encodingName: 'gz', fileExtension: 'jpeg' },
          { encodingName: 'gz', fileExtension: 'jpg' },
          { encodingName: 'gz', fileExtension: 'svg' },
          { encodingName: 'br', fileExtension: 'css' },
          { encodingName: 'br', fileExtension: 'js' },
          { encodingName: 'br', fileExtension: 'html' },
          { encodingName: 'br', fileExtension: 'png' },
          { encodingName: 'br', fileExtension: 'jpeg' },
          { encodingName: 'br', fileExtension: 'jpg' },
          { encodingName: 'br', fileExtension: 'svg' }
        ]
      })
    )
  }

  private route(): void {
    try {
      const pingRouter = Container.resolve<Router>('PingModule')
      const fileRouter = Container.resolve<Router>('FileModule')
      
      // Register specific routes first
      this.app.use('/api/files', fileRouter)
      this.app.use('/', pingRouter) // More specific than '**'
      

      
      console.log('Routes registered successfully')
    } catch (error) {
      console.error('Error registering routes:', error)
      throw error
    }
  }

  public createApp(): Express {
    this.config()
    this.middleware()
    this.route()
    return this.app
  }
}

// Create and export the app for testing
const testApp = new TestApp()
export default testApp.createApp() 