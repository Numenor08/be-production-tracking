# Authentication & Authorization System

Sistem autentikasi dan autorisasi lengkap untuk Production Tracking API menggunakan Express Session dan database MySQL.

## Fitur Utama

### 🔐 Autentikasi (Authentication)
- **Login/Logout**: Session-based authentication dengan cookie
- **Password Security**: Bcrypt hashing dengan salt rounds 12
- **Session Management**: Terintegrasi dengan database MySQL
- **Account Status**: Hanya user aktif (`isActive: true`) yang bisa login

### 🛡️ Autorisasi (Authorization)
- **Role-based Access**: ADMIN dan OPERATOR roles
- **Permission Levels**: Admin dapat mengakses semua endpoint, operator terbatas
- **Data Ownership**: User hanya bisa mengakses/edit data mereka sendiri (kecuali admin)

### 🔒 Validasi Password
Password harus memenuhi kriteria berikut:
- Minimal 8 karakter, maksimal 15 karakter
- Minimal 1 huruf kecil
- Minimal 1 huruf kapital  
- Minimal 1 angka
- Minimal 1 karakter khusus (@$!%*?&)

## API Endpoints

### Public Endpoints (Tidak perlu autentikasi)

#### Register User
```
POST /api/v1/auth/register
```
**Body:**
```json
{
    "username": "john_doe",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+62-812-3456-7890",
    "role": "OPERATOR"
}
```

#### Login
```
POST /api/v1/auth/login
```
**Body:**
```json
{
    "username": "john_doe",
    "password": "SecurePass123!"
}
```

### Protected Endpoints (Perlu autentikasi)

#### Logout
```
POST /api/v1/auth/logout
```

#### Get Profile
```
GET /api/v1/auth/profile
```

#### Update Own Profile
```
PUT /api/v1/auth/profile
```
**Body:**
```json
{
    "firstName": "John Updated",
    "lastName": "Doe Updated", 
    "email": "john.updated@example.com",
    "phone": "+62-812-9999-8888"
}
```

#### Update Profile by ID (Admin atau Owner)
```
PUT /api/v1/auth/profile/:id
```

#### Change Password
```
PUT /api/v1/auth/change-password
```
**Body:**
```json
{
    "currentPassword": "OldPass123!",
    "newPassword": "NewSecurePass456!",
    "confirmNewPassword": "NewSecurePass456!"
}
```

### Admin Only Endpoints

#### Get All Users
```
GET /api/v1/auth/users
```

#### Get User by ID
```
GET /api/v1/auth/users/:id
```

#### Update User by Admin
```
PUT /api/v1/auth/users/:id
```
**Body:**
```json
{
    "firstName": "Updated Name",
    "lastName": "Updated Last",
    "email": "updated@example.com",
    "phone": "+62-000-0000-0000",
    "isActive": false,
    "role": "ADMIN"
}
```

## Default Admin User

Setelah setup database, jalankan seeder untuk membuat admin default:

```bash
pnpm run seed:admin
```

**Kredensial Default:**
- Username: `admin`
- Password: `Admin123!`
- Email: `admin@production-tracking.com`

⚠️ **Penting**: Ubah password default setelah login pertama!

## Konfigurasi Environment

Buat file `.env` berdasarkan `.env.example`:

```bash
# Database
DATABASE_URL="mysql://username:password@localhost:3306/production_tracking"

# Server
PORT=3001
NODE_ENV=development

# Session (minimal 32 karakter)
SESSION_SECRET=your-super-secret-session-key-change-this-in-production-min-32-chars

# CORS
FRONTEND_URL=http://localhost:3000
```

## Security Features

### 🍪 Session & Cookie Configuration
- **httpOnly**: Mencegah akses JavaScript ke cookie (XSS protection)
- **secure**: HTTPS only di production
- **sameSite**: 'strict' untuk CSRF protection
- **maxAge**: 24 jam session lifetime
- **Custom cookie name**: 'sessionId'

### 🧹 Automatic Session Cleanup
- Menjalankan cleanup otomatis setiap jam
- Menghapus session yang expired dari database
- Cleanup awal saat server startup

### 🔐 Password Security
- Bcrypt hashing dengan salt rounds 12
- Password strength validation
- Password confirmation validation

### 🛡️ Authorization Middleware
- `requireAuth`: Memverifikasi user login dan aktif
- `requireAdmin`: Memverifikasi role admin
- `requireOwnershipOrAdmin`: User hanya bisa akses data sendiri atau admin
- `requireGuest`: Mencegah user login mengakses endpoint register/login

## Error Responses

### 400 - Validation Error
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": [
        {
            "field": "password",
            "message": "Password must contain at least one uppercase letter"
        }
    ]
}
```

### 401 - Unauthorized
```json
{
    "success": false,
    "message": "Authentication required. Please login."
}
```

### 403 - Forbidden
```json
{
    "success": false,
    "message": "Admin access required. Insufficient permissions."
}
```

### 409 - Conflict
```json
{
    "success": false,
    "message": "User with this username or email already exists"
}
```

## Success Responses

### Login Success
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": "cm...",
            "username": "john_doe",
            "firstName": "John",
            "lastName": "Doe",
            "email": "john@example.com",
            "role": "OPERATOR"
        }
    }
}
```

## Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String
  firstName String
  lastName  String?
  email     String   @unique
  phone     String?
  isActive  Boolean  @default(true)
  role      UserRole @default(OPERATOR)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserRole {
  ADMIN
  OPERATOR
}
```

### Session Model
```prisma
model Session {
  id        String   @id @default(cuid())
  sid       String   @unique
  data      String   @db.Text
  expiresAt DateTime
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([expiresAt])
}
```

## Testing dengan Postman/curl

### 1. Register User
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "password": "TestPass123!",
    "confirmPassword": "TestPass123!",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "username": "test_user", 
    "password": "TestPass123!"
  }'
```

### 3. Get Profile (dengan cookie)
```bash
curl -X GET http://localhost:3001/api/v1/auth/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

### 4. Logout
```bash
curl -X POST http://localhost:3001/api/v1/auth/logout \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

## Catatan Pengembangan

1. **Password Policy**: Dapat disesuaikan di `src/validations/user.validation.ts`
2. **Session Duration**: Dapat diubah di `src/server.ts` (cookie.maxAge)
3. **Role Management**: Tambah role baru di enum UserRole di schema.prisma
4. **Cleanup Frequency**: Ubah cron schedule di `src/utils/sessionCleanup.ts`

## Keamanan Production

1. Gunakan HTTPS di production
2. Set `NODE_ENV=production`
3. Gunakan strong SESSION_SECRET (minimal 32 karakter random)
4. Setup rate limiting untuk endpoint auth
5. Implement CSRF protection jika diperlukan
6. Monitor failed login attempts
7. Implement account lockout policy
