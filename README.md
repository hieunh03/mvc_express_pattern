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

## Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 8
- AWS Account (for S3)
- Firebase Project (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/restuwahyu13/express-mvc-pattern.git
cd express-mvc-pattern
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

4. Configure your environment variables in the `.env` file (see Configuration section below).

### Configuration

#### AWS S3 Setup

1. **Create an S3 Bucket**:
   - Go to AWS S3 Console
   - Create a new bucket with a unique name
   - Choose your preferred region
   - Configure bucket settings (recommended: enable versioning, encryption)

2. **Create IAM User**:
   - Go to AWS IAM Console
   - Create a new user for programmatic access
   - Attach the following policy (replace `your-bucket-name` with your actual bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}
```

3. **Get Access Keys**:
   - After creating the IAM user, generate access keys
   - Save the Access Key ID and Secret Access Key

4. **Update Environment Variables**:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
S3_BUCKET_NAME=your_s3_bucket_name
```

#### Firebase Setup

1. **Create Firebase Project**:
   - Go to Firebase Console
   - Create a new project
   - Enable Authentication (Email/Password or Google)

2. **Generate Service Account**:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file

3. **Encode Service Account**:
```bash
# On macOS/Linux
base64 -i path/to/serviceAccountKey.json

# On Windows (PowerShell)
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path/to/serviceAccountKey.json"))
```

4. **Update Environment Variables**:
```env
FIREBASE_SERVICE_ACCOUNT_BASE64=your_base64_encoded_service_account_json_here
```

### Running the Application

#### Development Mode
```bash
# Start with live reload
npm run dev

# Or use nodemon directly
npm run ts-watch
```

#### Production Mode
```bash
# Build the application
npm run build

# Start the application
npm start

# Or use PM2 for process management
npm run start:local
```

#### Docker (if available)
```bash
# Build and run with Docker
docker build -t express-mvc-pattern .
docker run -p 3000:3000 express-mvc-pattern
```

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run formatter` - Format code with ESLint and Prettier

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
