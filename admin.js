// ======= DATA LOGIN ADMIN =======
const ADMIN_USERNAME = "admin";   // ganti sesuai keinginan
const ADMIN_PASSWORD = "123456";  // ganti sesuai keinginan

// ======= FUNGSI LOGIN =======
function loginAdmin() {
    const userInput = document.getElementById("adminUser").value.trim();
    const passInput = document.getElementById("adminPass").value.trim();

    if (userInput === ADMIN_USERNAME && passInput === ADMIN_PASSWORD) {
        // Login berhasil
        document.getElementById("adminLoginForm").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        showNotif("✅ Login admin berhasil!");
    } else {
        // Login gagal
        showNotif("❌ Username atau password salah!");
    }
}

// ======= FUNGSI LOGOUT =======
function logoutAdmin() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("adminLoginForm").style.display = "block";
    document.getElementById("adminUser").value = "";
    document.getElementById("adminPass").value = "";
    showNotif("⚡ Admin logout berhasil!");
}

// ======= FUNGSI NOTIFIKASI =======
function showNotif(msg) {
    const el = document.getElementById("notif");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2500);
}

// ======= FUNGSI HAPUS SEMUA DATA =======
function clearAllData() {
    if (confirm("⚠️ Yakin ingin menghapus semua absensi?")) {
        localStorage.removeItem("absensi");
        renderTable();
        updateStats();
        showNotif("🗑️ Semua data absensi berhasil dihapus!");
    }
}

// ======= CONTOH PANGGIL DI HTML =======
// <input id="adminUser" placeholder="Username admin" />
// <input id="adminPass" type="password" placeholder="Password admin" />
// <button onclick="loginAdmin()">Login Admin</button>
// <div id="adminPanel" style="display:none;">
//     <button onclick="clearAllData()">Hapus Semua Data</button>
//     <button onclick="logoutAdmin()">Logout</button>
// </div>
// <div id="notif" class="notif"></div>
