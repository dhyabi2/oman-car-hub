export const carBrands = [
  {
    "brand": "Volkswagen",
    "brandAr": "فولكس فاجن",
    "models": ["Golf", "Polo", "Passat", "Tiguan", "Touareg", "Jetta", "Beetle", "Sharan", "Touran", "T5", "Transporter", "Caddy", "Amarok", "Scirocco", "Eos"],
    "modelsAr": ["جولف", "بولو", "باسات", "تيجوان", "طوارق", "جيتا", "بيتل", "شاران", "توران", "T5", "ترانسبورتر", "كادي", "أماروك", "سكيروكو", "إيوس"],
    "logo": "https://www.carlogos.org/car-logos/volkswagen-logo.png",
    "founded": 1937
  },
  {
    "brand": "BMW",
    "brandAr": "بي إم دبليو",
    "models": ["3 Series", "5 Series", "X5", "X3", "1 Series", "X6", "4 Series", "2 Series", "M3", "M5", "Z4", "i3", "7 Series", "6 Series", "X1"],
    "modelsAr": ["السلسلة 3", "السلسلة 5", "X5", "X3", "السلسلة 1", "X6", "السلسلة 4", "السلسلة 2", "M3", "M5", "Z4", "i3", "السلسلة 7", "السلسلة 6", "X1"],
    "logo": "https://www.carlogos.org/car-logos/bmw-logo.png",
    "founded": 1916
  },
  // ... Add the rest of the brands here following the same pattern
];

export const carMakes = carBrands.map(brand => brand.brand);
export const carMakesAr = carBrands.map(brand => brand.brandAr);

export const carModels = carBrands.reduce((acc, brand) => {
  acc[brand.brand] = brand.models;
  return acc;
}, {});

export const carModelsAr = carBrands.reduce((acc, brand) => {
  acc[brand.brandAr] = brand.modelsAr;
  return acc;
}, {});

export const colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Brown', 'Orange', 'Other'];
export const colorsAr = ['أبيض', 'أسود', 'فضي', 'رمادي', 'أحمر', 'أزرق', 'أخضر', 'أصفر', 'بني', 'برتقالي', 'أخرى'];

export const locations = [
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Barka', 'Seeb', 'Rustaq', 'Ibra',
  'Adam', 'Al Amerat', 'Al Buraimi', 'Al Hamra', 'Al Jazir', 'Al Kamil Wal Wafi', 'Al Khaburah',
  'Al Madina A\'Zarqa', 'Al Mazyona', 'Al Mudhaibi', 'Al Musanaah', 'Al Qabil', 'Al Seeb', 'Al Suwaiq',
  'Bahla', 'Bidbid', 'Bidiyah', 'Daba', 'Duqm', 'Haima', 'Izki', 'Jabrin', 'Jalan Bani Bu Ali',
  'Jalan Bani Bu Hassan', 'Khasab', 'Mahooth', 'Manah', 'Masirah', 'Mhadha', 'Mirbat', 'Mudhaibi',
  'Mukhaizna', 'Muladdah', 'Musannah', 'Qalhat', 'Quriyat', 'Rakhyut', 'Saham', 'Salalah (Dhofar)', 'Samail',
  'Shinas', 'Suhar', 'Suwaiq', 'Taqah', 'Thumrait', 'Wadi Bani Khalid', 'Yanqul'
];

export const locationsAr = [
  'مسقط', 'صلالة', 'صحار', 'نزوى', 'صور', 'عبري', 'بركاء', 'السيب', 'الرستاق', 'إبراء',
  'أدم', 'العامرات', 'البريمي', 'الحمراء', 'الجزر', 'الكامل والوافي', 'الخابورة',
  'المدينة الزرقاء', 'المزيونة', 'المضيبي', 'المصنعة', 'القبل', 'السيب', 'السويق',
  'بهلاء', 'بدبد', 'بديعة', 'دبا', 'الدقم', 'هيما', 'إزكي', 'جبرين', 'جعلان بني بو علي',
  'جعلان بني بو حسن', 'خصب', 'مقشن', 'منح', 'مصيرة', 'محضة', 'مرباط', 'المضيبي',
  'مخيزنة', 'ملدة', 'المصنعة', 'قلهات', 'قريات', 'رخيوت', 'صحم', 'صلالة (ظفار)', 'سمائل',
  'شناص', 'صُحار', 'السويق', 'طاقة', 'ثمريت', 'وادي بني خالد', 'ينقل'
];

export const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'LPG', 'CNG'];
export const fuelTypesAr = ['بنزين', 'ديزل', 'كهرباء', 'هايبرد', 'غاز البترول المسال', 'غاز طبيعي مضغوط'];

export const transmissionTypes = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic'];
export const transmissionTypesAr = ['أوتوماتيكي', 'يدوي', 'CVT', 'شبه أوتوماتيكي'];
