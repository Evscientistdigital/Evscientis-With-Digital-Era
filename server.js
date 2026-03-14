import express from "express"
import cors from "cors"
import fs from "fs"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const DB_FILE = "./database.json"

// baca database
function readDB() {
  const data = fs.readFileSync(DB_FILE)
  return JSON.parse(data)
}

// tulis database
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

// API cek server
app.get("/", (req, res) => {
  res.json({ message: "Server Absensi Aktif" })
})

// ambil semua absensi
app.get("/absensi", (req, res) => {
  const data = readDB()
  res.json(data)
})

// tambah absensi
app.post("/absensi", (req, res) => {
  const db = readDB()
  const data = req.body

  const today = new Date().toLocaleDateString("id-ID")

  const sudahAbsen = db.find(
    (a) => a.nis === data.nis && a.tanggal === today
  )

  if (sudahAbsen) {
    return res.json({
      status: "error",
      message: "Siswa sudah absen hari ini"
    })
  }

  db.push({
    ...data,
    timestamp: new Date().toISOString()
  })

  writeDB(db)

  res.json({
    status: "success",
    message: "Absensi berhasil disimpan"
  })
})

// hapus semua data (admin)
app.delete("/absensi", (req, res) => {
  writeDB([])
  res.json({ status: "deleted" })
})

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
})
