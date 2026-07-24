var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"));
var import_path = __toESM(require("path"));
var import_dotenv = __toESM(require("dotenv"));
var import_genai = require("@google/genai");
var import_fs = __toESM(require("fs"));

// src/initialData.ts
var RAW_TEACHERS = [
  { nip: "107152266", name: "Ika Agustina, S.Pd.", classAssigned: "7A", password: "2627078" },
  { nip: "112182928", name: "Ira Rahmawati Harnum, S.Pd.", classAssigned: "7A", password: "2627091" },
  { nip: "107000922", name: "Fenny Firstiyanti, S.E.", classAssigned: "7B", password: "2627032" },
  { nip: "109081654", name: "Siti Nurhayati, S.Pd.", classAssigned: "7B", password: "2627051" },
  { nip: "109213367", name: "Andri Kosiret, S.Pd.", classAssigned: "7C", password: "2627055" },
  { nip: "0120020385417", name: "Mahmud Ali Yafi, S.S., M.Pd.I.", classAssigned: "7C", password: "2627109" },
  { nip: "102071565", name: "Eli Alfiah, S.Pd.", classAssigned: "8A", password: "2627042" },
  { nip: "3175074906990012", name: "Zahra, S.Psi", classAssigned: "8A", password: "2627100" },
  { nip: "110162537", name: "Nur Pratiwi, S.Pd.", classAssigned: "8B", password: "2627038" },
  { nip: "107152260", name: "Salman Ismail, S.Pd.", classAssigned: "8B", password: "2627073" },
  { nip: "108182798", name: "Fachrul Anwar, S.Pd.I.", classAssigned: "8C", password: "2627087" },
  { nip: "3201020303010012", name: "Zahran Tsauban Taqiy, S.Ag", classAssigned: "8C", password: "2627114" },
  { nip: "108940406", name: "Cucun Nurhasanah, S.Pd.", classAssigned: "9A", password: "2627024" },
  { nip: "101192930", name: "Raditya Pratama Nugraha, S.Pd.", classAssigned: "9A", password: "2627096" },
  { nip: "104950453", name: "Dedeh Rohilah, M.Pd.", classAssigned: "9B", password: "2627029" },
  { nip: "3604106006030004", name: "Lathifah Khoirunnisa, S.Pd", classAssigned: "9B", password: "2627105" },
  { nip: "108142205", name: "Lubsidin, S.Pd.I.", classAssigned: "9C", password: "2627069" },
  { nip: "107172621", name: "Muhammad Nazri, S.Q.", classAssigned: "9C", password: "2627082" },
  { nip: "105082212", name: "Dody Zuly Alamsyah, S.Pd.", classAssigned: "UMUM", password: "2627046" },
  { nip: "108091767", name: "Mirna Windarasti, S.Si.", classAssigned: "UMUM", password: "2627060" },
  { nip: "107132052", name: "Binaga Linggajaya, S.Pd.", classAssigned: "UMUM", password: "2627064" }
];
var RAW_STUDENTS = [
  { nis: "4309-2526001", nisn: "0136605841", name: "Abidzar Raskha Putra Ramadhan", class: "8A", gender: "L", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526002", nisn: "3128832222", name: "Adhitama Faezya Defandryan", class: "8A", gender: "L", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526004", nisn: "0134193813", name: "Aleena Danish Az-Zahra", class: "8A", gender: "P", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526008", nisn: "0137851337", name: "Andre Ahmad Suryoprayogi", class: "8A", gender: "L", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526013", nisn: "0134920138", name: "Aurel Quenna Calista", class: "8A", gender: "P", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526015", nisn: "0124203085", name: "Dzaki Milano Annafi Chandra", class: "8A", gender: "L", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526022", nisn: "3124400401", name: "Kenji Athazio Priyadi", class: "8A", gender: "L", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526023", nisn: "0131778549", name: "Kenzo Alkhalifi Aji", class: "8A", gender: "L", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526024", nisn: "0139969315", name: "Khairunnisa Salsabila Andrew Azman", class: "8A", gender: "P", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526027", nisn: "0135008799", name: "Latifa Neelam Khatira Putri", class: "8A", gender: "P", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526054", nisn: "3139112630", name: "Mahira Hasna Kamila", class: "8A", gender: "P", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526031", nisn: "0121654581", name: "Muhammad Fazil Firlana", class: "8A", gender: "L", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526033", nisn: "3133930475", name: "Muhammad Khavi", class: "8A", gender: "L", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526039", nisn: "3135260448", name: "Nafia Nazura", class: "8A", gender: "P", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526042", nisn: "0134221063", name: "Naura Syafia", class: "8A", gender: "P", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526047", nisn: "0128577348", name: "Reyvano Yeco Fahlevi", class: "8A", gender: "L", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526048", nisn: "0139281751", name: "Safiya Sasmaya Ramadhani", class: "8A", gender: "P", musyrif1: "Ustadzah Eli Alfiah", musyrif2: "Ustadzah Zahra" },
  { nis: "4309-2526005", nisn: "0131947440", name: "Almira Athaya Azkadina", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526007", nisn: "3132671180", name: "Andi Arumintiar Adikawira", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526009", nisn: "0131619335", name: "Andres Ibrahim Al Kahfi", class: "8B", gender: "L", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526010", nisn: "0135011106", name: "Angkasa Aulia Nasir", class: "8B", gender: "L", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526011", nisn: "3139955046", name: "Aqila Laka Putra", class: "8B", gender: "L", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526012", nisn: "3133370706", name: "Aqilah Khairunnisa Arifandi", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526052", nisn: "3128405603", name: "Aqilah Ramadhani Agustin", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526014", nisn: "0138827869", name: "Aurellia Felisha Rahim", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526017", nisn: "3137129940", name: "Faiza Elmira Widana", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526020", nisn: "0136041959", name: "Fayza Adelia Faran", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526028", nisn: "0126212934", name: "Maulana Rayyan", class: "8B", gender: "L", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526029", nisn: "3131685226", name: "Maurra Resqila Davina", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526036", nisn: "0136361476", name: "Muhammad Zhafran Maqiel Karizza", class: "8B", gender: "L", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526037", nisn: "0135735374", name: "Nabila Ghayda Zahra", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526038", nisn: "3129109875", name: "Nadhiella Callista Syasetyo", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526044", nisn: "0135147828", name: "Qiara Shulha Gevania", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526049", nisn: "0138875414", name: "Shafa Hafidza Ramadhani", class: "8B", gender: "P", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526053", nisn: "3129292139", name: "Zharif Haqqi Aurelio Ronzon Diaz", class: "8B", gender: "L", musyrif1: "Ustadz Salman Ismail", musyrif2: "Ustadzah Nur Pratiwi" },
  { nis: "4309-2526003", nisn: "0138322499", name: "Afwa Nur Afwandi", class: "8C", gender: "P", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526006", nisn: "0135036592", name: "Alya Rakhella Nurhadi", class: "8C", gender: "P", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526016", nisn: "0126390693", name: "Fabrizio Al Kahfi", class: "8C", gender: "L", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526018", nisn: "0133051622", name: "Farrannisa Azzahra", class: "8C", gender: "P", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526019", nisn: "0131280370", name: "Fayyadh Naqoura Attalah", class: "8C", gender: "L", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526021", nisn: "0137897647", name: "Huwaidah Fakhirah", class: "8C", gender: "P", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526025", nisn: "3137141312", name: "Kiana Adiba Yasmin", class: "8C", gender: "P", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526026", nisn: "0125032356", name: "Kim Areta Felisia", class: "8C", gender: "P", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526034", nisn: "4309-2526035", name: "Mohammad Khenzo Al-Ghaza Bachtiar", class: "8C", gender: "L", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526030", nisn: "0139305302", name: "Muhammad Barra Amirul Haq", class: "8C", gender: "L", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526032", nisn: "0128331680", name: "Muhammad Juna Al Barra", class: "8C", gender: "L", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526035", nisn: "3121021699", name: "Muhammad Tsaqif Hazimi Rayindratama", class: "8C", gender: "L", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2425040", nisn: "3139324932", name: "Naldo Ibrahim Mustafa", class: "8C", gender: "L", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2425041", nisn: "0131309425", name: "Naura Delisha Anindya", class: "8C", gender: "P", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2425043", nisn: "3127530702", name: "Nur Agniati", class: "8C", gender: "P", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2425045", nisn: "0131055227", name: "Quinsha Aleeysa Zivara Pardosi", class: "8C", gender: "P", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2425046", nisn: "3121701439", name: "Rafi Seno Firliyanto", class: "8C", gender: "L", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2526050", nisn: "0127509512", name: "Syahmi Rais Hendrartho", class: "8C", gender: "L", musyrif1: "Ustadz Fachrul Anwar", musyrif2: "Ustadz Zahran Tsauban Taqiy" },
  { nis: "4309-2425001", nisn: "0117150023", name: "Aldridge Mackenzie Suryantoro", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425002", nisn: "0115214205", name: "Alisha Paramita Khadijah", class: "9A", gender: "P", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425003", nisn: "0124964036", name: "Alya Akhyar", class: "9A", gender: "P", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425004", nisn: "0127149860", name: "Aqila Rajwa Yasminanda", class: "9A", gender: "P", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425005", nisn: "0127662441", name: "Aristyani Reina Koestoer", class: "9A", gender: "P", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425006", nisn: "0128655017", name: "Belva Kalena Aryaputri", class: "9A", gender: "P", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425007", nisn: "0122929929", name: "Bima Amanta Kafila Pranoto", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425008", nisn: "0112184914", name: "Bisma Dewabrata Alliansyah", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425009", nisn: "0122783181", name: "Daviena Nur Ramadhani", class: "9A", gender: "P", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425010", nisn: "0126105991", name: "Fergie Putra Qiandra", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425011", nisn: "0126679445", name: "Hervira Apriani", class: "9A", gender: "P", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425013", nisn: "0127040938", name: "Jusuf Milo Adriel", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425014", nisn: "0126485869", name: "Kiano Azka Nurcholis", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425015", nisn: "0127600608", name: "M. Keanu Radithiansyah", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425016", nisn: "0122097264", name: "Mohammad Khalel AlFatih", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425018", nisn: "0113638528", name: "Muhammad Akbar Syahputra", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425059", nisn: "072425042", name: "Luthfiansyah Akbar", class: "9A", gender: "L", musyrif1: "Ustadzah Cucun Nurhasanah", musyrif2: "Ustadz Raditya Pratama Nugraha" },
  { nis: "4309-2425019", nisn: "0124058769", name: "Adrian Qianno Ikhwani", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425020", nisn: "0123168677", name: "Aisyah Nirvana Putri Hargono", class: "9B", gender: "P", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425021", nisn: "0112544830", name: "Alby Nayaka Abdillah", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425022", nisn: "0121629633", name: "Aldwyn Priya Tungga Iskandar", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425024", nisn: "0128482259", name: "Alfarizqi Fabian Supriyanto", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425025", nisn: "0126573914", name: "Azka Alvaro Ramadhan", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425026", nisn: "0111708577", name: "Azri Jovian Nusa Barlian", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425028", nisn: "0129929876", name: "Kenzo Malikha Yusuf", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425029", nisn: "0128859157", name: "Larasati Kusuma Candra", class: "9B", gender: "P", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425030", nisn: "0113210385", name: "Lunaira Malika Radin", class: "9B", gender: "P", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425031", nisn: "0117980533", name: "Nadia Amalia Jatmiko", class: "9B", gender: "P", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425032", nisn: "0127798513", name: "Rayhan Afrilio", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425033", nisn: "0122619943", name: "Rayhan Rafie Putra Yulianto", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425034", nisn: "0129260922", name: "Tangguh Maheswara Harwitodjati", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425035", nisn: "0111546842", name: "Zahara Safaa Aziz Khan", class: "9B", gender: "P", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425036", nisn: "0126649446", name: "Zavina Carissa Najwa Afifah", class: "9B", gender: "P", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425058", nisn: "0129320370", name: "Hanan Sakya Waranggana", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425060", nisn: "0128064168", name: "Pradipta Raditya Rangga", class: "9B", gender: "L", musyrif1: "Ustadzah Dedeh Rohilah", musyrif2: "Ustadzah Lathifah Khoirunnisa" },
  { nis: "4309-2425037", nisn: "3124819118", name: "Ahmad Zuhal", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425038", nisn: "0125970962", name: "Darliena Aishaqira Dannial", class: "9C", gender: "P", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425039", nisn: "0123303015", name: "Ganendra Abinaya Tsakib Ariaputra", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425040", nisn: "0116555903", name: "Joel Mario Ramadhani", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425041", nisn: "0115850078", name: "Khalif Abdul Jabbar", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425042", nisn: "0111005608", name: "Lavina Althea Triawan", class: "9C", gender: "P", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425043", nisn: "3128655972", name: "Lovierra Kalyca Riyanto", class: "9C", gender: "P", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425044", nisn: "0124365267", name: "Muhammad Farras Rafliansyah", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425045", nisn: "0113846201", name: "Muhammad Rafi Fataya Kirani", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425046", nisn: "0112791758", name: "Muhammad Zaki", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425047", nisn: "0123013705", name: "Nadra Dzamira Sasti Affandi", class: "9C", gender: "P", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425048", nisn: "3124920710", name: "Naura Aquina Zhufairah", class: "9C", gender: "P", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425049", nisn: "0125616155", name: "Nur Rahman Abdallah", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425050", nisn: "0118407266", name: "Nurandriani Astari", class: "9C", gender: "P", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425051", nisn: "0122843902", name: "Putri Vania Aramita Ghani", class: "9C", gender: "P", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425052", nisn: "0122628678", name: "Raisa Ananda Shakila", class: "9C", gender: "P", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425053", nisn: "0128831984", name: "Shofiya Zakiya Jamil", class: "9C", gender: "P", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425054", nisn: "0126397010", name: "Zavier Aydin Rashaad Siregar", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2425057", nisn: "0124270323", name: "Nevan Faiz Qitarah", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" },
  { nis: "4309-2526051", nisn: "0122081045", name: "Muhammad Yaqdhan Jalil", class: "9C", gender: "L", musyrif1: "Ustadz Lubsidin", musyrif2: "Ustadz Muhammad Nazri" }
];
var INITIAL_TEACHERS = RAW_TEACHERS.map((t, idx) => ({
  id: `TCH-${String(idx + 1).padStart(3, "0")}`,
  name: t.name,
  nip: t.nip,
  classAssigned: t.classAssigned,
  password: t.password
}));
var INITIAL_STUDENTS = RAW_STUDENTS.map((s, idx) => {
  const sId = `STD-${String(idx + 1).padStart(3, "0")}`;
  const pId = `PRT-${String(idx + 1).padStart(3, "0")}`;
  const matchedTeacher = INITIAL_TEACHERS.find((t) => t.classAssigned === s.class);
  const teacherId = matchedTeacher ? matchedTeacher.id : "TCH-019";
  return {
    id: sId,
    name: s.name,
    class: s.class,
    parentId: pId,
    teacherId,
    nisn: s.nisn,
    streak: 0,
    // start with 0 streak
    points: 0,
    // start with 0 points
    nis: s.nis,
    gender: s.gender,
    musyrif1: s.musyrif1,
    musyrif2: s.musyrif2
  };
});
var INITIAL_PARENTS = INITIAL_STUDENTS.map((student, idx) => {
  return {
    id: student.parentId,
    name: `Bapak/Ibu Wali dari ${student.name}`,
    phone: `0812-3456-${String(idx + 1).padStart(4, "0")}`,
    studentId: student.id
  };
});

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
var DB_FILE = import_path.default.join(process.cwd(), "database.json");
function loadDatabase() {
  try {
    if (import_fs.default.existsSync(DB_FILE)) {
      const content = import_fs.default.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error reading database file, using default structure:", error);
  }
  const initialDB = {
    students: INITIAL_STUDENTS,
    teachers: INITIAL_TEACHERS,
    parents: INITIAL_PARENTS,
    historyLogs: [],
    // Empty log history, completely ready-to-use
    schoolProfile: {
      name: "SMP Islam Al Azhar 9 Bekasi",
      principal: "H. Amril, S.Ag, M.Pd",
      principalNip: "1971030519980310",
      address: "Jl. Kemang Pratama Raya, Bekasi Barat",
      phone: "021-82410000",
      npsn: "20220301",
      yayasan: "YAYASAN WAQAF AL MUHAJIRIEN / YPI AL AZHAR"
    },
    customSmpLogo: null,
    customYayasanLogo: null,
    customBirrulList: [
      "Membantu membersihkan rumah",
      "Mencuci piring",
      "Membantu memasak atau menyiapkan makanan",
      "Merapihkan tempat tidur sendiri",
      "Menyiram tanaman di halaman rumah",
      "Mencuci kendaraan orang tua",
      "Membawakan barang belanjaan",
      "Membantu mencuci atau menjemur pakaian"
    ]
  };
  saveDatabase(initialDB);
  return initialDB;
}
function saveDatabase(data) {
  try {
    import_fs.default.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to database file:", error);
  }
}
app.use((req, res, next) => {
  const cleanPath = req.path;
  if (cleanPath === "/mutabaah") {
    const query = req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : "";
    return res.redirect(301, "/mutabaah/" + query);
  }
  if (req.url.startsWith("/mutabaah")) {
    req.url = req.url.substring("/mutabaah".length);
    if (!req.url.startsWith("/")) {
      req.url = "/" + req.url;
    }
  }
  next();
});
app.use(import_express.default.json({ limit: "50mb" }));
app.use(import_express.default.urlencoded({ limit: "50mb", extended: true }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "status" in err && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Format JSON tidak valid." });
  }
  if (err && (err.type === "entity.too.large" || err.status === 413)) {
    return res.status(413).json({ error: "Ukuran data terlalu besar. Maksimal 50MB." });
  }
  next(err);
});
var aiClient = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Real AI evaluations will fall back to simulated responses.");
      return null;
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
var SYSTEM_PROMPT = `Anda adalah seorang Konselor Pendidikan Islami dan Wali Kelas di SMP Islam Al Azhar 9 Bekasi.
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
app.get("/api/db", (req, res) => {
  try {
    const db = loadDatabase();
    res.json(db);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat database: " + error.message });
  }
});
app.post("/api/db/sync", (req, res) => {
  try {
    const db = loadDatabase();
    const { students, teachers, parents, historyLogs, schoolProfile, customSmpLogo, customYayasanLogo, customBirrulList, role } = req.body;
    const isAdmin = role === "admin";
    if (schoolProfile && typeof schoolProfile === "object") {
      db.schoolProfile = {
        ...db.schoolProfile,
        ...schoolProfile
      };
    }
    if (customSmpLogo !== void 0) {
      db.customSmpLogo = customSmpLogo;
    }
    if (customYayasanLogo !== void 0) {
      db.customYayasanLogo = customYayasanLogo;
    }
    if (customBirrulList !== void 0 && Array.isArray(customBirrulList)) {
      db.customBirrulList = customBirrulList;
    }
    if (isAdmin) {
      if (students && Array.isArray(students)) db.students = students;
      if (teachers && Array.isArray(teachers)) db.teachers = teachers;
      if (parents && Array.isArray(parents)) db.parents = parents;
      if (historyLogs && Array.isArray(historyLogs)) db.historyLogs = historyLogs;
    } else {
      if (students && Array.isArray(students)) {
        db.students = db.students.map((s) => {
          const clientS = students.find((cs) => cs.id === s.id);
          if (clientS) {
            return {
              ...s,
              points: clientS.points !== void 0 ? clientS.points : s.points,
              streak: clientS.streak !== void 0 ? clientS.streak : s.streak,
              lastFillDate: clientS.lastFillDate !== void 0 ? clientS.lastFillDate : s.lastFillDate,
              class: clientS.class || s.class,
              name: clientS.name || s.name
            };
          }
          return s;
        });
        students.forEach((cs) => {
          if (!db.students.some((s) => s.id === cs.id)) {
            db.students.push(cs);
          }
        });
      }
      if (historyLogs && Array.isArray(historyLogs)) {
        const mergedLogs = [...db.historyLogs];
        historyLogs.forEach((cLog) => {
          const existingIndex = mergedLogs.findIndex((l) => l.id === cLog.id);
          if (existingIndex > -1) {
            mergedLogs[existingIndex] = {
              ...mergedLogs[existingIndex],
              ...cLog,
              // Make sure approvals are preserved if either has them true
              parentApproved: cLog.parentApproved || mergedLogs[existingIndex].parentApproved,
              teacherApproved: cLog.teacherApproved || mergedLogs[existingIndex].teacherApproved,
              rejectedByTeacher: cLog.rejectedByTeacher !== void 0 ? cLog.rejectedByTeacher : mergedLogs[existingIndex].rejectedByTeacher
            };
          } else {
            mergedLogs.unshift(cLog);
          }
        });
        db.historyLogs = mergedLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      if (teachers && Array.isArray(teachers)) {
        db.teachers = db.teachers.map((t) => {
          const clientT = teachers.find((ct) => ct.id === t.id);
          return clientT ? { ...t, ...clientT } : t;
        });
        teachers.forEach((ct) => {
          if (!db.teachers.some((t) => t.id === ct.id)) {
            db.teachers.push(ct);
          }
        });
      }
      if (parents && Array.isArray(parents)) {
        db.parents = db.parents.map((p) => {
          const clientP = parents.find((cp) => cp.id === p.id);
          return clientP ? { ...p, ...clientP } : p;
        });
        parents.forEach((cp) => {
          if (!db.parents.some((p) => p.id === cp.id)) {
            db.parents.push(cp);
          }
        });
      }
    }
    saveDatabase(db);
    res.json({ success: true, message: "Sinkronisasi database berhasil dilakukan dengan aman.", isMerged: !isAdmin });
  } catch (error) {
    res.status(500).json({ error: "Gagal menyinkronkan database: " + error.message });
  }
});
app.post("/api/db/reset", (req, res) => {
  try {
    const cleanDB = {
      students: INITIAL_STUDENTS,
      teachers: INITIAL_TEACHERS,
      parents: INITIAL_PARENTS,
      historyLogs: []
    };
    saveDatabase(cleanDB);
    res.json({ success: true, message: "Database berhasil di-reset ke kondisi siap pakai." });
  } catch (error) {
    res.status(500).json({ error: "Gagal mereset database: " + error.message });
  }
});
app.post("/api/gemini/evaluate", async (req, res) => {
  try {
    const { studentName, weeklyData } = req.body;
    if (!studentName || !weeklyData) {
      return res.status(400).json({ error: "Name and weekly data JSON are required." });
    }
    const ai = getGeminiClient();
    if (!ai) {
      const firstName = studentName.split(" ")[0] || studentName;
      const studentClass = weeklyData.studentClass || "Kelas 9";
      const days = weeklyData.daysLogged || 7;
      const targetShalat = weeklyData.totalShalatWajibTarget || days * 5;
      const totalShalat = weeklyData.shalatWajibCount || 0;
      const totalSunnah = weeklyData.shalatSunnahCount || 0;
      const tilawahDays = weeklyData.tilawahDaysCount || 0;
      const birrulDays = weeklyData.birrulWalidainDaysCount || 0;
      const sleepDays = weeklyData.goodSleepDaysCount || 0;
      const infaqDays = weeklyData.infaqDaysCount || 0;
      const shalatPct = targetShalat > 0 ? Math.round(totalShalat / targetShalat * 100) : 0;
      let evaluation2 = `Barakallahu fiik Ananda ${studentName} (${studentClass}), `;
      if (shalatPct >= 80) {
        evaluation2 += `bapak sangat bersyukur dan bangga melihat konsistensi ibadahmu selama ${days} hari periode ini dengan pencapaian shalat wajib ${totalShalat} dari ${targetShalat} waktu (${shalatPct}%). `;
      } else if (totalShalat > 0) {
        evaluation2 += `terima kasih atas usaha ibadahmu selama ${days} hari ini dengan ${totalShalat} waktu shalat wajib terlaksana. Mari kita tingkatkan lagi kedisiplinan shalat lima waktu tepat waktu. `;
      } else {
        evaluation2 += `mari kita jadikan periode ini sebagai momentum untuk memulai kembali kebiasaan shalat lima waktu dengan lebih disiplin dan istikamah. `;
      }
      if (totalSunnah > 0 || tilawahDays > 0) {
        evaluation2 += `Ananda juga telah melaksanakan ${totalSunnah > 0 ? `${totalSunnah}x shalat sunnah` : ""}${totalSunnah > 0 && tilawahDays > 0 ? " serta " : ""}${tilawahDays > 0 ? `${tilawahDays} hari tilawah Al-Qur'an` : ""}. `;
      }
      if (birrulDays > 0) {
        evaluation2 += `Bakti dan adab kepada orang tua sangat luar biasa dengan ${birrulDays} kegiatan membantu di rumah. `;
      }
      if (infaqDays > 0) {
        evaluation2 += `Kedermawanan Ananda ditunjukkan dengan ${infaqDays} hari berinfaq. `;
      }
      if (sleepDays > 0) {
        evaluation2 += `Pola tidur sehat (${sleepDays} hari tepat waktu) patut dipertahankan agar kondisi fisik selalu bugar saat beribadah dan belajar di SMP Islam Al Azhar 9. `;
      }
      evaluation2 += `Semoga Allah SWT senantiasa melimpahkan hidayah, kecerdasan, dan keberkahan dalam setiap langkah Ananda ${firstName}. Aamiin.`;
      return res.json({ evaluation: evaluation2, isSimulated: true });
    }
    const userContent = `Berikut adalah data mutaba'ah mingguan siswa bernama ${studentName}:
${JSON.stringify(weeklyData, null, 2)}

Berikan evaluasi mingguan Anda dalam 1 paragraf sesuai dengan System Prompt.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userContent,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7
      }
    });
    const evaluation = response.text?.trim() || "";
    return res.json({ evaluation, isSimulated: false });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Gagal memproses evaluasi AI: " + error.message });
  }
});
app.post("/api/mutabaah/submit", (req, res) => {
  try {
    const {
      studentId,
      studentName,
      date,
      shalatWajib,
      // { subuh: boolean, zuhur: boolean, ashar: boolean, maghrib: boolean, isya: boolean }
      shalatSunnah,
      // { dhuha: boolean, tahajud: boolean, qabliyahSubuh: boolean, ... }
      tilawah,
      // { surah: string, ayat: string, juz: number }
      hafalan,
      // { surah: string, ayat: string, juz: number, tipe: "ziyadah" | "murojaah" }
      polaTidur,
      // { sebelum22: boolean, bangun05: boolean }
      birrulWalidain,
      // string[] (list of helping activities)
      currentStreakDays
      // number (streak passed from client or fetched from DB)
    } = req.body;
    if (!studentId || !date) {
      return res.status(400).json({ error: "Student ID and Date are required." });
    }
    const getIndonesianDateString = (d) => {
      const utc = d.getTime() + d.getTimezoneOffset() * 6e4;
      const wibTime = new Date(utc + 36e5 * 7);
      const year = wibTime.getFullYear();
      const month = String(wibTime.getMonth() + 1).padStart(2, "0");
      const day = String(wibTime.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const serverNow = /* @__PURE__ */ new Date();
    const yesterday = new Date(serverNow);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getIndonesianDateString(yesterday);
    const twoDaysAgo = new Date(serverNow);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const twoDaysAgoStr = getIndonesianDateString(twoDaysAgo);
    if (date !== yesterdayStr && date !== twoDaysAgoStr) {
      return res.status(400).json({
        error: `Pengisian ditolak! Tanggal ${date} tidak diizinkan. Laporan mutaba'ah hanya bisa diisi untuk Kemarin (${yesterdayStr}) atau 2 hari lalu (${twoDaysAgoStr}).`
      });
    }
    let pointsEarned = 0;
    const details = [];
    if (shalatWajib) {
      if (shalatWajib.haidh) {
        pointsEarned += 25;
        details.push(`Shalat Wajib: Sedang Haidh (+25 Poin)`);
      } else {
        let jamaahCount = 0;
        let munfaridCount = 0;
        const checkPrayer = (val) => {
          if (val === "berjamaah") {
            jamaahCount++;
          } else if (val === "munfarid") {
            munfaridCount++;
          } else if (val === true) {
            jamaahCount++;
          }
        };
        checkPrayer(shalatWajib.subuh);
        checkPrayer(shalatWajib.zuhur);
        checkPrayer(shalatWajib.ashar);
        checkPrayer(shalatWajib.maghrib);
        checkPrayer(shalatWajib.isya);
        const shalatPoints = jamaahCount * 7 + munfaridCount * 5;
        pointsEarned += shalatPoints;
        details.push(`Shalat Wajib: ${jamaahCount} Berjama'ah (+${jamaahCount * 7} Pts), ${munfaridCount} Munfarid (+${munfaridCount * 5} Pts)`);
      }
    }
    if (shalatSunnah) {
      if (shalatSunnah.haidh) {
        pointsEarned += 10;
        details.push(`Shalat Sunnah & Rawatib: Sedang Haidh (+10 Poin)`);
      } else {
        let sunnahPoints = 0;
        if (shalatSunnah.tahajud) {
          sunnahPoints += 15;
          details.push(`Shalat Tahajud (+15 Poin)`);
        }
        if (shalatSunnah.dhuha) {
          sunnahPoints += 5;
          details.push(`Shalat Dhuha (+5 Poin)`);
        }
        let rawatibCount = 0;
        if (shalatSunnah.qabliyahSubuh) rawatibCount++;
        if (shalatSunnah.qabliyahDzuhur) rawatibCount++;
        if (shalatSunnah.badiyahDzuhur) rawatibCount++;
        if (shalatSunnah.badiyahMaghrib) rawatibCount++;
        if (shalatSunnah.badiyahIsya) rawatibCount++;
        if (shalatSunnah.rawatibCount && rawatibCount === 0) {
          rawatibCount = shalatSunnah.rawatibCount;
        }
        if (rawatibCount > 0) {
          const rawatibPoints = rawatibCount * 3;
          sunnahPoints += rawatibPoints;
          details.push(`Shalat Rawatib: ${rawatibCount} rawatib (+${rawatibPoints} Poin)`);
        }
        pointsEarned += sunnahPoints;
      }
    }
    if (tilawah) {
      if (tilawah.surah === "Tidak membaca") {
        details.push(`Membaca Al-Qur'an: Tidak membaca (0 Poin)`);
      } else if (tilawah.surah && (tilawah.ayat || tilawah.surah !== "Tidak membaca")) {
        pointsEarned += 10;
        details.push(`Membaca Al-Qur'an: Surah ${tilawah.surah} (+10 Poin)`);
      } else if (tilawah.pages) {
        pointsEarned += 10;
        details.push(`Tilawah Al-Qur'an: (+10 Poin)`);
      }
    }
    if (hafalan) {
      if (hafalan.tipe === "tidak_hafalan" || hafalan.surah === "Tidak hafalan") {
        details.push(`Hafalan Al-Qur'an: Tidak hafalan (0 Poin)`);
      } else if (hafalan.surah && (hafalan.tipe === "murojaah" || hafalan.tipe === "ziyadah" || hafalan.surah !== "Tidak hafalan")) {
        pointsEarned += 10;
        const labelTipe = hafalan.tipe === "murojaah" ? "Muroja'ah" : "Ziyadah";
        details.push(`Hafalan Al-Qur'an (${labelTipe}): Surah ${hafalan.surah} (+10 Poin)`);
      }
    }
    if (polaTidur) {
      if (polaTidur.sebelum22 !== void 0 || polaTidur.bangun05 !== void 0) {
        if (polaTidur.sebelum22) {
          pointsEarned += 5;
          details.push(`Pola Tidur Sehat: Tidur sebelum pukul 22:00 (+5 Poin)`);
        }
        if (polaTidur.bangun05) {
          pointsEarned += 5;
          details.push(`Pola Tidur Sehat: Bangun jam 5:00 (+5 Poin)`);
        }
      } else if (polaTidur.sleepTime) {
        const [hour, minute] = polaTidur.sleepTime.split(":").map(Number);
        const isEarlySleep = hour < 22 || hour === 22 && minute === 0;
        if (isEarlySleep) {
          pointsEarned += 5;
          details.push(`Pola Tidur Sehat: Tidur sebelum pukul 22:00 (+5 Poin)`);
        }
      }
    }
    if (birrulWalidain && Array.isArray(birrulWalidain)) {
      const cleanActivities = birrulWalidain.filter((a) => a !== "Other" && a !== "Tidak ada");
      const birrulPoints = cleanActivities.length * 2;
      pointsEarned += birrulPoints;
      if (cleanActivities.length > 0) {
        details.push(`Birrul Walidain: Membantu orang tua (${cleanActivities.length} kegiatan) (+${birrulPoints} Poin)`);
      } else {
        details.push(`Birrul Walidain: Tidak membantu orang tua (0 Poin)`);
      }
    }
    const { infaq } = req.body;
    if (infaq) {
      if (infaq.hasInfaq && infaq.amount) {
        const amt = parseFloat(infaq.amount.toString());
        if (!isNaN(amt) && amt > 0) {
          const infaqPoints = Math.floor(amt / 1e3);
          pointsEarned += infaqPoints;
          const amountFormatted = `Rp ${amt.toLocaleString("id-ID")}`;
          const proofLabel = infaq.fileData ? "dengan bukti transfer" : "tanpa bukti transfer";
          details.push(`Infaq/Sedekah: Berinfaq sebesar ${amountFormatted} (${proofLabel}) (+${infaqPoints} Poin)`);
        } else {
          details.push(`Infaq/Sedekah: Tidak berinfaq (0 Poin)`);
        }
      } else {
        details.push(`Infaq/Sedekah: Tidak berinfaq (0 Poin)`);
      }
    }
    const eligibleForStreak = pointsEarned >= 30;
    let nextStreak = currentStreakDays || 0;
    if (eligibleForStreak) {
      nextStreak += 1;
    } else {
      nextStreak = 0;
    }
    return res.json({
      success: true,
      message: "Data mutaba'ah harian berhasil disimpan!",
      date,
      pointsEarned,
      streakDays: nextStreak,
      streakBonus: 0,
      pointsBreakdown: details,
      studentName: studentName || "Siswa Al Azhar"
    });
  } catch (error) {
    console.error("Submit Mutaba'ah Error:", error);
    return res.status(500).json({ error: "Gagal menyimpan data mutaba'ah: " + error.message });
  }
});
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: `Rute API ${req.method} ${req.url} tidak ditemukan.` });
});
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production" || typeof __filename !== "undefined" && !__filename.endsWith("server.ts");
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = __dirname;
    app.use("/mutabaah", import_express.default.static(distPath, {
      setHeaders: (res, path2) => {
        if (path2.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        }
      }
    }));
    app.use(import_express.default.static(distPath, {
      setHeaders: (res, path2) => {
        if (path2.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        }
      }
    }));
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  if (process.env.PORT) {
    app.listen(process.env.PORT, () => {
      console.log(`Server running under Passenger/cPanel on port/socket: ${process.env.PORT}`);
    });
  } else {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}
startServer();
//# sourceMappingURL=server.cjs.map
