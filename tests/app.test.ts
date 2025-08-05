import request from 'supertest'
import app from '../src/app.test'
import {
  mockVerifyIdToken,
  mockGetSignedUrlPromise,
  mockListObjectsV2Promise,
  mockGetSignedUrl
} from './setup'

describe('Express App Tests', () => {
  const mockUser = {
    uid: 'test-user-id',
    email: 'test@example.com'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock successful token verification
    mockVerifyIdToken.mockResolvedValue(mockUser)
    
    // Mock successful S3 operations
    mockGetSignedUrlPromise.mockResolvedValue('https://test-bucket.s3.amazonaws.com/test-user-id/test-file.jpg?signature=test')
    mockListObjectsV2Promise.mockResolvedValue({
      Contents: [
        { Key: 'test-user-id/1234567890_test.jpg' },
        { Key: 'test-user-id/1234567891_test2.pdf' }
      ]
    })
    mockGetSignedUrl.mockReturnValue('https://test-bucket.s3.amazonaws.com/test-user-id/1234567890_test.jpg?signature=test')
  })

  describe('POST /api/files/get-presigned-url', () => {
    test('should generate presigned URL successfully', async () => {
      const response = await request(app)
        .post('/api/files/get-presigned-url')
        .set('Authorization', 'Bearer valid-token')
        .send({ 
          fileName: 'test.jpg', 
          fileType: 'image/jpeg'
        })



      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('url')
      expect(mockGetSignedUrlPromise).toHaveBeenCalledWith('putObject', expect.objectContaining({
        Bucket: 'test-bucket',
        Key: expect.stringContaining('test-user-id/'),
        ContentType: 'image/jpeg',
        Expires: 60
      }))
    })

    test('should return 401 when no token provided', async () => {
      const response = await request(app)
        .post('/api/files/get-presigned-url')
        .send({ fileName: 'test.jpg', fileType: 'image/jpeg' })

      expect(response.status).toBe(401)
      expect(response.body.error).toBe('Access token required')
    })

    test('should return 403 when invalid token provided', async () => {
      // Mock failed token verification
      mockVerifyIdToken.mockRejectedValue(new Error('Invalid token'))

      const response = await request(app)
        .post('/api/files/get-presigned-url')
        .set('Authorization', 'Bearer invalid-token')
        .send({ fileName: 'test.jpg', fileType: 'image/jpeg' })

      expect(response.status).toBe(403)
      expect(response.body.error).toBe('Invalid or expired token')
    })

    test('should handle missing fileName', async () => {
      const response = await request(app)
        .post('/api/files/get-presigned-url')
        .set('Authorization', 'Bearer valid-token')
        .send({ 
          fileType: 'image/jpeg'
        })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('url')
    })

    test('should handle missing fileType', async () => {
      const response = await request(app)
        .post('/api/files/get-presigned-url')
        .set('Authorization', 'Bearer valid-token')
        .send({ 
          fileName: 'test.jpg'
        })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('url')
    })
  })

  describe('GET /api/files/list-files', () => {
    test('should return files list successfully', async () => {
      const response = await request(app)
        .get('/api/files/list-files')
        .set('Authorization', 'Bearer valid-token')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body).toHaveLength(2)
      
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('key')
        expect(response.body[0]).toHaveProperty('url')
        expect(response.body[0].key).toBe('test-user-id/1234567890_test.jpg')
      }
    })

    test('should return 401 when no token provided', async () => {
      const response = await request(app)
        .get('/api/files/list-files')

      expect(response.status).toBe(401)
      expect(response.body.error).toBe('Access token required')
    })

    test('should return 403 when invalid token provided', async () => {
      // Mock failed token verification
      mockVerifyIdToken.mockRejectedValue(new Error('Invalid token'))

      const response = await request(app)
        .get('/api/files/list-files')
        .set('Authorization', 'Bearer invalid-token')

      expect(response.status).toBe(403)
      expect(response.body.error).toBe('Invalid or expired token')
    })

    test('should handle empty files list', async () => {
      // Mock empty files list
      mockListObjectsV2Promise.mockResolvedValue({
        Contents: []
      })

      const response = await request(app)
        .get('/api/files/list-files')
        .set('Authorization', 'Bearer valid-token')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body).toHaveLength(0)
    })
  })

  describe('Ping Module Tests', () => {
    test('should return ping page', async () => {
      const response = await request(app)
        .get('/')

      expect(response.status).toBe(200)
      expect(response.text).toContain('model view controller architecture')
    })
  })
}) 