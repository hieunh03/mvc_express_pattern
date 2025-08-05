import 'reflect-metadata'
import 'dotenv/config'

// Set test environment variables
process.env.NODE_ENV = 'test'
process.env.PORT = '3001'
process.env.S3_BUCKET_NAME = 'test-bucket'
process.env.AWS_ACCESS_KEY_ID = 'test-access-key'
process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key'
process.env.AWS_REGION = 'us-east-1'
process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 = Buffer.from(JSON.stringify({
  type: 'service_account',
  project_id: 'test-project',
  private_key_id: 'test-key-id',
  private_key: '-----BEGIN PRIVATE KEY-----\ntest\n-----END PRIVATE KEY-----\n',
  client_email: 'test@test-project.iam.gserviceaccount.com',
  client_id: 'test-client-id',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token'
})).toString('base64')

// Mock Firebase Admin
const mockVerifyIdToken = jest.fn()
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  auth: jest.fn(() => ({
    verifyIdToken: mockVerifyIdToken
  })),
  credential: {
    cert: jest.fn()
  }
}))

// Mock AWS S3
const mockGetSignedUrlPromise = jest.fn()
const mockListObjectsV2Promise = jest.fn()
const mockGetSignedUrl = jest.fn()

jest.mock('aws-sdk', () => ({
  S3: jest.fn(() => ({
    getSignedUrlPromise: mockGetSignedUrlPromise,
    listObjectsV2: jest.fn(() => ({
      promise: mockListObjectsV2Promise
    })),
    getSignedUrl: mockGetSignedUrl
  }))
}))

// Export mocks for use in tests
export {
  mockVerifyIdToken,
  mockGetSignedUrlPromise,
  mockListObjectsV2Promise,
  mockGetSignedUrl
} 