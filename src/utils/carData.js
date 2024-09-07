export const carBrands = [
  {
    "brand": "Volkswagen",
    "brandAr": "فولكس فاجن",
    "models": ["Golf", "Polo", "Passat", "Tiguan", "Touareg"],
    "modelsAr": ["جولف", "بولو", "باسات", "تيجوان", "طوارق"],
    "logo": "https://www.carlogos.org/car-logos/volkswagen-logo.png",
    "founded": 1937
  },
  {
    "brand": "BMW",
    "brandAr": "بي إم دبليو",
    "models": ["3 Series", "5 Series", "X5", "X3", "7 Series"],
    "modelsAr": ["الفئة 3", "الفئة 5", "إكس5", "إكس3", "الفئة 7"],
    "logo": "https://www.carlogos.org/car-logos/bmw-logo.png",
    "founded": 1916
  },
  {
    "brand": "Mercedes-Benz",
    "brandAr": "مرسيدس-بنز",
    "models": ["C-Class", "E-Class", "S-Class", "GLA", "GLC"],
    "modelsAr": ["الفئة سي", "الفئة إي", "الفئة إس", "جي إل إيه", "جي إل سي"],
    "logo": "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
    "founded": 1926
  },
  {
    "brand": "Toyota",
    "brandAr": "تويوتا",
    "models": ["Corolla", "Camry", "RAV4", "Land Cruiser", "Hilux"],
    "modelsAr": ["كورولا", "كامري", "راف4", "لاند كروزر", "هايلكس"],
    "logo": "https://www.carlogos.org/car-logos/toyota-logo.png",
    "founded": 1937
  },
  {
    "brand": "Honda",
    "brandAr": "هوندا",
    "models": ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
    "modelsAr": ["سيفيك", "أكورد", "سي آر-في", "بايلوت", "أوديسي"],
    "logo": "https://www.carlogos.org/car-logos/honda-logo.png",
    "founded": 1948
  }
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
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur'
];
export const locationsAr = [
  'مسقط', 'صلالة', 'صحار', 'نزوى', 'صور'
];

export const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
export const fuelTypesAr = ['بنزين', 'ديزل', 'كهربائي', 'هجين'];

export const transmissionTypes = ['Automatic', 'Manual', 'CVT'];
export const transmissionTypesAr = ['أوتوماتيكي', 'يدوي', 'سي في تي'];