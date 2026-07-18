import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Database, 
  Award, 
  FileText, 
  Brain, 
  Code2, 
  CheckCircle2, 
  XCircle, 
  X,
  Eye,
  Flame, 
  Sparkles, 
  Clock, 
  HeartHandshake, 
  BookOpen, 
  Download, 
  UserCheck, 
  Users, 
  Check, 
  Copy, 
  ChevronRight, 
  AlertCircle, 
  AlertTriangle,
  Calendar, 
  TrendingUp, 
  Send,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  Printer,
  ChevronDown,
  LogIn,
  LogOut,
  Upload,
  Lock,
  FileSpreadsheet,
  Trash2,
  Settings,
  Save,
  School,
  Filter,
  CalendarDays,
  CalendarRange,
  ChevronUp,
  RefreshCw
} from "lucide-react";
import { INITIAL_STUDENTS, INITIAL_TEACHERS, INITIAL_PARENTS } from "./initialData";
import { SmpAlAzhar9Logo, YayasanMuhajirienLogo } from "./components/BrandLogos";

// Types
interface Student {
  id: string;
  name: string;
  class: string;
  parentId: string;
  teacherId: string;
  nisn: string;
  streak: number;
  points: number;
  nis?: string;
  gender?: string;
  musyrif1?: string;
  musyrif2?: string;
}

interface Teacher {
  id: string;
  name: string;
  nip: string;
  classAssigned: string;
  password?: string;
}

interface Parent {
  id: string;
  name: string;
  phone: string;
  studentId: string;
}

interface LogEntry {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  pointsEarned: number;
  streakDays: number;
  details: string[];
  parentApproved: boolean;
  teacherApproved: boolean;
  rejectedByTeacher?: boolean;
  rejectionReason?: string;
  shalatWajib?: { subuh: any; zuhur: any; ashar: any; maghrib: any; isya: any; haidh?: boolean };
  shalatSunnah?: { tahajud: boolean; dhuha: boolean; qabliyahSubuh: boolean; qabliyahDzuhur: boolean; badiyahDzuhur: boolean; badiyahMaghrib: boolean; badiyahIsya: boolean; haidh?: boolean };
  tilawah?: { surah: string; customSurah?: string; ayat: string; juz: string };
  hafalan?: { surah: string; customSurah?: string; ayat: string; juz: string; tipe: "ziyadah" | "murojaah" | "tidak_hafalan" };
  polaTidur?: { sebelum22: boolean; bangun05: boolean };
  birrulWalidain?: string[];
  infaq?: { hasInfaq: boolean; amount: string; fileData: string; fileName: string; fileType: string };
}

const SURAH_LIST = [
  "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa'", "Al-Ma'idah", "Al-An'am", 
  "Al-A'raf", "Al-Anfal", "At-Taubah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", 
  "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra'", "Al-Kahfi", "Maryam", "Tha-Ha", 
  "Al-Anbiya'", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Asy-Syu'ara'", 
  "An-Naml", "Al-Qashash", "Al-'Ankabut", "Ar-Rum", "Luqman", "As-Sajdah", 
  "Al-Ahzab", "Saba'", "Fathir", "Ya-Sin", "Ash-Shaffat", "Shad", "Az-Zumar", 
  "Ghafir / Al-Mu'min", "Fushshilat", "Asy-Syura", "Az-Zukhruf", "Ad-Dukhan", 
  "Al-Jatsiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", 
  "Adz-Dzariyat", "Ath-Thur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", 
  "Al-Hadid", "Al-Mujadilah", "Al-Hasyr", "Al-Mumtahanah", "Ash-Shaff", 
  "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "Ath-Thalaq", "At-Tahrim", 
  "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn", 
  "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan / Ad-Dahr", 
  "Al-Mursalat", "An-Naba'", "An-Nazi'at", "'Abasa", "At-Takwir", "Al-Infithar", 
  "Al-Muthaffifin", "Al-Insyiqaq", "Al-Buruj", "Ath-Thariq", "Al-A'la", 
  "Al-Ghasyiyah", "Al-Fajr", "Al-Balad", "Asy-Syams", "Al-Lail", "Adh-Duha", 
  "Al-Insyirah / Asy-Syarh", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", 
  "Az-Zalzalah", "Al-'Adiyat", "Al-Qari'ah", "At-Takatsur", "Al-'Ashr", 
  "Al-Humazah", "Al-Fil", "Quraisy", "Al-Ma'un", "Al-Kautsar", "Al-Kafirun", 
  "An-Nashr", "Al-Lahab / Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas", 
  "Lainnya (Ketik Manual)"
];

