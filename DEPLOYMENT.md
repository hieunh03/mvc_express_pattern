# Hướng dẫn Deploy lên Railway

## Bước 1: Chuẩn bị

1. Đảm bảo code đã được push lên GitHub
2. Tạo tài khoản Railway tại [railway.app](https://railway.app)
3. Đăng nhập vào Railway dashboard

## Bước 2: Deploy từ GitHub

### Cách 1: Deploy trực tiếp từ GitHub Repository

1. Trong Railway dashboard, click "New Project"
2. Chọn "Deploy from GitHub repo"
3. Chọn repository `express-mvc-pattern`
4. Railway sẽ tự động detect và build ứng dụng sử dụng Dockerfile

### Cách 2: Deploy từ GitHub với cấu hình tùy chỉnh

1. Trong Railway dashboard, click "New Project"
2. Chọn "Deploy from GitHub repo"
3. Chọn repository `express-mvc-pattern`
4. Railway sẽ sử dụng Dockerfile để build và deploy

### Cách 3: Deploy với Railway CLI (Tùy chọn)

1. Cài đặt Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Link project: `railway link`
4. Deploy: `railway up`

## Bước 3: Cấu hình Environment Variables

1. Trong Railway project dashboard, vào tab "Variables"
2. Thêm các biến môi trường cần thiết:

```env
NODE_ENV=production
PORT=3000
```

Nếu sử dụng Firebase, thêm:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-cert-url
```

Nếu sử dụng AWS S3, thêm:
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
AWS_S3_BUCKET=your-bucket-name
```

## Bước 4: Deploy

1. Railway sẽ tự động build và deploy ứng dụng
2. Quá trình build sẽ:
   - Install dependencies
   - Build TypeScript code thành JavaScript
   - Copy views folder vào dist
   - Start ứng dụng

## Bước 5: Kiểm tra

1. Sau khi deploy thành công, Railway sẽ cung cấp URL
2. Truy cập URL để kiểm tra ứng dụng
3. Kiểm tra logs trong Railway dashboard nếu có lỗi

## Troubleshooting

### Lỗi Build
- Kiểm tra logs trong Railway dashboard
- Đảm bảo tất cả dependencies đã được khai báo trong `package.json`
- Kiểm tra TypeScript configuration

### Lỗi Build
- Kiểm tra logs trong Railway dashboard
- Đảm bảo tất cả dependencies đã được khai báo trong `package.json`
- Kiểm tra TypeScript configuration
- Đảm bảo Dockerfile được cấu hình đúng

### Lỗi Docker Build
Nếu gặp lỗi Docker build:
1. Kiểm tra file `Dockerfile` có đúng syntax không
2. Đảm bảo tất cả dependencies cần thiết được install
3. Kiểm tra build process có thành công không
4. Xem logs chi tiết trong Railway dashboard

### Lỗi Runtime
- Kiểm tra environment variables
- Kiểm tra port configuration
- Xem logs để debug

### Lỗi Firebase/AWS
- Đảm bảo credentials đúng
- Kiểm tra permissions
- Verify environment variables

## Cấu hình Custom Domain (Tùy chọn)

1. Trong Railway dashboard, vào tab "Settings"
2. Chọn "Custom Domains"
3. Thêm domain của bạn
4. Cấu hình DNS records theo hướng dẫn

## Monitoring

Railway cung cấp:
- Real-time logs
- Performance metrics
- Error tracking
- Automatic restarts

## Auto-deploy

Railway sẽ tự động deploy khi có push mới vào main branch. Bạn có thể:
- Cấu hình branch để auto-deploy
- Set up preview deployments cho pull requests
- Configure deployment environments 