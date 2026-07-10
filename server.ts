import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily to avoid crashing on start if the key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Real AI evaluations will fall back to simulated responses.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ----------------------------------------------------
// AI Integration (Gemini API) System Prompt Design
// ----------------------------------------------------
const SYSTEM_PROMPT = `Anda adalah seorang Konselor Pendidikan Islami dan Wali Kelas di SMP Islam Al Azhar 9 Bekasi.
Tugas Anda adalah membaca data mutaba'ah mingguan siswa dalam format JSON, lalu memberikan 1 PARAGRAF EVALUASI (antara 3 s.d. 5 kalimat) berbahasa Indonesia yang sangat santun, islami, bernada apresiatif, serta memotivasi siswa untuk istikamah atau memperbaiki ibadahnya.

Aturan Penting Evaluasi:
1. Sapa siswa dengan nama depannya secara hangat dan santun (contoh: "Ananda Ahmad," atau "Ananda Siti,").
2. Analisis 5 aspek mutaba'ah:
   - Shalat Wajib (apakah 5 waktu lengkap, berjamaah di masjid bagi laki-laki, atau tepat waktu).
   - Shalat Sunnah (seperti Dhuha, Rawatib, Tahajud).
   - Tilawah/Hafalan Qur'an (apakah ada tilawah harian, hafalan baru, muraja'ah).
   - Pola Tidur (tidur tepat waktu, tidak larut malam, agar segar saat shalat subuh).
   - Birrul Walidain (membantu orang tua di rumah, berkata sopan).
3. Berikan apresiasi yang tulus untuk aspek yang sudah dikerjakan dengan sangat baik. Gunakan ungkapan syukur (seperti "Alhamdulillah", "Barakallahu fiik").
4. Berikan nasihat/rekomendasi yang membimbing dan penuh kelembutan (contoh: "Mari kita tingkatkan...", "Cobalah untuk...") untuk aspek yang masih kurang konsisten atau terlewatkan.
5. Sisipkan doa singkat yang tulus di bagian akhir agar siswa selalu dalam bimbingan Allah SWT.
6. Hasil akhir harus berupa SATU PARAGRAF UTUH tanpa poin-poin (bullet points), tanpa pemformatan markdown tebal/miring ekstrim yang merusak tata letak PDF rapor, dan langsung siap dicetak. Jangan terlalu panjang, maksimal 120 kata.`;