// Helper function to compress images using Canvas API
function compressImage(file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions keeping aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Helper function to resolve dynamic API URLs based on subdirectory (e.g. /mutabaah)
const getApiUrl = (endpoint: string) => {
  const isProdSubpath = window.location.pathname.includes("/mutabaah");
  return isProdSubpath ? `/mutabaah${endpoint}` : endpoint;
};

export default function App() {
  // Modes: "operational" (to operate the app) or "blueprint" (to view database schemas & developer docs)
  const [appMode, setAppMode] = useState<"operational" | "blueprint">("operational");
  
  // Tabs for Operational Mode
  const [opTab, setOpTab] = useState<"dashboard" | "students" | "teachers" | "parents" | "daily" | "reports" | "logos">("dashboard");
  
  // Tabs for Blueprint Mode
  const [bpTab, setBpTab] = useState<"schema" | "gamification" | "api">("schema");

  const [copiedText, setCopiedText] = useState<string | null>(null);

  // ----------------------------------------------------
  // SCHOOL & FOUNDATION LOGO STATES (Admin overrides)
  // ----------------------------------------------------
  const [customSmpLogo, setCustomSmpLogo] = useState<string | null>(() => localStorage.getItem("customSmpLogo"));
  const [customYayasanLogo, setCustomYayasanLogo] = useState<string | null>(() => localStorage.getItem("customYayasanLogo"));

  // ----------------------------------------------------
  // SCHOOL PROFILE STATES (Admin overrides)
  // ----------------------------------------------------
  const [schoolProfile, setSchoolProfile] = useState(() => ({
    name: localStorage.getItem("school_profile_name") || "SMP Islam Al Azhar 9 Bekasi",
    principal: localStorage.getItem("school_profile_principal") || "H. Amril, S.Ag, M.Pd",
    principalNip: localStorage.getItem("school_profile_principalNip") || "1971030519980310",
    address: localStorage.getItem("school_profile_address") || "Jl. Kemang Pratama Raya, Bekasi Barat",
    phone: localStorage.getItem("school_profile_phone") || "021-82410000",
    npsn: localStorage.getItem("school_profile_npsn") || "20220301",
    yayasan: localStorage.getItem("school_profile_yayasan") || "YAYASAN WAQAF AL MUHAJIRIEN / YPI AL AZHAR"
  }));

  // ----------------------------------------------------
  // LEADERBOARD / PERINGKAT STATES
  // ----------------------------------------------------
  const [rankClassFilter, setRankClassFilter] = useState<string>("Semua Kelas");
  const [rankTimeFilter, setRankTimeFilter] = useState<"semua" | "harian" | "pekanan" | "bulanan" | "custom">("pekanan");
  const [rankStartDate, setRankStartDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [rankEndDate, setRankEndDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [showAllRanked, setShowAllRanked] = useState<boolean>(false);

  // ----------------------------------------------------
  // STUDENT MASTER LIST SORTING & FILTERING STATES
  // ----------------------------------------------------
  const [studentSortBy, setStudentSortBy] = useState<"total" | "harian" | "pekanan" | "bulanan" | "custom">("total");
  const [studentSortStartDate, setStudentSortStartDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [studentSortEndDate, setStudentSortEndDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [studentSortType, setStudentSortType] = useState<"verified" | "all">("all");

  // ----------------------------------------------------
  // DYNAMIC MASTER DATABASES (React State)
  // ----------------------------------------------------
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);

  const [parents, setParents] = useState<Parent[]>(INITIAL_PARENTS);

  const [historyLogs, setHistoryLogs] = useState<LogEntry[]>([
    {
      id: "LOG-001",
      studentId: "STD-003",
      studentName: "Ahmad Fauzan",
      date: "2026-07-01",
      pointsEarned: 104,
      streakDays: 5,
      parentApproved: false,
      teacherApproved: false,
      shalatWajib: { subuh: true, zuhur: true, ashar: true, maghrib: true, isya: true },
      shalatSunnah: { tahajud: true, dhuha: true, qabliyahSubuh: true, qabliyahDzuhur: false, badiyahDzuhur: true, badiyahMaghrib: true, badiyahIsya: true },
      tilawah: { surah: "An-Naba'", ayat: "1-10", juz: "30" },
      hafalan: { surah: "An-Nazi'at", ayat: "1-5", juz: "30", tipe: "ziyadah" },
      polaTidur: { sebelum22: true, bangun05: true },
      birrulWalidain: ["Merapihkan tempat tidur sendiri", "Membantu memasak atau menyiapkan makanan"],
      details: ["Shalat Wajib: 5 Berjama'ah (+35 Poin)", "Shalat Dhuha (+5 Poin)", "Shalat Tahajud (+15 Poin)", "Shalat Rawatib (+15 Poin)", "Tilawah Al-Qur'an (+10 Poin)", "Hafalan Al-Qur'an (+10 Poin)"]
    },
    {
      id: "LOG-002",
      studentId: "STD-003",
      studentName: "Siti Humaira",
      date: "2026-07-01",
      pointsEarned: 104,
      streakDays: 12,
      parentApproved: true,
      teacherApproved: false,
      shalatWajib: { subuh: true, zuhur: true, ashar: true, maghrib: true, isya: true },
      shalatSunnah: { tahajud: true, dhuha: true, qabliyahSubuh: true, qabliyahDzuhur: true, badiyahDzuhur: true, badiyahMaghrib: true, badiyahIsya: true },
      tilawah: { surah: "Al-Kahfi", ayat: "1-10", juz: "15" },
      hafalan: { surah: "An-Naba'", ayat: "1-20", juz: "30", tipe: "murojaah" },
      polaTidur: { sebelum22: true, bangun05: true },
      birrulWalidain: ["Membantu membersihkan rumah", "Mencuci piring"],
      details: ["Shalat Wajib: 5 Berjama'ah (+35 Poin)", "Shalat Dhuha (+5 Poin)", "Shalat Tahajud (+15 Poin)", "Shalat Rawatib (+15 Poin)", "Tilawah Al-Qur'an (+10 Poin)", "Hafalan Al-Qur'an (+10 Poin)"]
    }
  ]);

  // ----------------------------------------------------
  // FORM STATES (To add dynamic records)
  // ----------------------------------------------------
  const [formStudent, setFormStudent] = useState({ name: "", nisn: "", class: "8A", teacherId: "TCH-007", parentId: "PRT-001", nis: "", gender: "L", musyrif1: "", musyrif2: "" });
  const [formTeacher, setFormTeacher] = useState({ name: "", nip: "", classAssigned: "8A", password: "" });
  const [formParent, setFormParent] = useState({ name: "", phone: "", studentId: "STD-001" });
  
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [selectedTeacherIds, setSelectedTeacherIds] = useState<string[]>([]);
  const [selectedParentIds, setSelectedParentIds] = useState<string[]>([]);
  
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [rejectingLogId, setRejectingLogId] = useState<string | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState<string>("");

  // ----------------------------------------------------
  // DAILY CHECKLIST INPUT STATES
  // ----------------------------------------------------
  const [selectedStudentId, setSelectedStudentId] = useState<string>("STD-001");
  const [shalatWajib, setShalatWajib] = useState<{ subuh: any; zuhur: any; ashar: any; maghrib: any; isya: any; haidh: boolean }>({ 
    subuh: "berjamaah", 
    zuhur: "berjamaah", 
    ashar: "berjamaah", 
    maghrib: "berjamaah", 
    isya: "berjamaah", 
    haidh: false 
  });
  const [shalatSunnah, setShalatSunnah] = useState({ 
    tahajud: true, 
    dhuha: true, 
    qabliyahSubuh: true, 
    qabliyahDzuhur: true, 
    badiyahDzuhur: true, 
    badiyahMaghrib: true, 
    badiyahIsya: true,
    haidh: false
  });
  const [tilawah, setTilawah] = useState({
    surah: "Tidak membaca",
    customSurah: "",
    customSurahEnd: "",
    ayat: "",
    juz: "30",
    surahEnd: "Tidak membaca",
    juzEnd: "30"
  });
  const [infaq, setInfaq] = useState<{
    hasInfaq: boolean;
    amount: string;
    fileData: string;
    fileName: string;
    fileType: string;
  }>({
    hasInfaq: false,
    amount: "",
    fileData: "",
    fileName: "",
    fileType: ""
  });
  const [hafalan, setHafalan] = useState({
    surah: "An-Nazi'at",
    customSurah: "",
    ayat: "1-5",
    juz: "30",
    tipe: "ziyadah" as "ziyadah" | "murojaah" | "tidak_hafalan"
  });
  const [polaTidur, setPolaTidur] = useState({
    sebelum22: true,
    bangun05: true
  });
  const [birrulActivities, setBirrulActivities] = useState<string[]>([
    "Merapihkan tempat tidur sendiri",
    "Membantu memasak atau menyiapkan makanan"
  ]);
  const [otherBirrul, setOtherBirrul] = useState<string>("");
  const [tanggalMutabaah, setTanggalMutabaah] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  });
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // ----------------------------------------------------
  // AUTHENTICATION & LOGIN STATE
  // ----------------------------------------------------
  const [currentUser, setCurrentUser] = useState<{
    role: "admin" | "siswa" | "ortu" | "guru";
    id: string;
    name: string;
    nisnOrNip?: string;
  } | null>(null);

  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "siswa") {
        setSelectedStudentId(currentUser.id);
        setReportStudentId(currentUser.id);
      } else if (currentUser.role === "ortu") {
        const parentRecord = parents.find(p => p.id === currentUser.id);
        let linkedStudent = null;
        if (parentRecord?.studentNisn) {
          linkedStudent = students.find(s => s.nisn === parentRecord.studentNisn);
        } else {
          linkedStudent = students.find(s => s.nisn === currentUser.nisnOrNip);
        }
        if (linkedStudent) {
          setSelectedStudentId(linkedStudent.id);
          setReportStudentId(linkedStudent.id);
        }
      } else if (currentUser.role === "guru") {
        const teacherObj = teachers.find(t => t.id === currentUser.id);
        const allowed = students.filter(s => 
          s.teacherId === currentUser.id || 
          (teacherObj && s.class.includes(teacherObj.classAssigned))
        );
        if (allowed.length > 0) {
          if (!allowed.some(s => s.id === reportStudentId)) {
            setReportStudentId(allowed[0].id);
            setSelectedStudentId(allowed[0].id);
          }
        }
      }
    }
  }, [currentUser, students, parents, teachers]);

  React.useEffect(() => {
    if (currentUser && currentUser.role !== "admin" && appMode !== "operational") {
      setAppMode("operational");
    }
  }, [currentUser, appMode]);

  // ----------------------------------------------------
  // SCHOOL PROFILE HANDLERS
  // ----------------------------------------------------
  const [profileForm, setProfileForm] = useState(() => ({
    name: schoolProfile.name,
    principal: schoolProfile.principal,
    principalNip: schoolProfile.principalNip,
    address: schoolProfile.address,
    phone: schoolProfile.phone,
    npsn: schoolProfile.npsn,
    yayasan: schoolProfile.yayasan
  }));

  // Synchronize profileForm if schoolProfile updates (e.g. initial loads)
  React.useEffect(() => {
    setProfileForm({
      name: schoolProfile.name,
      principal: schoolProfile.principal,
      principalNip: schoolProfile.principalNip,
      address: schoolProfile.address,
      phone: schoolProfile.phone,
      npsn: schoolProfile.npsn,
      yayasan: schoolProfile.yayasan
    });
  }, [schoolProfile]);

  const handleSaveSchoolProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSchoolProfile(profileForm);
    localStorage.setItem("school_profile_name", profileForm.name);
    localStorage.setItem("school_profile_principal", profileForm.principal);
    localStorage.setItem("school_profile_principalNip", profileForm.principalNip);
    localStorage.setItem("school_profile_address", profileForm.address);
    localStorage.setItem("school_profile_phone", profileForm.phone);
    localStorage.setItem("school_profile_npsn", profileForm.npsn);
    localStorage.setItem("school_profile_yayasan", profileForm.yayasan);
    triggerToast("Profil identitas sekolah berhasil diperbarui secara manual!");
  };

  // ----------------------------------------------------
  // SCHOOL & FOUNDATION LOGO HANDLERS
  // ----------------------------------------------------
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "smp" | "yayasan") => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await compressImage(file, 400, 400, 0.85);
      if (type === "smp") {
        setCustomSmpLogo(base64);
        localStorage.setItem("customSmpLogo", base64);
      } else {
        setCustomYayasanLogo(base64);
        localStorage.setItem("customYayasanLogo", base64);
      }
      setSuccessMsg(`Logo ${type === "smp" ? "SMP Islam Al Azhar 9" : "Yayasan Waqaf Al Muhajirien"} berhasil diperbarui!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      console.error("Gagal memproses gambar logo:", err);
    }
  };

  const handleLogoDrop = async (e: React.DragEvent<HTMLDivElement>, type: "smp" | "yayasan") => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    try {
      const base64 = await compressImage(file, 400, 400, 0.85);
      if (type === "smp") {
        setCustomSmpLogo(base64);
        localStorage.setItem("customSmpLogo", base64);
      } else {
        setCustomYayasanLogo(base64);
        localStorage.setItem("customYayasanLogo", base64);
      }
      setSuccessMsg(`Logo ${type === "smp" ? "SMP Islam Al Azhar 9" : "Yayasan Waqaf Al Muhajirien"} berhasil diperbarui!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      console.error("Gagal memproses gambar logo:", err);
    }
  };

  const handleResetLogo = (type: "smp" | "yayasan") => {
    if (type === "smp") {
      setCustomSmpLogo(null);
      localStorage.removeItem("customSmpLogo");
    } else {
      setCustomYayasanLogo(null);
      localStorage.removeItem("customYayasanLogo");
    }
    setSuccessMsg(`Logo ${type === "smp" ? "SMP Islam Al Azhar 9" : "Yayasan Waqaf Al Muhajirien"} dikembalikan ke default.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const [loginRole, setLoginRole] = useState<"siswa" | "ortu" | "guru" | "admin">("siswa");
  const [loginCreds, setLoginCreds] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    return localStorage.getItem("remember_me") === "true";
  });

  React.useEffect(() => {
    if (localStorage.getItem("remember_me") === "true") {
      setLoginCreds(localStorage.getItem(`login_creds_${loginRole}`) || "");
      setLoginPassword(localStorage.getItem(`login_pass_${loginRole}`) || "");
    }
  }, [loginRole]);

  // ----------------------------------------------------
  // BATCH EXCEL/SPREADSHEET IMPORT STATES
  // ----------------------------------------------------
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [importType, setImportType] = useState<"siswa" | "guru" | "ortu">("siswa");
  const [importText, setImportText] = useState<string>("");
  const [importParsedData, setImportParsedData] = useState<any[]>([]);
  const [importFeedback, setImportFeedback] = useState<string | null>(null);

  const handleParseImport = (text: string, type: "siswa" | "guru" | "ortu") => {
    setImportText(text);
    if (!text.trim()) {
      setImportParsedData([]);
      setImportFeedback(null);
      return;
    }

    const lines = text.split("\n").map(l => l.trim()).filter(l => l !== "");
    const parsed: any[] = [];
    let skippedHeader = false;

    for (let line of lines) {
      const cols = line.split(/\t|,|;/).map(c => c.trim().replace(/^["']|["']$/g, ""));
      
      // Check if it's a header line to skip
      if (!skippedHeader && (
        cols[0].toLowerCase().includes("nisn") || 
        cols[0].toLowerCase().includes("nip") || 
        cols[0].toLowerCase().includes("nama") ||
        cols[0].toLowerCase().includes("id") ||
        cols[0].toLowerCase().includes("no") ||
        cols[0].toLowerCase().includes("nis") ||
        cols[0].toLowerCase().includes("l/p") ||
        cols[0].toLowerCase().includes("musyrif")
      )) {
        skippedHeader = true;
        continue;
      }

      if (type === "siswa") {
        if (cols.length < 3) continue; // Requires at least NIS, NISN, Nama Lengkap
        parsed.push({
          nis: cols[0] || "",
          nisn: cols[1] || "",
          name: cols[2] || "",
          class: cols[3] || "9-A (Utsman bin Affan)",
          gender: cols[4] || "L",
          musyrif1: cols[5] || "",
          musyrif2: cols[6] || ""
        });
      } else if (type === "guru") {
        if (cols.length < 2) continue; // Requires at least NIP, Nama Lengkap
        parsed.push({
          nip: cols[0] || "",
          name: cols[1] || "",
          classAssigned: cols[2] || "9-A",
          password: cols[3] || ""
        });
      } else if (type === "ortu") {
        if (cols.length < 3) continue; // Requires at least NISN, NIS, Nama Lengkap siswa
        parsed.push({
          nisn: cols[0] || "",
          nis: cols[1] || "",
          studentName: cols[2] || "",
          class: cols[3] || "9-A (Utsman bin Affan)",
          gender: cols[4] || "L",
          musyrif1: cols[5] || "",
          musyrif2: cols[6] || ""
        });
      }
    }
    setImportParsedData(parsed);
    setImportFeedback(`Terdeteksi ${parsed.length} baris data valid dari spreadsheet.`);
  };

  const handleExecuteImport = () => {
    if (importParsedData.length === 0) {
      triggerToast("Tidak ada data valid yang terdeteksi.");
      return;
    }

    if (importType === "siswa") {
      const newStudents = [...students];
      let addedCount = 0;
      let updatedCount = 0;
      
      importParsedData.forEach((item) => {
        const existingIdx = newStudents.findIndex(s => s.nisn === item.nisn || (item.nis && s.nis === item.nis));
        
        if (existingIdx !== -1) {
          newStudents[existingIdx] = {
            ...newStudents[existingIdx],
            nis: item.nis || newStudents[existingIdx].nis,
            nisn: item.nisn || newStudents[existingIdx].nisn,
            name: item.name || newStudents[existingIdx].name,
            class: item.class || newStudents[existingIdx].class,
            gender: item.gender || newStudents[existingIdx].gender,
            musyrif1: item.musyrif1 || newStudents[existingIdx].musyrif1,
            musyrif2: item.musyrif2 || newStudents[existingIdx].musyrif2
          };
          updatedCount++;
        } else if (item.nisn && item.name) {
          newStudents.push({
            id: `STD-00${newStudents.length + 1}`,
            name: item.name,
            class: item.class || "9-A (Utsman bin Affan)",
            parentId: "PRT-001",
            teacherId: "TCH-001",
            nisn: item.nisn,
            nis: item.nis,
            gender: item.gender,
            musyrif1: item.musyrif1,
            musyrif2: item.musyrif2,
            streak: 0,
            points: 0
          });
          addedCount++;
        }
      });
      
      setStudents(newStudents);
      triggerToast(`Batch Import Sukses! ${addedCount} siswa baru ditambahkan, ${updatedCount} siswa diperbarui.`);
    } else if (importType === "guru") {
      const newTeachers = [...teachers];
      let addedCount = 0;
      let updatedCount = 0;
      
      importParsedData.forEach(item => {
        const existingIdx = newTeachers.findIndex(t => t.nip === item.nip);
        if (existingIdx !== -1) {
          newTeachers[existingIdx] = {
            ...newTeachers[existingIdx],
            name: item.name || newTeachers[existingIdx].name,
            classAssigned: item.classAssigned || newTeachers[existingIdx].classAssigned,
            password: item.password || newTeachers[existingIdx].password || "guru123"
          };
          updatedCount++;
        } else if (item.nip && item.name) {
          newTeachers.push({
            id: `TCH-00${newTeachers.length + 1}`,
            name: item.name,
            nip: item.nip,
            classAssigned: item.classAssigned,
            password: item.password || item.nip || "guru123"
          });
          addedCount++;
        }
      });
      
      setTeachers(newTeachers);
      triggerToast(`Batch Import Sukses! ${addedCount} guru baru didaftarkan, ${updatedCount} guru diperbarui.`);
    } else if (importType === "ortu") {
      const newParents = [...parents];
      const newStudents = [...students];
      let addedParentCount = 0;
      let updatedStudentCount = 0;
      
      importParsedData.forEach(item => {
        let studentId = "";
        const existingStudentIdx = newStudents.findIndex(s => s.nisn === item.nisn || (item.nis && s.nis === item.nis));
        
        if (existingStudentIdx !== -1) {
          newStudents[existingStudentIdx] = {
            ...newStudents[existingStudentIdx],
            nis: item.nis || newStudents[existingStudentIdx].nis,
            class: item.class || newStudents[existingStudentIdx].class,
            gender: item.gender || newStudents[existingStudentIdx].gender,
            musyrif1: item.musyrif1 || newStudents[existingStudentIdx].musyrif1,
            musyrif2: item.musyrif2 || newStudents[existingStudentIdx].musyrif2,
          };
          studentId = newStudents[existingStudentIdx].id;
          updatedStudentCount++;
        } else if (item.nisn && item.studentName) {
          const newId = `STD-00${newStudents.length + 1}`;
          newStudents.push({
            id: newId,
            name: item.studentName,
            class: item.class || "9-A (Utsman bin Affan)",
            parentId: "",
            teacherId: "TCH-001",
            nisn: item.nisn,
            nis: item.nis,
            gender: item.gender,
            musyrif1: item.musyrif1,
            musyrif2: item.musyrif2,
            streak: 0,
            points: 0
          });
          studentId = newId;
        }

        if (studentId) {
          const existingParentIdx = newParents.findIndex(p => p.studentId === studentId);
          if (existingParentIdx === -1) {
            const parentName = `Wali dari ${item.studentName}`;
            const parentId = `PRT-00${newParents.length + 1}`;
            newParents.push({
              id: parentId,
              name: parentName,
              phone: "0812-XXXX-XXXX",
              studentId: studentId
            });
            
            const sIdx = newStudents.findIndex(s => s.id === studentId);
            if (sIdx !== -1) {
              newStudents[sIdx].parentId = parentId;
            }
            addedParentCount++;
          }
        }
      });
      
      setStudents(newStudents);
      setParents(newParents);
      triggerToast(`Batch Import Sukses! ${addedParentCount} Wali Murid dibuat & ${updatedStudentCount} data Siswa diperbarui.`);
    }

    setShowImportModal(false);
    setImportText("");
    setImportParsedData([]);
    setImportFeedback(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const username = loginCreds.trim();
    const password = loginPassword.trim();

    if (!username) {
      setLoginError("Harap masukkan Username / Nomor Induk Anda.");
      return;
    }
    if (!password) {
      setLoginError("Harap masukkan Password Anda.");
      return;
    }

    const handleLoginSuccess = () => {
      if (rememberMe) {
        localStorage.setItem("remember_me", "true");
        localStorage.setItem(`login_creds_${loginRole}`, username);
        localStorage.setItem(`login_pass_${loginRole}`, password);
      } else {
        localStorage.setItem("remember_me", "false");
        localStorage.removeItem(`login_creds_${loginRole}`);
        localStorage.removeItem(`login_pass_${loginRole}`);
        setLoginCreds("");
        setLoginPassword("");
      }
    };

    if (loginRole === "admin") {
      let matchedAdmin = null;
      if (username.toLowerCase() === "kepsek01" && password === "kepsek123456") {
        matchedAdmin = { id: "ADMIN-002", name: "Kepala Sekolah (kepsek01)" };
      } else if (username.toLowerCase() === "wakasek02" && password === "wakasek123456") {
        matchedAdmin = { id: "ADMIN-003", name: "Wakil Kepala Sekolah (wakasek02)" };
      } else if (username.toLowerCase() === "admin051293" && password === "admin05121993") {
        matchedAdmin = { id: "ADMIN-004", name: "Admin Utama (admin051293)" };
      } else if (username.toLowerCase() === "admin" && password === "admin123") {
        matchedAdmin = { id: "ADMIN-001", name: "Administrator Sekolah" };
      }

      if (matchedAdmin) {
        setCurrentUser({
          role: "admin",
          id: matchedAdmin.id,
          name: matchedAdmin.name
        });
        handleLoginSuccess();
        triggerToast(`Login berhasil sebagai ${matchedAdmin.name}!`);
        setOpTab("dashboard");
      } else {
        setLoginError("Username atau Password Admin salah. Silakan periksa kembali kredensial Anda.");
      }
      return;
    }

    if (loginRole === "siswa") {
      const match = students.find(s => {
        const cleanSnis = s.nis ? s.nis.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() : "";
        const cleanInput = username.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        return cleanSnis === cleanInput || s.name.toLowerCase().trim() === username.toLowerCase();
      });
      if (match) {
        const cleanNisn = match.nisn ? match.nisn.trim() : "";
        const isValidPassword = password === cleanNisn || password === "siswa123" || password === "123456";
        if (isValidPassword) {
          setCurrentUser({
            role: "siswa",
            id: match.id,
            name: match.name,
            nisnOrNip: match.nisn
          });
          setSelectedStudentId(match.id);
          handleLoginSuccess();
          triggerToast(`Selamat datang, ${match.name}!`);
          setOpTab("daily");
        } else {
          setLoginError("Password salah. Gunakan NISN Anda sebagai password.");
        }
      } else {
        setLoginError("NIS Siswa tidak terdaftar di database kami.");
      }
      return;
    }

    if (loginRole === "ortu") {
      const matchStudent = students.find(s => {
        const cleanNisn = s.nisn ? s.nisn.trim() : "";
        const cleanInput = username.trim();
        return cleanNisn === cleanInput;
      });
      if (matchStudent) {
        const cleanSnis = matchStudent.nis ? matchStudent.nis.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() : "";
        const cleanPass = password.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const isValidPassword = cleanSnis === cleanPass || password === "ortu123" || password === "123456";

        if (isValidPassword) {
          let parentMatch = parents.find(p => p.studentId === matchStudent.id);
          const finalParentName = parentMatch ? parentMatch.name : `Wali dari ${matchStudent.name}`;
          const finalParentId = parentMatch ? parentMatch.id : `PRT-VIR-${matchStudent.id}`;
          const finalParentPhone = parentMatch ? parentMatch.phone : "0812-XXXX-XXXX";

          if (!parentMatch) {
            const virtualParent = {
              id: finalParentId,
              name: finalParentName,
              phone: finalParentPhone,
              studentId: matchStudent.id
            };
            setParents([...parents, virtualParent]);
          }

          setCurrentUser({
            role: "ortu",
            id: finalParentId,
            name: finalParentName,
            nisnOrNip: matchStudent.nisn
          });
          setReportStudentId(matchStudent.id);
          handleLoginSuccess();
          triggerToast(`Selamat datang Wali Murid dari ${matchStudent.name}!`);
          setOpTab("reports");
        } else {
          setLoginError("Password salah. Gunakan NIS anak Anda sebagai password.");
        }
      } else {
        setLoginError("NISN anak Anda tidak terdaftar di database kami.");
      }
      return;
    }

    if (loginRole === "guru") {
      const match = teachers.find(t => t.nip && t.nip.trim() === username);
      if (match) {
        const configuredPass = match.password ? match.password.trim() : (match.nip ? match.nip.trim() : "guru123");
        const isValidPassword = password === configuredPass || password === "guru123" || password === "123456" || (match.nip && match.nip.trim() === password);
        if (isValidPassword) {
          setCurrentUser({
            role: "guru",
            id: match.id,
            name: match.name,
            nisnOrNip: match.nip
          });
          handleLoginSuccess();
          triggerToast(`Selamat datang Ustadz/Ustadzah, ${match.name}!`);
          setOpTab("dashboard");
        } else {
          setLoginError("Password salah. Silakan gunakan password yang telah diatur.");
        }
      } else {
        setLoginError("NIP Guru tidak terdaftar di database kami.");
      }
      return;
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>(null);

  // ----------------------------------------------------
  // WEEKLY REPORT CARD & AI STATES
  // ----------------------------------------------------
  const [reportStudentId, setReportStudentId] = useState<string>("STD-001");
  const [catatanGuru, setCatatanGuru] = useState<string>("Siswa sangat sopan, aktif di masjid sekolah, dan selalu mengumpulkan tugas tepat waktu.");
  const [catatanOrangTua, setCatatanOrangTua] = useState<string>("Ahmad sangat berbakti di rumah, selalu merapikan kamar tanpa disuruh.");
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<string>(
    "Barakallahu fiik Ananda Ahmad Fauzan, bapak sangat bersyukur melihat konsistensi ibadahmu minggu ini, terutama shalat lima waktu yang terjaga dengan baik serta tilawah Al-Qur'an dan bakti kepada orang tua yang luar biasa. Teruskanlah pola tidur yang teratur ini agar fisikmu selalu segar untuk beribadah dan belajar di SMP Islam Al Azhar 9 Bekasi. Semoga Allah SWT senantiasa melimpahkan hidayah, kecerdasan, dan keberkahan dalam setiap langkahmu menuju masa depan yang gemilang. Aamiin."
  );
  const [isSimulatedResponse, setIsSimulatedResponse] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedProofImage, setSelectedProofImage] = useState<string | null>(null);

  // New multi-mode recap states
  const [recapType, setRecapType] = useState<"daily" | "weekly" | "monthly" | "custom">("weekly");
  const [selectedRecapDate, setSelectedRecapDate] = useState<string>("2026-07-01");
  const [selectedRecapMonth, setSelectedRecapMonth] = useState<string>("2026-07");
  const [selectedRecapStartDate, setSelectedRecapStartDate] = useState<string>("2026-06-24");
  const [selectedRecapEndDate, setSelectedRecapEndDate] = useState<string>("2026-07-01");
  const [recapFilterVerifiedOnly, setRecapFilterVerifiedOnly] = useState<boolean>(false);

  // Admin-specific overall recap search states
  const [adminSearchName, setAdminSearchName] = useState<string>("");
  const [adminSearchClass, setAdminSearchClass] = useState<string>("all");

  // Helpers
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const triggerToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  // ----------------------------------------------------
  // CRUD OPERATIONS (Adding data dynamically)
  // ----------------------------------------------------
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStudent.name || !formStudent.nisn) {
      triggerToast("Harap lengkapi semua field siswa.");
      return;
    }
    
    const isGuru = currentUser?.role === "guru";
    const guruTeacher = isGuru ? teachers.find(t => t.id === currentUser.id) : null;
    
    let studentClass = formStudent.class;
    let studentTeacherId = formStudent.teacherId;
    
    if (isGuru && guruTeacher) {
      studentClass = guruTeacher.classAssigned;
      studentTeacherId = currentUser.id;
    }

    const newId = `STD-00${students.length + 1}_${Date.now()}`;
    const newRecord: Student = {
      id: newId,
      name: formStudent.name,
      class: studentClass,
      parentId: formStudent.parentId,
      teacherId: studentTeacherId,
      nisn: formStudent.nisn,
      nis: formStudent.nis,
      gender: formStudent.gender,
      musyrif1: formStudent.musyrif1,
      musyrif2: formStudent.musyrif2,
      streak: 0,
      points: 0
    };
    setStudents([...students, newRecord]);
    setFormStudent({ name: "", nisn: "", class: "8A", teacherId: "TCH-007", parentId: "PRT-001", nis: "", gender: "L", musyrif1: "", musyrif2: "" });
    triggerToast(`Siswa "${newRecord.name}" berhasil ditambahkan ke Database Kelas ${studentClass}!`);
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTeacher.name || !formTeacher.nip) {
      triggerToast("Harap lengkapi nama guru dan NIP.");
      return;
    }
    const newId = `TCH-00${teachers.length + 1}`;
    const newRecord: Teacher = {
      id: newId,
      name: formTeacher.name,
      nip: formTeacher.nip,
      classAssigned: formTeacher.classAssigned,
      password: formTeacher.password || formTeacher.nip || "guru123"
    };
    setTeachers([...teachers, newRecord]);
    setFormTeacher({ name: "", nip: "", classAssigned: "8A", password: "" });
    triggerToast(`Guru Wali Kelas "${newRecord.name}" berhasil didaftarkan!`);
  };

  const handleAddParent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formParent.name || !formParent.phone) {
      triggerToast("Harap lengkapi nama orang tua dan No. HP.");
      return;
    }
    const newId = `PRT-00${parents.length + 1}`;
    const newRecord: Parent = {
      id: newId,
      name: formParent.name,
      phone: formParent.phone,
      studentId: formParent.studentId
    };
    setParents([...parents, newRecord]);
    setFormParent({ name: "", phone: "", studentId: "STD-001" });
    triggerToast(`Akun Wali Murid "${newRecord.name}" berhasil dihubungkan ke sistem!`);
  };

  const handleUpdateStudent = (updated: Student) => {
    setStudents(students.map(s => s.id === updated.id ? updated : s));
    triggerToast(`Data siswa "${updated.name}" berhasil diperbarui.`);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data siswa ini?")) {
      const target = students.find(s => s.id === id);
      setStudents(students.filter(s => s.id !== id));
      triggerToast(`Data siswa "${target?.name}" berhasil dihapus.`);
    }
  };

  const handleUpdateTeacher = (updated: Teacher) => {
    setTeachers(teachers.map(t => t.id === updated.id ? updated : t));
    triggerToast(`Data guru "${updated.name}" berhasil diperbarui.`);
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data guru ini?")) {
      const target = teachers.find(t => t.id === id);
      setTeachers(teachers.filter(t => t.id !== id));
      triggerToast(`Data guru "${target?.name}" berhasil dihapus.`);
    }
  };

  const handleUpdateParent = (updated: Parent) => {
    setParents(parents.map(p => p.id === updated.id ? updated : p));
    triggerToast(`Data wali murid "${updated.name}" berhasil diperbarui.`);
    setEditingParent(null);
  };

  const handleDeleteParent = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data wali murid ini?")) {
      const target = parents.find(p => p.id === id);
      setParents(parents.filter(p => p.id !== id));
      triggerToast(`Data wali murid "${target?.name}" berhasil dihapus.`);
    }
  };

  const handleBulkDeleteStudents = () => {
    if (selectedStudentIds.length === 0) return;
    if (confirm(`Apakah Anda yakin ingin menghapus secara masal ${selectedStudentIds.length} data siswa terpilih?`)) {
      setStudents(students.filter(s => !selectedStudentIds.includes(s.id)));
      triggerToast(`Berhasil menghapus masal ${selectedStudentIds.length} data siswa.`);
      setSelectedStudentIds([]);
    }
  };

  const handleBulkResetPointsAll = () => {
    if (confirm("Apakah Anda yakin ingin mereset seluruh poin siswa di database menjadi 0 secara masal?")) {
      setStudents(prev => prev.map(s => ({ ...s, points: 0 })));
      triggerToast("Seluruh poin siswa berhasil direset menjadi 0.");
    }
  };

  const handleBulkResetPointsSelected = () => {
    if (selectedStudentIds.length === 0) return;
    if (confirm(`Apakah Anda yakin ingin mereset poin dari ${selectedStudentIds.length} siswa terpilih menjadi 0?`)) {
      setStudents(prev => prev.map(s => {
        if (selectedStudentIds.includes(s.id)) {
          return { ...s, points: 0 };
        }
        return s;
      }));
      triggerToast(`Poin ${selectedStudentIds.length} siswa terpilih berhasil direset menjadi 0.`);
      setSelectedStudentIds([]);
    }
  };

  const handleBulkDeleteTeachers = () => {
    if (selectedTeacherIds.length === 0) return;
    if (confirm(`Apakah Anda yakin ingin menghapus secara masal ${selectedTeacherIds.length} data guru terpilih?`)) {
      setTeachers(teachers.filter(t => !selectedTeacherIds.includes(t.id)));
      triggerToast(`Berhasil menghapus masal ${selectedTeacherIds.length} data guru.`);
      setSelectedTeacherIds([]);
    }
  };

  const handleBulkDeleteParents = () => {
    if (selectedParentIds.length === 0) return;
    if (confirm(`Apakah Anda yakin ingin menghapus secara masal ${selectedParentIds.length} data orang tua/wali terpilih?`)) {
      setParents(parents.filter(p => !selectedParentIds.includes(p.id)));
      triggerToast(`Berhasil menghapus masal ${selectedParentIds.length} data orang tua/wali.`);
      setSelectedParentIds([]);
    }
  };

  const handleToggleSelectStudent = (id: string) => {
    setSelectedStudentIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllStudents = (currentList: Student[]) => {
    const currentIds = currentList.map(s => s.id);
    const allSelectedInCurrent = currentIds.length > 0 && currentIds.every(id => selectedStudentIds.includes(id));
    if (allSelectedInCurrent) {
      setSelectedStudentIds(prev => prev.filter(id => !currentIds.includes(id)));
    } else {
      setSelectedStudentIds(prev => Array.from(new Set([...prev, ...currentIds])));
    }
  };

  const handleToggleSelectTeacher = (id: string) => {
    setSelectedTeacherIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllTeachers = (currentList: Teacher[]) => {
    const currentIds = currentList.map(t => t.id);
    const allSelectedInCurrent = currentIds.length > 0 && currentIds.every(id => selectedTeacherIds.includes(id));
    if (allSelectedInCurrent) {
      setSelectedTeacherIds(prev => prev.filter(id => !currentIds.includes(id)));
    } else {
      setSelectedTeacherIds(prev => Array.from(new Set([...prev, ...currentIds])));
    }
  };

  const handleToggleSelectParent = (id: string) => {
    setSelectedParentIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllParents = (currentList: Parent[]) => {
    const currentIds = currentList.map(p => p.id);
    const allSelectedInCurrent = currentIds.length > 0 && currentIds.every(id => selectedParentIds.includes(id));
    if (allSelectedInCurrent) {
      setSelectedParentIds(prev => prev.filter(id => !currentIds.includes(id)));
    } else {
      setSelectedParentIds(prev => Array.from(new Set([...prev, ...currentIds])));
    }
  };

  // ----------------------------------------------------
  // SUBMIT MUTABA'AH (Calls real Backend endpoint!)
  // ----------------------------------------------------
  const handleInfaqFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.includes("pdf")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInfaq(prev => ({
          ...prev,
          fileData: event.target?.result as string,
          fileName: file.name,
          fileType: file.type
        }));
      };
      reader.readAsDataURL(file);
    } else if (file.type.includes("image")) {
      try {
        const compressedBase64 = await compressImage(file);
        setInfaq(prev => ({
          ...prev,
          fileData: compressedBase64,
          fileName: file.name,
          fileType: file.type
        }));
      } catch (err) {
        console.error("Compression failed:", err);
        const reader = new FileReader();
        reader.onload = (event) => {
          setInfaq(prev => ({
            ...prev,
            fileData: event.target?.result as string,
            fileName: file.name,
            fileType: file.type
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      triggerToast("Format file tidak didukung! Gunakan Gambar (JPG/PNG) atau PDF.");
    }
  };

  const handleDailySubmit = async () => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (tanggalMutabaah === todayStr) {
      triggerToast("Laporan mutaba'ah untuk hari ini belum bisa diisi (baru bisa diisi besok pagi).");
      return;
    }

    const activeStudentIdForCheck = currentUser?.role === "siswa" ? currentUser.id : selectedStudentId;
    const hasAlreadySubmitted = historyLogs.some(
      (log) => log.studentId === activeStudentIdForCheck && log.date === tanggalMutabaah && !log.rejectedByTeacher
    );
    if (hasAlreadySubmitted) {
      triggerToast(`Laporan mutaba'ah untuk siswa ini pada tanggal ${tanggalMutabaah} sudah pernah dikirimkan sebelumnya.`);
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);
    const targetStudent = students.find(s => s.id === selectedStudentId);
    
    // Combine activities with "Other" if checked and has value
    const finalBirrul = [...birrulActivities];
    if (finalBirrul.includes("Other") && otherBirrul.trim() !== "") {
      finalBirrul.push(otherBirrul.trim());
    }

    try {
      const payload = {
        studentId: selectedStudentId,
        studentName: targetStudent?.name || "Siswa Al Azhar",
        date: tanggalMutabaah,
        shalatWajib,
        shalatSunnah,
        tilawah: {
          surah: (() => {
            if (tilawah.surah === "Tidak membaca") return "Tidak membaca";
            const startStr = tilawah.surah === "Lainnya (Ketik Manual)" ? tilawah.customSurah : tilawah.surah;
            const endStr = tilawah.surahEnd === "Lainnya (Ketik Manual)" ? (tilawah.customSurahEnd || "") : (tilawah.surahEnd || tilawah.surah);
            if (endStr && endStr !== "Tidak membaca" && endStr !== tilawah.surah) {
              return `${startStr} s/d ${endStr}`;
            }
            return startStr;
          })(),
          ayat: tilawah.ayat,
          juz: (tilawah.juz === tilawah.juzEnd ? `${tilawah.juz}` : `${tilawah.juz} s/d ${tilawah.juzEnd}`) as any
        },
        hafalan: {
          surah: hafalan.surah === "Lainnya (Ketik Manual)" ? hafalan.customSurah : hafalan.surah,
          ayat: hafalan.ayat,
          juz: parseInt(hafalan.juz) || 30,
          tipe: hafalan.tipe
        },
        polaTidur,
        birrulWalidain: finalBirrul,
        infaq: {
          hasInfaq: infaq.hasInfaq,
          amount: infaq.amount ? parseFloat(infaq.amount) : 0,
          fileData: infaq.fileData,
          fileName: infaq.fileName,
          fileType: infaq.fileType
        },
        currentStreakDays: targetStudent?.streak || 0
      };

      const response = await fetch(getApiUrl("/api/mutabaah/submit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setSubmitResult(data);
      
      if (data.success) {
        // Update local student points & streak (Points NOT added here; only added when fully approved by both Wali Kelas & Parent)
        setStudents(prev => prev.map(s => {
          if (s.id === selectedStudentId) {
            return {
              ...s,
              streak: data.streakDays
            };
          }
          return s;
        }));

        // Add to history list
        const newLog: LogEntry = {
          id: `LOG-00${historyLogs.length + 1}_${Date.now()}`,
          studentId: selectedStudentId,
          studentName: targetStudent?.name || "Siswa Al Azhar",
          date: payload.date,
          pointsEarned: data.pointsEarned,
          streakDays: data.streakDays,
          details: data.pointsBreakdown || ["Checklist Mutaba'ah Berhasil"],
          parentApproved: false,
          teacherApproved: false,
          shalatWajib: { ...shalatWajib },
          shalatSunnah: { ...shalatSunnah },
          tilawah: { 
            surah: (() => {
              if (tilawah.surah === "Tidak membaca") return "Tidak membaca";
              const startStr = tilawah.surah === "Lainnya (Ketik Manual)" ? tilawah.customSurah : tilawah.surah;
              const endStr = tilawah.surahEnd === "Lainnya (Ketik Manual)" ? (tilawah.customSurahEnd || "") : (tilawah.surahEnd || tilawah.surah);
              if (endStr && endStr !== "Tidak membaca" && endStr !== tilawah.surah) {
                return `${startStr} s/d ${endStr}`;
              }
              return startStr;
            })(), 
            ayat: tilawah.ayat, 
            juz: tilawah.juz === tilawah.juzEnd ? `${tilawah.juz}` : `${tilawah.juz} s/d ${tilawah.juzEnd}` 
          },
          hafalan: { 
            surah: hafalan.surah === "Lainnya (Ketik Manual)" ? hafalan.customSurah : hafalan.surah, 
            ayat: hafalan.ayat, 
            juz: hafalan.juz, 
            tipe: hafalan.tipe 
          },
          polaTidur: { ...polaTidur },
          birrulWalidain: [...finalBirrul],
          infaq: { ...infaq }
        };
        setHistoryLogs(prev => [newLog, ...prev.filter(log => !(log.studentId === selectedStudentId && log.date === payload.date))]);
        triggerToast(`Mutaba'ah harian ${newLog.studentName} berhasil diproses oleh server!`);

        // Reset Infaq form after success
        setInfaq({
          hasInfaq: false,
          amount: "",
          fileData: "",
          fileName: "",
          fileType: ""
        });
      }
    } catch (err) {
      console.error(err);
      triggerToast("Gagal memanggil API server. Memakai simulasi offline.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleApproveByTeacher = (logId: string) => {
    let wasUpdated = false;
    let message = "";
    setHistoryLogs(prev => prev.map(log => {
      if (log.id === logId) {
        const nextTeacherApproved = !log.teacherApproved;
        const oldFullyApproved = log.teacherApproved && log.parentApproved;
        const nextFullyApproved = nextTeacherApproved && log.parentApproved;
        
        if (oldFullyApproved !== nextFullyApproved) {
          const diff = nextFullyApproved ? log.pointsEarned : -log.pointsEarned;
          setStudents(prevStudents => prevStudents.map(s => {
            if (s.id === log.studentId) {
              return { ...s, points: Math.max(0, s.points + diff) };
            }
            return s;
          }));
        }
        
        wasUpdated = true;
        message = nextTeacherApproved 
          ? "Laporan Mutaba'ah siswa berhasil diverifikasi & disetujui oleh Wali Kelas!" 
          : "Verifikasi Wali Kelas berhasil dibatalkan!";
        return { 
          ...log, 
          teacherApproved: nextTeacherApproved,
          rejectedByTeacher: nextTeacherApproved ? false : log.rejectedByTeacher,
          rejectionReason: nextTeacherApproved ? undefined : log.rejectionReason
        };
      }
      return log;
    }));
    if (wasUpdated) {
      triggerToast(message);
    }
  };

  const handleRejectByTeacher = (logId: string, reason: string) => {
    let wasUpdated = false;
    setHistoryLogs(prev => prev.map(log => {
      if (log.id === logId) {
        const oldFullyApproved = log.teacherApproved && log.parentApproved;
        if (oldFullyApproved) {
          setStudents(prevStudents => prevStudents.map(s => {
            if (s.id === log.studentId) {
              return { ...s, points: Math.max(0, s.points - log.pointsEarned) };
            }
            return s;
          }));
        }

        wasUpdated = true;
        return {
          ...log,
          teacherApproved: false,
          rejectedByTeacher: true,
          rejectionReason: reason || "Laporan ditolak oleh Wali Kelas karena data tidak sesuai / perlu diperbaiki."
        };
      }
      return log;
    }));
    if (wasUpdated) {
      triggerToast("Laporan Mutaba'ah siswa berhasil ditolak. Siswa sekarang dapat mengisi ulang.");
    }
  };

  const handleApproveByParent = (logId: string) => {
    let wasUpdated = false;
    let message = "";
    setHistoryLogs(prev => prev.map(log => {
      if (log.id === logId) {
        const nextParentApproved = !log.parentApproved;
        const oldFullyApproved = log.teacherApproved && log.parentApproved;
        const nextFullyApproved = log.teacherApproved && nextParentApproved;
        
        if (oldFullyApproved !== nextFullyApproved) {
          const diff = nextFullyApproved ? log.pointsEarned : -log.pointsEarned;
          setStudents(prevStudents => prevStudents.map(s => {
            if (s.id === log.studentId) {
              return { ...s, points: Math.max(0, s.points + diff) };
            }
            return s;
          }));
        }
        
        wasUpdated = true;
        message = nextParentApproved 
          ? "Aktivitas ibadah ananda berhasil disetujui oleh Orang Tua!" 
          : "Persetujuan Orang Tua berhasil dibatalkan!";
        return { ...log, parentApproved: nextParentApproved };
      }
      return log;
    }));
    if (wasUpdated) {
      triggerToast(message);
    }
  };

  // ----------------------------------------------------
  // GENERATE AI EVALUATION (Calls Gemini Backend Endpoint!)
  // ----------------------------------------------------
  const handleAIEvaluation = async () => {
    setGeneratingAI(true);
    setAiEvaluation("Wali kelas memicu evaluasi... Menghubungi AI Gemini server-side...");
    const targetStudent = students.find(s => s.id === reportStudentId);
    
    // Build real weekly/recap data summarizing the student's dynamic records
    const simulatedWeeklyData = {
      shalatWajibCount: compiledStats.shalatWajibDone, 
      shalatWajibMasjidCount: Math.round(compiledStats.shalatWajibDone * 0.8),
      shalatSunnahCount: compiledStats.dhuhaCount + compiledStats.tahajudCount,
      tilawahDaysCount: compiledStats.tilawahDays,
      totalPagesRead: compiledStats.tilawahDays * 2,
      goodSleepDaysCount: compiledStats.sleepTimeCount,
      birrulWalidainDaysCount: compiledStats.birrulCount,
      catatanGuru: catatanGuru,
      catatanOrangTua: catatanOrangTua
    };

    try {
      const response = await fetch(getApiUrl("/api/gemini/evaluate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: targetStudent?.name || "Siswa Al Azhar",
          weeklyData: simulatedWeeklyData
        })
      });
      const data = await response.json();
      if (data.evaluation) {
        setAiEvaluation(data.evaluation);
        setIsSimulatedResponse(data.isSimulated);
        triggerToast("Evaluasi karakter berhasil dianalisis & diisi oleh AI Gemini!");
      } else {
        setAiEvaluation("Gagal menghasilkan evaluasi AI.");
      }
    } catch (err: any) {
      console.error(err);
      setAiEvaluation("Error menghubungi server: " + err.message);
    } finally {
      setGeneratingAI(false);
    }
  };

  const printReport = () => {
    window.print();
  };

  // ----------------------------------------------------
  // COMPUTED REPORT VARIABLES & MONITORING RECAP LOGS
  // ----------------------------------------------------
  const allowedStudents = React.useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === "admin") return students;
    if (currentUser.role === "guru") {
      const guruObj = teachers.find(t => t.id === currentUser.id);
      const assigned = guruObj?.classAssigned || "";
      return students.filter(s => s.class.startsWith(assigned));
    }
    if (currentUser.role === "siswa") {
      return students.filter(s => s.id === currentUser.id);
    }
    if (currentUser.role === "ortu") {
      const matchingStudentId = currentUser.nisnOrNip;
      return students.filter(s => s.id === matchingStudentId || s.nisn === matchingStudentId);
    }
    return [];
  }, [currentUser, students, teachers]);

  const classes = React.useMemo(() => {
    const classSet = new Set<string>();
    students.forEach(s => {
      const clean = s.class.split(" ")[0];
      if (clean) classSet.add(clean);
    });
    return Array.from(classSet);
  }, [students]);

  const overallRecapLogs = React.useMemo(() => {
    if (!currentUser) return [];
    let logs = [...historyLogs];
    
    // Filter by Musyrif Class if user is Guru (Musyrif)
    if (currentUser.role === "guru") {
      const guruObj = teachers.find(t => t.id === currentUser.id);
      const assigned = guruObj?.classAssigned || "";
      logs = logs.filter(log => {
        const std = students.find(s => s.id === log.studentId);
        return std?.class.startsWith(assigned);
      });
    }
    
    // Filter by Search Name
    if (adminSearchName) {
      logs = logs.filter(log => log.studentName.toLowerCase().includes(adminSearchName.toLowerCase()));
    }
    
    // Filter by Admin Search Class (Only for admin)
    if (currentUser.role === "admin" && adminSearchClass !== "all") {
      logs = logs.filter(log => {
        const std = students.find(s => s.id === log.studentId);
        return std?.class.startsWith(adminSearchClass);
      });
    }
    
    return logs;
  }, [currentUser, historyLogs, students, teachers, adminSearchName, adminSearchClass]);

  const activeReportStudent = students.find(s => s.id === reportStudentId) || students[0];
  const activeTeacher = teachers.find(t => t.id === activeReportStudent.teacherId) || teachers[0];
  const activeParent = parents.find(p => p.id === activeReportStudent.parentId) || parents[0];

  // Dynamic date range calculation helper
  const getStartAndEndOfWeek = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDay();
    // Adjust so Monday is first day (1), Sunday is (0)
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(d.setDate(diff));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0]
    };
  };

  const getStartAndEndOfMonth = (monthStr: string) => {
    const parts = monthStr.split("-");
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const start = `${monthStr}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const end = `${monthStr}-${String(lastDay).padStart(2, "0")}`;
    return { start, end };
  };

  let resolvedStartDate = "2026-06-24";
  let resolvedEndDate = "2026-06-30";

  if (recapType === "daily") {
    resolvedStartDate = selectedRecapDate;
    resolvedEndDate = selectedRecapDate;
  } else if (recapType === "weekly") {
    const weekRange = getStartAndEndOfWeek(selectedRecapDate);
    resolvedStartDate = weekRange.start;
    resolvedEndDate = weekRange.end;
  } else if (recapType === "monthly") {
    const monthRange = getStartAndEndOfMonth(selectedRecapMonth);
    resolvedStartDate = monthRange.start;
    resolvedEndDate = monthRange.end;
  } else if (recapType === "custom") {
    resolvedStartDate = selectedRecapStartDate;
    resolvedEndDate = selectedRecapEndDate;
  }

  // Compile real-time stats from actual history logs
  const getFilteredLogsForRecap = (studentId: string, startDate: string, endDate: string, approvedOnly: boolean) => {
    return historyLogs.filter(log => {
      if (log.studentId !== studentId) return false;
      if (log.date < startDate || log.date > endDate) return false;
      if (approvedOnly) {
        return log.parentApproved && log.teacherApproved;
      }
      return true;
    });
  };

  const activeRecapLogs = getFilteredLogsForRecap(
    activeReportStudent.id,
    resolvedStartDate,
    resolvedEndDate,
    recapFilterVerifiedOnly
  );

  const calculateLogPoints = (log: Partial<LogEntry>) => {
    let fardhu = 0;
    let sunnah = 0;
    let rawatib = 0;
    let tilawah = 0;
    let hafalan = 0;
    let tidur = 0;
    let birrul = 0;
    let infaq = 0;

    // 1. Shalat Fardhu
    if (log.shalatWajib) {
      if (log.shalatWajib.haidh) {
        fardhu = 25;
      } else {
        ["subuh", "zuhur", "ashar", "maghrib", "isya"].forEach(k => {
          const val = (log.shalatWajib as any)?.[k];
          if (val === "berjamaah" || val === true) {
            fardhu += 7;
          } else if (val === "munfarid") {
            fardhu += 5;
          }
        });
      }
    }

    // 2. Shalat Sunnah
    if (log.shalatSunnah) {
      if (log.shalatSunnah.haidh) {
        sunnah = 10;
      } else {
        if (log.shalatSunnah.tahajud) sunnah += 15;
        if (log.shalatSunnah.dhuha) sunnah += 5;

        // Rawatib
        let rCount = 0;
        if (log.shalatSunnah.qabliyahSubuh) rCount++;
        if (log.shalatSunnah.qabliyahDzuhur) rCount++;
        if (log.shalatSunnah.badiyahDzuhur) rCount++;
        if (log.shalatSunnah.badiyahMaghrib) rCount++;
        if (log.shalatSunnah.badiyahIsya) rCount++;

        rawatib = rCount * 3;
      }
    }

    // 3. Tilawah
    if (log.tilawah && log.tilawah.surah && log.tilawah.surah !== "Tidak membaca") {
      tilawah = 10;
    }

    // 4. Hafalan/Tahfiz
    if (log.hafalan && log.hafalan.surah && log.hafalan.surah !== "Tidak hafalan" && log.hafalan.tipe !== "tidak_hafalan") {
      hafalan = 10;
    }

    // 5. Pola Tidur
    if (log.polaTidur) {
      if (log.polaTidur.sebelum22) tidur += 5;
      if (log.polaTidur.bangun05) tidur += 5;
    }

    // 6. Birrul Walidain
    if (log.birrulWalidain && Array.isArray(log.birrulWalidain)) {
      const cleanAct = log.birrulWalidain.filter(a => a !== "Other" && a !== "Tidak ada");
      birrul = cleanAct.length * 2;
    }

    // 7. Infaq
    if (log.infaq && log.infaq.hasInfaq && log.infaq.amount) {
      const amt = parseFloat(log.infaq.amount.toString());
      if (!isNaN(amt) && amt > 0) {
        infaq = Math.floor(amt / 1000);
      }
    }

    return {
      fardhu,
      sunnah,
      rawatib,
      tilawah,
      hafalan,
      tidur,
      birrul,
      infaq,
      total: fardhu + sunnah + rawatib + tilawah + hafalan + tidur + birrul + infaq
    };
  };

  const compileStats = (logs: LogEntry[]) => {
    let shalatWajibDone = 0;
    let shalatWajibTotal = 0;
    let dhuhaCount = 0;
    let tahajudCount = 0;
    let rawatibCount = 0;
    let tilawahDays = 0;
    let sleepTimeCount = 0;
    let birrulCount = 0;
    let infaqCount = 0;
    let infaqTotalAmount = 0;
    let pointsTotal = 0;

    let fardhuPointsTotal = 0;
    let sunnahPointsTotal = 0;
    let rawatibPointsTotal = 0;
    let tilawahPointsTotal = 0;
    let hafalanPointsTotal = 0;
    let tidurPointsTotal = 0;
    let birrulPointsTotal = 0;
    let infaqPointsTotal = 0;

    logs.forEach(log => {
      pointsTotal += log.pointsEarned;

      // New system points breakdown per log
      const pts = calculateLogPoints(log);
      fardhuPointsTotal += pts.fardhu;
      sunnahPointsTotal += pts.sunnah;
      rawatibPointsTotal += pts.rawatib;
      tilawahPointsTotal += pts.tilawah;
      hafalanPointsTotal += pts.hafalan;
      tidurPointsTotal += pts.tidur;
      birrulPointsTotal += pts.birrul;
      infaqPointsTotal += pts.infaq;

      // Shalat Wajib counts
      if (log.shalatWajib) {
        shalatWajibTotal += 5;
        if (log.shalatWajib.haidh) {
          shalatWajibDone += 5;
        } else {
          ["subuh", "zuhur", "ashar", "maghrib", "isya"].forEach(k => {
            const val = (log.shalatWajib as any)?.[k];
            if (val === "berjamaah" || val === "munfarid" || val === true) {
              shalatWajibDone += 1;
            }
          });
        }
      }

      // Shalat Sunnah counts
      if (log.shalatSunnah) {
        if (log.shalatSunnah.haidh) {
          dhuhaCount += 1;
          tahajudCount += 1;
        } else {
          if (log.shalatSunnah.dhuha) dhuhaCount += 1;
          if (log.shalatSunnah.tahajud) tahajudCount += 1;
          
          Object.entries(log.shalatSunnah).forEach(([key, val]) => {
            if (key !== "haidh" && key !== "dhuha" && key !== "tahajud" && val) {
              rawatibCount += 1;
            }
          });
        }
      }

      // Tilawah
      if (log.tilawah && log.tilawah.surah && log.tilawah.surah !== "Tidak membaca") {
        tilawahDays += 1;
      }

      // Pola tidur
      if (log.polaTidur) {
        if (log.polaTidur.sebelum22) sleepTimeCount += 1;
      }

      // Birrul Walidain
      if (log.birrulWalidain) {
        birrulCount += log.birrulWalidain.length;
      }

      // Infaq / Sedekah
      if (log.infaq && log.infaq.hasInfaq) {
        infaqCount += 1;
        const amt = parseFloat(log.infaq.amount || "0");
        if (!isNaN(amt)) {
          infaqTotalAmount += amt;
        }
      }
    });

    return {
      shalatWajibDone,
      shalatWajibTotal,
      dhuhaCount,
      tahajudCount,
      rawatibCount,
      tilawahDays,
      sleepTimeCount,
      birrulCount,
      infaqCount,
      infaqTotalAmount,
      pointsTotal,
      fardhuPointsTotal,
      sunnahPointsTotal,
      rawatibPointsTotal,
      tilawahPointsTotal,
      hafalanPointsTotal,
      tidurPointsTotal,
      birrulPointsTotal,
      infaqPointsTotal,
      daysLogged: logs.length
    };
  };

  const compiledStats = compileStats(activeRecapLogs);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col antialiased pb-12">
      
      {/* SUCCESS TOAST MESSAGE */}
      {successMsg && (
        <div className="fixed top-5 right-5 z-50 bg-blue-900 text-white font-semibold px-5 py-3.5 rounded-2xl shadow-2xl border border-sky-500 animate-bounce flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* HEADER HERO */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-6">
        <header className="bg-blue-950 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/15 backdrop-blur-sm shrink-0 shadow-md">
              <SmpAlAzhar9Logo className="w-12 h-12 drop-shadow" customSrc={customSmpLogo} />
              <YayasanMuhajirienLogo className="w-12 h-12 drop-shadow" customSrc={customYayasanLogo} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-sky-800/80 text-amber-300 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-sky-700">
                  {schoolProfile.name}
                </span>
              </div>
              <h1 id="app-title" className="text-xl md:text-3xl font-display font-bold tracking-tight text-white mt-1.5">
                Sistem Mutaba'ah Digital Siswa
              </h1>
              <p className="text-sky-100/90 text-xs md:text-sm mt-1 max-w-2xl">
                Platform pencatatan ibadah harian berbasis gamifikasi, rekapitulasi rapor, dan asisten evaluasi kepengasuhan Islami AI Gemini.
              </p>
            </div>
          </div>
        </header>
      </div>

      {currentUser === null ? (
        /* PORTAL LOGIN SCREEN GATED PORTAL */
        <div className="max-w-md mx-auto w-full px-4 py-12 flex-1 flex flex-col justify-center">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Header branding */}
            <div className="bg-gradient-to-br from-blue-950 to-blue-900 p-6 text-white text-center relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
              <div className="flex justify-center gap-3 mb-3">
                <SmpAlAzhar9Logo className="w-12 h-12 drop-shadow-md" customSrc={customSmpLogo} />
                <YayasanMuhajirienLogo className="w-12 h-12 drop-shadow-md" customSrc={customYayasanLogo} />
              </div>
              <h2 className="font-display font-bold text-lg leading-tight">Portal Akademik Al Azhar</h2>
              <p className="text-sky-200/90 text-xs mt-1">{schoolProfile.name}</p>
            </div>

            <div className="p-6 md:p-8">
              {/* Role switcher */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl mb-6 text-[10.5px] font-bold">
                {[
                  { role: "siswa", label: "Siswa" },
                  { role: "ortu", label: "Orang Tua" },
                  { role: "guru", label: "Guru" },
                  { role: "admin", label: "Admin" }
                ].map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      setLoginRole(r.role as any);
                      setLoginError(null);
                      if (localStorage.getItem("remember_me") === "true") {
                        setLoginCreds(localStorage.getItem(`login_creds_${r.role}`) || "");
                        setLoginPassword(localStorage.getItem(`login_pass_${r.role}`) || "");
                      } else {
                        setLoginCreds("");
                        setLoginPassword("");
                      }
                    }}
                    className={`py-2 rounded-lg transition cursor-pointer text-center ${
                      loginRole === r.role 
                        ? "bg-sky-800 text-white shadow-sm" 
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {loginError && (
                <div className="bg-rose-50 text-rose-800 p-3 rounded-xl border border-rose-100 mb-4 flex items-start gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Username Field */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 text-xs uppercase tracking-wider">
                    {loginRole === "siswa" && "Username (NISN, NIS, atau Nama)"}
                    {loginRole === "ortu" && "Username (NISN Anak, Nama, atau No. HP)"}
                    {loginRole === "guru" && "Username (NIP atau Nama)"}
                    {loginRole === "admin" && "Username Admin"}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <LogIn className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={loginCreds}
                      onChange={(e) => setLoginCreds(e.target.value)}
                      placeholder={
                        loginRole === "siswa"
                          ? "Masukkan NISN atau Nama Siswa"
                          : loginRole === "ortu"
                          ? "Masukkan NISN Anak atau Nama Orang Tua"
                          : loginRole === "guru"
                          ? "Masukkan NIP atau Nama Guru"
                          : "Masukkan Username Admin"
                      }
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-sans text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 text-xs uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Masukkan Password Anda"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-sans text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center py-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setRememberMe(checked);
                        if (checked) {
                          localStorage.setItem("remember_me", "true");
                          localStorage.setItem(`login_creds_${loginRole}`, loginCreds);
                          localStorage.setItem(`login_pass_${loginRole}`, loginPassword);
                        } else {
                          localStorage.setItem("remember_me", "false");
                          localStorage.removeItem(`login_creds_${loginRole}`);
                          localStorage.removeItem(`login_pass_${loginRole}`);
                        }
                      }}
                      className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 cursor-pointer"
                    />
                    <span>Ingat saya di perangkat ini</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-800 hover:bg-blue-900 text-white py-2.5 rounded-xl font-bold transition shadow-sm cursor-pointer text-xs flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk ke Portal</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* APP EXPLANATION & EXPLICIT USER MODE TOGGLE */}
          {currentUser?.role === "admin" && (
            <div className="max-w-7xl mx-auto w-full px-4 mt-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col lg:flex-row justify-between items-stretch gap-6">
                <div className="flex-1 flex gap-3.5 items-start">
                  <div className="bg-sky-100 text-sky-800 p-2.5 rounded-xl shrink-0 mt-0.5">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-800 text-sm">💡 Apa yang sedang dipreviewkan saat ini?</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Aplikasi ini memiliki <strong>dua visualisasi utama</strong>. Secara default, Anda berada di <strong>Mode Aplikasi Operasional</strong> yang interaktif. Di sini Anda bisa mengelola database master (menambah siswa, guru, orang tua), mengisi checklist harian siswa, menguji sistem poin, dan mencetak laporan rapor yang dianalisis oleh AI. Anda juga dapat beralih ke <strong>Mode Cetak Biru Arsitektur</strong> untuk meninjau skema tabel SQL, Firestore, dan kode pemrograman endpoint API.
                    </p>
                  </div>
                </div>

                {/* DUAL MODE TOGGLE BUTTON */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs shrink-0 items-center justify-center">
                  <button
                    onClick={() => setAppMode("operational")}
                    className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                      appMode === "operational" 
                        ? "bg-sky-800 text-white shadow-md" 
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>🖥️ Aplikasi Operasional</span>
                  </button>
                  <button
                    onClick={() => setAppMode("blueprint")}
                    className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                      appMode === "blueprint" 
                        ? "bg-sky-800 text-white shadow-md" 
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Database className="w-4 h-4" />
                    <span>📐 Cetak Biru (Backend Specs)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MAIN CONTAINER */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              
              {/* Active User Session Box */}
              <div className="bg-blue-950 text-white rounded-3xl p-5 border border-sky-800 shadow-md">
                <span className="text-[9px] uppercase font-bold tracking-wider text-sky-400 block mb-2">Sesi Portal Aktif</span>
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-blue-950 font-bold flex items-center justify-center shrink-0 text-sm mt-0.5 shadow">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs leading-snug truncate text-amber-300">{currentUser.name}</p>
                    <p className="text-[10px] text-sky-200 capitalize font-medium mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>Role: {currentUser.role === "ortu" ? "Orang Tua" : currentUser.role}</span>
                    </p>
                    {currentUser.nisnOrNip && (
                      <p className="text-[9px] font-mono text-sky-300 mt-0.5 truncate">
                        ID: {currentUser.nisnOrNip}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    triggerToast("Anda telah keluar dari portal.");
                  }}
                  className="w-full mt-4 bg-blue-900/80 hover:bg-sky-800 border border-sky-800/80 text-white py-1.5 rounded-xl font-bold transition text-[10px] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-amber-400" />
                  <span>Keluar Portal</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-4">Navigasi Fitur</span>
                
                {appMode === "operational" ? (
                  // Navigation buttons for Operational Mode
                  <nav className="flex flex-col gap-1.5">
                    <button
                      onClick={() => setOpTab("dashboard")}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                        opTab === "dashboard" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 text-sky-700 shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-xs">Beranda Dashboard</p>
                        <span className="text-[9px] text-slate-400 block mt-0.5">Ringkasan Statistik</span>
                      </div>
                    </button>

                    {/* Restricted menu for Student/Parent */}
                    {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                      <button
                        onClick={() => setOpTab("students")}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                          opTab === "students" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Users className="w-4 h-4 text-sky-700 shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 text-xs">Kelola Data Siswa</p>
                          <span className="text-[9px] text-slate-400 block mt-0.5">{students.length} Siswa Terdaftar</span>
                        </div>
                      </button>
                    )}

                    {currentUser?.role === "admin" && (
                      <button
                        onClick={() => setOpTab("teachers")}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                          opTab === "teachers" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <UserCheck className="w-4 h-4 text-sky-700 shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 text-xs">Kelola Data Guru</p>
                          <span className="text-[9px] text-slate-400 block mt-0.5">{teachers.length} Wali Kelas</span>
                        </div>
                      </button>
                    )}

                    {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                      <button
                        onClick={() => setOpTab("parents")}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                          opTab === "parents" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <HeartHandshake className="w-4 h-4 text-sky-700 shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 text-xs">Kelola Wali Murid</p>
                          <span className="text-[9px] text-slate-400 block mt-0.5">{parents.length} Akun Orang Tua</span>
                        </div>
                      </button>
                    )}

                    <button
                      onClick={() => setOpTab("daily")}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer relative ${
                        opTab === "daily" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Send className="w-4 h-4 text-sky-700 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-semibold text-slate-800 text-xs">
                            {currentUser?.role === "guru" ? "Verifikasi Wali Kelas" : currentUser?.role === "ortu" ? "Persetujuan Orang Tua" : "Portal Input Harian"}
                          </p>
                          {currentUser?.role === "siswa" && (() => {
                            const todayStr = new Date().toISOString().split("T")[0];
                            const hasFilledToday = historyLogs.some(
                              (log) => log.studentId === currentUser.id && log.date === todayStr
                            );
                            if (!hasFilledToday) {
                              return (
                                <span className="bg-amber-500 text-white font-extrabold text-[8px] px-2 py-0.5 rounded-full animate-pulse-subtle shrink-0">
                                  Belum
                                </span>
                              );
                            } else {
                              return (
                                <span className="bg-emerald-600 text-white font-extrabold text-[8px] px-2 py-0.5 rounded-full shrink-0">
                                  ✓
                                </span>
                              );
                            }
                          })()}
                        </div>
                        <span className="text-[9px] text-slate-400 block mt-0.5">
                          {currentUser?.role === "guru" ? "Setujui Mutaba'ah Siswa" : currentUser?.role === "ortu" ? "Pantau & Setujui Ibadah" : "Isi Checklist & Poin"}
                        </span>
                      </div>
                    </button>

                    {currentUser?.role !== "siswa" && (
                      <button
                        onClick={() => setOpTab("reports")}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                          opTab === "reports" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <FileText className="w-4 h-4 text-sky-700 shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 text-xs">Rapor Mingguan & AI</p>
                          <span className="text-[9px] text-slate-400 block mt-0.5">Evaluasi & Cetak PDF</span>
                        </div>
                      </button>
                    )}

                    {currentUser?.role === "admin" && (
                      <button
                        onClick={() => setOpTab("logos")}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                          opTab === "logos" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Settings className="w-4 h-4 text-sky-700 shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 text-xs">Pengaturan Logo</p>
                          <span className="text-[9px] text-slate-400 block mt-0.5">Upload Logo Sekolah & Yayasan</span>
                        </div>
                      </button>
                    )}
                  </nav>
            ) : (
              // Navigation buttons for Blueprint Mode
              <nav className="flex flex-col gap-1.5">
                <button
                  onClick={() => setBpTab("schema")}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    bpTab === "schema" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Database className="w-4 h-4 text-sky-700 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">Skema Database</p>
                    <span className="text-[9px] text-slate-400 block mt-0.5">PostgreSQL & Firestore</span>
                  </div>
                </button>

                <button
                  onClick={() => setBpTab("gamification")}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    bpTab === "gamification" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Award className="w-4 h-4 text-sky-700 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">Aturan Logika Poin</p>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Streak & Syarat Aktivitas</span>
                  </div>
                </button>

                <button
                  onClick={() => setBpTab("api")}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    bpTab === "api" ? "bg-sky-50 text-blue-950 border-r-4 border-sky-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Code2 className="w-4 h-4 text-sky-700 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">Struktur Endpoint API</p>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Node.js Express & Python</span>
                  </div>
                </button>
              </nav>
            )}
          </div>

          {/* SCHOOL INFO CARD */}
          <div className="bg-blue-950 text-sky-100 rounded-3xl p-5 flex flex-col gap-3 shadow-md">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Sparkles className="w-3.5 h-3.5" />
              Info Akademik Sekolah
            </h4>
            <div className="text-[11px] text-sky-200/90 space-y-1.5 leading-relaxed">
              <p>🏫 <strong>Instansi:</strong> {schoolProfile.name}</p>
              <p>📍 <strong>Lokasi:</strong> Kec. Bekasi Barat, Jabar</p>
              <p>📅 <strong>Tahun Ajaran:</strong> 2026/2027</p>
              <p>🔒 <strong>Sistem Keamanan:</strong> Terenkripsi hash password & integrasi Firebase UID</p>
            </div>
          </div>
        </div>

        {/* MAIN PANEL CONTENT */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* =========================================================================
              A. OPERATIONAL MODE PANELS
              ========================================================================= */}
          {appMode === "operational" && (
            <>
              {/* 1. DASHBOARD SUMMARY TAB */}
              {opTab === "dashboard" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                  <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                      <LayoutDashboard className="w-6 h-6 text-sky-600" />
                      Beranda Dashboard Sekolah
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                      Selamat datang di portal administrasi. Di bawah ini adalah ringkasan live data, top streak siswa hari ini, dan aktivitas pengisian mutaba'ah terbaru.
                    </p>
                  </div>

                  {/* STUDENT MUTABA'AH REMINDER NOTIFICATION BANNER */}
                  {currentUser?.role === "siswa" && (() => {
                    const getPastDateStr = (daysAgo: number) => {
                      const d = new Date();
                      d.setDate(d.getDate() - daysAgo);
                      return d.toISOString().split("T")[0];
                    };
                    
                    const yesterdayStr = getPastDateStr(1);
                    const dayBeforeYesterdayStr = getPastDateStr(2);
                    
                    const hasFilledYesterday = historyLogs.some(
                      (log) => log.studentId === currentUser.id && log.date === yesterdayStr
                    );
                    const hasFilledDayBeforeYesterday = historyLogs.some(
                      (log) => log.studentId === currentUser.id && log.date === dayBeforeYesterdayStr
                    );

                    const studentObj = students.find((s) => s.id === currentUser.id);
                    const currentPoints = studentObj?.points || 0;

                    if (!hasFilledYesterday || !hasFilledDayBeforeYesterday) {
                      const formattedYesterday = new Date(yesterdayStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
                      const formattedDayBefore = new Date(dayBeforeYesterdayStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
                      
                      let warningText = "";
                      let targetDateToFill = yesterdayStr;
                      if (!hasFilledYesterday && !hasFilledDayBeforeYesterday) {
                        warningText = `Anda belum mengisi lembar mutaba'ah harian untuk kemarin (${formattedYesterday}) dan 2 hari yang lalu (${formattedDayBefore}).`;
                        targetDateToFill = dayBeforeYesterdayStr;
                      } else if (!hasFilledYesterday) {
                        warningText = `Anda belum mengisi lembar mutaba'ah harian untuk kemarin (${formattedYesterday}).`;
                        targetDateToFill = yesterdayStr;
                      } else {
                        warningText = `Anda belum mengisi lembar mutaba'ah harian untuk 2 hari yang lalu (${formattedDayBefore}).`;
                        targetDateToFill = dayBeforeYesterdayStr;
                      }

                      return (
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm relative overflow-hidden animate-pulse-subtle">
                          {/* Decorative subtle amber pattern */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/40 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
                          
                          <div className="flex gap-3.5 items-start relative z-10">
                            <div className="bg-amber-100 text-amber-900 p-2.5 rounded-xl shrink-0 mt-0.5">
                              <AlertTriangle className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-amber-900 text-sm md:text-base">Pengingat Pengisian Mutaba'ah Siswa</h4>
                                <span className="bg-amber-100 text-amber-900 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">Belum Lengkap</span>
                              </div>
                              <p className="text-xs text-amber-800/90 leading-relaxed mt-1 font-medium max-w-xl">
                                Assalamu'alaikum <strong className="text-amber-950">{currentUser.name}</strong>, {warningText} Ayo segera lengkapi sekarang!
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-amber-700">
                                <span className="flex items-center gap-1">💎 Total poin terverifikasi: {currentPoints} Pts</span>
                                <span>•</span>
                                <span className="text-slate-500 font-semibold">(Catatan: pengisian hari ini belum dibuka, baru bisa diisi besok pagi)</span>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              setTanggalMutabaah(targetDateToFill);
                              setOpTab("daily");
                            }}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition shadow cursor-pointer shrink-0 flex items-center gap-1.5 relative z-10 self-stretch md:self-auto justify-center"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Lengkapi Sekarang</span>
                          </button>
                        </div>
                      );
                    } else {
                      return (
                        <div className="bg-emerald-50 border-2 border-emerald-100 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/30 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
                          
                          <div className="flex gap-3.5 items-start relative z-10">
                            <div className="bg-emerald-100 text-emerald-900 p-2.5 rounded-xl shrink-0 mt-0.5">
                              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-emerald-900 text-sm md:text-base font-display">Mutaba'ah Harian Lengkap</h4>
                                <span className="bg-emerald-100 text-emerald-900 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">Aman ✓</span>
                              </div>
                              <p className="text-xs text-emerald-800/90 leading-relaxed mt-1 font-medium max-w-xl">
                                Alhamdulillah <strong className="text-emerald-950">{currentUser.name}</strong>, Anda telah berhasil mengisi lembar mutaba'ah harian untuk kemarin (H-1) dan 2 hari yang lalu (H-2). Pertahankan terus konsistensi ibadah Anda!
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-emerald-700">
                                <span className="flex items-center gap-1">💎 Total poin terverifikasi: {currentPoints} Pts</span>
                                <span>•</span>
                                <span className="text-emerald-600/95 font-semibold">(Catatan: pengisian hari ini belum dibuka, baru bisa diisi besok pagi)</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right shrink-0 self-stretch md:self-auto flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                            <span className="text-[10px] text-emerald-600/90 font-bold">Terima kasih atas keistiqomahanmu!</span>
                            <span className="bg-emerald-600 text-white font-mono font-bold text-[10px] px-3 py-1 rounded-lg">Lengkap ✓</span>
                          </div>
                        </div>
                      );
                    }
                  })()}

                  {/* STATS CARDS */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Siswa</span>
                      <strong className="text-3xl text-blue-950 font-display font-extrabold mt-2 block">{students.length}</strong>
                      <span className="text-[9px] text-sky-700 font-semibold mt-1">Aktif Kelas 9</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Wali Kelas</span>
                      <strong className="text-3xl text-blue-950 font-display font-extrabold mt-2 block">{teachers.length}</strong>
                      <span className="text-[9px] text-sky-700 font-semibold mt-1">Verifikator Rapor</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Wali Murid</span>
                      <strong className="text-3xl text-blue-950 font-display font-extrabold mt-2 block">{parents.length}</strong>
                      <span className="text-[9px] text-sky-700 font-semibold mt-1">Akun Terhubung</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Aktivitas</span>
                      <strong className="text-3xl text-blue-950 font-display font-extrabold mt-2 block">{historyLogs.length}</strong>
                      <span className="text-[9px] text-sky-700 font-semibold mt-1">Hari Ini (Simulasi)</span>
                    </div>
                  </div>

                  {/* QUICK GUIDE */}
                  {currentUser?.role === "admin" && (
                    <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-amber-950 text-xs leading-relaxed">
                      <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        Langkah Eksplorasi Cepat untuk Anda:
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 mt-1.5 text-amber-900/90 font-medium">
                        <li>Pergi ke tab <strong>Kelola Data Siswa</strong>, <strong>Kelola Data Guru</strong>, atau <strong>Kelola Wali Murid</strong> untuk meninjau database master dan mencoba menambahkan data riil Anda sendiri.</li>
                        <li>Pergi ke tab <strong>Portal Input Harian</strong>, pilih siswa (termasuk yang baru Anda tambahkan), centang aktivitas ibadahnya, lalu klik Submit untuk memproses data & poin ke server.</li>
                        <li>Pergi ke tab <strong>Rapor Mingguan & AI</strong> untuk melihat grafik, meminta asisten AI Gemini menulis evaluasi akhlak anak, dan mencetak laporan rapinya!</li>
                      </ol>
                    </div>
                  )}

                  {/* PAPAN PERINGKAT RESMI SISWA (POIN TERVERIFIKASI) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 md:p-6 flex flex-col gap-6 shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div>
                        <h3 className="text-base md:text-lg font-display font-bold text-blue-950 flex items-center gap-2">
                          <Award className="w-5.5 h-5.5 text-amber-500 fill-amber-500 animate-bounce" />
                          🏆 Papan Peringkat Mutaba'ah Siswa Terbaik
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Peringkat diurutkan berdasarkan jumlah akumulasi poin mutaba'ah yang telah disetujui & diverifikasi lengkap oleh Wali Kelas dan Orang Tua.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] bg-sky-50 border border-sky-100 text-sky-800 font-bold px-3 py-1.5 rounded-full self-start">
                        <Check className="w-3.5 h-3.5 text-sky-600" />
                        <span>Sistem Akurasi Live</span>
                      </div>
                    </div>

                    {/* Filter Controls Row */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        {/* 1. Filter Kelas */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <Filter className="w-3.5 h-3.5 text-slate-500" />
                            Filter Kelas
                          </label>
                          <select
                            value={rankClassFilter}
                            onChange={(e) => {
                              setRankClassFilter(e.target.value);
                              setShowAllRanked(false);
                            }}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium text-slate-700"
                          >
                            <option value="Semua Kelas">Semua Kelas</option>
                            <option value="7A">Kelas 7A</option>
                            <option value="7B">Kelas 7B</option>
                            <option value="7C">Kelas 7C</option>
                            <option value="8A">Kelas 8A</option>
                            <option value="8B">Kelas 8B</option>
                            <option value="8C">Kelas 8C</option>
                            <option value="9A">Kelas 9A</option>
                            <option value="9B">Kelas 9B</option>
                            <option value="9C">Kelas 9C</option>
                          </select>
                        </div>

                        {/* 2. Filter Waktu */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5 text-slate-500" />
                            Filter Rentang Waktu
                          </label>
                          <select
                            value={rankTimeFilter}
                            onChange={(e) => {
                              setRankTimeFilter(e.target.value as any);
                              setShowAllRanked(false);
                            }}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium text-slate-700"
                          >
                            <option value="semua">Semua Waktu (Akumulasi)</option>
                            <option value="harian">Harian (Hari Ini)</option>
                            <option value="pekanan">Pekanan (7 Hari Terakhir)</option>
                            <option value="bulanan">Bulanan (30 Hari Terakhir)</option>
                            <option value="custom">Pilih Tanggal Manual</option>
                          </select>
                        </div>

                        {/* 3. Custom Start Date (shown only if 'custom') */}
                        {rankTimeFilter === "custom" && (
                          <div className="animate-fade-in">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <CalendarRange className="w-3.5 h-3.5 text-slate-500" />
                              Dari Tanggal
                            </label>
                            <input
                              type="date"
                              value={rankStartDate}
                              onChange={(e) => {
                                setRankStartDate(e.target.value);
                                setShowAllRanked(false);
                              }}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono text-slate-700"
                            />
                          </div>
                        )}

                        {/* 4. Custom End Date (shown only if 'custom') */}
                        {rankTimeFilter === "custom" && (
                          <div className="animate-fade-in">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <CalendarRange className="w-3.5 h-3.5 text-slate-500" />
                              Sampai Tanggal
                            </label>
                            <input
                              type="date"
                              value={rankEndDate}
                              onChange={(e) => {
                                setRankEndDate(e.target.value);
                                setShowAllRanked(false);
                              }}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono text-slate-700"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ranked List Section */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-inner">
                      {(() => {
                        // Calculate approved and unverified points for each student
                        const computedList = students.map(student => {
                          const studentLogs = historyLogs.filter(log => log.studentId === student.id);
                          
                          // Filter logs by selected timeframe
                          const timeFilteredLogs = studentLogs.filter(log => {
                            const logDate = log.date;
                            const today = new Date().toISOString().split("T")[0];

                            if (rankTimeFilter === "harian") {
                              return logDate === today;
                            } else if (rankTimeFilter === "pekanan") {
                              const logTime = new Date(logDate).getTime();
                              const todayTime = new Date(today).getTime();
                              const diffDays = (todayTime - logTime) / (1000 * 60 * 60 * 24);
                              return diffDays >= 0 && diffDays < 7;
                            } else if (rankTimeFilter === "bulanan") {
                              const logTime = new Date(logDate).getTime();
                              const todayTime = new Date(today).getTime();
                              const diffDays = (todayTime - logTime) / (1000 * 60 * 60 * 24);
                              return diffDays >= 0 && diffDays < 30;
                            } else if (rankTimeFilter === "custom") {
                              return logDate >= rankStartDate && logDate <= rankEndDate;
                            }
                            return true; // semua
                          });

                          const approvedLogs = timeFilteredLogs.filter(log => log.parentApproved && log.teacherApproved);
                          const unapprovedLogs = timeFilteredLogs.filter(log => !(log.parentApproved && log.teacherApproved));

                          const pointsSum = approvedLogs.reduce((sum, log) => sum + log.pointsEarned, 0);
                          const unverifiedSum = unapprovedLogs.reduce((sum, log) => sum + log.pointsEarned, 0);
                          const daysCount = approvedLogs.length;

                          return {
                            ...student,
                            pointsEarned: pointsSum,
                            unverifiedPoints: unverifiedSum,
                            daysCount
                          };
                        });

                        // Filter by Class
                        const classFiltered = computedList.filter(s => rankClassFilter === "Semua Kelas" || s.class === rankClassFilter);

                        // Sort by Points Descending
                        const sortedRanked = classFiltered.sort((a, b) => b.pointsEarned - a.pointsEarned || b.unverifiedPoints - a.unverifiedPoints);

                        if (sortedRanked.length === 0) {
                          return (
                            <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                              <Award className="w-12 h-12 text-slate-300" />
                              <p className="text-xs font-bold text-slate-500">Tidak ada data siswa yang cocok dengan filter kelas dan rentang waktu terpilih.</p>
                              <span className="text-[10px] text-slate-400">Pastikan lembar mutaba'ah harian siswa sudah diverifikasi penuh oleh Wali Kelas dan disetujui Orang Tua.</span>
                            </div>
                          );
                        }

                        // Pagination: Show top 5 unless showAllRanked is true
                        const displayedRanked = showAllRanked ? sortedRanked : sortedRanked.slice(0, 5);

                        return (
                          <div className="divide-y divide-slate-100">
                            {/* Leaderboard Table Header */}
                            <div className="grid grid-cols-12 gap-3 bg-slate-50 p-3.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                              <div className="col-span-2 text-center">Peringkat</div>
                              <div className="col-span-5 sm:col-span-6">Nama Lengkap Murid</div>
                              <div className="col-span-2 text-center">Hari Terisi</div>
                              <div className="col-span-3 sm:col-span-2 text-right">Perolehan Poin</div>
                            </div>

                            {/* Table Rows */}
                            {displayedRanked.map((s, idx) => {
                              // Style specific for Top 3
                              const isGold = idx === 0 && !showAllRanked;
                              const isSilver = idx === 1 && !showAllRanked;
                              const isBronze = idx === 2 && !showAllRanked;

                              let rankBadgeBg = "bg-slate-100 text-slate-700";
                              let rankBadgeLabel = `${idx + 1}`;
                              let rankBadgeBorder = "border-slate-200";

                              if (isGold) {
                                rankBadgeBg = "bg-amber-100 text-amber-900";
                                rankBadgeLabel = "🥇 1";
                                rankBadgeBorder = "border-amber-300";
                              } else if (isSilver) {
                                rankBadgeBg = "bg-slate-200 text-slate-800";
                                rankBadgeLabel = "🥈 2";
                                rankBadgeBorder = "border-slate-300";
                              } else if (isBronze) {
                                rankBadgeBg = "bg-amber-50 text-amber-800";
                                rankBadgeLabel = "🥉 3";
                                rankBadgeBorder = "border-amber-200";
                              }

                              return (
                                <div key={s.id} className="grid grid-cols-12 gap-3 p-3.5 items-center hover:bg-slate-50/50 transition duration-150">
                                  {/* Rank Badge */}
                                  <div className="col-span-2 flex justify-center">
                                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] border flex items-center gap-1 shadow-sm ${rankBadgeBg} ${rankBadgeBorder}`}>
                                      {rankBadgeLabel}
                                    </span>
                                  </div>

                                  {/* Student Name & Class */}
                                  <div className="col-span-5 sm:col-span-6 flex flex-col gap-0.5">
                                    <strong className="text-xs font-bold text-blue-950 truncate">{s.name}</strong>
                                    <div className="flex items-center gap-2">
                                      <span className="bg-sky-50 text-sky-800 border border-sky-200 font-extrabold text-[8px] uppercase px-1.5 py-0.5 rounded-md">
                                        Kelas {s.class}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Days Filled Count */}
                                  <div className="col-span-2 text-center font-mono text-xs font-bold text-slate-700">
                                    {s.daysCount} Hari
                                  </div>

                                  {/* Points Earned */}
                                  <div className="col-span-3 sm:col-span-2 text-right flex flex-col items-end gap-0.5">
                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-extrabold text-xs px-2.5 py-1 rounded-xl shadow-sm">
                                      ⭐ {s.pointsEarned} Pts
                                    </span>
                                    {s.unverifiedPoints > 0 && (
                                      <span className="text-[9px] text-amber-600 font-bold bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-lg font-mono">
                                        ⏳ {s.unverifiedPoints} Belum Verif
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}

                            {/* View More Button */}
                            {sortedRanked.length > 5 && (
                              <div className="p-3 text-center bg-slate-50/50 border-t border-slate-100">
                                <button
                                  type="button"
                                  onClick={() => setShowAllRanked(!showAllRanked)}
                                  className="text-[11px] font-bold text-sky-800 hover:text-blue-900 transition flex items-center justify-center gap-1 mx-auto cursor-pointer animate-pulse-subtle"
                                >
                                  {showAllRanked ? (
                                    <>
                                      <ChevronUp className="w-4 h-4" />
                                      <span>Tampilkan Lebih Sedikit</span>
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="w-4 h-4" />
                                      <span>Tampilkan Seluruh Siswa ({sortedRanked.length})</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* RECENT ACTIVITY LOGS IN FULL WIDTH GRID */}
                  <div className="border border-slate-200 rounded-3xl p-5 md:p-6 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 text-xs mb-3.5 flex items-center gap-1.5 uppercase tracking-wide">
                      <Clock className="w-4 h-4 text-slate-500" />
                      Aktivitas Pengisian Terkini
                    </h3>
                    {historyLogs.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-6 font-medium">Belum ada aktivitas pengisian.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {historyLogs.slice(0, 10).map((log, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 text-xs shadow-sm flex flex-col justify-between hover:border-slate-300 transition duration-150">
                            <div className="flex justify-between items-center">
                              <strong className="text-slate-800 text-sm font-bold">{log.studentName}</strong>
                              <span className="text-[10px] text-slate-400 font-mono font-extrabold bg-slate-100 px-2 py-0.5 rounded-lg">{log.date}</span>
                            </div>
                            <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100">
                              <span className="text-[10.5px] text-sky-700 font-bold">Telah dikirim (+{log.pointsEarned} Poin)</span>
                              <div className="flex items-center gap-2">
                                {log.teacherApproved && log.parentApproved ? (
                                  <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-md">✓ Disetujui Penuh</span>
                                ) : (
                                  <span className="bg-amber-100 text-amber-800 font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-md">⏳ Menunggu Verifikasi</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. MANAGE STUDENTS TAB */}
              {opTab === "students" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                  <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                      <Users className="w-6 h-6 text-sky-600" />
                      Kelola Database Siswa (Master Siswa)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                      Wali Kelas dan Admin sekolah dapat mendaftarkan siswa baru ke kelas yang sesuai. Siswa yang didaftarkan akan langsung terhubung ke database dan dapat dipilih di portal input harian.
                    </p>
                  </div>

                  {/* Batch Import Action Banner */}
                  <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-3 items-start">
                      <div className="bg-sky-100 text-sky-800 p-2 rounded-xl shrink-0 mt-0.5">
                        <FileSpreadsheet className="w-5 h-5 text-sky-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-950 text-xs">Pendaftaran Batch via Spreadsheet/Excel</h4>
                        <p className="text-[11px] text-sky-800 leading-relaxed mt-0.5">
                          Anda dapat mengimpor daftar siswa sekaligus dengan menyalin (copy-paste) tabel dari Microsoft Excel atau Google Sheets.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setImportType("siswa");
                        setShowImportModal(true);
                        setImportText("");
                        setImportParsedData([]);
                        setImportFeedback(null);
                      }}
                      className="bg-sky-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-sm cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Import Data Siswa</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Student List Table */}
                    <div className="lg:col-span-2 flex flex-col gap-3">
                      {(() => {
                        const visibleStudents = students.filter(s => {
                          if (currentUser?.role === "guru") {
                            const teacher = teachers.find(t => t.id === currentUser.id);
                            if (!teacher) return true;
                            return s.teacherId === currentUser.id || s.class.includes(teacher.classAssigned);
                          }
                          return true;
                        });

                        // Calculate points earned for the current sorting & filtering configurations
                        const mappedStudents = visibleStudents.map(student => {
                          let computedPoints = student.points;
                          if (studentSortBy !== "total") {
                            const studentLogs = historyLogs.filter(log => log.studentId === student.id);
                            
                            const timeFilteredLogs = studentLogs.filter(log => {
                              const logDate = log.date;
                              const today = new Date().toISOString().split("T")[0];

                              if (studentSortBy === "harian") {
                                return logDate === today;
                              } else if (studentSortBy === "pekanan") {
                                const logTime = new Date(logDate).getTime();
                                const todayTime = new Date(today).getTime();
                                const diffDays = (todayTime - logTime) / (1000 * 60 * 60 * 24);
                                return diffDays >= 0 && diffDays < 7;
                              } else if (studentSortBy === "bulanan") {
                                const logTime = new Date(logDate).getTime();
                                const todayTime = new Date(today).getTime();
                                const diffDays = (todayTime - logTime) / (1000 * 60 * 60 * 24);
                                return diffDays >= 0 && diffDays < 30;
                              } else if (studentSortBy === "custom") {
                                return logDate >= studentSortStartDate && logDate <= studentSortEndDate;
                              }
                              return true;
                            });

                            const matchingLogs = timeFilteredLogs.filter(log => {
                              if (studentSortType === "verified") {
                                return log.parentApproved && log.teacherApproved;
                              }
                              return true; // "all"
                            });

                            computedPoints = matchingLogs.reduce((sum, log) => sum + log.pointsEarned, 0);
                          }

                          return {
                            ...student,
                            computedPoints
                          };
                        });

                        // Sort descending by calculated points
                        const sortedStudents = mappedStudents.sort((a, b) => b.computedPoints - a.computedPoints);

                        const isAllSelected = sortedStudents.length > 0 && sortedStudents.every(s => selectedStudentIds.includes(s.id));

                        return (
                          <>
                            {/* Sort & Point Filter Controls */}
                            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3 shadow-sm mb-2">
                              <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2 justify-between">
                                <div className="flex items-center gap-2">
                                  <Award className="w-4 h-4 text-sky-600" />
                                  <h4 className="font-bold text-slate-800 text-xs">Penyaringan & Pengurutan Poin Siswa</h4>
                                </div>
                                <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">
                                  Mode Urut: {studentSortBy === "total" ? "Kumulatif" : studentSortBy === "harian" ? "Harian" : studentSortBy === "pekanan" ? "Pekanan" : studentSortBy === "bulanan" ? "Bulanan" : "Kustom"}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
                                {/* Period Select */}
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Periode Poin</label>
                                  <select
                                    value={studentSortBy}
                                    onChange={(e) => setStudentSortBy(e.target.value as any)}
                                    className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                                  >
                                    <option value="total">Poin Total (Kumulatif)</option>
                                    <option value="harian">Setiap Hari (Hari Ini)</option>
                                    <option value="pekanan">Pekan Ini (7 Hari Terakhir)</option>
                                    <option value="bulanan">Bulan Ini (30 Hari Terakhir)</option>
                                    <option value="custom">Rentang Tanggal Terpilih</option>
                                  </select>
                                </div>

                                {/* Status Poin Select */}
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Status Verifikasi</label>
                                  <select
                                    value={studentSortType}
                                    disabled={studentSortBy === "total"}
                                    onChange={(e) => setStudentSortType(e.target.value as any)}
                                    className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
                                  >
                                    <option value="all">Semua Poin (Terverifikasi + Tertunda)</option>
                                    <option value="verified">Hanya Poin Terverifikasi</option>
                                  </select>
                                </div>

                                {/* Bulk Reset Action */}
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={handleBulkResetPointsAll}
                                    className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-[10px] py-1.5 px-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shrink-0"
                                    title="Mereset seluruh poin semua siswa di database menjadi 0"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
                                    <span>Reset Semua</span>
                                  </button>

                                  {selectedStudentIds.length > 0 && (
                                    <button
                                      type="button"
                                      onClick={handleBulkResetPointsSelected}
                                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] py-1.5 px-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-sm animate-pulse-subtle shrink-0"
                                      title="Mereset poin siswa terpilih saja menjadi 0"
                                    >
                                      <RefreshCw className="w-3.5 h-3.5 text-white" />
                                      <span>Reset Terpilih</span>
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Custom Date Inputs if studentSortBy is custom */}
                              {studentSortBy === "custom" && (
                                <div className="grid grid-cols-2 gap-3 p-3 bg-white border border-slate-200/60 rounded-xl animate-fadeIn">
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Dari Tanggal</label>
                                    <input
                                      type="date"
                                      value={studentSortStartDate}
                                      onChange={(e) => setStudentSortStartDate(e.target.value)}
                                      className="border border-slate-200 rounded-lg p-1.5 text-xs font-medium focus:ring-2 focus:ring-sky-500"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Sampai Tanggal</label>
                                    <input
                                      type="date"
                                      value={studentSortEndDate}
                                      onChange={(e) => setStudentSortEndDate(e.target.value)}
                                      className="border border-slate-200 rounded-lg p-1.5 text-xs font-medium focus:ring-2 focus:ring-sky-500"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex justify-between items-center">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {currentUser?.role === "admin" 
                                  ? `Daftar Siswa ${schoolProfile.name}` 
                                  : "Daftar Siswa Sesuai Kelasnya Masing-Masing"}
                              </h3>
                              {(currentUser?.role === "admin" || currentUser?.role === "guru") && selectedStudentIds.length > 0 && (
                                <button
                                  onClick={handleBulkDeleteStudents}
                                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow cursor-pointer shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Hapus Terpilih ({selectedStudentIds.length})</span>
                                </button>
                              )}
                            </div>
                            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                                    {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                                      <th className="p-3 text-center w-10">
                                        <input 
                                          type="checkbox"
                                          checked={isAllSelected}
                                          onChange={() => handleToggleSelectAllStudents(sortedStudents)}
                                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer w-4 h-4"
                                        />
                                      </th>
                                    )}
                                    <th className="p-3 text-center w-12">No</th>
                                    <th className="p-3">NIS/NISN</th>
                                    <th className="p-3">Nama Siswa</th>
                                    <th className="p-3">Kelas</th>
                                    <th className="p-3 text-center">L/P</th>
                                    <th className="p-3">Musyrif 1 & 2</th>
                                    <th className="p-3 text-right">Skor Poin</th>
                                    {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                                      <th className="p-3 text-center w-24">Aksi</th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {sortedStudents.map((s, idx) => {
                                    const isSelected = selectedStudentIds.includes(s.id);
                                    return (
                                      <tr key={s.id} className={`hover:bg-slate-50/50 ${isSelected ? "bg-slate-50" : ""}`}>
                                        {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                                          <td className="p-3 text-center">
                                            <input 
                                              type="checkbox"
                                              checked={isSelected}
                                              onChange={() => handleToggleSelectStudent(s.id)}
                                              className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer w-4 h-4"
                                            />
                                          </td>
                                        )}
                                        <td className="p-3 text-center text-slate-500 font-medium">{idx + 1}</td>
                                        <td className="p-3 text-slate-500">
                                          <span className="block font-mono font-semibold">{s.nis || "-"}</span>
                                          <span className="block text-[10px] text-slate-400 font-mono">{s.nisn}</span>
                                        </td>
                                        <td className="p-3">
                                          <div className="font-bold text-slate-800">{s.name}</div>
                                        </td>
                                        <td className="p-3 text-slate-600 font-medium">{s.class}</td>
                                        <td className="p-3 text-center font-bold text-slate-600">{s.gender || "-"}</td>
                                        <td className="p-3">
                                          <div className="text-slate-700 font-medium">1. {s.musyrif1 || "-"}</div>
                                          <div className="text-slate-500 text-[10px]">2. {s.musyrif2 || "-"}</div>
                                        </td>
                                        <td className="p-3 text-right font-mono">
                                          <div className="font-bold text-sky-700">{s.computedPoints} Pts</div>
                                          {studentSortBy !== "total" && (
                                            <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">
                                              Total: {s.points} Pts
                                            </span>
                                          )}
                                          {(() => {
                                            const pending = historyLogs
                                              .filter(log => log.studentId === s.id && (!log.parentApproved || !log.teacherApproved))
                                              .reduce((sum, log) => sum + log.pointsEarned, 0);
                                            return pending > 0 ? (
                                              <span className="text-[10px] text-amber-600 font-bold block animate-pulse" title="Menunggu persetujuan musyrif & ortu">
                                                +{pending} Tertunda
                                              </span>
                                            ) : null;
                                          })()}
                                        </td>
                                        {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                                          <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                              <button
                                                onClick={() => setEditingStudent(s)}
                                                className="text-amber-700 hover:text-amber-900 font-bold text-[10px] bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded transition cursor-pointer"
                                              >
                                                Edit
                                              </button>
                                              <button
                                                onClick={() => handleDeleteStudent(s.id)}
                                                className="text-red-700 hover:text-red-900 font-bold text-[10px] bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition cursor-pointer"
                                              >
                                                Hapus
                                              </button>
                                            </div>
                                          </td>
                                        )}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Add Student Side Form - For admin & guru */}
                    {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">
                        <h3 className="font-bold text-slate-800 text-xs mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                          <UserPlus className="w-4 h-4 text-sky-700" />
                          Tambah Siswa Baru
                        </h3>
                        <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Siswa:</label>
                            <input 
                              type="text"
                              required
                              placeholder="Contoh: Muhammad Zaki"
                              value={formStudent.name}
                              onChange={(e) => setFormStudent({...formStudent, name: e.target.value})}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white focus:ring-1 focus:ring-sky-500 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">NIS:</label>
                              <input 
                                type="text"
                                placeholder="Contoh: 15160912"
                                value={formStudent.nis}
                                onChange={(e) => setFormStudent({...formStudent, nis: e.target.value})}
                                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">NISN:</label>
                              <input 
                                type="text"
                                required
                                maxLength={10}
                                placeholder="10 digit NISN"
                                value={formStudent.nisn}
                                onChange={(e) => setFormStudent({...formStudent, nisn: e.target.value})}
                                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Jenis Kelamin (L/P):</label>
                              <select
                                value={formStudent.gender}
                                onChange={(e) => setFormStudent({...formStudent, gender: e.target.value})}
                                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                              >
                                <option value="L">L (Laki-laki)</option>
                                <option value="P">P (Perempuan)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Kelas Tingkat 9:</label>
                              {currentUser?.role === "guru" ? (
                                <div className="p-2.5 border border-slate-200 bg-slate-100 rounded-xl font-bold text-slate-700">
                                  {(() => {
                                    const teacher = teachers.find(t => t.id === currentUser.id);
                                    if (!teacher) return "8A";
                                    return teacher.classAssigned;
                                  })()}
                                </div>
                              ) : (
                                <select
                                  value={formStudent.class}
                                  onChange={(e) => setFormStudent({...formStudent, class: e.target.value})}
                                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                                >
                                  <option value="8A">Kelas 8A</option>
                                  <option value="8B">Kelas 8B</option>
                                  <option value="8C">Kelas 8C</option>
                                  <option value="9A">Kelas 9A</option>
                                  <option value="9B">Kelas 9B</option>
                                  <option value="9C">Kelas 9C</option>
                                </select>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Musyrif 1:</label>
                              <input 
                                type="text"
                                placeholder="Musyrif Utama"
                                value={formStudent.musyrif1}
                                onChange={(e) => setFormStudent({...formStudent, musyrif1: e.target.value})}
                                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Musyrif 2:</label>
                              <input 
                                type="text"
                                placeholder="Musyrif Pendamping"
                                value={formStudent.musyrif2}
                                onChange={(e) => setFormStudent({...formStudent, musyrif2: e.target.value})}
                                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Hubungkan Wali Kelas:</label>
                            {currentUser?.role === "guru" ? (
                              <div className="p-2.5 border border-slate-200 bg-slate-100 rounded-xl font-bold text-slate-700">
                                {currentUser.name}
                              </div>
                            ) : (
                              <select
                                value={formStudent.teacherId}
                                onChange={(e) => setFormStudent({...formStudent, teacherId: e.target.value})}
                                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                              >
                                {teachers.map(t => (
                                  <option key={t.id} value={t.id}>{t.name} (Kelas {t.classAssigned})</option>
                                ))}
                              </select>
                            )}
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Hubungkan Orang Tua:</label>
                            <select
                              value={formStudent.parentId}
                              onChange={(e) => setFormStudent({...formStudent, parentId: e.target.value})}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                            >
                              {parents.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                              ))}
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-sky-800 hover:bg-blue-900 text-white py-2.5 rounded-xl font-bold transition shadow-sm cursor-pointer text-center"
                          >
                            Daftarkan Siswa
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. MANAGE TEACHERS TAB */}
              {opTab === "teachers" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                  <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                      <UserCheck className="w-6 h-6 text-sky-600" />
                      Kelola Database Wali Kelas (Guru)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                      Sistem pendaftaran guru wali kelas {schoolProfile.name}. Guru berperan memverifikasi mutaba'ah mingguan siswa, mengisi catatan kepribadian, serta memicu asisten AI Gemini.
                    </p>
                  </div>

                  {/* Batch Import Action Banner */}
                  <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-3 items-start">
                      <div className="bg-sky-100 text-sky-800 p-2 rounded-xl shrink-0 mt-0.5">
                        <FileSpreadsheet className="w-5 h-5 text-sky-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-950 text-xs">Pendaftaran Batch via Spreadsheet/Excel</h4>
                        <p className="text-[11px] text-sky-800 leading-relaxed mt-0.5">
                          Anda dapat mengimpor daftar Guru Wali Kelas sekaligus dengan menyalin (copy-paste) tabel dari Microsoft Excel atau Google Sheets.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setImportType("guru");
                        setShowImportModal(true);
                        setImportText("");
                        setImportParsedData([]);
                        setImportFeedback(null);
                      }}
                      className="bg-sky-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-sm cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Import Data Guru</span>
                    </button>
                  </div>

                  <div className={`grid grid-cols-1 ${currentUser?.role === "admin" ? "lg:grid-cols-3" : ""} gap-6`}>
                    {/* Teachers table */}
                    <div className={currentUser?.role === "admin" ? "lg:col-span-2 flex flex-col gap-3" : "w-full flex flex-col gap-3"}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Daftar Guru Wali Kelas</h3>
                        {currentUser?.role === "admin" && selectedTeacherIds.length > 0 && (
                          <button
                            onClick={handleBulkDeleteTeachers}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Terpilih ({selectedTeacherIds.length})</span>
                          </button>
                        )}
                      </div>
                      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                              {currentUser?.role === "admin" && (
                                <th className="p-3 text-center w-10">
                                  <input 
                                    type="checkbox"
                                    checked={teachers.length > 0 && teachers.every(t => selectedTeacherIds.includes(t.id))}
                                    onChange={() => handleToggleSelectAllTeachers(teachers)}
                                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer w-4 h-4"
                                  />
                                </th>
                              )}
                              <th className="p-3">NIP Pegawai</th>
                              <th className="p-3">Nama Lengkap Guru</th>
                              <th className="p-3">Kelas Bimbingan</th>
                              <th className="p-3">Password Login</th>
                              {currentUser?.role === "admin" && (
                                <th className="p-3 text-center w-24">Aksi</th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {teachers.map(t => {
                              const isSelected = selectedTeacherIds.includes(t.id);
                              return (
                                <tr key={t.id} className={`hover:bg-slate-50/50 ${isSelected ? "bg-slate-50" : ""}`}>
                                  {currentUser?.role === "admin" && (
                                    <td className="p-3 text-center">
                                      <input 
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleToggleSelectTeacher(t.id)}
                                        className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer w-4 h-4"
                                      />
                                    </td>
                                  )}
                                  <td className="p-3 font-mono font-semibold text-slate-500">{t.nip}</td>
                                  <td className="p-3 font-bold text-slate-800">{t.name}</td>
                                  <td className="p-3 text-slate-600">Tingkat {t.classAssigned}</td>
                                  <td className="p-3 font-mono font-medium text-sky-800">{t.password || t.nip || "guru123"}</td>
                                  {currentUser?.role === "admin" && (
                                    <td className="p-3 text-center">
                                      <div className="flex items-center justify-center gap-1.5">
                                        <button
                                          onClick={() => setEditingTeacher(t)}
                                          className="text-amber-700 hover:text-amber-900 font-bold text-[10px] bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded transition cursor-pointer"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() => handleDeleteTeacher(t.id)}
                                          className="text-red-700 hover:text-red-900 font-bold text-[10px] bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition cursor-pointer"
                                        >
                                          Hapus
                                        </button>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Add Teacher form - Only for admin */}
                    {currentUser?.role === "admin" && (
                      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">
                        <h3 className="font-bold text-slate-800 text-xs mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                          <UserPlus className="w-4 h-4 text-sky-700" />
                          Tambah Guru Baru
                        </h3>
                        <form onSubmit={handleAddTeacher} className="space-y-4 text-xs">
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Guru (Gelar Akademis):</label>
                            <input 
                              type="text"
                              required
                              placeholder="Contoh: Ustadzah Laila, S.Pd"
                              value={formTeacher.name}
                              onChange={(e) => setFormTeacher({...formTeacher, name: e.target.value})}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">NIP (Nomor Induk Pegawai):</label>
                            <input 
                              type="text"
                              required
                              placeholder="18 digit NIP. Contoh: 198012112005011003"
                              value={formTeacher.nip}
                              onChange={(e) => setFormTeacher({...formTeacher, nip: e.target.value})}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Kelas yang Diampu:</label>
                            <select
                              value={formTeacher.classAssigned}
                              onChange={(e) => setFormTeacher({...formTeacher, classAssigned: e.target.value})}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                            >
                              <option value="7A">Kelas 7A</option>
                              <option value="7B">Kelas 7B</option>
                              <option value="7C">Kelas 7C</option>
                              <option value="8A">Kelas 8A</option>
                              <option value="8B">Kelas 8B</option>
                              <option value="8C">Kelas 8C</option>
                              <option value="9A">Kelas 9A</option>
                              <option value="9B">Kelas 9B</option>
                              <option value="9C">Kelas 9C</option>
                              <option value="UMUM">Kelas UMUM</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Password Login (Opsional):</label>
                            <input 
                              type="text"
                              placeholder="Jika kosong, default adalah NIP"
                              value={formTeacher.password}
                              onChange={(e) => setFormTeacher({...formTeacher, password: e.target.value})}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-sky-800 hover:bg-blue-900 text-white py-2.5 rounded-xl font-bold transition shadow-sm cursor-pointer"
                          >
                            Daftarkan Guru
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. MANAGE PARENTS TAB */}
              {opTab === "parents" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                  <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                      <HeartHandshake className="w-6 h-6 text-sky-600" />
                      Kelola Database Wali Murid (Orang Tua)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                      Wali murid berhak memantau progress pengisian ibadah harian anaknya serta memberikan catatan motivasi keluarga sebelum diverifikasi oleh wali kelas.
                    </p>
                  </div>

                  {/* Batch Import Action Banner */}
                  <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-3 items-start">
                      <div className="bg-sky-100 text-sky-800 p-2 rounded-xl shrink-0 mt-0.5">
                        <FileSpreadsheet className="w-5 h-5 text-sky-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-950 text-xs">Pendaftaran Batch via Spreadsheet/Excel</h4>
                        <p className="text-[11px] text-sky-800 leading-relaxed mt-0.5">
                          Anda dapat mengimpor daftar Orang Tua sekaligus dengan menyalin (copy-paste) tabel dari Microsoft Excel atau Google Sheets.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setImportType("ortu");
                        setShowImportModal(true);
                        setImportText("");
                        setImportParsedData([]);
                        setImportFeedback(null);
                      }}
                      className="bg-sky-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-sm cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Import Data Orang Tua</span>
                    </button>
                  </div>

                  <div className={`grid grid-cols-1 ${(currentUser?.role === "admin" || currentUser?.role === "guru") ? "lg:grid-cols-3" : ""} gap-6`}>
                    {/* Parents Table */}
                    <div className={(currentUser?.role === "admin" || currentUser?.role === "guru") ? "lg:col-span-2 flex flex-col gap-3" : "w-full flex flex-col gap-3"}>
                      {(() => {
                        const visibleParents = parents.filter(p => {
                          if (currentUser?.role === "guru") {
                            const student = students.find(s => s.id === p.studentId);
                            if (!student) return false;
                            const teacher = teachers.find(t => t.id === currentUser.id);
                            if (!teacher) return false;
                            return student.teacherId === currentUser.id || student.class.includes(teacher.classAssigned);
                          }
                          return true;
                        });
                        const isAllSelected = visibleParents.length > 0 && visibleParents.every(p => selectedParentIds.includes(p.id));

                        return (
                          <>
                            <div className="flex justify-between items-center">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {currentUser?.role === "admin" 
                                  ? "Daftar Orang Tua / Wali Murid" 
                                  : "Daftar Orang Tua / Wali Murid Kelas Anda"}
                              </h3>
                              {(currentUser?.role === "admin" || currentUser?.role === "guru") && selectedParentIds.length > 0 && (
                                <button
                                  onClick={handleBulkDeleteParents}
                                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow cursor-pointer shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Hapus Terpilih ({selectedParentIds.length})</span>
                                </button>
                              )}
                            </div>
                            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                                    {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                                      <th className="p-3 text-center w-10">
                                        <input 
                                          type="checkbox"
                                          checked={isAllSelected}
                                          onChange={() => handleToggleSelectAllParents(visibleParents)}
                                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer w-4 h-4"
                                        />
                                      </th>
                                    )}
                                    <th className="p-3 text-center w-12">No</th>
                                    <th className="p-3">NIS/NISN</th>
                                    <th className="p-3">Nama Siswa</th>
                                    <th className="p-3">Kelas</th>
                                    <th className="p-3 text-center">L/P</th>
                                    <th className="p-3">Musyrif 1 & 2</th>
                                    <th className="p-3 text-right">Skor Poin</th>
                                    {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                                      <th className="p-3 text-center w-24">Aksi</th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {visibleParents.map((p, idx) => {
                                    const student = students.find(s => s.id === p.studentId);
                                    const isSelected = selectedParentIds.includes(p.id);
                                    return (
                                      <tr key={p.id} className={`hover:bg-slate-50/50 ${isSelected ? "bg-slate-50" : ""}`}>
                                        {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                                          <td className="p-3 text-center">
                                            <input 
                                              type="checkbox"
                                              checked={isSelected}
                                              onChange={() => handleToggleSelectParent(p.id)}
                                              className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer w-4 h-4"
                                            />
                                          </td>
                                        )}
                                        <td className="p-3 text-center text-slate-500 font-medium">{idx + 1}</td>
                                        <td className="p-3 text-slate-500">
                                          <span className="block font-mono font-semibold">{student?.nis || "-"}</span>
                                          <span className="block text-[10px] text-slate-400 font-mono">{student?.nisn || "-"}</span>
                                        </td>
                                        <td className="p-3">
                                          <div className="font-bold text-slate-800">{student?.name || "Belum Dihubungkan"}</div>
                                          <div className="text-[10px] text-sky-800 mt-1 font-semibold">Ortu: {p.name} ({p.phone})</div>
                                        </td>
                                        <td className="p-3 text-slate-600 font-medium">{student?.class || "-"}</td>
                                        <td className="p-3 text-center font-bold text-slate-600">{student?.gender || "-"}</td>
                                        <td className="p-3">
                                          <div className="text-slate-700 font-medium">1. {student?.musyrif1 || "-"}</div>
                                          <div className="text-slate-500 text-[10px]">2. {student?.musyrif2 || "-"}</div>
                                        </td>
                                        <td className="p-3 text-right font-mono">
                                          <div className="font-bold text-sky-700">{student?.points || 0} Pts</div>
                                          {student && (() => {
                                            const pending = historyLogs
                                              .filter(log => log.studentId === student.id && (!log.parentApproved || !log.teacherApproved))
                                              .reduce((sum, log) => sum + log.pointsEarned, 0);
                                            return pending > 0 ? (
                                              <span className="text-[10px] text-amber-600 font-bold block animate-pulse" title="Menunggu persetujuan musyrif & ortu">
                                                +{pending} Tertunda
                                              </span>
                                            ) : null;
                                          })()}
                                        </td>
                                        {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                                          <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                              <button
                                                onClick={() => setEditingParent(p)}
                                                className="text-amber-700 hover:text-amber-900 font-bold text-[10px] bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded transition cursor-pointer"
                                              >
                                                Edit
                                              </button>
                                              <button
                                                onClick={() => handleDeleteParent(p.id)}
                                                className="text-red-700 hover:text-red-900 font-bold text-[10px] bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition cursor-pointer"
                                              >
                                                Hapus
                                              </button>
                                            </div>
                                          </td>
                                        )}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Add Parent Form - For admin & guru */}
                    {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">
                        <h3 className="font-bold text-slate-800 text-xs mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                          <UserPlus className="w-4 h-4 text-sky-700" />
                          Tambah Orang Tua Baru
                        </h3>
                        <form onSubmit={handleAddParent} className="space-y-4 text-xs">
                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Orang Tua:</label>
                            <input 
                              type="text"
                              required
                              placeholder="Contoh: Bapak H. Syaifullah"
                              value={formParent.name}
                              onChange={(e) => setFormParent({...formParent, name: e.target.value})}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">No. HP / WhatsApp:</label>
                            <input 
                              type="text"
                              required
                              placeholder="Contoh: 0812-9999-8888"
                              value={formParent.phone}
                              onChange={(e) => setFormParent({...formParent, phone: e.target.value})}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-700 font-bold mb-1">Pilih Anak (Siswa):</label>
                            <select
                              value={formParent.studentId}
                              onChange={(e) => setFormParent({...formParent, studentId: e.target.value})}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                            >
                              {students.filter(s => {
                                if (currentUser?.role === "guru") {
                                  const teacher = teachers.find(t => t.id === currentUser.id);
                                  if (!teacher) return true;
                                  return s.teacherId === currentUser.id || s.class.includes(teacher.classAssigned);
                                }
                                return true;
                              }).map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.class})</option>
                              ))}
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-sky-800 hover:bg-blue-900 text-white py-2.5 rounded-xl font-bold transition shadow-sm cursor-pointer"
                          >
                            Hubungkan Akun Ortu
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}

               {/* 5. PORTAL DAILY INPUT TAB */}
              {opTab === "daily" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                  {/* Dynamic Header based on Role */}
                  {(() => {
                    if (currentUser?.role === "guru") {
                      return (
                        <div>
                          <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                            <UserCheck className="w-6 h-6 text-sky-700" />
                            Pusat Verifikasi Mutaba'ah Harian Wali Kelas
                          </h2>
                          <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                            Berikut adalah daftar lembar mutaba'ah harian yang telah diisi oleh siswa kelas Anda. Klik <strong>Lihat Detail</strong> untuk memantau rincian ibadah harian mereka dan berikan verifikasi persetujuan Wali Kelas.
                          </p>
                        </div>
                      );
                    } else if (currentUser?.role === "ortu") {
                      return (
                        <div>
                          <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                            <ShieldCheck className="w-6 h-6 text-sky-700" />
                            Portal Pemantauan & Persetujuan Orang Tua
                          </h2>
                          <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                            Pantau aktivitas ibadah harian ananda tercinta di sini. Silakan periksa mutaba'ah yang telah disubmit ananda dan berikan tanda persetujuan Orang Tua sebagai bentuk pendampingan.
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                            <Send className="w-6 h-6 text-sky-700" />
                            Portal Pengisian Mutaba'ah Harian (Siswa)
                          </h2>
                          <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                            Pilih siswa di bawah ini untuk mensimulasikan proses pengisian lembar mutaba'ah harian. Setelah diklik Submit, poin dan streak siswa akan otomatis dihitung oleh sistem backend secara real-time!
                          </p>
                        </div>
                      );
                    }
                  })()}

                  {/* Body Content */}
                  {(() => {
                    if (currentUser?.role === "guru" || currentUser?.role === "ortu") {
                      const isGuru = currentUser.role === "guru";
                      const filteredLogs = historyLogs.filter(log => {
                        if (isGuru) {
                          const student = students.find(s => s.id === log.studentId);
                          if (!student) return false;
                          const teacher = teachers.find(t => t.id === currentUser.id);
                          if (!teacher) return false;
                          return student.teacherId === currentUser.id || student.class.includes(teacher.classAssigned);
                        } else {
                          const parent = parents.find(p => p.id === currentUser.id);
                          if (!parent) return false;
                          return log.studentId === parent.studentId;
                        }
                      });

                      return (
                        <div className="space-y-4">
                          {filteredLogs.length === 0 ? (
                            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-3">
                              <AlertCircle className="w-10 h-10 text-slate-400 opacity-60" />
                              <h3 className="font-bold text-slate-700 text-sm">Belum Ada Data Mutaba'ah</h3>
                              <p className="text-xs text-slate-500 max-w-sm">
                                {isGuru 
                                  ? "Belum ada siswa di kelas Anda yang mengirimkan laporan mutaba'ah harian untuk diverifikasi."
                                  : "Ananda tercinta belum mengirimkan laporan mutaba'ah harian hari ini."}
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-4">
                              {filteredLogs.map(log => {
                                const isExpanded = expandedLogId === log.id;
                                const student = students.find(s => s.id === log.studentId);
                                const isApproved = isGuru ? log.teacherApproved : log.parentApproved;

                                return (
                                  <div 
                                    key={log.id} 
                                    className={`border rounded-3xl p-5 transition shadow-sm bg-white ${
                                      isApproved 
                                        ? "border-sky-200 bg-sky-50/10" 
                                        : "border-slate-200 hover:border-slate-300"
                                    }`}
                                  >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                      <div className="flex items-start gap-3">
                                        <div className="bg-sky-50 text-sky-800 p-3 rounded-2xl font-bold font-display text-sm">
                                          {student?.gender === "P" ? "🌸" : "🕌"}
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-800 text-sm">{log.studentName}</h4>
                                            <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                              {student?.class || "Kelas 9"}
                                            </span>
                                          </div>
                                          <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                                            <span className="flex items-center gap-1">
                                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                              {new Date(log.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                            <span>•</span>
                                            <span className="text-sky-800 font-bold bg-sky-50 px-1.5 py-0.2 rounded font-mono">
                                              +{log.pointsEarned} Poin
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Status Badges */}
                                      <div className="flex flex-wrap items-center gap-2">
                                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-xl text-[10px] font-bold">
                                          <span className="text-slate-400">Ortu:</span>
                                          {log.parentApproved ? (
                                            <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                              <Check className="w-3 h-3" /> Disetujui
                                            </span>
                                          ) : (
                                            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                              Belum Disetujui
                                            </span>
                                          )}
                                        </div>

                                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-xl text-[10px] font-bold">
                                          <span className="text-slate-400">Guru:</span>
                                          {log.teacherApproved ? (
                                            <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                              <Check className="w-3 h-3" /> Terverifikasi
                                            </span>
                                          ) : (
                                            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                              Belum Verifikasi
                                            </span>
                                          )}
                                        </div>

                                        <button
                                          onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                                          className="text-slate-600 hover:text-slate-900 text-xs px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition font-bold flex items-center gap-1 cursor-pointer"
                                        >
                                          <span>{isExpanded ? "Tutup" : "Lihat Detail"}</span>
                                          <ChevronDown className={`w-3.5 h-3.5 transition ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Expanded details */}
                                    {isExpanded && (
                                      <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-4 animate-fadeIn">
                                        
                                        {/* 4-Column Grid for Aspect Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-xs">
                                          
                                          {/* Shalat Wajib & Sunnah */}
                                          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex flex-col gap-2.5">
                                            <h5 className="font-bold text-slate-800 text-[10px] uppercase tracking-wider flex items-center gap-1">
                                              <span>🕌 Aktivitas Shalat & Ibadah</span>
                                            </h5>
                                            <div className="space-y-2.5">
                                              <div>
                                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Shalat Fardhu:</span>
                                                <div className="flex flex-col gap-1.5">
                                                  {[
                                                    { key: "subuh", label: "Subuh" },
                                                    { key: "zuhur", label: "Dzuhur" },
                                                    { key: "ashar", label: "Ashar" },
                                                    { key: "maghrib", label: "Maghrib" },
                                                    { key: "isya", label: "Isya" }
                                                  ].map(item => {
                                                    const val = (log.shalatWajib as any)?.[item.key];
                                                    let statusText = "Tidak Shalat";
                                                    let statusColor = "bg-rose-50 text-rose-700 border-rose-100";
                                                    if ((log.shalatWajib as any)?.haidh) {
                                                      statusText = "🌸 Haidh";
                                                      statusColor = "bg-pink-50 text-pink-700 border-pink-100";
                                                    } else if (val === "berjamaah" || val === true) {
                                                      statusText = "🕌 Jama'ah";
                                                      statusColor = "bg-sky-50 text-sky-800 border-sky-100";
                                                    } else if (val === "munfarid") {
                                                      statusText = "👤 Sendiri";
                                                      statusColor = "bg-indigo-50 text-indigo-800 border-indigo-100";
                                                    } else if (val === "tidak_melaksanakan") {
                                                      statusText = "❌ Tidak Shalat";
                                                      statusColor = "bg-rose-50 text-rose-700 border-rose-100";
                                                    }

                                                    return (
                                                      <div key={item.key} className="flex justify-between items-center text-[10.5px] border-b border-slate-100 pb-1">
                                                        <span className="font-semibold text-slate-600">{item.label}</span>
                                                        <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-bold border ${statusColor}`}>
                                                          {statusText}
                                                        </span>
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                              <div className="text-[10px] text-slate-600 mt-2 space-y-1">
                                                <p className="flex justify-between border-b border-dashed pb-0.5">
                                                  <span>Tahajjud:</span> 
                                                  <strong className={log.shalatSunnah?.tahajud ? "text-sky-700" : "text-slate-400"}>
                                                    {log.shalatSunnah?.tahajud ? "Dilaksanakan (+20 Pts)" : "Absen"}
                                                  </strong>
                                                </p>
                                                <p className="flex justify-between border-b border-dashed pb-0.5">
                                                  <span>Dhuha:</span> 
                                                  <strong className={log.shalatSunnah?.dhuha ? "text-sky-700" : "text-slate-400"}>
                                                    {log.shalatSunnah?.dhuha ? "Dilaksanakan (+15 Pts)" : "Absen"}
                                                  </strong>
                                                </p>
                                                <p className="flex justify-between pb-0.5">
                                                  <span>Rawatib & Qabliyah:</span> 
                                                  <strong className="text-slate-700 font-mono">
                                                    {Object.entries(log.shalatSunnah || {}).filter(([k, v]) => k !== "tahajud" && k !== "dhuha" && v).length} Rakaat
                                                  </strong>
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Al-Quran & Tidur */}
                                          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex flex-col gap-2.5">
                                            <h5 className="font-bold text-slate-800 text-[10px] uppercase tracking-wider">
                                              📖 Tilawah & Hafalan Al-Qur'an
                                            </h5>
                                            <div className="text-[10.5px] text-slate-600 space-y-1.5">
                                              <div className="bg-white border border-slate-200 rounded-xl p-2.5">
                                                <p className="font-bold text-blue-950 text-[10px] mb-0.5 uppercase tracking-wide">Tilawah:</p>
                                                <p className="font-medium text-slate-800">
                                                  Surah {log.tilawah?.surah || "-"} {log.tilawah?.ayat ? `Ayat ${log.tilawah.ayat}` : ""} {log.tilawah?.juz ? `(Juz ${log.tilawah.juz})` : ""}
                                                </p>
                                              </div>
                                              <div className="bg-white border border-slate-200 rounded-xl p-2.5">
                                                <p className="font-bold text-blue-950 text-[10px] mb-0.5 uppercase tracking-wide flex items-center justify-between">
                                                  <span>Hafalan:</span>
                                                  <span className="bg-sky-50 text-sky-700 px-1 py-0.2 rounded text-[8px] font-bold">
                                                    {log.hafalan?.tipe || "ziyadah"}
                                                  </span>
                                                </p>
                                                <p className="font-medium text-slate-800">
                                                  Surah {log.hafalan?.surah || "-"} {log.hafalan?.ayat ? `Ayat ${log.hafalan.ayat}` : ""} {log.hafalan?.juz ? `(Juz ${log.hafalan.juz})` : ""}
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Birrul Walidain & Tidur */}
                                          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex flex-col justify-between gap-2.5">
                                            <div>
                                              <h5 className="font-bold text-slate-800 text-[10px] uppercase tracking-wider mb-2">
                                                🤝 Birrul Walidain & Pola Tidur
                                              </h5>
                                              <div className="text-[10.5px] text-slate-600 space-y-2">
                                                <div className="flex gap-2">
                                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${log.polaTidur?.sebelum22 ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "bg-slate-100 text-slate-400"}`}>
                                                    Tidur &lt; 22:00
                                                  </span>
                                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${log.polaTidur?.bangun05 ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "bg-slate-100 text-slate-400"}`}>
                                                    Bangun 05:00
                                                  </span>
                                                </div>
                                                <div>
                                                  <p className="font-bold text-slate-700 text-[10px] mb-1">Aktivitas di Rumah:</p>
                                                  {log.birrulWalidain && log.birrulWalidain.length > 0 ? (
                                                    <ul className="list-disc list-inside space-y-0.5 pl-1 font-medium text-slate-700">
                                                      {log.birrulWalidain.map((item, idx) => (
                                                        <li key={idx} className="truncate">{item}</li>
                                                      ))}
                                                    </ul>
                                                  ) : (
                                                    <span className="text-slate-400 italic">Tidak ada catatan aktivitas</span>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Infaq & Bukti Transfer */}
                                          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex flex-col gap-2.5">
                                            <h5 className="font-bold text-slate-800 text-[10px] uppercase tracking-wider flex items-center gap-1">
                                              <span>💰 Infaq / Sedekah Harian</span>
                                            </h5>
                                            <div className="text-[10.5px] text-slate-600 space-y-2">
                                              <div className="flex items-center justify-between border-b border-dashed pb-1">
                                                <span>Status Infaq:</span>
                                                <strong className={log.infaq?.hasInfaq ? "text-sky-700 font-bold" : "text-slate-400"}>
                                                  {log.infaq?.hasInfaq ? "Berinfaq" : "Absen / Nihil"}
                                                </strong>
                                              </div>
                                              {log.infaq?.hasInfaq && (
                                                <>
                                                  <div className="flex items-center justify-between border-b border-dashed pb-1">
                                                    <span>Nominal:</span>
                                                    <strong className="text-blue-900 font-mono font-bold">
                                                      Rp {parseFloat(log.infaq?.amount || "0").toLocaleString("id-ID")}
                                                    </strong>
                                                  </div>
                                                  <div>
                                                    <p className="font-bold text-slate-700 text-[10px] mb-1">Bukti Transfer:</p>
                                                    {log.infaq?.fileData ? (
                                                      <div className="border border-slate-200 bg-white rounded-xl p-2 flex flex-col items-center gap-2">
                                                        {log.infaq.fileType?.includes("image") || log.infaq.fileData.startsWith("data:image") ? (
                                                          <div className="relative group overflow-hidden rounded-lg bg-slate-50 border w-full max-h-[100px] flex justify-center items-center">
                                                            <img 
                                                              src={log.infaq.fileData} 
                                                              alt="Bukti Transfer" 
                                                              className="object-contain max-h-[100px] w-auto cursor-zoom-in transition-transform duration-200 hover:scale-105"
                                                              onClick={() => {
                                                                setSelectedProofImage(log.infaq?.fileData || "");
                                                              }}
                                                            />
                                                          </div>
                                                        ) : (
                                                          <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-dashed border-slate-300 rounded-lg w-full overflow-hidden">
                                                            <div className="bg-sky-100 text-sky-800 p-1.5 rounded-lg shrink-0">
                                                              <FileSpreadsheet className="w-4 h-4" />
                                                            </div>
                                                            <div className="overflow-hidden min-w-0">
                                                              <p className="font-bold text-slate-800 truncate text-[9px]">{log.infaq.fileName || "dokumen.pdf"}</p>
                                                              <p className="text-[8px] text-slate-400 uppercase font-mono">{log.infaq.fileType || "PDF / FILE"}</p>
                                                            </div>
                                                          </div>
                                                        )}
                                                        <button
                                                          type="button"
                                                          onClick={() => setSelectedProofImage(log.infaq?.fileData || "")}
                                                          className="text-[10px] text-blue-900 font-bold hover:underline cursor-pointer flex items-center gap-1"
                                                        >
                                                          <Eye className="w-3.5 h-3.5" /> Perbesar Bukti
                                                        </button>
                                                      </div>
                                                    ) : (
                                                      <span className="text-slate-400 italic">Bukti transfer tidak diunggah</span>
                                                    )}
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          </div>

                                        </div>

                                        {/* Verification & Action Row */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl mt-1 shrink-0 font-sans">
                                          <div className="text-[11px] text-slate-500 flex-1">
                                            <span className="font-bold text-slate-700 block">Status Persetujuan Ganda:</span>
                                            <div className="flex items-center gap-3 mt-1 font-semibold">
                                              <span className="flex items-center gap-1.5">
                                                <span>Wali Murid:</span>
                                                {log.parentApproved ? (
                                                  <span className="text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 text-[9px]">✓ Disetujui</span>
                                                ) : (
                                                  <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md text-[9px]">⚠ Belum</span>
                                                )}
                                              </span>
                                              <span>•</span>
                                              <span className="flex items-center gap-1.5">
                                                <span>Wali Kelas:</span>
                                                {log.teacherApproved ? (
                                                  <span className="text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 text-[9px]">✓ Terverifikasi</span>
                                                ) : log.rejectedByTeacher ? (
                                                  <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold flex items-center gap-0.5">✗ Ditolak</span>
                                                ) : (
                                                  <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md text-[9px]">⚠ Belum</span>
                                                )}
                                              </span>
                                            </div>
                                            {log.rejectedByTeacher && log.rejectionReason && (
                                              <p className="text-[10px] text-rose-600 font-bold mt-2 bg-rose-50 border border-rose-100 p-2 rounded-xl">
                                                Alasan Penolakan: <span className="font-semibold text-rose-800">{log.rejectionReason}</span>
                                              </p>
                                            )}
                                          </div>
                                          
                                          <div className="sm:min-w-[280px]">
                                            {isGuru ? (
                                              <div className="flex flex-col gap-2 w-full">
                                                <button
                                                  onClick={() => handleApproveByTeacher(log.id)}
                                                  className={`w-full py-2.5 px-5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer ${
                                                    log.teacherApproved 
                                                      ? "bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 shadow-sm" 
                                                      : "bg-sky-800 hover:bg-blue-900 text-white shadow-md hover:-translate-y-0.5"
                                                  }`}
                                                >
                                                  <CheckCircle2 className="w-4 h-4" />
                                                  <span>
                                                    {log.teacherApproved ? "Batalkan Verifikasi Wali Kelas" : "Verifikasi & Setujui Lembar Mutaba'ah"}
                                                  </span>
                                                </button>

                                                {!log.teacherApproved && (
                                                  <div className="w-full">
                                                    {rejectingLogId === log.id ? (
                                                      <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200/80 mt-1.5 flex flex-col gap-2">
                                                        <label className="text-[10px] font-extrabold text-slate-700">Tulis Alasan Penolakan:</label>
                                                        <input
                                                          type="text"
                                                          value={rejectionReasonInput}
                                                          onChange={(e) => setRejectionReasonInput(e.target.value)}
                                                          placeholder="Contoh: Bukti transfer belum diunggah atau data hafalan salah..."
                                                          className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 font-medium"
                                                        />
                                                        <div className="flex gap-2">
                                                          <button
                                                            onClick={() => {
                                                              handleRejectByTeacher(log.id, rejectionReasonInput);
                                                              setRejectingLogId(null);
                                                              setRejectionReasonInput("");
                                                            }}
                                                            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] cursor-pointer transition shadow"
                                                          >
                                                            Kirim Penolakan
                                                          </button>
                                                          <button
                                                            onClick={() => {
                                                              setRejectingLogId(null);
                                                              setRejectionReasonInput("");
                                                            }}
                                                            className="bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-[10px] cursor-pointer transition"
                                                          >
                                                            Batal
                                                          </button>
                                                        </div>
                                                      </div>
                                                    ) : (
                                                      <button
                                                        onClick={() => {
                                                          setRejectingLogId(log.id);
                                                          setRejectionReasonInput("");
                                                        }}
                                                        className="w-full mt-1 py-2 px-5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer"
                                                      >
                                                        <XCircle className="w-4 h-4 text-rose-600" />
                                                        <span>Tolak Laporan (Minta Isi Ulang)</span>
                                                      </button>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            ) : (
                                              <button
                                                onClick={() => handleApproveByParent(log.id)}
                                                className={`w-full py-2.5 px-5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer ${
                                                  log.parentApproved 
                                                    ? "bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 shadow-sm" 
                                                    : "bg-sky-800 hover:bg-blue-900 text-white shadow-md hover:-translate-y-0.5"
                                                }`}
                                              >
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span>
                                                  {log.parentApproved ? "Batalkan Persetujuan Ortu" : "Setujui & Tanda Tangan Orang Tua"}
                                                </span>
                                              </button>
                                            )}
                                          </div>
                                        </div>

                                      </div>
                                    )}

                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Student (Siswa) or Admin view: Standard checklist submission layout
                      const activeStudentIdForForm = currentUser?.role === "siswa" ? currentUser.id : selectedStudentId;
                      const activeLogForDate = historyLogs.find(
                        (log) => log.studentId === activeStudentIdForForm && log.date === tanggalMutabaah
                      );
                      const isAlreadySubmitted = !!(activeLogForDate && !activeLogForDate.rejectedByTeacher);
                      const isRejected = !!(activeLogForDate && activeLogForDate.rejectedByTeacher);

                      return (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                          
                          {/* Checklist Form Card */}
                          <div className="border border-slate-200 rounded-3xl p-5 md:p-6 flex flex-col gap-5 text-xs">
                            
                            {/* Student Selector */}
                            <div>
                              <label className="block text-slate-700 font-bold mb-1.5 text-xs">1. Pilih Akun Siswa Pengisi:</label>
                              {currentUser?.role === "siswa" ? (
                                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-between">
                                  <div>
                                    <span className="font-bold text-blue-950 block">{currentUser.name}</span>
                                    <span className="text-[10px] text-sky-700 font-mono">NISN: {currentUser.nisnOrNip}</span>
                                  </div>
                                  <span className="bg-sky-800 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-1 rounded-full">
                                    Akun Anda
                                  </span>
                                </div>
                              ) : (
                                <select
                                  value={selectedStudentId}
                                  onChange={(e) => {
                                    setSelectedStudentId(e.target.value);
                                    setSubmitResult(null);
                                  }}
                                  className="w-full p-3 border border-slate-300 rounded-xl bg-white text-blue-950 font-bold focus:ring-2 focus:ring-sky-500"
                                >
                                  {students.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} ({s.class}) - Streak saat ini: {s.streak} Hari</option>
                                  ))}
                                </select>
                              )}
                              {(() => {
                                const currentChecklistStudent = students.find(s => s.id === (currentUser?.role === "siswa" ? currentUser.id : selectedStudentId));
                                if (!currentChecklistStudent) return null;
                                return (
                                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col gap-2 mt-2.5">
                                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                                      <span>NIS: <strong className="text-slate-700 font-mono">{currentChecklistStudent.nis || "-"}</strong></span>
                                      <span>L/P: <strong className="text-slate-700 font-mono">{currentChecklistStudent.gender || "-"}</strong></span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 border-t pt-2 border-slate-200/60">
                                      <div>
                                        <span className="text-[9px] text-slate-400 font-bold block uppercase">Musyrif 1</span>
                                        <span className="font-semibold text-[10px] text-blue-950 block truncate" title={currentChecklistStudent.musyrif1}>{currentChecklistStudent.musyrif1 || "-"}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-slate-400 font-bold block uppercase">Musyrif 2</span>
                                        <span className="font-semibold text-[10px] text-blue-950 block truncate" title={currentChecklistStudent.musyrif2}>{currentChecklistStudent.musyrif2 || "-"}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Tanggal Pengisian & Waktu Berjalan */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-sky-50/40 p-3.5 rounded-2xl border border-sky-100/70">
                              <div>
                                <label className="block text-slate-700 font-bold mb-1 text-[11px] uppercase tracking-wider flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-sky-700" />
                                  <span>Tanggal Pengisian</span>
                                </label>
                                <input 
                                  type="date"
                                  value={tanggalMutabaah}
                                  min={(() => {
                                    const d = new Date();
                                    d.setDate(d.getDate() - 2);
                                    return d.toISOString().split("T")[0];
                                  })()}
                                  max={(() => {
                                    const d = new Date();
                                    d.setDate(d.getDate() - 1);
                                    return d.toISOString().split("T")[0];
                                  })()}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const todayStr = new Date().toISOString().split("T")[0];
                                    if (val === todayStr) {
                                      triggerToast("Laporan mutaba'ah untuk hari ini belum bisa diisi.");
                                      return;
                                    }
                                    setTanggalMutabaah(val);
                                  }}
                                  className="w-full p-2 border border-slate-300 rounded-xl bg-white text-blue-950 font-semibold focus:ring-2 focus:ring-sky-500 text-xs"
                                />
                                <p className="text-[10px] text-slate-500 mt-1">Bisa mengisi untuk kemarin (H-1) & 2 hari lalu (H-2). Hari ini belum dibuka.</p>
                              </div>

                              <div className="flex flex-col justify-center bg-white border border-slate-200 p-2.5 rounded-xl text-center shadow-sm">
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Waktu Real-Time</span>
                                <span className="text-sm font-mono font-bold text-blue-950 leading-tight">
                                  {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                                <span className="text-[9.5px] text-slate-500 mt-0.5">
                                  {currentTime.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                                </span>
                              </div>
                            </div>

                            {isAlreadySubmitted && (
                              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 shadow-sm animate-fadeIn">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                  <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="text-xs">
                                  <h4 className="font-bold text-emerald-950 font-display">Laporan Sudah Terkirim (Selesai)</h4>
                                  <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                                    Alhamdulillah, laporan mutaba'ah harian untuk tanggal <strong className="text-emerald-950 font-extrabold">{new Date(tanggalMutabaah).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong> sudah berhasil dikirim sebelumnya. Setiap tanggal hanya diperbolehkan satu kali submit.
                                  </p>
                                </div>
                              </div>
                            )}

                            {isRejected && (
                              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 shadow-sm animate-fadeIn">
                                <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 shrink-0">
                                  <X className="w-5 h-5" />
                                </div>
                                <div className="text-xs flex-1">
                                  <h4 className="font-bold text-rose-950 font-display text-[12px] uppercase tracking-wide">Laporan Perlu Direvisi (Ditolak Guru)</h4>
                                  <p className="text-[11px] text-rose-800 leading-relaxed mt-0.5 font-medium">
                                    Laporan mutaba'ah harian untuk tanggal <strong className="text-rose-950 font-bold">{new Date(tanggalMutabaah).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong> perlu diisi ulang karena ditolak oleh Wali Kelas.
                                  </p>
                                  {activeLogForDate?.rejectionReason && (
                                    <div className="mt-2 p-2.5 bg-white/80 border border-rose-200 rounded-xl text-[10.5px] text-rose-900 leading-relaxed font-medium">
                                      <strong className="text-rose-950 font-bold block">Alasan Penolakan Wali Kelas:</strong>
                                      {activeLogForDate.rejectionReason}
                                    </div>
                                  )}
                                  <p className="text-[10px] text-rose-700 mt-2 italic font-medium">
                                    * Silakan perbaiki isian checklist Anda di bawah ini dan klik tombol kirim di bawah untuk memperbarui laporan Anda.
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Shalat Wajib Checklist */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1">
                                  <span>🕌 Shalat Fardhu 5 Waktu & Jadwal Waktu Shalat</span>
                                </span>
                                <label className="flex items-center gap-1.5 cursor-pointer bg-pink-50 border border-pink-200 text-pink-700 px-2.5 py-1 rounded-xl text-xs font-semibold hover:bg-pink-100 transition shadow-sm animate-fadeIn">
                                  <input
                                    type="checkbox"
                                    checked={shalatWajib.haidh || false}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setShalatWajib({
                                        subuh: checked ? "" : "berjamaah",
                                        zuhur: checked ? "" : "berjamaah",
                                        ashar: checked ? "" : "berjamaah",
                                        maghrib: checked ? "" : "berjamaah",
                                        isya: checked ? "" : "berjamaah",
                                        haidh: checked
                                      });
                                    }}
                                    className="w-3.5 h-3.5 text-pink-600 border-pink-300 rounded focus:ring-pink-500 cursor-pointer text-pink-600"
                                  />
                                  <span>Sedang Haidh</span>
                                </label>
                              </div>
                              <div className="grid grid-cols-5 gap-1.5 font-bold">
                                {[
                                  { key: "subuh", label: "Subuh", time: "04:35" },
                                  { key: "zuhur", label: "Dzuhur", time: "11:58" },
                                  { key: "ashar", label: "Ashar", time: "15:15" },
                                  { key: "maghrib", label: "Maghrib", time: "17:53" },
                                  { key: "isya", label: "Isya", time: "19:04" }
                                ].map((item) => {
                                  const isHaidh = shalatWajib.haidh;
                                  const currentVal = (shalatWajib as any)[item.key];
                                  return (
                                    <div 
                                      key={item.key} 
                                      className={`flex flex-col items-center gap-1 border p-2 rounded-2xl transition shadow-sm ${
                                        isHaidh 
                                          ? 'bg-slate-100 border-slate-200 opacity-60' 
                                          : currentVal === "berjamaah"
                                            ? 'bg-sky-50/70 border-sky-400' 
                                            : currentVal === "munfarid"
                                              ? 'bg-indigo-50/70 border-indigo-400'
                                              : currentVal === "tidak_melaksanakan"
                                                ? 'bg-rose-50/70 border-rose-400'
                                                : 'bg-white border-slate-200'
                                      }`}
                                    >
                                      <span className="text-[9px] text-sky-700 font-mono font-bold leading-none">{item.time}</span>
                                      <span className="text-[10.5px] text-slate-700 font-bold leading-tight mt-0.5">{item.label}</span>
                                      
                                      <div className="flex flex-col gap-1 w-full mt-2 text-[9.5px]">
                                        <button
                                          type="button"
                                          disabled={isHaidh}
                                          onClick={() => {
                                            if (isHaidh) return;
                                            setShalatWajib({ 
                                              ...shalatWajib, 
                                              [item.key]: currentVal === "berjamaah" ? "" : "berjamaah" 
                                            });
                                          }}
                                          className={`py-1 px-0.5 rounded text-center font-bold transition border cursor-pointer ${
                                            !isHaidh && currentVal === "berjamaah"
                                              ? "bg-sky-600 text-white border-sky-700 font-extrabold shadow-sm text-[8.5px]"
                                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 text-[8.5px]"
                                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                                        >
                                          🕌 Jama'ah
                                        </button>
                                        <button
                                          type="button"
                                          disabled={isHaidh}
                                          onClick={() => {
                                            if (isHaidh) return;
                                            setShalatWajib({ 
                                              ...shalatWajib, 
                                              [item.key]: currentVal === "munfarid" ? "" : "munfarid" 
                                            });
                                          }}
                                          className={`py-1 px-0.5 rounded text-center font-bold transition border cursor-pointer ${
                                            !isHaidh && currentVal === "munfarid"
                                              ? "bg-indigo-600 text-white border-indigo-700 font-extrabold shadow-sm text-[8.5px]"
                                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 text-[8.5px]"
                                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                                        >
                                          👤 Munfarid
                                        </button>
                                        <button
                                          type="button"
                                          disabled={isHaidh}
                                          onClick={() => {
                                            if (isHaidh) return;
                                            setShalatWajib({ 
                                              ...shalatWajib, 
                                              [item.key]: currentVal === "tidak_melaksanakan" ? "" : "tidak_melaksanakan" 
                                            });
                                          }}
                                          className={`py-1 px-0.5 rounded text-center font-bold transition border cursor-pointer ${
                                            !isHaidh && currentVal === "tidak_melaksanakan"
                                              ? "bg-rose-600 text-white border-rose-700 font-extrabold shadow-sm text-[8px]"
                                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 text-[8px]"
                                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                                        >
                                          ❌ Tidak Shalat
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Shalat Sunnah Checklist */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">✨ Shalat Sunnah & Rawatib</span>
                                <label className="flex items-center gap-1.5 cursor-pointer bg-pink-50 border border-pink-200 text-pink-700 px-2.5 py-1 rounded-xl text-xs font-semibold hover:bg-pink-100 transition shadow-sm animate-fadeIn">
                                  <input
                                    type="checkbox"
                                    checked={shalatSunnah.haidh || false}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setShalatSunnah({
                                        tahajud: !checked,
                                        dhuha: !checked,
                                        qabliyahSubuh: !checked,
                                        qabliyahDzuhur: !checked,
                                        badiyahDzuhur: !checked,
                                        badiyahMaghrib: !checked,
                                        badiyahIsya: !checked,
                                        haidh: checked
                                      });
                                    }}
                                    className="w-3.5 h-3.5 text-pink-600 border-pink-300 rounded focus:ring-pink-500 cursor-pointer text-pink-600"
                                  />
                                  <span>Sedang Haidh</span>
                                </label>
                              </div>
                              
                              {/* Tahajhud & Dhuha */}
                              <div className="grid grid-cols-2 gap-2.5">
                                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition shadow-sm ${
                                  shalatSunnah.haidh 
                                    ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed' 
                                    : shalatSunnah.tahajud 
                                      ? 'bg-sky-50/60 border-sky-500 font-bold' 
                                      : 'bg-white border-slate-200'
                                }`}>
                                  <span className="text-slate-700 font-medium">Shalat Tahajjud</span>
                                  <input 
                                    type="checkbox"
                                    disabled={shalatSunnah.haidh}
                                    checked={shalatSunnah.haidh ? false : shalatSunnah.tahajud}
                                    onChange={(e) => setShalatSunnah({ ...shalatSunnah, tahajud: e.target.checked })}
                                    className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 cursor-pointer"
                                  />
                                </label>
                                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition shadow-sm ${
                                  shalatSunnah.haidh 
                                    ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed' 
                                    : shalatSunnah.dhuha 
                                      ? 'bg-sky-50/60 border-sky-500 font-bold' 
                                      : 'bg-white border-slate-200'
                                }`}>
                                  <span className="text-slate-700 font-medium">Shalat Dhuha</span>
                                  <input 
                                    type="checkbox"
                                    disabled={shalatSunnah.haidh}
                                    checked={shalatSunnah.haidh ? false : shalatSunnah.dhuha}
                                    onChange={(e) => setShalatSunnah({ ...shalatSunnah, dhuha: e.target.checked })}
                                    className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 cursor-pointer"
                                  />
                                </label>
                              </div>

                              {/* Rawatib Group */}
                              <div className="border-t border-slate-200 pt-2.5">
                                <span className="text-[10px] text-slate-500 font-bold block mb-2 uppercase tracking-wide">Rakaat Sunnah Rawatib:</span>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {[
                                    { key: "qabliyahSubuh", label: "Qabliyah Subuh" },
                                    { key: "qabliyahDzuhur", label: "Qabliyah Dzuhur" },
                                    { key: "badiyahDzuhur", label: "Ba'diyah Dzuhur" },
                                    { key: "badiyahMaghrib", label: "Ba'diyah Magrib" },
                                    { key: "badiyahIsya", label: "Ba'diyah Isya" }
                                  ].map((item) => {
                                    const isHaidh = shalatSunnah.haidh;
                                    const isChecked = !!shalatSunnah[item.key as keyof typeof shalatSunnah];
                                    return (
                                      <label 
                                        key={item.key} 
                                        className={`flex items-center gap-1.5 p-2 rounded-lg border text-[9.5px] cursor-pointer transition ${
                                          isHaidh 
                                            ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed' 
                                            : isChecked 
                                              ? 'bg-sky-50/50 border-sky-400 font-semibold text-blue-950' 
                                              : 'bg-white border-slate-200 hover:border-slate-300'
                                        }`}
                                      >
                                        <input 
                                          type="checkbox"
                                          disabled={isHaidh}
                                          checked={isHaidh ? false : isChecked}
                                          onChange={(e) => setShalatSunnah({ ...shalatSunnah, [item.key]: e.target.checked })}
                                          className="w-3.5 h-3.5 text-sky-600 border-slate-300 rounded"
                                        />
                                        <span>{item.label}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Membaca Al-Qur'an (Tilawah) */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">📖 Membaca Al Qur'an</span>
                                <div className="flex gap-2">
                                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-[10px] text-sky-800">
                                    <input
                                      type="radio"
                                      name="tilawah_status"
                                      checked={tilawah.surah !== "Tidak membaca"}
                                      onChange={() => setTilawah({ ...tilawah, surah: "An-Naba'", surahEnd: "An-Naba'", customSurah: "", customSurahEnd: "", ayat: "1-10", juz: "30", juzEnd: "30" })}
                                      className="text-sky-600 focus:ring-sky-500 w-3.5 h-3.5 cursor-pointer"
                                    />
                                    <span>Membaca</span>
                                  </label>
                                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-[10px] text-pink-700">
                                    <input
                                      type="radio"
                                      name="tilawah_status"
                                      checked={tilawah.surah === "Tidak membaca"}
                                      onChange={() => setTilawah({ ...tilawah, surah: "Tidak membaca", surahEnd: "Tidak membaca", customSurah: "", customSurahEnd: "", ayat: "", juz: "30", juzEnd: "30" })}
                                      className="text-pink-600 focus:ring-pink-500 w-3.5 h-3.5 cursor-pointer"
                                    />
                                    <span>Tidak membaca</span>
                                  </label>
                                </div>
                              </div>

                              {tilawah.surah !== "Tidak membaca" && (
                                <div className="space-y-3 mt-1 animate-fadeIn">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-slate-500 text-[10px] font-bold mb-1">Dari Surat</label>
                                      <select
                                        value={tilawah.surah}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setTilawah({ 
                                            ...tilawah, 
                                            surah: val,
                                            surahEnd: tilawah.surahEnd === "Tidak membaca" || tilawah.surahEnd === tilawah.surah ? val : tilawah.surahEnd
                                          });
                                        }}
                                        className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-xs"
                                      >
                                        {SURAH_LIST.filter(s => s !== "Tidak membaca").map((s) => (
                                          <option key={s} value={s}>{s}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-slate-500 text-[10px] font-bold mb-1">Sampai Surat</label>
                                      <select
                                        value={tilawah.surahEnd || tilawah.surah}
                                        onChange={(e) => {
                                          setTilawah({ 
                                            ...tilawah, 
                                            surahEnd: e.target.value
                                          });
                                        }}
                                        className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-xs"
                                      >
                                        {SURAH_LIST.filter(s => s !== "Tidak membaca").map((s) => (
                                          <option key={s} value={s}>{s}</option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                      <label className="block text-slate-500 text-[10px] font-bold mb-1">Dari Juz</label>
                                      <select
                                        value={tilawah.juz}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setTilawah({ 
                                            ...tilawah, 
                                            juz: val,
                                            juzEnd: parseInt(tilawah.juzEnd) < parseInt(val) ? val : tilawah.juzEnd
                                          });
                                        }}
                                        className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-xs"
                                      >
                                        {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                                          <option key={num} value={num.toString()}>Juz {num}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-slate-500 text-[10px] font-bold mb-1">Sampai Juz</label>
                                      <select
                                        value={tilawah.juzEnd || tilawah.juz}
                                        onChange={(e) => setTilawah({ ...tilawah, juzEnd: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-xs"
                                      >
                                        {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                                          <option key={num} value={num.toString()}>Juz {num}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-slate-500 text-[10px] font-bold mb-1">Ayat</label>
                                      <input
                                        type="text"
                                        placeholder="Contoh: 1-10"
                                        value={tilawah.ayat}
                                        onChange={(e) => setTilawah({ ...tilawah, ayat: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-xs"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {tilawah.surah === "Lainnya (Ketik Manual)" && (
                                <div className="mt-1 animate-fadeIn">
                                  <label className="block text-slate-500 text-[10px] font-bold mb-1">Ketik Nama Surat Mulai:</label>
                                  <input
                                    type="text"
                                    placeholder="Masukkan nama surat manual"
                                    value={tilawah.customSurah}
                                    onChange={(e) => setTilawah({ ...tilawah, customSurah: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs"
                                  />
                                </div>
                              )}

                              {tilawah.surahEnd === "Lainnya (Ketik Manual)" && (
                                <div className="mt-1 animate-fadeIn">
                                  <label className="block text-slate-500 text-[10px] font-bold mb-1">Ketik Nama Surat Akhir:</label>
                                  <input
                                    type="text"
                                    placeholder="Masukkan nama surat manual"
                                    value={tilawah.customSurahEnd || ""}
                                    onChange={(e) => setTilawah({ ...tilawah, customSurahEnd: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Hafalan Al-Qur'an */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3">
                              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">🎯 Hafalan Al Qur'an</span>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-slate-500 text-[10px] font-bold mb-1">Nama Surat</label>
                                  <select
                                    disabled={hafalan.tipe === "tidak_hafalan"}
                                    value={hafalan.tipe === "tidak_hafalan" ? "Tidak hafalan" : hafalan.surah}
                                    onChange={(e) => setHafalan({ ...hafalan, surah: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                                  >
                                    {hafalan.tipe === "tidak_hafalan" ? (
                                      <option value="Tidak hafalan">❌ Tidak hafalan</option>
                                    ) : (
                                      SURAH_LIST.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                      ))
                                    )}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-slate-500 text-[10px] font-bold mb-1">Ayat</label>
                                  <input
                                    type="text"
                                    disabled={hafalan.tipe === "tidak_hafalan"}
                                    placeholder={hafalan.tipe === "tidak_hafalan" ? "N/A" : "Contoh: 1-5"}
                                    value={hafalan.tipe === "tidak_hafalan" ? "" : hafalan.ayat}
                                    onChange={(e) => setHafalan({ ...hafalan, ayat: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-500 text-[10px] font-bold mb-1">Juz</label>
                                  <select
                                    disabled={hafalan.tipe === "tidak_hafalan"}
                                    value={hafalan.juz}
                                    onChange={(e) => setHafalan({ ...hafalan, juz: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 text-center focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                                  >
                                    {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                                      <option key={num} value={num.toString()}>Juz {num}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              {hafalan.tipe !== "tidak_hafalan" && hafalan.surah === "Lainnya (Ketik Manual)" && (
                                <div className="mt-1 animate-fadeIn">
                                  <label className="block text-slate-500 text-[10px] font-bold mb-1">Ketik Nama Surat:</label>
                                  <input
                                    type="text"
                                    placeholder="Masukkan nama surat manual"
                                    value={hafalan.customSurah}
                                    onChange={(e) => setHafalan({ ...hafalan, customSurah: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                  />
                                </div>
                              )}
                              <div className="flex gap-4 mt-1 border-t border-slate-200 pt-2.5 bg-slate-100/50 p-2.5 rounded-xl">
                                <span className="text-[10px] text-slate-500 font-bold self-center">Keterangan Hafalan:</span>
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
                                    <input
                                      type="radio"
                                      name="tipe_hafalan"
                                      checked={hafalan.tipe === "murojaah"}
                                      onChange={() => setHafalan({ ...hafalan, tipe: "murojaah", surah: "An-Nazi'at" })}
                                      className="text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                                    />
                                    <span>Muroja'ah</span>
                                  </label>
                                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
                                    <input
                                      type="radio"
                                      name="tipe_hafalan"
                                      checked={hafalan.tipe === "ziyadah"}
                                      onChange={() => setHafalan({ ...hafalan, tipe: "ziyadah", surah: "An-Nazi'at" })}
                                      className="text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                                    />
                                    <span>Ziyadah</span>
                                  </label>
                                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
                                    <input
                                      type="radio"
                                      name="tipe_hafalan"
                                      checked={hafalan.tipe === "tidak_hafalan"}
                                      onChange={() => setHafalan({ ...hafalan, tipe: "tidak_hafalan", surah: "Tidak hafalan", ayat: "" })}
                                      className="text-pink-600 focus:ring-pink-500 w-4 h-4 cursor-pointer"
                                    />
                                    <span>Tidak hafalan</span>
                                  </label>
                                </div>
                              </div>
                            </div>

                            {/* Pola Tidur Sehat */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3">
                              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">🛌 Pola Tidur Sehat</span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition shadow-sm ${polaTidur.sebelum22 ? 'bg-sky-50/60 border-sky-500 font-bold' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                  <span className="text-slate-700 leading-tight">Tidur sebelum jam 22.00</span>
                                  <input 
                                    type="checkbox"
                                    checked={polaTidur.sebelum22}
                                    onChange={(e) => setPolaTidur({ ...polaTidur, sebelum22: e.target.checked })}
                                    className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 ml-2 cursor-pointer"
                                  />
                                </label>
                                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition shadow-sm ${polaTidur.bangun05 ? 'bg-sky-50/60 border-sky-500 font-bold' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                  <span className="text-slate-700 leading-tight">Bangun jam 5.00</span>
                                  <input 
                                    type="checkbox"
                                    checked={polaTidur.bangun05}
                                    onChange={(e) => setPolaTidur({ ...polaTidur, bangun05: e.target.checked })}
                                    className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 ml-2 cursor-pointer"
                                  />
                                </label>
                              </div>
                            </div>

                            {/* Kegiatan Membantu Orang Tua (Birrul Walidain) */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3">
                              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">🤝 Membantu Orang Tua (Birrul Walidain)</span>
                              <div className="flex flex-col gap-2 bg-white border border-slate-200 p-3 rounded-xl max-h-[220px] overflow-y-auto">
                                <label className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-pink-700 transition hover:bg-slate-50 border border-transparent ${birrulActivities.includes("Tidak ada") ? 'bg-pink-50 border-pink-200 font-semibold' : ''}`}>
                                  <input
                                    type="checkbox"
                                    checked={birrulActivities.includes("Tidak ada")}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setBirrulActivities(["Tidak ada"]);
                                        setOtherBirrul("");
                                      } else {
                                        setBirrulActivities([]);
                                      }
                                    }}
                                    className="w-4 h-4 text-pink-600 border-pink-300 rounded cursor-pointer"
                                  />
                                  <span>❌ Tidak ada</span>
                                </label>

                                {[
                                  "Membantu membersihkan rumah",
                                  "Mencuci piring",
                                  "Membantu memasak atau menyiapkan makanan",
                                  "Merapihkan tempat tidur sendiri",
                                  "Menyiram tanaman di halaman rumah",
                                  "Mencuci kendaraan orang tua",
                                  "Membawakan barang belanjaan",
                                  "Membantu mencuci atau menjemur pakaian"
                                ].map((act) => {
                                  const isChecked = birrulActivities.includes(act);
                                  const isNoneSelected = birrulActivities.includes("Tidak ada");
                                  return (
                                    <label key={act} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-slate-700 transition hover:bg-slate-50 ${isNoneSelected ? 'opacity-50 cursor-not-allowed' : ''} ${isChecked ? 'bg-sky-50/40 text-blue-950 font-semibold' : ''}`}>
                                      <input
                                        type="checkbox"
                                        disabled={isNoneSelected}
                                        checked={isChecked}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setBirrulActivities([...birrulActivities.filter(a => a !== "Tidak ada"), act]);
                                          } else {
                                            setBirrulActivities(birrulActivities.filter(a => a !== act));
                                          }
                                        }}
                                        className="w-4 h-4 text-sky-600 border-slate-300 rounded cursor-pointer"
                                      />
                                      <span>{act}</span>
                                    </label>
                                  );
                                })}
                                
                                {/* Other check option */}
                                <label className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-slate-700 transition hover:bg-slate-50 ${birrulActivities.includes("Tidak ada") ? 'opacity-50 cursor-not-allowed' : ''} ${birrulActivities.includes("Other") ? 'bg-sky-50/40 text-blue-950 font-semibold' : ''}`}>
                                  <input
                                    type="checkbox"
                                    disabled={birrulActivities.includes("Tidak ada")}
                                    checked={birrulActivities.includes("Other")}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setBirrulActivities([...birrulActivities.filter(a => a !== "Tidak ada"), "Other"]);
                                      } else {
                                        setBirrulActivities(birrulActivities.filter(a => a !== "Other"));
                                      }
                                    }}
                                    className="w-4 h-4 text-sky-600 border-slate-300 rounded cursor-pointer"
                                  />
                                  <span>Lainnya (Other):</span>
                                </label>
 
                                {birrulActivities.includes("Other") && (
                                  <input
                                    type="text"
                                    placeholder="Ketik kegiatan lainnya..."
                                    value={otherBirrul}
                                    onChange={(e) => setOtherBirrul(e.target.value)}
                                    className="w-full p-2 border border-slate-300 rounded-xl bg-white text-slate-800 text-[11px] mt-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                  />
                                )}
                              </div>
                            </div>

                            {/* Infaq atau Sedekah Harian */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">💰 Infaq / Sedekah Harian</span>
                                <div className="flex gap-2">
                                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-[10px] text-sky-800">
                                    <input
                                      type="radio"
                                      name="infaq_status"
                                      checked={infaq.hasInfaq}
                                      onChange={() => setInfaq({ ...infaq, hasInfaq: true })}
                                      className="text-sky-600 focus:ring-sky-500 w-3.5 h-3.5 cursor-pointer"
                                    />
                                    <span>Berinfaq</span>
                                  </label>
                                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-[10px] text-pink-700">
                                    <input
                                      type="radio"
                                      name="infaq_status"
                                      checked={!infaq.hasInfaq}
                                      onChange={() => setInfaq({ ...infaq, hasInfaq: false, amount: "", fileData: "", fileName: "", fileType: "" })}
                                      className="text-pink-600 focus:ring-pink-500 w-3.5 h-3.5 cursor-pointer"
                                    />
                                    <span>Tidak</span>
                                  </label>
                                </div>
                              </div>

                              {infaq.hasInfaq && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-1 animate-fadeIn">
                                  <div>
                                    <label className="block text-slate-500 text-[10px] font-bold mb-1">Nominal Infaq (Rp)</label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">Rp</span>
                                      <input
                                        type="number"
                                        placeholder="Contoh: 10000"
                                        value={infaq.amount}
                                        onChange={(e) => setInfaq({ ...infaq, amount: e.target.value })}
                                        className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-sky-500"
                                      />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1">Masukkan angka saja</p>
                                  </div>

                                  <div>
                                    <label className="block text-slate-500 text-[10px] font-bold mb-1 flex items-center justify-between">
                                      <span>Upload Bukti Transfer</span>
                                      <span className="text-[8.5px] bg-sky-100 text-sky-800 px-1 py-0.2 rounded font-mono font-bold uppercase">Auto-Compress</span>
                                    </label>
                                    <div className="relative flex items-center justify-center border border-dashed border-slate-300 rounded-xl p-2 bg-white hover:bg-slate-50 transition min-h-[42px]">
                                      <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        onChange={handleInfaqFileChange}
                                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                      />
                                      <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                                        <Upload className="w-4 h-4 text-slate-400" />
                                        <span className="text-[10.5px]">Pilih file bukti (JPG/PNG/PDF)</span>
                                      </div>
                                    </div>

                                    {infaq.fileName && (
                                      <div className="mt-2 p-2 bg-slate-100/85 border border-slate-200 rounded-lg flex items-center justify-between gap-1.5 text-[10px]">
                                        <div className="flex items-center gap-1.5 shrink truncate">
                                          {infaq.fileType.includes("pdf") ? (
                                            <FileText className="w-4 h-4 text-red-500" />
                                          ) : (
                                            <div className="w-5 h-5 bg-slate-200 rounded overflow-hidden shrink-0">
                                              <img src={infaq.fileData} alt="Mini preview" className="w-full h-full object-cover" />
                                            </div>
                                          )}
                                          <span className="truncate font-semibold text-slate-700">{infaq.fileName}</span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => setInfaq({ ...infaq, fileData: "", fileName: "", fileType: "" })}
                                          className="text-red-500 hover:text-red-700 font-bold text-[9px] shrink-0"
                                        >
                                          Hapus
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {isAlreadySubmitted ? (
                              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2.5 shadow-sm animate-fadeIn">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                  <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-emerald-950 font-display text-xs md:text-sm uppercase tracking-wide">Laporan Berhasil Disubmit</h4>
                                  <p className="text-[11px] text-emerald-800 font-medium mt-1 max-w-sm">
                                    Laporan mutaba'ah tanggal {new Date(tanggalMutabaah).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} sudah lengkap dan aman. Tidak perlu mengisi ulang.
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={handleDailySubmit}
                                disabled={submitting}
                                className="w-full bg-blue-900 hover:bg-blue-900 text-white font-display font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md cursor-pointer text-[13px]"
                              >
                                {submitting ? "Mengirim ke API server..." : "Kirim Data Mutaba'ah Hari Ini"}
                              </button>
                            )}
                          </div>

                          {/* Results / Live API Feedback */}
                          <div className="bg-slate-900 text-white rounded-3xl p-6 font-mono text-xs border border-slate-800 shadow-xl self-stretch flex flex-col justify-between">
                            <div>
                              <div className="border-b border-slate-800 pb-3 mb-4 flex justify-between items-center text-slate-400">
                                <span className="tracking-wider uppercase text-[10px] font-bold">Respon API Backend</span>
                                <span className="text-[9px] bg-blue-950/60 text-sky-400 px-2.5 py-0.5 rounded-full border border-sky-800 font-bold uppercase">REAL-TIME</span>
                              </div>

                              {submitResult ? (
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                                    <span className="text-slate-400">Status HTTPS:</span>
                                    <span className="text-sky-400 font-bold">201 Created</span>
                                  </div>
                                  
                                  <div>
                                    <span className="text-slate-400 block mb-1">Rincian Perhitungan Poin:</span>
                                    <div className="bg-slate-950 p-3 rounded-xl text-[10px] space-y-1 text-slate-300 max-h-[140px] overflow-y-auto border border-slate-800">
                                      {submitResult.pointsBreakdown?.map((item: string, idx: number) => (
                                        <p key={idx} className="flex items-start gap-1">
                                          <span className="text-sky-500">✓</span>
                                          <span>{item}</span>
                                        </p>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="bg-slate-950 p-3 rounded-xl text-center border border-slate-850">
                                      <span className="text-[8px] text-slate-400 block uppercase mb-0.5">Skor Hari Ini</span>
                                      <strong className="text-xl text-amber-400 font-extrabold">{submitResult.pointsEarned} Pts</strong>
                                    </div>
                                    <div className="bg-slate-950 p-3 rounded-xl text-center border border-slate-850">
                                      <span className="text-[8px] text-slate-400 block uppercase mb-0.5">Total Streak</span>
                                      <strong className="text-xl text-sky-400 font-extrabold flex items-center justify-center gap-0.5">
                                        <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                                        {submitResult.streakDays} Hari
                                      </strong>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-[250px] flex flex-col items-center justify-center text-slate-500 text-center gap-3">
                                  <AlertCircle className="w-8 h-8 opacity-45 text-slate-400" />
                                  <p className="text-[11px] leading-relaxed max-w-xs px-2">Silakan isi data checklist mutaba'ah anak di sebelah kiri, kemudian klik tombol hijau untuk mengirim payload JSON riil ke server.</p>
                                </div>
                              )}
                            </div>

                            <div className="border-t border-slate-800 pt-3 mt-4 text-[9px] text-slate-500 flex justify-between items-center font-mono">
                              <span>POST: /api/mutabaah/submit</span>
                              <span>API v1.2</span>
                            </div>
                          </div>

                        </div>
                      );
                    }
                  })()}
                </div>
              )}

              {/* 6. WEEKLY REPORTS TAB & PRINT PREVIEW */}
              {opTab === "reports" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-8 shadow-sm">
                  
                  {/* Tab Title */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                        <FileText className="w-6 h-6 text-sky-600" />
                        Rekapitulasi Rapor Mutaba'ah & AI Evaluator
                      </h2>
                      <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                        Pilih jenis rekapitulasi, saring berdasarkan status verifikasi, dan cetak laporan resmi berformat A4 yang diperkaya dengan analisis kepengasuhan AI Gemini.
                      </p>
                    </div>
                    
                    {/* Active User Role Badge */}
                    <div className="bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wider flex items-center gap-1.5 border border-slate-200 shrink-0">
                      <span className="w-1.5 h-1.5 bg-sky-600 rounded-full animate-pulse"></span>
                      Mode Akses: {currentUser?.role === "admin" ? "🛡️ Full Admin" : currentUser?.role === "guru" ? "👨‍🏫 Wali Kelas (Musyrif)" : currentUser?.role === "ortu" ? "👨‍👩‍👦 Orang Tua" : "🎓 Siswa"}
                    </div>
                  </div>

                  {/* 1. FILTER RANGE & RECAP MODE (RECOVERY CONFIGURATIONS) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Setup Panel (Col 7) */}
                    <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-5 md:p-6 flex flex-col gap-5 text-xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-blue-900 block mb-1">🛠️ Konfigurasi Rentang Rekapitulasi</span>
                      
                      {/* Recap Type Buttons */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-1.5">Pilih Tipe Laporan:</label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { key: "daily", label: "🗓️ Harian" },
                            { key: "weekly", label: "📊 Mingguan" },
                            { key: "monthly", label: "📅 Bulanan" },
                            { key: "custom", label: "⚙️ Kustom" }
                          ].map(t => (
                            <button
                              key={t.key}
                              onClick={() => setRecapType(t.key as any)}
                              className={`py-2 px-1 text-center font-bold rounded-xl transition border text-[11px] cursor-pointer ${
                                recapType === t.key
                                  ? "bg-sky-800 text-white border-blue-900 shadow-md font-extrabold"
                                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Date selectors based on type */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recapType === "daily" && (
                          <div className="md:col-span-2">
                            <label className="block text-slate-700 font-bold mb-1">Pilih Tanggal Harian:</label>
                            <input
                              type="date"
                              value={selectedRecapDate}
                              onChange={(e) => setSelectedRecapDate(e.target.value)}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-bold"
                            />
                          </div>
                        )}

                        {recapType === "weekly" && (
                          <div className="md:col-span-2">
                            <label className="block text-slate-700 font-bold mb-1">Pilih Tanggal (Otomatis Dikonversi ke Range 1 Minggu):</label>
                            <input
                              type="date"
                              value={selectedRecapDate}
                              onChange={(e) => setSelectedRecapDate(e.target.value)}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-bold"
                            />
                            <p className="text-[10px] text-slate-500 mt-1 font-medium italic">
                              *Sistem akan mengambil rentang hari Senin s.d. Minggu yang mencakup tanggal di atas.
                            </p>
                          </div>
                        )}

                        {recapType === "monthly" && (
                          <div className="md:col-span-2">
                            <label className="block text-slate-700 font-bold mb-1">Pilih Bulan & Tahun:</label>
                            <input
                              type="month"
                              value={selectedRecapMonth}
                              onChange={(e) => setSelectedRecapMonth(e.target.value)}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-bold"
                            />
                          </div>
                        )}

                        {recapType === "custom" && (
                          <>
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Dari Tanggal:</label>
                              <input
                                type="date"
                                value={selectedRecapStartDate}
                                onChange={(e) => setSelectedRecapStartDate(e.target.value)}
                                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-700 font-bold mb-1">Sampai Tanggal:</label>
                              <input
                                type="date"
                                value={selectedRecapEndDate}
                                onChange={(e) => setSelectedRecapEndDate(e.target.value)}
                                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-bold"
                              />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Dropdown Siswa (Enforcing user-specific restrictions!) */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-1.5">Pilih Siswa:</label>
                        {currentUser?.role === "siswa" ? (
                          <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-blue-950 block">{activeReportStudent?.name}</span>
                              <span className="text-[10px] text-sky-700 font-mono">NISN: {activeReportStudent?.nisn}</span>
                            </div>
                            <span className="bg-sky-800 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-1 rounded-full">Siswa Aktif</span>
                          </div>
                        ) : currentUser?.role === "ortu" ? (
                          <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-blue-950 block">{activeReportStudent?.name}</span>
                              <span className="text-[10px] text-sky-700 font-mono">Ananda Tercinta (NISN: {activeReportStudent?.nisn})</span>
                            </div>
                            <span className="bg-sky-800 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-1 rounded-full">Akun Orang Tua</span>
                          </div>
                        ) : (
                          <div>
                            <select
                              value={reportStudentId}
                              onChange={(e) => {
                                setReportStudentId(e.target.value);
                                // Set initial comments
                                if (e.target.value === "STD-001") {
                                  setCatatanGuru("Siswa sangat sopan, aktif di masjid sekolah, dan selalu mengumpulkan tugas tepat waktu.");
                                  setCatatanOrangTua("Ahmad sangat berbakti di rumah, selalu merapikan kamar tanpa disuruh.");
                                } else if (e.target.value === "STD-002") {
                                  setCatatanGuru("Fathir sering mengantuk di kelas jam pertama. Perlu bimbingan shalat subuh.");
                                  setCatatanOrangTua("Mohon dibantu motivasinya di sekolah, di rumah agak sulit dibangunkan Subuh.");
                                } else {
                                  setCatatanGuru("Siti anak yang cerdas, hafalan Juz 30 sangat mutqin.");
                                  setCatatanOrangTua("Anak penurut, mohon dibimbing agar tidak tidur terlalu malam.");
                                }
                              }}
                              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-bold focus:ring-2 focus:ring-sky-500"
                            >
                              {allowedStudents.map(s => (
                                <option key={s.id} value={s.id}>
                                  {s.name} ({s.class})
                                </option>
                              ))}
                            </select>
                            {currentUser?.role === "guru" && (
                              <p className="text-[10px] text-slate-500 mt-1 italic">
                                *Hanya menampilkan siswa dalam kelas bimbingan / Musyrif Anda.
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Approval Status Filter */}
                      <div className="bg-white border border-slate-200 p-3 rounded-2xl flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-800 block">Saring Verifikasi Verifikator:</span>
                          <span className="text-[10px] text-slate-500">Tampilkan hanya data harian yang telah disetujui ganda</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={recapFilterVerifiedOnly}
                            onChange={(e) => setRecapFilterVerifiedOnly(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                        </label>
                      </div>

                      {/* Info Range */}
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-2 text-amber-950 font-medium">
                        <Calendar className="w-4.5 h-4.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-[11px] uppercase tracking-wider">Periode Rekap Terpilih:</p>
                          <strong className="text-xs">{resolvedStartDate} s.d. {resolvedEndDate}</strong>
                          <p className="text-[10px] mt-0.5 text-amber-800">
                            Terbaca sebanyak <strong className="text-blue-900 font-extrabold">{compiledStats.daysLogged} hari</strong> catatan checklist mutaba'ah siswa.
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* AI & Notes Panel (Col 5) */}
                    <div className="lg:col-span-5 flex flex-col gap-4 text-xs">
                      
                      {/* Catatan Khusus */}
                      <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col gap-3 shadow-sm">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">📝 Catatan Khusus</span>
                        
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">Catatan Wali Kelas / Guru:</label>
                          <textarea
                            rows={2}
                            value={catatanGuru}
                            disabled={currentUser?.role === "ortu" || currentUser?.role === "siswa"}
                            onChange={(e) => setCatatanGuru(e.target.value)}
                            placeholder="Catatan perilaku, kemajuan akademik & akhlak..."
                            className="w-full p-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">Catatan Orang Tua / Wali:</label>
                          <textarea
                            rows={2}
                            value={catatanOrangTua}
                            disabled={currentUser?.role === "guru" || currentUser?.role === "siswa"}
                            onChange={(e) => setCatatanOrangTua(e.target.value)}
                            placeholder="Catatan perilaku di rumah, kepatuhan, dll..."
                            className="w-full p-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none transition"
                          />
                        </div>
                      </div>

                      {/* AI Evaluation result */}
                      <div className="bg-blue-950 text-sky-100 rounded-3xl p-5 flex flex-col gap-3 shadow-md flex-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 block flex justify-between items-center">
                          <span className="flex items-center gap-1"><Brain className="w-4 h-4 text-sky-400" /> Hasil Evaluasi Karakter AI Gemini:</span>
                          {isSimulatedResponse && (
                            <span className="bg-sky-800 text-white text-[8px] font-bold px-1.5 py-0.5 rounded border border-sky-600 uppercase">SIMULASI</span>
                          )}
                        </span>

                        <div className="bg-blue-900/40 border border-blue-900 rounded-2xl p-3.5 flex-1 overflow-y-auto max-h-[160px]">
                          {generatingAI ? (
                            <div className="flex flex-col items-center justify-center gap-2 h-full py-4 text-center">
                              <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
                              <span className="font-semibold text-sky-300">Gemini-3.5-Flash sedang melakukan kompilasi & menyusun kalimat evaluasi kepengasuhan...</span>
                            </div>
                          ) : (
                            <p className="italic leading-relaxed text-[10.5px] font-sans font-medium text-sky-50">
                              "{aiEvaluation}"
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={handleAIEvaluation}
                            disabled={generatingAI || compiledStats.daysLogged === 0}
                            className={`flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-display font-extrabold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
                          >
                            <Sparkles className="w-4 h-4 text-slate-950" />
                            <span>Picu Penilaian AI Gemini</span>
                          </button>

                          <button
                            onClick={() => setShowPrintModal(true)}
                            className="bg-white hover:bg-slate-100 text-blue-950 font-bold p-2.5 rounded-xl flex items-center justify-center transition cursor-pointer"
                            title="Pratinjau Cetak"
                          >
                            <Printer className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 2. ADMIN & GURU OVERALL MONITORING TABLE (COMPREHENSIVE MONITORING VIEW) */}
                  {(currentUser?.role === "admin" || currentUser?.role === "guru") && (
                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 md:p-6 flex flex-col gap-4 text-xs">
                      
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-3">
                        <div>
                          <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
                            <ShieldCheck className="w-4.5 h-4.5 text-sky-600" />
                            Database Monitoring Rekap & Status Verifikasi ({currentUser?.role === "admin" ? "Siswa Menyeluruh" : "Siswa Se-Kelas"})
                          </h3>
                          <p className="text-[10px] text-slate-500">
                            Saring seluruh riwayat checklist harian murid untuk verifikasi ganda sebelum cetak rapor PDF.
                          </p>
                        </div>

                        {/* Search and filter controls */}
                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                          <input
                            type="text"
                            placeholder="Cari nama siswa..."
                            value={adminSearchName}
                            onChange={(e) => setAdminSearchName(e.target.value)}
                            className="p-2 border border-slate-300 rounded-xl bg-white text-[11px] font-bold w-full md:w-44 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          {currentUser?.role === "admin" && (
                            <select
                              value={adminSearchClass}
                              onChange={(e) => setAdminSearchClass(e.target.value)}
                              className="p-2 border border-slate-300 rounded-xl bg-white text-[11px] font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                              <option value="all">Semua Kelas</option>
                              {classes.map(cl => (
                                <option key={cl} value={cl}>{cl}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>

                      {/* Table listing */}
                      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm max-h-[250px] overflow-y-auto">
                        <table className="w-full text-left border-collapse text-[11px]">
                          <thead>
                            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wide text-[9px]">
                              <th className="p-3">Tanggal</th>
                              <th className="p-3">Nama Siswa</th>
                              <th className="p-3">Kelas</th>
                              <th className="p-3 text-center">Poin Terkumpul</th>
                              <th className="p-3 text-center">Verifikasi Ortu</th>
                              <th className="p-3 text-center">Verifikasi Guru</th>
                              <th className="p-3 text-center">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {overallRecapLogs.length === 0 ? (
                              <tr>
                                <td colSpan={7} className="p-8 text-center text-slate-400 italic font-medium">
                                  Tidak ditemukan catatan harian yang sesuai dengan kata kunci saringan.
                                </td>
                              </tr>
                            ) : (
                              overallRecapLogs.map((log) => {
                                const matchedStudent = students.find(s => s.id === log.studentId);
                                return (
                                  <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition font-medium text-slate-800">
                                    <td className="p-3 font-mono font-bold text-slate-600">{log.date}</td>
                                    <td className="p-3 font-bold text-slate-900">{log.studentName}</td>
                                    <td className="p-3 text-slate-600">{matchedStudent?.class || "9-A"}</td>
                                    <td className="p-3 text-center font-mono font-bold text-sky-800">+{log.pointsEarned} Pts</td>
                                    <td className="p-3 text-center">
                                      {log.parentApproved ? (
                                        <span className="bg-sky-100 text-sky-800 text-[9px] px-2 py-0.5 rounded-full font-bold">✓ Disetujui</span>
                                      ) : (
                                        <span className="bg-slate-100 text-slate-500 text-[9px] px-2 py-0.5 rounded-full font-semibold">Menunggu</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-center">
                                      {log.teacherApproved ? (
                                        <span className="bg-sky-100 text-sky-800 text-[9px] px-2 py-0.5 rounded-full font-bold">✓ Disetujui</span>
                                      ) : (
                                        <span className="bg-slate-100 text-slate-500 text-[9px] px-2 py-0.5 rounded-full font-semibold">Menunggu</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-center">
                                      <button
                                        onClick={() => {
                                          setReportStudentId(log.studentId);
                                          setRecapType("daily");
                                          setSelectedRecapDate(log.date);
                                          triggerToast(`Siswa ${log.studentName} berhasil dimuat untuk pratinjau tanggal ${log.date}!`);
                                        }}
                                        className="bg-sky-50 hover:bg-sky-100 text-blue-900 border border-sky-200 px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer inline-flex items-center gap-1"
                                      >
                                        <FileText className="w-3.5 h-3.5 text-sky-700" />
                                        <span>Buka Rekap</span>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  )}

                  {/* 3. THE REAL DYNAMIC A4 SHEET MOCKUP */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex justify-between items-center">
                      <span className="flex items-center gap-1">👁️ Lembar Pratinjau Rapor Resmi A4 (Dihasilkan Otomatis)</span>
                      <button 
                        onClick={() => setShowPrintModal(true)} 
                        className="text-[11px] text-sky-800 font-bold hover:underline flex items-center gap-1 cursor-pointer bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
                      >
                        <Printer className="w-3.5 h-3.5" /> Buka Tampilan Cetak Resmi
                      </button>
                    </h3>
                    
                    <div className="bg-slate-200/50 border border-slate-300 rounded-3xl p-4 md:p-6 shadow-inner flex justify-center">
                      
                      {/* Styled A4 Sheet Content */}
                      <div className="bg-white w-full max-w-2xl border border-slate-300 p-6 md:p-8 shadow-xl text-xs text-slate-950 flex flex-col gap-6 relative rounded-lg font-sans">
                        
                        {/* Watermark Logo */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                          <SmpAlAzhar9Logo className="w-80 h-80 text-blue-950" customSrc={customSmpLogo} />
                        </div>

                        {/* PDF Header */}
                        <div className="border-b-2 border-slate-900 pb-3.5 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1.5 shrink-0">
                              <SmpAlAzhar9Logo className="w-11 h-11" customSrc={customSmpLogo} />
                              <YayasanMuhajirienLogo className="w-11 h-11" customSrc={customYayasanLogo} />
                            </div>
                            <div>
                              <h4 className="text-xs md:text-sm font-bold uppercase tracking-wide text-blue-950 leading-none">{schoolProfile.yayasan}</h4>
                              <p className="text-[10px] font-bold text-slate-700 mt-1">{schoolProfile.name}</p>
                              <span className="text-[8px] text-slate-400 font-mono block mt-0.5 font-semibold">{schoolProfile.address} | Telp: {schoolProfile.phone} | NPSN: {schoolProfile.npsn}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="bg-blue-900 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg border border-blue-800 uppercase tracking-wider">
                              REKAP RAPOR MUTABA'AH ({recapType})
                            </span>
                            <p className="text-[9px] text-slate-500 mt-1.5 font-semibold">Periode: {resolvedStartDate} s.d. {resolvedEndDate}</p>
                          </div>
                        </div>

                        {/* Student Biodata */}
                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <div>
                            <p className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Nama Lengkap Murid:</p>
                            <strong className="text-xs text-blue-950">{activeReportStudent.name}</strong>
                            <p className="text-[8px] text-slate-500 mt-2 uppercase tracking-wider font-semibold">Wali Kelas / Guru:</p>
                            <span className="font-semibold text-slate-800">{activeTeacher.name}</span>
                          </div>
                          <div>
                            <p className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Kelas / Kelompok:</p>
                            <strong className="text-xs text-slate-800">{activeReportStudent.class}</strong>
                            <p className="text-[8px] text-slate-500 mt-2 uppercase tracking-wider font-semibold">NISN (No. Induk):</p>
                            <span className="font-mono text-slate-800">{activeReportStudent.nisn}</span>
                          </div>
                        </div>

                        {/* Check if no logs found */}
                        {compiledStats.daysLogged === 0 ? (
                          <div className="border border-red-200 bg-red-50 text-red-950 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-2">
                            <AlertCircle className="w-8 h-8 text-red-600 animate-pulse" />
                            <strong className="text-sm">Tidak Ada Catatan Mutaba'ah Ditemukan</strong>
                            <p className="text-[11px] text-red-800 leading-relaxed max-w-md">
                              Belum ada catatan checklist harian yang dimasukkan oleh siswa ({activeReportStudent.name}) pada rentang tanggal terpilih ({resolvedStartDate} s.d. {resolvedEndDate}). Hubungi siswa atau isikan lembar checklist terlebih dahulu.
                            </p>
                          </div>
                        ) : (
                          <>
                            {/* Metrics table */}
                            <div>
                              <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-2 text-[9px] flex items-center gap-1.5">
                                <span className="w-1.5 h-3 bg-sky-800 rounded-sm"></span>
                                I. Rekapitulasi Ibadah & Aktivitas Harian ({compiledStats.daysLogged} Hari)
                              </h5>
                              <table className="w-full border-collapse border border-slate-300 text-[10px]">
                                <thead>
                                  <tr className="bg-sky-800 text-white font-bold">
                                    <th className="border border-slate-300 p-2 text-left">Aspek Mutaba'ah</th>
                                    <th className="border border-slate-300 p-2 text-center">Target Standar</th>
                                    <th className="border border-slate-300 p-2 text-center">Realisasi Siswa</th>
                                    <th className="border border-slate-300 p-2 text-center">Poin Terkumpul</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-white">
                                    <td className="border border-slate-300 p-2 font-semibold">🔑 Shalat Wajib 5 Waktu</td>
                                    <td className="border border-slate-300 p-2 text-center">{compiledStats.daysLogged * 5} Waktu</td>
                                    <td className="border border-slate-300 p-2 text-center font-bold">
                                      {compiledStats.shalatWajibDone}/{compiledStats.daysLogged * 5} ({Math.round((compiledStats.shalatWajibDone / (compiledStats.daysLogged * 5)) * 100)}%)
                                    </td>
                                    <td className="border border-slate-300 p-2 text-center font-mono font-bold text-sky-800">
                                      {compiledStats.fardhuPointsTotal} Poin
                                    </td>
                                  </tr>
                                  <tr className="bg-slate-50/50">
                                    <td className="border border-slate-300 p-2 font-semibold">🌅 Shalat Dhuha, Tahajud & Rawatib</td>
                                    <td className="border border-slate-300 p-2 text-center">Aktif Harian</td>
                                    <td className="border border-slate-300 p-2 text-center font-bold">
                                      Dhuha: {compiledStats.dhuhaCount}x, Tahajud: {compiledStats.tahajudCount}x, Rawatib: {compiledStats.rawatibCount}x
                                    </td>
                                    <td className="border border-slate-300 p-2 text-center font-mono font-bold text-sky-800">
                                      {compiledStats.sunnahPointsTotal + compiledStats.rawatibPointsTotal} Poin
                                    </td>
                                  </tr>
                                  <tr className="bg-white">
                                    <td className="border border-slate-300 p-2 font-semibold">📖 Tilawah Al-Qur'an (Membaca Mandiri)</td>
                                    <td className="border border-slate-300 p-2 text-center">{compiledStats.daysLogged} Hari</td>
                                    <td className="border border-slate-300 p-2 text-center font-bold">
                                      {compiledStats.tilawahDays}/{compiledStats.daysLogged} Hari Membaca
                                    </td>
                                    <td className="border border-slate-300 p-2 text-center font-mono font-bold text-sky-800">
                                      {compiledStats.tilawahPointsTotal} Poin
                                    </td>
                                  </tr>
                                  <tr className="bg-slate-50/50">
                                    <td className="border border-slate-300 p-2 font-semibold">🛌 Pola Tidur Sehat (&lt; 22:00 &amp; Bangun Pagi)</td>
                                    <td className="border border-slate-300 p-2 text-center">{compiledStats.daysLogged} Hari</td>
                                    <td className="border border-slate-300 p-2 text-center font-bold">
                                      {compiledStats.sleepTimeCount}/{compiledStats.daysLogged} Hari Teratur
                                    </td>
                                    <td className="border border-slate-300 p-2 text-center font-mono font-bold text-sky-800">
                                      {compiledStats.tidurPointsTotal} Poin
                                    </td>
                                  </tr>
                                  <tr className="bg-white">
                                    <td className="border border-slate-300 p-2 font-semibold">🤝 Birrul Walidain (Bakti Orang Tua)</td>
                                    <td className="border border-slate-300 p-2 text-center">Aktif Harian</td>
                                    <td className="border border-slate-300 p-2 text-center font-bold">
                                      {compiledStats.birrulCount} Kegiatan Terlaporkan
                                    </td>
                                    <td className="border border-slate-300 p-2 text-center font-mono font-bold text-sky-800">
                                      {compiledStats.birrulPointsTotal} Poin
                                    </td>
                                  </tr>
                                  <tr className="bg-slate-50/50">
                                    <td className="border border-slate-300 p-2 font-semibold">💰 Infaq / Sedekah Harian</td>
                                    <td className="border border-slate-300 p-2 text-center font-mono">Sukarela</td>
                                    <td className="border border-slate-300 p-2 text-center font-bold">
                                      {compiledStats.infaqCount}/{compiledStats.daysLogged} Hari (Rp {compiledStats.infaqTotalAmount.toLocaleString("id-ID")})
                                    </td>
                                    <td className="border border-slate-300 p-2 text-center font-mono font-bold text-sky-800">
                                      {compiledStats.infaqPointsTotal} Poin
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            {/* Catatan Area */}
                            <div className="grid grid-cols-2 gap-3 text-[10px]">
                              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                                <strong className="text-slate-800 block border-b border-slate-200 pb-1 mb-1 uppercase tracking-wide text-[8px]">Catatan Wali Kelas:</strong>
                                <p className="text-slate-600 italic">"{catatanGuru || 'Belum ada catatan khusus dari guru.'}"</p>
                              </div>
                              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                                <strong className="text-slate-800 block border-b border-slate-200 pb-1 mb-1 uppercase tracking-wide text-[8px]">Catatan Orang Tua:</strong>
                                <p className="text-slate-600 italic">"{catatanOrangTua || 'Belum ada catatan khusus dari orang tua.'}"</p>
                              </div>
                            </div>

                            {/* AI Section */}
                            <div className="bg-sky-50/60 p-4 border border-sky-200 rounded-xl">
                              <div className="flex items-center gap-1.5 text-blue-950 font-bold mb-2 border-b border-sky-200 pb-1.5">
                                <Brain className="w-4 h-4 text-sky-800 shrink-0" />
                                <h5 className="uppercase tracking-wider text-[8px]">II. Evaluasi Karakter Islami (Analisis AI Gemini)</h5>
                              </div>
                              <p className="text-slate-700 leading-relaxed text-[10.5px] font-medium font-sans">
                                "{aiEvaluation}"
                              </p>
                            </div>
                          </>
                        )}

                        {/* Signature Grid */}
                        <div className="grid grid-cols-3 gap-4 text-center text-[8px] pt-4 border-t border-dashed border-slate-300">
                          <div>
                            <p className="text-slate-500 mb-8 font-medium">Orang Tua / Wali Siswa</p>
                            <p className="font-bold border-b border-slate-800 pb-0.5 mx-3">{activeParent.name}</p>
                            <span className="text-[8px] text-slate-400 font-semibold uppercase">Akun Ortu Terverifikasi</span>
                          </div>
                          <div>
                            <p className="text-slate-500 mb-8 font-medium">Wali Kelas / Guru</p>
                            <p className="font-bold border-b border-slate-800 pb-0.5 mx-3">{activeTeacher.name}</p>
                            <span className="text-[8px] text-slate-400 block font-mono">NIP. {activeTeacher.nip}</span>
                          </div>
                          <div>
                            <p className="text-slate-500 mb-8 font-medium">Mengetahui, Kepala Sekolah</p>
                            <p className="font-bold border-b border-slate-800 pb-0.5 mx-3">{schoolProfile.principal}</p>
                            <span className="text-[8px] text-slate-400 block font-mono">NIP. {schoolProfile.principalNip}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. SCHOOL LOGO SETTINGS TAB (Admin Only) */}
              {opTab === "logos" && currentUser?.role === "admin" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-8 shadow-sm animate-fade-in">
                  
                  {/* Tab Title */}
                  <div className="border-b border-slate-100 pb-5">
                    <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                      <Settings className="w-6 h-6 text-sky-600 animate-spin-slow" />
                      Identitas Resmi & Pengaturan Logo Sekolah
                    </h2>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-3xl">
                      Sesuaikan identitas resmi sekolah dan ganti logo default dengan logo kustom institusi Anda secara manual. Perubahan ini akan otomatis diperbarui secara dinamis di seluruh sistem, termasuk Header Portal, Dashboard Utama, Watermark Dokumen, serta cetakan resmi Rapor Mutaba'ah PDF siswa.
                    </p>
                  </div>

                  {/* FORM IDENTITAS SEKOLAH */}
                  <form onSubmit={handleSaveSchoolProfile} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 flex flex-col gap-5">
                    <div className="border-b border-slate-200 pb-3">
                      <h3 className="font-display font-bold text-blue-950 text-sm flex items-center gap-2">
                        <School className="w-4.5 h-4.5 text-sky-600" />
                        Formulir Profil & Identitas Sekolah
                      </h3>
                      <p className="text-slate-500 text-[10.5px] mt-0.5">
                        Ubah data resmi instansi secara manual untuk diletakkan pada kop laporan dan tanda tangan surat.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Nama Sekolah */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Resmi Sekolah</label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium text-slate-800"
                          placeholder="SMP Islam Al Azhar 9 Bekasi"
                        />
                      </div>

                      {/* Nama Yayasan */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Yayasan / Instansi Induk</label>
                        <input
                          type="text"
                          required
                          value={profileForm.yayasan}
                          onChange={(e) => setProfileForm({ ...profileForm, yayasan: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium text-slate-800"
                          placeholder="YAYASAN WAQAF AL MUHAJIRIEN / YPI AL AZHAR"
                        />
                      </div>

                      {/* Kepala Sekolah */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Kepala Sekolah</label>
                        <input
                          type="text"
                          required
                          value={profileForm.principal}
                          onChange={(e) => setProfileForm({ ...profileForm, principal: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium text-slate-800"
                          placeholder="H. Amril, S.Ag, M.Pd"
                        />
                      </div>

                      {/* NIP Kepala Sekolah */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">NIP Kepala Sekolah</label>
                        <input
                          type="text"
                          required
                          value={profileForm.principalNip}
                          onChange={(e) => setProfileForm({ ...profileForm, principalNip: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono text-slate-800"
                          placeholder="1971030519980310"
                        />
                      </div>

                      {/* No Telepon */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">No. Telepon Instansi</label>
                        <input
                          type="text"
                          required
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono text-slate-800"
                          placeholder="021-82410000"
                        />
                      </div>

                      {/* NPSN */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">NPSN Sekolah</label>
                        <input
                          type="text"
                          required
                          value={profileForm.npsn}
                          onChange={(e) => setProfileForm({ ...profileForm, npsn: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono text-slate-800"
                          placeholder="20220301"
                        />
                      </div>

                      {/* Alamat Lengkap */}
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Alamat Lengkap Resmi</label>
                        <textarea
                          required
                          rows={2}
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium text-slate-800 leading-relaxed resize-none"
                          placeholder="Jl. Kemang Pratama Raya, Bekasi Barat"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="bg-sky-800 hover:bg-blue-900 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Profil & Identitas Sekolah</span>
                      </button>
                    </div>
                  </form>

                  {/* Subtitle for Logos Upload */}
                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="font-display font-bold text-blue-950 text-sm mb-1.5 flex items-center gap-2">
                      <Upload className="w-4.5 h-4.5 text-sky-600" />
                      Logo Kustom Institusi (Format Gambar)
                    </h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Unggah file gambar logo SMP Al Azhar dan logo Yayasan Anda untuk menggantikan logo bawaan sistem.
                    </p>
                  </div>

                  {/* Two Columns Grid for Logos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* 1. SMP ISLAM AL AZHAR 9 BEKASI LOGO CARD */}
                    <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-6 flex flex-col gap-5 justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-4">
                          <span className="p-1.5 bg-blue-100 text-blue-900 rounded-lg text-[10px] font-bold uppercase">SMP Islam Al Azhar 9</span>
                        </div>
                        <h3 className="font-display font-bold text-slate-800 text-sm">Logo SMP Islam Al Azhar 9 Bekasi</h3>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Logo utama sekolah yang tampil di sebelah kiri pada header aplikasi dan rekapitulasi rapor murid.
                        </p>
                      </div>

                      {/* Preview Box */}
                      <div className="flex flex-col items-center justify-center py-6 bg-white border border-slate-200 rounded-2xl shadow-sm relative">
                        <div className="w-24 h-24 flex items-center justify-center bg-slate-50 rounded-full border border-slate-200 shadow overflow-hidden">
                          <SmpAlAzhar9Logo className="w-20 h-20" customSrc={customSmpLogo} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 mt-3 uppercase tracking-wider font-mono">
                          Pratinjau Logo Aktif
                        </span>
                        <div className="mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold border flex items-center gap-1">
                          {customSmpLogo ? (
                            <span className="text-emerald-700 bg-emerald-50 border-emerald-200 px-2 py-0.5 rounded-full">Kustom (Aktif)</span>
                          ) : (
                            <span className="text-slate-600 bg-slate-100 border-slate-200 px-2 py-0.5 rounded-full">Default (Bawaan)</span>
                          )}
                        </div>
                      </div>

                      {/* Drag & Drop Zone */}
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleLogoDrop(e, "smp")}
                        className="border-2 border-dashed border-slate-200 hover:border-sky-500 hover:bg-sky-50/20 rounded-2xl p-4 text-center cursor-pointer transition"
                        onClick={() => document.getElementById("file-smp-logo")?.click()}
                      >
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                        <p className="text-[11px] font-bold text-slate-700">Tarik & Lepas gambar di sini, atau <span className="text-sky-700 hover:underline">Klik untuk Memilih</span></p>
                        <p className="text-[9px] text-slate-400 mt-1 font-medium">Format: JPG, JPEG, PNG, WEBP (Maksimal 2MB)</p>
                        <input 
                          type="file" 
                          id="file-smp-logo" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleLogoUpload(e, "smp")} 
                        />
                      </div>

                      {/* Action buttons */}
                      {customSmpLogo && (
                        <button
                          onClick={() => handleResetLogo("smp")}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl border border-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          Reset Logo ke Default (Bawaan)
                        </button>
                      )}
                    </div>

                    {/* 2. YAYASAN WAQAF AL MUHAJIRIEN LOGO CARD */}
                    <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-6 flex flex-col gap-5 justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-4">
                          <span className="p-1.5 bg-sky-100 text-sky-900 rounded-lg text-[10px] font-bold uppercase">Yayasan Al Muhajirien</span>
                        </div>
                        <h3 className="font-display font-bold text-slate-800 text-sm">Logo Yayasan Waqaf Al Muhajirien</h3>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Logo yayasan pengelola yang tampil di sebelah kanan pada header aplikasi dan rekapitulasi rapor murid.
                        </p>
                      </div>

                      {/* Preview Box */}
                      <div className="flex flex-col items-center justify-center py-6 bg-white border border-slate-200 rounded-2xl shadow-sm relative">
                        <div className="w-24 h-24 flex items-center justify-center bg-slate-50 rounded-full border border-slate-200 shadow overflow-hidden">
                          <YayasanMuhajirienLogo className="w-20 h-20" customSrc={customYayasanLogo} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 mt-3 uppercase tracking-wider font-mono">
                          Pratinjau Logo Aktif
                        </span>
                        <div className="mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold border flex items-center gap-1">
                          {customYayasanLogo ? (
                            <span className="text-emerald-700 bg-emerald-50 border-emerald-200 px-2 py-0.5 rounded-full">Kustom (Aktif)</span>
                          ) : (
                            <span className="text-slate-600 bg-slate-100 border-slate-200 px-2 py-0.5 rounded-full">Default (Bawaan)</span>
                          )}
                        </div>
                      </div>

                      {/* Drag & Drop Zone */}
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleLogoDrop(e, "yayasan")}
                        className="border-2 border-dashed border-slate-200 hover:border-sky-500 hover:bg-sky-50/20 rounded-2xl p-4 text-center cursor-pointer transition"
                        onClick={() => document.getElementById("file-yayasan-logo")?.click()}
                      >
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                        <p className="text-[11px] font-bold text-slate-700">Tarik & Lepas gambar di sini, atau <span className="text-sky-700 hover:underline">Klik untuk Memilih</span></p>
                        <p className="text-[9px] text-slate-400 mt-1 font-medium">Format: JPG, JPEG, PNG, WEBP (Maksimal 2MB)</p>
                        <input 
                          type="file" 
                          id="file-yayasan-logo" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleLogoUpload(e, "yayasan")} 
                        />
                      </div>

                      {/* Action buttons */}
                      {customYayasanLogo && (
                        <button
                          onClick={() => handleResetLogo("yayasan")}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl border border-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          Reset Logo ke Default (Bawaan)
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              )}
            </>
          )}

          {/* =========================================================================
              B. ARCHITECTURE BLUEPRINT PANELS (Developer Reference)
              ========================================================================= */}
          {appMode === "blueprint" && (
            <>
              {/* BP 1: DATABASE SCHEMA TAB */}
              {bpTab === "schema" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                  <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                      <Database className="w-6 h-6 text-sky-600" />
                      Arsitektur & Skema Database (Blueprint)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                      Sistem ini dirancang untuk beroperasi secara optimal menggunakan database relasional (PostgreSQL) melalui Cloud SQL untuk ketahanan data transaksi, dikombinasikan dengan NoSQL (Cloud Firestore) untuk fleksibilitas schema checklist harian.
                    </p>
                  </div>

                  {/* Schema Visual diagram */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-3">Model Entity Relationship</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                      
                      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                        <strong className="text-sky-800 block border-b border-slate-100 pb-1.5 mb-2">users (Table)</strong>
                        <ul className="space-y-1 text-slate-700 text-[11px]">
                          <li>🔑 id (PK / Firebase UID)</li>
                          <li>📧 email (Unique)</li>
                          <li>👥 role (Enum Admin/Guru/Ortu/Siswa)</li>
                          <li>🏷️ nama_lengkap</li>
                          <li>📌 nomor_induk (NISN/NIP)</li>
                        </ul>
                      </div>

                      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                        <strong className="text-sky-800 block border-b border-slate-100 pb-1.5 mb-2">siswa_profile (Table)</strong>
                        <ul className="space-y-1 text-slate-700 text-[11px]">
                          <li>🔑 id (PK / Serial)</li>
                          <li>🔗 user_id (FK Users.id)</li>
                          <li>🏫 kelas (VARCHAR)</li>
                          <li>👨‍🏫 guru_id (FK Users.id)</li>
                          <li>👩‍👦 orang_tua_id (FK Users.id)</li>
                        </ul>
                      </div>

                      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                        <strong className="text-amber-700 block border-b border-slate-100 pb-1.5 mb-2">mutabaah_daily (Table)</strong>
                        <ul className="space-y-1 text-slate-700 text-[11px]">
                          <li>🔑 id (PK)</li>
                          <li>🔗 siswa_id (FK Profile)</li>
                          <li>📅 tanggal (DATE)</li>
                          <li>🕌 subuh_s_d_isya (Bool)</li>
                          <li>📖 tilawah_pages (INT)</li>
                        </ul>
                      </div>

                    </div>
                  </div>

                  {/* Schema script */}
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Script Skema Tabel PostgreSQL</span>
                      <button 
                        onClick={() => handleCopy(sampleSQLScript, "sql")}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1 rounded shadow-sm border border-slate-300 cursor-pointer"
                      >
                        {copiedText === "sql" ? "✓ Tersalin" : "Salin Script"}
                      </button>
                    </div>
                    <div className="bg-slate-950 text-sky-400 font-mono p-4 rounded-2xl max-h-[250px] overflow-y-auto border border-slate-800 shadow-inner">
                      <pre className="text-left whitespace-pre-wrap">{sampleSQLScript}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* BP 2: GAMIFICATION RULES TAB */}
              {bpTab === "gamification" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                  <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                      <Award className="w-6 h-6 text-sky-600" />
                      Sistem Kalkulasi Poin Otomatis
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                      Sistem menghitung perolehan poin secara otomatis berdasarkan aktivitas ibadah harian yang dilaporkan oleh siswa secara transparan, tanpa bonus atau tambahan lainnya.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
                    <div className="border border-slate-200 rounded-2xl p-5">
                      <h3 className="font-bold text-slate-800 text-sm mb-3">Matriks Perolehan Poin Resmi</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex justify-between border-b pb-1.5">
                          <span>🕌 <strong>Shalat Wajib:</strong></span>
                          <span className="font-mono font-bold text-sky-800">Berjama'ah (+7 Pts), Munfarid (+5 Pts), Haidh (+25 Pts)</span>
                        </li>
                        <li className="flex justify-between border-b pb-1.5">
                          <span>🌅 <strong>Shalat Sunnah:</strong></span>
                          <span className="font-mono font-bold text-sky-800">Tahajud (+15 Pts), Dhuha (+5 Pts), Rawatib (+3 Pts per Rawatib)</span>
                        </li>
                        <li className="flex justify-between border-b pb-1.5">
                          <span>📖 <strong>Tilawah Al-Qur'an:</strong></span>
                          <span className="font-mono font-bold text-sky-800">+10 Poin (Membaca)</span>
                        </li>
                        <li className="flex justify-between border-b pb-1.5">
                          <span>🎓 <strong>Tahfiz / Hafalan:</strong></span>
                          <span className="font-mono font-bold text-sky-800">+10 Poin (Muroja'ah / Ziyadah)</span>
                        </li>
                        <li className="flex justify-between border-b pb-1.5">
                          <span>🛌 <strong>Pola Tidur Sehat:</strong></span>
                          <span className="font-mono font-bold text-sky-800">Tidur &lt; 22:00 (+5 Pts), Bangun &lt; 05:00 (+5 Pts)</span>
                        </li>
                        <li className="flex justify-between border-b pb-1.5">
                          <span>🤝 <strong>Birrul Walidain:</strong></span>
                          <span className="font-mono font-bold text-sky-800">+2 Poin per kegiatan membantu orang tua</span>
                        </li>
                        <li className="flex justify-between border-b pb-1.5">
                          <span>💰 <strong>Infaq / Sedekah:</strong></span>
                          <span className="font-mono font-bold text-sky-800">+1 Poin kelipatan Rp 1.000</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-1">
                          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" /> Aturan & Kebijakan Poin
                        </h3>
                        <p className="text-slate-600">
                          Setiap isian diverifikasi oleh Orang Tua atau Wali Kelas untuk keaslian data. Poin terkumpul akan langsung masuk ke portofolio rapor digital siswa.
                        </p>
                        <p className="text-slate-600 mt-2">
                          <strong>Tanpa Poin Bonus:</strong> Sistem ini tidak menerapkan sistem streak bonus atau poin pengali lainnya. Poin murni berdasarkan amalan nyata yang diinput oleh siswa setiap hari.
                        </p>
                      </div>
                      <div className="bg-slate-50 border p-3 rounded-xl border-slate-200 text-slate-500 font-mono text-[10px] mt-4">
                        Poin Harian = Shalat + Tilawah + Tahfiz + Tidur + Birrul + Infaq
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BP 3: API ENDPOINTS TAB */}
              {bpTab === "api" && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                  <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-blue-950 flex items-center gap-2.5">
                      <Code2 className="w-6 h-6 text-sky-600" />
                      Endpoint API & Validasi Input (Backend Specs)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                      Developer dapat menggunakan dokumentasi endpoint API di bawah ini untuk mengintegrasikan mobile application atau client portal ke backend.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800 font-mono">POST /api/mutabaah/submit (Node.js + TS)</span>
                      <button 
                        onClick={() => handleCopy(sampleNodeJSAPI, "api")}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1 rounded shadow-sm border border-slate-300 cursor-pointer"
                      >
                        {copiedText === "api" ? "✓ Tersalin" : "Salin Endpoint"}
                      </button>
                    </div>
                    <div className="bg-slate-950 text-sky-400 font-mono p-4 rounded-2xl max-h-[300px] overflow-y-auto border border-slate-800 shadow-inner">
                      <pre className="text-left whitespace-pre-wrap">{sampleNodeJSAPI}</pre>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </>
  )}

      {/* PROOF OF INFAQ PREVIEW MODAL */}
      {selectedProofImage && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4"
          onClick={() => setSelectedProofImage(null)}
        >
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Download file
                const link = document.createElement("a");
                link.href = selectedProofImage;
                link.download = "bukti_transfer_infaq.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="text-white bg-slate-800/80 hover:bg-slate-700/80 p-2.5 rounded-full transition shadow-md flex items-center justify-center cursor-pointer"
              title="Unduh Bukti"
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSelectedProofImage(null)}
              className="text-white bg-slate-800/80 hover:bg-slate-700/80 p-2.5 rounded-full transition shadow-md flex items-center justify-center cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div 
            className="max-w-4xl max-h-[85vh] overflow-auto flex items-center justify-center rounded-2xl bg-white/5 p-2 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedProofImage} 
              alt="Pratinjau Bukti Transfer Infaq" 
              className="max-h-[80vh] max-w-full object-contain rounded-xl select-none"
            />
          </div>
          <div className="text-white text-xs mt-3 bg-slate-950/80 px-4 py-2 rounded-full font-medium tracking-wide">
            Bukti Transfer Infaq Harian Siswa
          </div>
        </div>
      )}

      {/* FULL-SCREEN PRINT MODAL (GORGEOUS DETAILED DIALOG) */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-300 relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto font-sans">
            
            {/* Modal close */}
            <div className="flex justify-between items-center border-b pb-3 shrink-0">
              <span className="font-display font-bold text-slate-900 text-sm">Dokumen Siap Cetak (A4 Layout)</span>
              <button 
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Print Area inside Modal */}
            <div id="print-sheet-wrapper" className="border rounded-2xl p-6 relative overflow-hidden bg-white shadow-inner">
              
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <SmpAlAzhar9Logo className="w-72 h-72 text-blue-950" customSrc={customSmpLogo} />
              </div>

              {/* Official Header */}
              <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1 shrink-0">
                    <SmpAlAzhar9Logo className="w-8 h-8" customSrc={customSmpLogo} />
                    <YayasanMuhajirienLogo className="w-8 h-8" customSrc={customYayasanLogo} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wide text-blue-950 leading-none">{schoolProfile.yayasan}</h4>
                    <p className="text-[8px] text-slate-700 mt-1 font-semibold">{schoolProfile.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-blue-950">REKAP RAPOR MUTABA'AH ({recapType})</span>
                  <p className="text-[8px] text-slate-400 font-bold">{resolvedStartDate} s.d {resolvedEndDate}</p>
                </div>
              </div>

              {/* Biodata */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[10px] mt-4">
                <div>
                  <p className="text-[8px] text-slate-400 font-semibold uppercase">Nama Murid:</p>
                  <strong className="text-slate-800 font-bold text-xs">{activeReportStudent.name}</strong>
                  <p className="text-[8px] text-slate-400 mt-1.5 font-semibold uppercase">Wali Kelas / Musyrif:</p>
                  <span className="text-slate-700 font-bold">{activeTeacher.name}</span>
                </div>
                <div>
                  <p className="text-[8px] text-slate-400 font-semibold uppercase">Kelas:</p>
                  <strong className="text-slate-800 text-xs">{activeReportStudent.class}</strong>
                  <p className="text-[8px] text-slate-400 mt-1.5 font-semibold uppercase">NISN:</p>
                  <span className="text-slate-700 font-mono font-bold">{activeReportStudent.nisn}</span>
                </div>
              </div>

              {/* Table */}
              <div className="mt-4">
                {compiledStats.daysLogged === 0 ? (
                  <div className="border border-red-200 bg-red-50 text-red-950 rounded-xl p-4 text-center font-bold">
                    Tidak ada catatan mutaba'ah ditemukan pada rentang tanggal ini.
                  </div>
                ) : (
                  <table className="w-full border-collapse border border-slate-300 text-[9.5px]">
                    <thead>
                      <tr className="bg-blue-900 text-blue-900 font-bold bg-slate-100">
                        <th className="border border-slate-300 p-1.5 text-left">Target Ibadah Mandiri ({compiledStats.daysLogged} Hari)</th>
                        <th className="border border-slate-300 p-1.5 text-center">Standar</th>
                        <th className="border border-slate-300 p-1.5 text-center">Realisasi</th>
                        <th className="border border-slate-300 p-1.5 text-center">Skor Poin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-1.5 font-semibold">🔑 Shalat Wajib 5 Waktu</td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono">{compiledStats.daysLogged * 5} Waktu</td>
                        <td className="border border-slate-300 p-1.5 text-center font-bold">
                          {compiledStats.shalatWajibDone}/{compiledStats.daysLogged * 5} ({Math.round((compiledStats.shalatWajibDone / (compiledStats.daysLogged * 5)) * 100)}%)
                        </td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-sky-800">
                          {compiledStats.fardhuPointsTotal} Pts
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-1.5 font-semibold">🌅 Shalat Dhuha, Tahajud & Rawatib</td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono">Aktif</td>
                        <td className="border border-slate-300 p-1.5 text-center font-bold">
                          Dhuha: {compiledStats.dhuhaCount}x, Tahajud: {compiledStats.tahajudCount}x, Rawatib: {compiledStats.rawatibCount}x
                        </td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-sky-800">
                          {compiledStats.sunnahPointsTotal + compiledStats.rawatibPointsTotal} Pts
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-1.5 font-semibold">📖 Tilawah Al-Qur'an</td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono">{compiledStats.daysLogged} Hari</td>
                        <td className="border border-slate-300 p-1.5 text-center font-bold">{compiledStats.tilawahDays}/{compiledStats.daysLogged} Hari</td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-sky-800">
                          {compiledStats.tilawahPointsTotal} Pts
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-1.5 font-semibold">🛌 Pola Tidur Sehat (&lt; 22:00 &amp; Bangun Pagi)</td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono">{compiledStats.daysLogged} Hari</td>
                        <td className="border border-slate-300 p-1.5 text-center font-bold">{compiledStats.sleepTimeCount}/{compiledStats.daysLogged} Hari</td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-sky-800">
                          {compiledStats.tidurPointsTotal} Pts
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-1.5 font-semibold">🤝 Bakti Orang Tua (Birrul Walidain)</td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono">Aktif</td>
                        <td className="border border-slate-300 p-1.5 text-center font-bold">{compiledStats.birrulCount} Kegiatan</td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-sky-800">
                          {compiledStats.birrulPointsTotal} Pts
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-1.5 font-semibold">💰 Infaq / Sedekah Harian</td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono">Sukarela</td>
                        <td className="border border-slate-300 p-1.5 text-center font-bold">
                          {compiledStats.infaqCount}/{compiledStats.daysLogged} Hari (Rp {compiledStats.infaqTotalAmount.toLocaleString("id-ID")})
                        </td>
                        <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-sky-800">
                          {compiledStats.infaqPointsTotal} Pts
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>

              {/* AI Evaluator Output */}
              <div className="bg-sky-50/70 p-3.5 border border-sky-200 rounded-xl mt-4 text-[10px]">
                <strong className="text-blue-950 font-bold block mb-1">Evaluasi Bimbingan & Karakter Islami (AI Wali Kelas):</strong>
                <p className="text-slate-700 italic font-medium leading-relaxed">"{aiEvaluation}"</p>
              </div>

              {/* Signature */}
              <div className="grid grid-cols-3 gap-3 text-center text-[7.5px] pt-4 border-t border-dashed border-slate-300 mt-4">
                <div>
                  <p className="text-slate-400 mb-8 font-medium">Orang Tua / Wali Siswa</p>
                  <p className="font-bold border-b border-slate-800 pb-0.5 mx-2">{activeParent.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-8 font-medium">Wali Kelas / Guru</p>
                  <p className="font-bold border-b border-slate-800 pb-0.5 mx-2">{activeTeacher.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-8 font-medium">Kepala Sekolah</p>
                  <p className="font-bold border-b border-slate-800 pb-0.5 mx-2">{schoolProfile.principal}</p>
                </div>
              </div>

            </div>

            {/* Print Action Triggers */}
            <div className="flex gap-2.5 justify-end pt-3 border-t shrink-0">
              <button 
                onClick={() => setShowPrintModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-5 rounded-xl border border-slate-300 text-xs transition cursor-pointer"
              >
                Kembali
              </button>
              <button 
                onClick={printReport}
                className="bg-sky-800 hover:bg-blue-900 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 transition shadow shadow-blue-900 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Rapor Resmi (Print PDF)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* EXCEL / SPREADSHEET BATCH IMPORT MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-300 relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto font-sans">
            
            <div className="flex justify-between items-center border-b pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-sky-800" />
                <span className="font-display font-bold text-slate-900 text-xs md:text-sm">
                  Batch Import Data {importType === "siswa" ? "Siswa" : importType === "guru" ? "Guru Wali Kelas" : "Orang Tua/Wali"} dari Excel
                </span>
              </div>
              <button 
                onClick={() => {
                  setShowImportModal(false);
                  setImportText("");
                  setImportParsedData([]);
                  setImportFeedback(null);
                }}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900">
                <h4 className="font-bold flex items-center gap-1.5 mb-1 text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Petunjuk Penggunaan:
                </h4>
                <p>
                  1. Buat atau buka spreadsheet Anda (Excel / Google Sheets).<br />
                  2. Susun kolom sesuai urutan di bawah ini, lalu pilih & salin (Copy) baris data Anda.<br />
                  3. Tempel (Paste) langsung ke dalam kotak teks di bawah ini. Pemisah baris atau kolom (tab/koma/titik-koma) akan dipetakan secara otomatis.
                </p>
              </div>

              {/* Guide per Type */}
              {importType === "siswa" && (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                  <span className="font-bold text-slate-800 block mb-1">📋 Struktur Kolom Siswa:</span>
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono text-[10px] block select-all">
                    NIS, NISN, Nama Lengkap, Kelas, L/P, Musyrif 1, Musyrif 2
                  </code>
                  <div className="mt-2.5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Contoh Baris (Copy-paste):</span>
                    <pre className="bg-slate-950 text-sky-400 p-2.5 rounded-lg font-mono text-[10px] whitespace-pre-wrap select-all">
{`222309001,212209012,Muhammad Zaki,9-A (Utsman bin Affan),L,Ustadz H. Anwar,Ustadz Rahmat
222309002,212209015,Alifa Az-Zahra,9-B (Aisyah binti Abi Bakar),P,Ustadzah Maisarah,Ustadz Fauzi`}
                    </pre>
                  </div>
                </div>
              )}

              {importType === "guru" && (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                  <span className="font-bold text-slate-800 block mb-1">📋 Struktur Kolom Guru:</span>
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono text-[10px] block select-all">
                    NIP, Nama Lengkap, Kelas Bimbingan, Password Login
                  </code>
                  <div className="mt-2.5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Contoh Baris (Copy-paste):</span>
                    <pre className="bg-slate-950 text-sky-400 p-2.5 rounded-lg font-mono text-[10px] whitespace-pre-wrap select-all">
{`197103051998031001,Ustadz H. Anwar, S.Pd.I,9-A,ustadz123
198104122006042002,Ustadzah Maisarah, S.Ag,9-B,maisarah321`}
                    </pre>
                  </div>
                </div>
              )}

              {importType === "ortu" && (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                  <span className="font-bold text-slate-800 block mb-1">📋 Struktur Kolom Wali Murid:</span>
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono text-[10px] block select-all">
                    NISN, NIS, Nama Lengkap siswa, Kelas, L/P, Nama Musyrif 1, Musyrif 2
                  </code>
                  <div className="mt-2.5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Contoh Baris (Copy-paste):</span>
                    <pre className="bg-slate-950 text-sky-400 p-2.5 rounded-lg font-mono text-[10px] whitespace-pre-wrap select-all">
{`212209012,222309001,Muhammad Zaki,9-A (Utsman bin Affan),L,Ustadz H. Anwar,Ustadz Rahmat
212209015,222309002,Alifa Az-Zahra,9-B (Aisyah binti Abi Bakar),P,Ustadzah Maisarah,Ustadz Fauzi`}
                    </pre>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Kotak Tempel Data Spreadsheet:</label>
                <textarea
                  rows={6}
                  value={importText}
                  onChange={(e) => handleParseImport(e.target.value, importType)}
                  placeholder="Tempel baris data dari Excel / Google Sheets di sini..."
                  className="w-full p-3.5 border border-slate-300 rounded-2xl bg-white font-mono text-[11px] focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400"
                />
              </div>

              {importFeedback && (
                <div className="bg-sky-50 text-blue-900 border border-sky-200 p-3 rounded-xl font-medium">
                  {importFeedback}
                </div>
              )}

              {importParsedData.length > 0 && (
                <div>
                  <span className="font-bold text-slate-700 block mb-1.5">Preview Data yang Siap Diimpor ({importParsedData.length} baris):</span>
                  <div className="border rounded-xl overflow-x-auto max-h-[160px]">
                    <table className="w-full text-left text-[10px] border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                          {importType === "siswa" && (
                            <>
                              <th className="p-2">NIS</th>
                              <th className="p-2">NISN</th>
                              <th className="p-2">Nama</th>
                              <th className="p-2">Kelas</th>
                              <th className="p-2">L/P</th>
                              <th className="p-2">Musyrif 1</th>
                              <th className="p-2">Musyrif 2</th>
                            </>
                          )}
                          {importType === "guru" && (
                            <>
                              <th className="p-2">NIP</th>
                              <th className="p-2">Nama Lengkap</th>
                              <th className="p-2">Kelas Bimbingan</th>
                            </>
                          )}
                          {importType === "ortu" && (
                            <>
                              <th className="p-2">NISN</th>
                              <th className="p-2">NIS</th>
                              <th className="p-2">Nama Siswa</th>
                              <th className="p-2">Kelas</th>
                              <th className="p-2">L/P</th>
                              <th className="p-2">Musyrif 1</th>
                              <th className="p-2">Musyrif 2</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {importParsedData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            {importType === "siswa" && (
                              <>
                                <td className="p-2 font-mono">{row.nis}</td>
                                <td className="p-2 font-mono">{row.nisn}</td>
                                <td className="p-2 font-bold">{row.name}</td>
                                <td className="p-2 font-medium">{row.class}</td>
                                <td className="p-2 font-semibold text-center">{row.gender}</td>
                                <td className="p-2">{row.musyrif1}</td>
                                <td className="p-2">{row.musyrif2}</td>
                              </>
                            )}
                            {importType === "guru" && (
                              <>
                                <td className="p-2 font-mono">{row.nip}</td>
                                <td className="p-2 font-bold">{row.name}</td>
                                <td className="p-2">{row.classAssigned}</td>
                              </>
                            )}
                            {importType === "ortu" && (
                              <>
                                <td className="p-2 font-mono">{row.nisn}</td>
                                <td className="p-2 font-mono">{row.nis}</td>
                                <td className="p-2 font-bold">{row.studentName}</td>
                                <td className="p-2 font-medium">{row.class}</td>
                                <td className="p-2 font-semibold text-center">{row.gender}</td>
                                <td className="p-2">{row.musyrif1}</td>
                                <td className="p-2">{row.musyrif2}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2.5 justify-end pt-3 border-t shrink-0">
              <button 
                onClick={() => {
                  setShowImportModal(false);
                  setImportText("");
                  setImportParsedData([]);
                  setImportFeedback(null);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl border border-slate-300 text-xs transition cursor-pointer"
              >
                Batal
              </button>
              <button 
                onClick={handleExecuteImport}
                disabled={importParsedData.length === 0}
                className={`font-bold py-2 px-5 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer ${
                  importParsedData.length > 0 
                    ? "bg-sky-800 hover:bg-blue-900 text-white shadow shadow-blue-900" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Simpan ke Database ({importParsedData.length} Baris)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL EDIT SISWA */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto font-sans text-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-300 relative flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 shrink-0">
              <span className="font-display font-bold text-slate-900 text-sm">
                Edit Data Siswa: {editingStudent.name}
              </span>
              <button 
                onClick={() => setEditingStudent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateStudent(editingStudent);
            }} className="space-y-4 text-left">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Siswa:</label>
                <input 
                  type="text"
                  required
                  value={editingStudent.name || ""}
                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">NIS:</label>
                  <input 
                  type="text"
                    value={editingStudent.nis || ""}
                    onChange={(e) => setEditingStudent({...editingStudent, nis: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">NISN:</label>
                  <input 
                    type="text"
                    required
                    maxLength={10}
                    value={editingStudent.nisn || ""}
                    onChange={(e) => setEditingStudent({...editingStudent, nisn: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Jenis Kelamin (L/P):</label>
                  <select
                    value={editingStudent.gender || "L"}
                    onChange={(e) => setEditingStudent({...editingStudent, gender: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="L">L (Laki-laki)</option>
                    <option value="P">P (Perempuan)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Kelas Bimbingan:</label>
                  <select
                    value={editingStudent.class || ""}
                    disabled={currentUser?.role === "guru"}
                    onChange={(e) => setEditingStudent({...editingStudent, class: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white disabled:bg-slate-100 disabled:text-slate-650"
                  >
                    <option value="8A">Kelas 8A</option>
                    <option value="8B">Kelas 8B</option>
                    <option value="8C">Kelas 8C</option>
                    <option value="9A">Kelas 9A</option>
                    <option value="9B">Kelas 9B</option>
                    <option value="9C">Kelas 9C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Musyrif 1:</label>
                  <input 
                    type="text"
                    value={editingStudent.musyrif1 || ""}
                    onChange={(e) => setEditingStudent({...editingStudent, musyrif1: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Musyrif 2:</label>
                  <input 
                    type="text"
                    value={editingStudent.musyrif2 || ""}
                    onChange={(e) => setEditingStudent({...editingStudent, musyrif2: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Skor Poin:</label>
                  <input 
                    type="number"
                    value={editingStudent.points ?? 0}
                    onChange={(e) => setEditingStudent({...editingStudent, points: parseInt(e.target.value) || 0})}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Streak Hari:</label>
                  <input 
                    type="number"
                    value={editingStudent.streak ?? 0}
                    onChange={(e) => setEditingStudent({...editingStudent, streak: parseInt(e.target.value) || 0})}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 justify-end pt-3 border-t">
                <button 
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl border border-slate-300 cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="bg-sky-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl shadow cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT GURU */}
      {editingTeacher && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans text-xs">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-300 relative flex flex-col gap-4 text-left">
            <div className="flex justify-between items-center border-b pb-3 shrink-0">
              <span className="font-display font-bold text-slate-900 text-sm">
                Edit Data Guru: {editingTeacher.name}
              </span>
              <button 
                onClick={() => setEditingTeacher(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateTeacher(editingTeacher);
            }} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Guru (Gelar Akademis):</label>
                <input 
                  type="text"
                  required
                  value={editingTeacher.name || ""}
                  onChange={(e) => setEditingTeacher({...editingTeacher, name: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">NIP (Nomor Induk Pegawai):</label>
                <input 
                  type="text"
                  required
                  value={editingTeacher.nip || ""}
                  onChange={(e) => setEditingTeacher({...editingTeacher, nip: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Kelas yang Diampu:</label>
                <select
                  value={editingTeacher.classAssigned || ""}
                  onChange={(e) => setEditingTeacher({...editingTeacher, classAssigned: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                >
                  <option value="7A">Kelas 7A</option>
                  <option value="7B">Kelas 7B</option>
                  <option value="7C">Kelas 7C</option>
                  <option value="8A">Kelas 8A</option>
                  <option value="8B">Kelas 8B</option>
                  <option value="8C">Kelas 8C</option>
                  <option value="9A">Kelas 9A</option>
                  <option value="9B">Kelas 9B</option>
                  <option value="9C">Kelas 9C</option>
                  <option value="UMUM">Kelas UMUM</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Password Login:</label>
                <input 
                  type="text"
                  value={editingTeacher.password || ""}
                  placeholder="Jika kosong, default adalah NIP"
                  onChange={(e) => setEditingTeacher({...editingTeacher, password: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-mono"
                />
              </div>

              <div className="flex gap-2.5 justify-end pt-3 border-t">
                <button 
                  type="button"
                  onClick={() => setEditingTeacher(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl border border-slate-300 cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="bg-sky-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl shadow cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT ORANG TUA */}
      {editingParent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans text-xs">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-300 relative flex flex-col gap-4 text-left">
            <div className="flex justify-between items-center border-b pb-3 shrink-0">
              <span className="font-display font-bold text-slate-900 text-sm">
                Edit Data Orang Tua: {editingParent.name}
              </span>
              <button 
                onClick={() => setEditingParent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateParent(editingParent);
            }} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Orang Tua:</label>
                <input 
                  type="text"
                  required
                  value={editingParent.name || ""}
                  onChange={(e) => setEditingParent({...editingParent, name: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">No. HP / WhatsApp:</label>
                <input 
                  type="text"
                  required
                  value={editingParent.phone || ""}
                  onChange={(e) => setEditingParent({...editingParent, phone: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Hubungkan Anak (Siswa):</label>
                <select
                  value={editingParent.studentId || ""}
                  onChange={(e) => setEditingParent({...editingParent, studentId: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                >
                  {students.filter(s => {
                    if (currentUser?.role === "guru") {
                      const teacher = teachers.find(t => t.id === currentUser.id);
                      if (!teacher) return true;
                      return s.teacherId === currentUser.id || s.class.includes(teacher.classAssigned);
                    }
                    return true;
                  }).map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.class})</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2.5 justify-end pt-3 border-t">
                <button 
                  type="button"
                  onClick={() => setEditingParent(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl border border-slate-300 cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="bg-sky-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl shadow cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-blue-950 text-sky-200/60 border-t border-blue-900 py-6 mt-12 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 font-medium">
          <p>© 2026 {schoolProfile.name}. Dibuat dengan cinta untuk mencetak generasi Rabbani.</p>
          <div className="flex gap-4">
            <span className="hover:text-amber-400 transition cursor-pointer">Panduan Guru</span>
            <span>•</span>
            <span className="hover:text-amber-400 transition cursor-pointer">Dokumentasi API</span>
            <span>•</span>
            <span className="hover:text-amber-400 transition cursor-pointer">Kebijakan Akun</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ----------------------------------------------------
// STATIC COMPACT BLUEPRINT CODE SNIPPETS
// ----------------------------------------------------
const sampleSQLScript = `-- SKEMA TABEL POSTGRESQL (CLOUD SQL)
CREATE TABLE users (
    id VARCHAR(128) PRIMARY KEY, -- Firebase Authentication UID
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL, -- admin, murid, guru, orang_tua
    nama_lengkap VARCHAR(150) NOT NULL,
    nomor_induk VARCHAR(30) UNIQUE, -- NISN/NIP
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE siswa_profile (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(128) REFERENCES users(id) ON DELETE CASCADE,
    kelas VARCHAR(10) NOT NULL,
    guru_id VARCHAR(128) REFERENCES users(id),
    orang_tua_id VARCHAR(128) REFERENCES users(id)
);

CREATE TABLE mutabaah_daily (
    id BIGSERIAL PRIMARY KEY,
    siswa_id INTEGER REFERENCES siswa_profile(id) ON DELETE CASCADE,
    tanggal DATE NOT NULL,
    subuh BOOLEAN DEFAULT FALSE,
    zuhur BOOLEAN DEFAULT FALSE,
    ashar BOOLEAN DEFAULT FALSE,
    maghrib BOOLEAN DEFAULT FALSE,
    isya BOOLEAN DEFAULT FALSE,
    dhuha BOOLEAN DEFAULT FALSE,
    tahajud BOOLEAN DEFAULT FALSE,
    rawatib_count INT DEFAULT 0,
    tilawah_pages INT DEFAULT 0,
    poin_diperoleh INT DEFAULT 0,
    CONSTRAINT siswa_tanggal_unique UNIQUE (siswa_id, tanggal)
);`;

const sampleNodeJSAPI = `/**
 * ENDPOINT SUBMIT MUTABA'AH HARIAN (Node.js + Express)
 */
import { Router } from "express";
const router = Router();

router.post("/api/mutabaah/submit", async (req, res) => {
  try {
    const { studentId, date, shalatWajib, shalatSunnah, tilawah } = req.body;

    // 1. Validasi ganda (Idempotency)
    const existing = await db("mutabaah_daily").where({ studentId, date }).first();
    if (existing) return res.status(409).json({ error: "Siswa sudah mengisi hari ini" });

    // 2. Hitung Poin
    let points = 0;
    if (shalatWajib.subuh) points += 10;
    if (shalatWajib.zuhur) points += 10;
    // ... shalat wajib lain (Max 50)
    
    if (shalatSunnah.dhuha) points += 15;
    if (shalatSunnah.tahajud) points += 20;
    
    points += Math.min(tilawah.pages * 10, 40);

    // 3. Simpan ke database relasional
    await db("mutabaah_daily").insert({
      siswa_id: studentId,
      tanggal: date,
      poin_diperoleh: points
    });

    res.status(201).json({ success: true, pointsEarned: points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`;
