# Catatan API

API sederhana untuk mengelola catatan menggunakan Node.js dan Express.js.

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
   cd nama-proyek
   ```
3. Install dependensi:
   ```sh
   npm install
   ```

## Menjalankan Server
Jalankan perintah berikut untuk menjalankan server:
```sh
npm start
```
Server akan berjalan di `http://localhost:3000`.

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
             "body": "Isi catatan",
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
       "body": "Isi catatan baru"
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
       "body": "Isi catatan diperbarui"
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
- nanoid (untuk membuat ID unik)
- CORS
