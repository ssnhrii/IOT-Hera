# 🔐 Login Credentials HERA

## Default User

Sistem HERA sudah dilengkapi dengan 1 user default untuk testing:

### Petugas SAR
```
Email: petugas@hera.go.id
Password: petugas123
Role: petugas
```
**Akses:**
- ✅ Dashboard lengkap
- ✅ GPR Visualization
- ✅ AI Analysis
- ✅ Manajemen Laporan (CRUD)
- ✅ Manajemen Aduan Bantuan
- ✅ Data Bencana BMKG

## Cara Login

1. Buka browser ke: **http://localhost:5173**
2. Klik tombol **"Masuk Petugas"** di homepage atau navbar
3. Masukkan email dan password
4. Klik **"Login"**

## Fitur Publik (Tanpa Login)

Fitur berikut dapat diakses tanpa login:
- 🏠 Homepage
- 📋 Lihat Laporan Kegiatan (public reports)
- 🆘 Submit Aduan Bantuan Darurat
- ⚠️ Info Bencana BMKG

## Membuat User Baru

Jika ingin membuat user baru, jalankan:

```bash
cd backend
npm run seed
```

Atau manual via MySQL:

```sql
-- Hash password dengan bcrypt (10 rounds)
-- Contoh: password "mypassword" → hash dengan bcrypt

INSERT INTO users (email, password, name, role, is_active, created_at, updated_at)
VALUES (
  'newuser@hera.go.id',
  '$2b$10$hashedPasswordHere',
  'New User Name',
  'petugas',
  1,
  NOW(),
  NOW()
);
```

## Reset Password

Untuk reset password user yang ada:

```bash
cd backend
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('newpassword', 10).then(hash => console.log(hash));"
```

Kemudian update di database:

```sql
UPDATE users 
SET password = '$2b$10$newHashedPassword' 
WHERE email = 'petugas@hera.go.id';
```

## Security Notes

⚠️ **PENTING untuk Production:**
1. Ganti password default
2. Gunakan password yang kuat (min 12 karakter)
3. Aktifkan 2FA jika memungkinkan
4. Rotate JWT secret secara berkala
5. Monitor login attempts
6. Implement account lockout setelah failed attempts

## Troubleshooting

### Login Gagal?
1. Pastikan backend running di port 5000
2. Cek database MySQL sudah running
3. Cek user ada di database: `SELECT * FROM users;`
4. Cek console browser untuk error messages
5. Cek backend logs untuk authentication errors

### Token Expired?
- JWT token expire setelah 24 jam
- Logout dan login kembali untuk mendapat token baru
- Token disimpan di localStorage browser

### Lupa Password?
- Gunakan script reset password di atas
- Atau jalankan seeder ulang: `npm run seed`
