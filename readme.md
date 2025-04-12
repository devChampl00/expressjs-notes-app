# Catatan API

API sederhana untuk mengelola catatan menggunakan Node.js, Express.js, dan Supabase (PostgreSQL). Aplikasi ini siap di-deploy ke Vercel.

## Fitur
- Menampilkan semua catatan
- Menambahkan catatan baru
- Menampilkan satu catatan berdasarkan ID
- Memperbarui catatan berdasarkan ID
- Menghapus catatan berdasarkan ID

## Instalasi
1. Clone repository ini:
   ```sh
   git clone <repo_url>
   ```
2. Masuk ke direktori proyek:
   ```sh
   cd express-notes-api
   ```
3. Install dependensi:
   ```sh
   npm install
   ```
4. Buat file `.env` berdasarkan `.env.example` dan isi dengan kredensial Supabase Anda:
   ```sh
   cp .env.example .env
   ```
5. Buat database di Supabase dan jalankan SQL dari file `supabase-schema.sql`

## Struktur Database
Aplikasi ini menggunakan Supabase (PostgreSQL) sebagai database. Model utama adalah `notes` dengan struktur sebagai berikut:

- `id`: BIGINT (Primary Key, Auto Increment)
- `title`: TEXT (Required)
- `content`: TEXT (Required)
- `tags`: JSONB (Optional)
- `created_at`: TIMESTAMP WITH TIME ZONE
- `updated_at`: TIMESTAMP WITH TIME ZONE

File `supabase-schema.sql` berisi SQL untuk membuat tabel dan kebijakan keamanan di Supabase.

## Menjalankan Server
Jalankan perintah berikut untuk menjalankan server:
```sh
npm start
```
Server akan berjalan di `http://localhost:9876`.

## Deployment ke Vercel
Proyek ini sudah dikonfigurasi untuk di-deploy ke Vercel. Pastikan untuk menambahkan variabel lingkungan berikut di Vercel:

- `SUPABASE_URL`: URL Supabase Anda
- `SUPABASE_KEY`: Kunci Anon/Service Role Supabase Anda

Kemudian deploy dengan menggunakan Vercel CLI atau menghubungkan repositori GitHub Anda ke Vercel.

## Endpoint API
### 1. **Mendapatkan Semua Catatan**
   - **URL:** `/api/notes`
   - **Method:** `GET`
   - **Response:**
     ```json
     {
       "status": "success",
       "data": {
         "notes": [
           {
             "id": "abc123",
             "title": "Judul Catatan",
             "tags": ["tag1", "tag2"],
             "content": "Isi catatan",
             "createdAt": "2024-03-13T10:00:00.000Z",
             "updatedAt": "2024-03-13T10:00:00.000Z"
           }
         ]
       }
     }
     ```

### 2. **Menambahkan Catatan Baru**
   - **URL:** `/api/notes`
   - **Method:** `POST`
   - **Body:**
     ```json
     {
       "title": "Judul Baru",
       "tags": ["tag1", "tag2"],
       "content": "Isi catatan baru"
     }
     ```
   - **Response:**
     ```json
     {
       "status": "success",
       "message": "Catatan berhasil ditambahkan",
       "data": {
         "noteId": "xyz789"
       }
     }
     ```

### 3. **Mendapatkan Catatan Berdasarkan ID**
   - **URL:** `/api/notes/{id}`
   - **Method:** `GET`
   - **Response:**
     ```json
     {
       "status": "success",
       "data": {
         "note": {
           "id": "abc123",
           "title": "Judul Catatan",
           "tags": ["tag1", "tag2"],
           "body": "Isi catatan",
           "createdAt": "2024-03-13T10:00:00.000Z",
           "updatedAt": "2024-03-13T10:00:00.000Z"
         }
       }
     }
     ```

### 4. **Memperbarui Catatan**
   - **URL:** `/api/notes/{id}`
   - **Method:** `PUT`
   - **Body:**
     ```json
     {
       "title": "Judul Baru",
       "tags": ["tag1", "tag2"],
       "content": "Isi catatan diperbarui"
     }
     ```
   - **Response:**
     ```json
     {
       "status": "success",
       "message": "Catatan berhasil diperbarui"
     }
     ```

### 5. **Menghapus Catatan**
   - **URL:** `/api/notes/{id}`
   - **Method:** `DELETE`
   - **Response:**
     ```json
     {
       "status": "success",
       "message": "Catatan berhasil dihapus"
     }
     ```

## Teknologi yang Digunakan
- Node.js
- Express.js
- Supabase (PostgreSQL database)
- express-async-handler (untuk penanganan error asinkron)
- cors (untuk mengelola Cross-Origin Resource Sharing)
- dotenv (untuk mengelola variabel lingkungan)
