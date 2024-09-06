import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const carBrands = [
  {
    "brand": "Volkswagen",
    "models": ["Golf", "Polo", "Passat", "Tiguan", "Touareg", "Jetta", "Beetle", "Sharan", "Touran", "T5", "Transporter", "Caddy", "Amarok", "Scirocco", "Eos"],
    "logo": "https://www.carlogos.org/car-logos/volkswagen-logo.png",
    "founded": 1937
  },
  {
    "brand": "BMW",
    "models": ["3 Series", "5 Series", "X5", "X3", "1 Series", "X6", "4 Series", "2 Series", "M3", "M5", "Z4", "i3", "7 Series", "6 Series", "X1"],
    "logo": "https://www.carlogos.org/car-logos/bmw-logo.png",
    "founded": 1916
  },
  // ... (other car brands)
];

export const carMakes = carBrands.map(brand => brand.brand);

export const carModels = carBrands.reduce((acc, brand) => {
  acc[brand.brand] = brand.models;
  return acc;
}, {});

export const colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Brown', 'Orange', 'Other'];

export const locations = [
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Barka', 'Seeb', 'Rustaq', 'Ibra',
  // ... (other locations)
];

export const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'LPG', 'CNG'];

export const transmissionTypes = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic'];

export const createCarLogosBackup = async () => {
  const zip = new JSZip();
  const logoPromises = carBrands.map(async (brand) => {
    try {
      const response = await fetch(brand.logo);
      const blob = await response.blob();
      zip.file(`${brand.brand}.png`, blob);
    } catch (error) {
      console.error(`Failed to fetch logo for ${brand.brand}:`, error);
    }
  });

  await Promise.all(logoPromises);

  try {
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "car-logos-backup.zip");
  } catch (error) {
    console.error("Failed to create zip file:", error);
  }
};