// Endpoint 1: Gemini AI evaluation for Weekly Recap
app.post("/api/gemini/evaluate", async (req, res) => {
  try {
    const { studentName, weeklyData } = req.body;
    
    if (!studentName || !weeklyData) {
      return res.status(400).json({ error: "Name and weekly data JSON are required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return simulated responses if key is missing, adhering to high-quality Indonesian content
      const totalShalat = weeklyData.shalatWajibCount || 0;
      const totalSunnah = weeklyData.shalatSunnahCount || 0;
      const tilawahDays = weeklyData.tilawahDaysCount || 0;
      const birrulDays = weeklyData.birrulWalidainDaysCount || 0;
      const sleepDays = weeklyData.goodSleepDaysCount || 0;

      let evaluation = "";
      if (totalShalat >= 30 && tilawahDays >= 5 && birrulDays >= 5) {
        evaluation = `Barakallahu fiik Ananda ${studentName}, bapak sangat bersyukur melihat konsistensi ibadahmu minggu ini, terutama shalat lima waktu yang terjaga dengan baik serta tilawah Al-Qur'an dan bakti kepada orang tua yang luar biasa. Teruskanlah pola tidur yang teratur ini agar fisikmu selalu segar untuk beribadah dan belajar di SMP Islam Al Azhar 9 Bekasi. Semoga Allah SWT senantiasa melimpahkan hidayah, kecerdasan, dan keberkahan dalam setiap langkahmu menuju masa depan yang gemilang. Aamiin.`;
      } else {
        evaluation = `Alhamdulillah, bapak mengapresiasi usaha Ananda ${studentName} dalam menjalankan ibadah mutaba'ah minggu ini. Namun, bapak perhatikan masih ada beberapa shalat wajib yang terlewatkan dan tilawah Al-Qur'an yang perlu dirutinkan kembali, serta mari perbaiki pola tidur agar tidak larut malam sehingga shalat subuh tidak terlambat. Mari kita kuatkan niat dan tekad untuk menyempurnakan ibadah kita minggu depan sebagai wujud syukur dan bakti kepada orang tua. Semoga Allah SWT memudahkan setiap langkah kebaikanmu, Nak. Aamiin.`;
      }
      return res.json({ evaluation, isSimulated: true });
    }

    const userContent = `Berikut adalah data mutaba'ah mingguan siswa bernama ${studentName}:
${JSON.stringify(weeklyData, null, 2)}

Berikan evaluasi mingguan Anda dalam 1 paragraf sesuai dengan System Prompt.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userContent,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const evaluation = response.text?.trim() || "";
    return res.json({ evaluation, isSimulated: false });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Gagal memproses evaluasi AI: " + error.message });
  }
});

// Endpoint 2: Submit Daily Mutaba'ah (corresponds to Task 5 - API Code Snippet)
// Demonstrates point calculations & streak logic
app.post("/api/mutabaah/submit", (req, res) => {
  try {
    const { 
      studentId, 
      studentName,
      date, 
      shalatWajib, // { subuh: boolean, zuhur: boolean, ashar: boolean, maghrib: boolean, isya: boolean }
      shalatSunnah, // { dhuha: boolean, tahajud: boolean, qabliyahSubuh: boolean, ... }
      tilawah, // { surah: string, ayat: string, juz: number }
      hafalan, // { surah: string, ayat: string, juz: number, tipe: "ziyadah" | "murojaah" }
      polaTidur, // { sebelum22: boolean, bangun05: boolean }
      birrulWalidain, // string[] (list of helping activities)
      currentStreakDays // number (streak passed from client or fetched from DB)
    } = req.body;

    if (!studentId || !date) {
      return res.status(400).json({ error: "Student ID and Date are required." });
    }

    // 1. Point System Logic Calculation
    let pointsEarned = 0;
    const details: string[] = [];

    // Shalat Wajib: 10 points for Berjama'ah, 5 points for Munfarid (Max 50)
    if (shalatWajib) {
      if (shalatWajib.haidh) {
        pointsEarned += 50;
        details.push(`Shalat Wajib: Sedang Haidh (+50 Poin)`);
      } else {
        let jamaahCount = 0;
        let munfaridCount = 0;
        
        const checkPrayer = (val: any) => {
          if (val === "berjamaah") {
            jamaahCount++;
          } else if (val === "munfarid") {
            munfaridCount++;
          } else if (val === true) {
            jamaahCount++; // Backward compatibility fallback
          }
        };

        checkPrayer(shalatWajib.subuh);
        checkPrayer(shalatWajib.zuhur);
        checkPrayer(shalatWajib.ashar);
        checkPrayer(shalatWajib.maghrib);
        checkPrayer(shalatWajib.isya);

        const shalatPoints = (jamaahCount * 10) + (munfaridCount * 5);
        pointsEarned += shalatPoints;
        details.push(`Shalat Wajib: ${jamaahCount} Berjama'ah (+${jamaahCount * 10} Pts), ${munfaridCount} Munfarid (+${munfaridCount * 5} Pts)`);
      }
    }

    // Shalat Sunnah: Dhuha (15 pts), Tahajud (20 pts), Rawatib (5 pts each, max 25)
    if (shalatSunnah) {
      if (shalatSunnah.haidh) {
        pointsEarned += 18; // 30% of total 60 points
        details.push(`Shalat Sunnah & Rawatib: Sedang Haidh (+18 Poin)`);
      } else {
        let sunnahPoints = 0;
        if (shalatSunnah.tahajud) {
          sunnahPoints += 20;
          details.push(`Shalat Tahajud (+20 Poin)`);
        }
        if (shalatSunnah.dhuha) {
          sunnahPoints += 15;
          details.push(`Shalat Dhuha (+15 Poin)`);
        }
        
        // Calculate individual Rawatib checkboxes
        let rawatibCount = 0;
        if (shalatSunnah.qabliyahSubuh) rawatibCount++;
        if (shalatSunnah.qabliyahDzuhur) rawatibCount++;
        if (shalatSunnah.badiyahDzuhur) rawatibCount++;
        if (shalatSunnah.badiyahMaghrib) rawatibCount++;
        if (shalatSunnah.badiyahIsya) rawatibCount++;
        
        // Compatibility fallback for old rawatibCount
        if (shalatSunnah.rawatibCount && rawatibCount === 0) {
          rawatibCount = shalatSunnah.rawatibCount;
        }
        
        if (rawatibCount > 0) {
          const rawatibPoints = Math.min(rawatibCount * 5, 25);
          sunnahPoints += rawatibPoints;
          details.push(`Shalat Rawatib: ${rawatibCount} rawatib (+${rawatibPoints} Poin)`);
        }
        pointsEarned += sunnahPoints;
      }
    }

    // Tilawah/Membaca Al-Qur'an
    if (tilawah) {
      if (tilawah.surah === "Tidak membaca") {
        details.push(`Membaca Al-Qur'an: Tidak membaca (0 Poin)`);
      } else if (tilawah.surah && tilawah.ayat) {
        pointsEarned += 20;
        details.push(`Membaca Al-Qur'an: Surah ${tilawah.surah} Ayat ${tilawah.ayat} (Juz ${tilawah.juz || '30'}) (+20 Poin)`);
      } else if (tilawah.pages) {
        // Fallback for old pages format
        const tilawahPoints = Math.min(tilawah.pages * 10, 40);
        pointsEarned += tilawahPoints;
        details.push(`Tilawah Al-Qur'an: ${tilawah.pages} halaman (+${tilawahPoints} Poin)`);
      }
    }

    // Hafalan Al-Qur'an
    if (hafalan) {
      if (hafalan.tipe === "tidak_hafalan" || hafalan.surah === "Tidak hafalan") {
        details.push(`Hafalan Al-Qur'an: Tidak hafalan (0 Poin)`);
      } else if (hafalan.surah && hafalan.ayat) {
        pointsEarned += 25;
        const labelTipe = hafalan.tipe === "murojaah" ? "Muroja'ah" : "Ziyadah";
        details.push(`Hafalan Al-Qur'an (${labelTipe}): Surah ${hafalan.surah} Ayat ${hafalan.ayat} (Juz ${hafalan.juz || '30'}) (+25 Poin)`);
      }
    }

    // Pola Tidur Sehat
    if (polaTidur) {
      if (polaTidur.sebelum22 !== undefined || polaTidur.bangun05 !== undefined) {
        if (polaTidur.sebelum22) {
          pointsEarned += 10;
          details.push(`Pola Tidur Sehat: Tidur sebelum pukul 22:00 (+10 Poin)`);
        }
        if (polaTidur.bangun05) {
          pointsEarned += 10;
          details.push(`Pola Tidur Sehat: Bangun jam 5:00 (+10 Poin)`);
        }
      } else if (polaTidur.sleepTime) {
        // Fallback for old format
        const [hour, minute] = polaTidur.sleepTime.split(":").map(Number);
        const isEarlySleep = hour < 22 || (hour === 22 && minute === 0);
        if (isEarlySleep) {
          pointsEarned += 15;
          details.push(`Pola Tidur Sehat: Tidur sebelum pukul 22:00 (+15 Poin)`);
        }
      }
    }

    // Birrul Walidain
    if (birrulWalidain && Array.isArray(birrulWalidain)) {
      // Remove placeholder "Other" and "Tidak ada" from count if present
      const cleanActivities = birrulWalidain.filter(a => a !== "Other" && a !== "Tidak ada");
      const birrulPoints = Math.min(cleanActivities.length * 10, 40);
      pointsEarned += birrulPoints;
      if (cleanActivities.length > 0) {
        details.push(`Birrul Walidain: Membantu orang tua (${cleanActivities.length} kegiatan) (+${birrulPoints} Poin)`);
      } else {
        details.push(`Birrul Walidain: Tidak membantu orang tua (0 Poin)`);
      }
    }

    // Infaq atau Sedekah Harian (+15 Pts)
    const { infaq } = req.body;
    if (infaq) {
      if (infaq.hasInfaq) {
        pointsEarned += 15;
        const amountFormatted = infaq.amount ? `Rp ${Number(infaq.amount).toLocaleString("id-ID")}` : "Tanpa Nominal";
        const proofLabel = infaq.fileData ? "dengan bukti transfer" : "tanpa bukti transfer";
        details.push(`Infaq/Sedekah: Berinfaq sebesar ${amountFormatted} (${proofLabel}) (+15 Poin)`);
      } else {
        details.push(`Infaq/Sedekah: Tidak berinfaq (0 Poin)`);
      }
    }

    // 2. Streak Logic (Berturut-turut)
    // If student successfully logs 5 main daily activities (minimum 50 total raw points today), we maintain or increment streak.
    const eligibleForStreak = pointsEarned >= 50;
    let nextStreak = currentStreakDays || 0;
    let streakBonus = 0;

    if (eligibleForStreak) {
      nextStreak += 1;
      // Bonus: +5 points for every day of streak (capped at +50 points bonus per day after 10 days streak)
      streakBonus = Math.min(nextStreak * 5, 50);
      pointsEarned += streakBonus;
      details.push(`Streak Bonus: Day ${nextStreak} (+${streakBonus} Poin)`);
    } else {
      nextStreak = 0;
      details.push(`Streak Terputus: Aktivitas hari ini kurang memenuhi syarat minimum (min. 50 Poin)`);
    }

    return res.json({
      success: true,
      message: "Data mutaba'ah harian berhasil disimpan!",
      date,
      pointsEarned,
      streakDays: nextStreak,
      streakBonus,
      pointsBreakdown: details,
      studentName: studentName || "Siswa Al Azhar"
    });

  } catch (error: any) {
    console.error("Submit Mutaba'ah Error:", error);
    return res.status(500).json({ error: "Gagal menyimpan data mutaba'ah: " + error.message });
  }
});

// Start Express and Vite server
async function startServer() {
  const isProduction = 
    process.env.NODE_ENV === "production" || 
    (process.argv[1] && (process.argv[1].includes("server.cjs") || process.argv[1].includes("dist"))) ||
    (typeof __filename !== "undefined" && (__filename.includes("server.cjs") || __filename.includes("dist")));

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
