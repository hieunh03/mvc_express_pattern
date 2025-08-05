# 🚀 Quick Deploy to Railway

## ✅ Đã chuẩn bị sẵn

- ✅ Dockerfile cho build
- ✅ Railway configuration
- ✅ Build scripts
- ✅ Environment variables template

## 🎯 Các bước deploy

### 1. Push code lên GitHub
```bash
git add .
git commit -m "Add Railway deployment configuration"
git push origin main
```

### 2. Deploy trên Railway
1. Truy cập [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Chọn repository `express-mvc-pattern`
4. Railway sẽ tự động build và deploy

### 3. Cấu hình Environment Variables
Trong Railway dashboard → Variables:
```env
NODE_ENV=production
PORT=3000
```

### 4. Kiểm tra
- Truy cập URL được cung cấp
- Kiểm tra logs trong Railway dashboard

## 🔧 Test locally trước khi deploy

```bash
# Test build process
./scripts/test-build.sh

# Test app startup
./scripts/deploy-test.sh
```

## 📁 Files quan trọng

- `Dockerfile` - Cấu hình build
- `railway.toml` - Railway settings
- `railway.json` - Railway schema
- `.dockerignore` - Optimize build
- `env.example` - Environment variables template

## 🆘 Troubleshooting

### Lỗi build
- Kiểm tra logs trong Railway dashboard
- Chạy `./scripts/test-build.sh` locally

### Lỗi runtime
- Kiểm tra environment variables
- Xem logs chi tiết

### Lỗi Firebase/AWS
- Cấu hình credentials trong Railway Variables
- Kiểm tra permissions 