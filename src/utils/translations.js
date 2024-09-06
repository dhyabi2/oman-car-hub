export const translations = {
  en: {
    // ... existing translations ...
    // Add translations for locations
    muscat: "Muscat",
    salalah: "Salalah",
    sohar: "Sohar",
    nizwa: "Nizwa",
    sur: "Sur",
    ibri: "Ibri",
    barka: "Barka",
    seeb: "Seeb",
    rustaq: "Rustaq",
    ibra: "Ibra",
    // Add translations for other fields
    automatic: "Automatic",
    manual: "Manual",
    cvt: "CVT",
    semiAutomatic: "Semi-Automatic",
    petrol: "Petrol",
    diesel: "Diesel",
    electric: "Electric",
    hybrid: "Hybrid",
    lpg: "LPG",
    cng: "CNG",
    new: "New",
    used: "Used",
    fwd: "FWD",
    rwd: "RWD",
    awd: "AWD",
    fourwd: "4WD",
    // ... other existing translations ...
  },
  ar: {
    // ... existing translations ...
    // Add translations for locations
    muscat: "مسقط",
    salalah: "صلالة",
    sohar: "صحار",
    nizwa: "نزوى",
    sur: "صور",
    ibri: "عبري",
    barka: "بركاء",
    seeb: "السيب",
    rustaq: "الرستاق",
    ibra: "إبراء",
    // Add translations for other fields
    automatic: "أوتوماتيك",
    manual: "يدوي",
    cvt: "CVT",
    semiAutomatic: "شبه أوتوماتيك",
    petrol: "بنزين",
    diesel: "ديزل",
    electric: "كهربائي",
    hybrid: "هجين",
    lpg: "غاز البترول المسال",
    cng: "غاز طبيعي مضغوط",
    new: "جديد",
    used: "مستعمل",
    fwd: "دفع أمامي",
    rwd: "دفع خلفي",
    awd: "دفع رباعي دائم",
    fourwd: "دفع رباعي",
    // ... other existing translations ...
  },
};

// Helper function to get nested translations
export const getNestedTranslation = (obj, path) => {
  return path.split('.').reduce((p, c) => p && p[c.toLowerCase()] || null, obj);
};