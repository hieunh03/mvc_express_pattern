# Express Model View Controller Pattern (MVC)

The following is a folder pattern for express mvc starterkit structure pattern that I usually use, so if you are interested in the pattern I made, you can use it if you think it's good, and if you need integration with database please check this [express-refactor-starterkit](https://github.com/restuwahyu13/express-refactor-starterkit) and more information about this arhitecture pattern, and this pattern fall into category list awesome mvc arhitecture pattern from [githublab.com](https://githublab.com/repositories?q=mvc-pattern&sortBy=best_match) 6th rank best match category.

## What Are The Benefits ?

- [x] Easy to maintance
- [x] Easy to scalable
- [x] Readable code
- [x] Suitable for large projects or small projects
- [x] Easy to understand for junior or senior
- [x] Live reload for development
- [x] File upload functionality with AWS S3 and Firebase authentication
- [x] And more

## File Upload Features

This project now includes file upload functionality with the following features:

- **Firebase Authentication**: Secure user authentication using Firebase Admin SDK
- **AWS S3 Integration**: Direct file upload to S3 using presigned URLs
- **User-specific file storage**: Files are organized by user ID
- **Secure file access**: Files are accessible only to authenticated users

### Environment Variables Required

Add the following environment variables to your `.env` file:

```env
# Firebase Configuration
FIREBASE_SERVICE_ACCOUNT_BASE64=your_base64_encoded_service_account_json_here

# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
S3_BUCKET_NAME=your_s3_bucket_name
```

### API Endpoints

- `POST /api/files/get-presigned-url` - Get a presigned URL for file upload
  - Body: `{ "fileName": "example.jpg", "fileType": "image/jpeg" }`
  - Headers: `Authorization: Bearer <firebase_token>`

- `GET /api/files/list-files` - List user's files
  - Headers: `Authorization: Bearer <firebase_token>`

## Testing

This project includes comprehensive tests for the file upload functionality:

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Jest Configuration**: `jest.config.js` - Configured for TypeScript testing
- **Test Setup**: `tests/setup.ts` - Environment setup and mocks
- **Main Tests**: `tests/app.test.ts` - API endpoint tests
- **Test App**: `src/app.test.ts` - Express app for testing

### Test Coverage

The tests cover:
- ✅ File upload presigned URL generation
- ✅ File listing functionality
- ✅ Authentication middleware
- ✅ Error handling (401, 403, 500)
- ✅ Edge cases (missing parameters)
- ✅ Firebase token verification
- ✅ AWS S3 operations mocking
