export interface Student {
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

export interface Teacher {
  id: string;
  name: string;
  nip: string;
  classAssigned: string;
  password?: string;
}

export interface Parent {
  id: string;
  name: string;
  phone: string;
  studentId: string;
}

const RAW_TEACHERS = [
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

const RAW_STUDENTS = [
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

export const INITIAL_TEACHERS: Teacher[] = RAW_TEACHERS.map((t, idx) => ({
  id: `TCH-${String(idx + 1).padStart(3, "0")}`,
  name: t.name,
  nip: t.nip,
  classAssigned: t.classAssigned,
  password: t.password
}));

export const INITIAL_STUDENTS: Student[] = RAW_STUDENTS.map((s, idx) => {
  const sId = `STD-${String(idx + 1).padStart(3, "0")}`;
  const pId = `PRT-${String(idx + 1).padStart(3, "0")}`;
  
  // Find teacher for this student's class
  const matchedTeacher = INITIAL_TEACHERS.find(t => t.classAssigned === s.class);
  const teacherId = matchedTeacher ? matchedTeacher.id : "TCH-019"; // Default general teacher
  
  return {
    id: sId,
    name: s.name,
    class: s.class,
    parentId: pId,
    teacherId: teacherId,
    nisn: s.nisn,
    streak: 0, // start with 0 streak
    points: 0, // start with 0 points
    nis: s.nis,
    gender: s.gender,
    musyrif1: s.musyrif1,
    musyrif2: s.musyrif2
  };
});

export const INITIAL_PARENTS: Parent[] = INITIAL_STUDENTS.map((student, idx) => {
  return {
    id: student.parentId,
    name: `Bapak/Ibu Wali dari ${student.name}`,
    phone: `0812-3456-${String(idx + 1).padStart(4, "0")}`,
    studentId: student.id
  };
});
