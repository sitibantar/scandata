-- Tabel Users: Menyimpan data dasar dan status paket
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    package_type TEXT DEFAULT 'trial', -- Nilai: 'trial', 'pro'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Trial Usage: Melacak batasan kuota pengguna gratis
CREATE TABLE trial_usage (
    user_id TEXT PRIMARY KEY,
    scan_count INTEGER DEFAULT 0,    -- Maksimal 2
    template_count INTEGER DEFAULT 0, -- Maksimal 1
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel Templates: Kunci keamanan! Struktur prompt AI disimpan di server, bukan di Flutter.
CREATE TABLE templates (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    primary_key TEXT NOT NULL,       -- cth: NIK
    foreign_key TEXT,                -- cth: No KK
    shared_keys TEXT,                -- Array JSON (cth: Alamat, RT/RW)
    additional_keys TEXT,            -- Array JSON opsional
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel Transactions: Untuk integrasi API Middleware GoPay (QRIS Dinamis)
CREATE TABLE transactions (
    id TEXT PRIMARY KEY,             -- Bertindak sebagai custom_order_id
    user_id TEXT NOT NULL,
    amount INTEGER NOT NULL,         -- Nominal dasar
    amount_paid INTEGER,             -- Nominal + Kode Unik dari Webhook
    status TEXT DEFAULT 'pending',   -- Nilai: 'pending', 'settlement', 'expired'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);