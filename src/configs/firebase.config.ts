import * as admin from 'firebase-admin'

export const initializeFirebase = (): void => {
  // Only initialize Firebase if the service account is provided
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    console.warn('Firebase service account not provided. Firebase authentication will not work.')
    return
  }

  try {
    // Initialize Firebase Admin SDK
    const serviceAccountJson = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')

    // Parse thành object
    const serviceAccount = JSON.parse(serviceAccountJson)

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    
    console.log('Firebase Admin SDK initialized successfully')
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error)
  }
}
