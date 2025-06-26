# Production Tracking API - Authentication Test

## Test dengan curl

### 1. Test Register User Baru
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "operator1",
    "password": "Operator123!",
    "confirmPassword": "Operator123!",
    "firstName": "Operator",
    "lastName": "One",
    "email": "operator1@company.com",
    "phone": "+62-812-1234-5678"
  }'
```

### 2. Test Login dengan Admin Default
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "username": "admin",
    "password": "Admin123!"
  }'
```

### 3. Test Get Profile (harus login dulu)
```bash
curl -X GET http://localhost:4000/api/v1/auth/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

### 4. Test Get All Users (Admin only)
```bash
curl -X GET http://localhost:4000/api/v1/auth/users \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

### 5. Test Update User Status (Admin feature)
```bash
curl -X PUT http://localhost:4000/api/v1/auth/users/USER_ID_HERE \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "isActive": false
  }'
```

### 6. Test Change Password
```bash
curl -X PUT http://localhost:4000/api/v1/auth/change-password \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "currentPassword": "Admin123!",
    "newPassword": "NewAdmin456!",
    "confirmNewPassword": "NewAdmin456!"
  }'
```

### 7. Test Logout
```bash
curl -X POST http://localhost:4000/api/v1/auth/logout \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

## Test Scenarios

### ✅ Positive Tests
1. Register user baru dengan data valid
2. Login dengan kredensial yang benar
3. Akses profile setelah login
4. Admin mengakses endpoint khusus admin
5. Update profile sendiri
6. Change password dengan password lama yang benar
7. Logout berhasil

### ❌ Negative Tests
1. Register dengan password lemah
2. Register dengan email yang sudah ada
3. Login dengan username/password salah
4. Login dengan user yang isActive=false
5. Akses endpoint tanpa login
6. Operator mencoba akses endpoint admin
7. User mencoba edit profile user lain
8. Change password dengan password lama salah

## Environment untuk Testing

Pastikan file .env sudah dikonfigurasi:
```
DATABASE_URL="mysql://username:password@localhost:3306/production_tracking"
PORT=4000
SESSION_SECRET=test-secret-key-for-development-only-change-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Status Responses

- ✅ 200/201: Success
- ❌ 400: Validation Error
- ❌ 401: Unauthorized (belum login)
- ❌ 403: Forbidden (tidak ada permission)
- ❌ 404: Not Found
- ❌ 409: Conflict (data sudah ada)
- ❌ 500: Server Error
