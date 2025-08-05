import AWS from 'aws-sdk'
import { Service } from '@helpers/helper.di'

@Service()
export class S3Service {
  private s3: AWS.S3
  private bucketName: string

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    this.bucketName = process.env.S3_BUCKET_NAME || ''
  }

  async getPresignedUrl(fileName: string, fileType: string, userId: string): Promise<string> {
    const Key = `${userId}/${Date.now()}_${fileName}`

    const params = {
      Bucket: this.bucketName,
      Key,
      ContentType: fileType,
      Expires: 60 // 1 minute
    }

    return await this.s3.getSignedUrlPromise('putObject', params)
  }

  async listFiles(userId: string): Promise<Array<{ key: string; url: string }>> {
    const params = {
      Bucket: this.bucketName,
      Prefix: `${userId}/`
    }

    const data = await this.s3.listObjectsV2(params).promise()
    return (data.Contents || []).map((item) => ({
      key: item.Key || '',
      url: this.s3.getSignedUrl('getObject', {
        Bucket: this.bucketName,
        Key: item.Key,
        Expires: 60 * 5
      })
    }))
  }
}
