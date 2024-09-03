import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const carBrands = [
  {
    "brand": "Seat",
    "models": ["Alhambra", "Altea", "Altea XL", "Arosa", "Cordoba", "Cordoba Vario", "Exeo", "Ibiza", "Ibiza ST", "Exeo ST", "Leon", "Leon ST", "Inca", "Mii", "Toledo"],
    "logo": "https://www.carlogos.org/car-logos/seat-logo.png",
    "founded": 1950
  },
  {
    "brand": "Renault",
    "models": ["Captur", "Clio", "Clio Grandtour", "Espace", "Express", "Fluence", "Grand Espace", "Grand Modus", "Grand Scenic", "Kadjar", "Kangoo", "Kangoo Express", "Koleos", "Laguna", "Laguna Grandtour", "Latitude", "Mascott", "Mégane", "Mégane CC", "Mégane Combi", "Mégane Grandtour", "Mégane Coupé", "Mégane Scénic", "Scénic", "Talisman", "Talisman Grandtour", "Thalia", "Twingo", "Wind", "Zoé"],
    "logo": "https://www.carlogos.org/car-logos/renault-logo.png",
    "founded": 1899
  },
  {
    "brand": "Peugeot",
    "models": ["1007", "107", "106", "108", "2008", "205", "205 Cabrio", "206", "206 CC", "206 SW", "207", "207 CC", "207 SW", "306", "307", "307 CC", "307 SW", "308", "308 CC", "308 SW", "309", "4007", "4008", "405", "406", "407", "407 SW", "5008", "508", "508 SW", "605", "806", "607", "807", "Bipper", "RCZ"],
    "logo": "https://www.carlogos.org/car-logos/peugeot-logo.png",
    "founded": 1810
  },
  {
    "brand": "Dacia",
    "models": ["Dokker", "Duster", "Lodgy", "Logan", "Logan MCV", "Logan Van", "Sandero", "Solenza"],
    "logo": "https://www.carlogos.org/car-logos/dacia-logo.png",
    "founded": 1966
  },
  {
    "brand": "Citroën",
    "models": ["Berlingo", "C-Crosser", "C-Elissée", "C-Zero", "C1", "C2", "C3", "C3 Picasso", "C4", "C4 Aircross", "C4 Cactus", "C4 Coupé", "C4 Grand Picasso", "C4 Sedan", "C5", "C5 Break", "C5 Tourer", "C6", "C8", "DS3", "DS4", "DS5", "Evasion", "Jumper", "Jumpy", "Saxo", "Nemo", "Xantia", "Xsara"],
    "logo": "https://www.carlogos.org/car-logos/citroen-logo.png",
    "founded": 1919
  },
  {
    "brand": "Opel",
    "models": ["Agila", "Ampera", "Antara", "Astra", "Astra cabrio", "Astra caravan", "Astra coupé", "Calibra", "Campo", "Cascada", "Corsa", "Frontera", "Insignia", "Insignia kombi", "Kadett", "Meriva", "Mokka", "Movano", "Omega", "Signum", "Vectra", "Vectra Caravan", "Vivaro", "Vivaro Kombi", "Zafira"],
    "logo": "https://www.carlogos.org/car-logos/opel-logo.png",
    "founded": 1862
  },
  {
    "brand": "Alfa Romeo",
    "models": ["145", "146", "147", "155", "156", "156 Sportwagon", "159", "159 Sportwagon", "164", "166", "4C", "Brera", "GTV", "MiTo", "Crosswagon", "Spider", "GT", "Giulietta", "Giulia"],
    "logo": "https://www.carlogos.org/car-logos/alfa-romeo-logo.png",
    "founded": 1910
  },
  {
    "brand": "Škoda",
    "models": ["Favorit", "Felicia", "Citigo", "Fabia", "Fabia Combi", "Fabia Sedan", "Felicia Combi", "Octavia", "Octavia Combi", "Roomster", "Yeti", "Rapid", "Rapid Spaceback", "Superb", "Superb Combi"],
    "logo": "https://www.carlogos.org/car-logos/skoda-logo.png",
    "founded": 1895
  },
  {
    "brand": "Chevrolet",
    "models": ["Alero", "Aveo", "Camaro", "Captiva", "Corvette", "Cruze", "Cruze SW", "Epica", "Equinox", "Evanda", "HHR", "Kalos", "Lacetti", "Lacetti SW", "Lumina", "Malibu", "Matiz", "Monte Carlo", "Nubira", "Orlando", "Spark", "Suburban", "Tacuma", "Tahoe", "Trax"],
    "logo": "https://www.carlogos.org/car-logos/chevrolet-logo.png",
    "founded": 1911
  },
  {
    "brand": "Porsche",
    "models": ["911 Carrera", "911 Carrera Cabrio", "911 Targa", "911 Turbo", "924", "944", "997", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera"],
    "logo": "https://www.carlogos.org/car-logos/porsche-logo.png",
    "founded": 1931
  },
  {
    "brand": "Honda",
    "models": ["Accord", "Accord Coupé", "Accord Tourer", "City", "Civic", "Civic Aerodeck", "Civic Coupé", "Civic Tourer", "Civic Type R", "CR-V", "CR-X", "CR-Z", "FR-V", "HR-V", "Insight", "Integra", "Jazz", "Legend", "Prelude"],
    "logo": "https://www.carlogos.org/car-logos/honda-logo.png",
    "founded": 1946
  },
  {
    "brand": "Subaru",
    "models": ["BRZ", "Forester", "Impreza", "Impreza Wagon", "Justy", "Legacy", "Legacy Wagon", "Legacy Outback", "Levorg", "Outback", "SVX", "Tribeca", "Tribeca B9", "XV"],
    "logo": "https://www.carlogos.org/car-logos/subaru-logo.png",
    "founded": 1953
  },
  {
    "brand": "Mazda",
    "models": ["121", "2", "3", "323", "323 Combi", "323 Coupé", "323 F", "5", "6", "6 Combi", "626", "626 Combi", "B-Fighter", "B2500", "BT", "CX-3", "CX-5", "CX-7", "CX-9", "Demio", "MPV", "MX-3", "MX-5", "MX-6", "Premacy", "RX-7", "RX-8", "Xedox 6"],
    "logo": "https://www.carlogos.org/car-logos/mazda-logo.png",
    "founded": 1920
  },
  {
    "brand": "Mitsubishi",
    "models": ["3000 GT", "ASX", "Carisma", "Colt", "Colt CC", "Eclipse", "Fuso canter", "Galant", "Galant Combi", "Grandis", "L200", "L200 Pick up", "L200 Pick up Allrad", "L300", "Lancer", "Lancer Combi", "Lancer Evo", "Lancer Sportback", "Outlander", "Pajero", "Pajeto Pinin", "Pajero Pinin Wagon", "Pajero Sport", "Pajero Wagon", "Space Star"],
    "logo": "https://www.carlogos.org/car-logos/mitsubishi-logo.png",
    "founded": 1870
  },
  {
    "brand": "Lexus",
    "models": ["CT", "GS", "GS 300", "GX", "IS", "IS 200", "IS 250 C", "IS-F", "LS", "LX", "NX", "RC F", "RX", "RX 300", "RX 400h", "RX 450h", "SC 430"],
    "logo": "https://www.carlogos.org/car-logos/lexus-logo.png",
    "founded": 1989
  },
  {
    "brand": "Toyota",
    "models": ["4-Runner", "Auris", "Avensis", "Avensis Combi", "Avensis Van Verso", "Aygo", "Camry", "Carina", "Celica", "Corolla", "Corolla Combi", "Corolla sedan", "Corolla Verso", "FJ Cruiser", "GT86", "Hiace", "Hiace Van", "Highlander", "Hilux", "Land Cruiser", "MR2", "Paseo", "Picnic", "Prius", "RAV4", "Sequoia", "Starlet", "Supra", "Tundra", "Urban Cruiser", "Verso", "Yaris", "Yaris Verso"],
    "logo": "https://www.carlogos.org/car-logos/toyota-logo.png",
    "founded": 1937
  },
  {
    "brand": "BMW",
    "models": ["i3", "i8", "M3", "M4", "M5", "M6", "Rad 1", "Rad 1 Cabrio", "Rad 1 Coupé", "Rad 2", "Rad 2 Active Tourer", "Rad 2 Coupé", "Rad 2 Gran Tourer", "Rad 3", "Rad 3 Cabrio", "Rad 3 Compact", "Rad 3 Coupé", "Rad 3 GT", "Rad 3 Touring", "Rad 4", "Rad 4 Cabrio", "Rad 4 Gran Coupé", "Rad 5", "Rad 5 GT", "Rad 5 Touring", "Rad 6", "Rad 6 Cabrio", "Rad 6 Coupé", "Rad 6 Gran Coupé", "Rad 7", "Rad 8 Coupé", "X1", "X3", "X4", "X5", "X6", "Z3", "Z3 Coupé", "Z3 Roadster", "Z4", "Z4 Roadster"],
    "logo": "https://www.carlogos.org/car-logos/bmw-logo.png",
    "founded": 1916
  },
  {
    "brand": "Volkswagen",
    "models": ["Amarok", "Beetle", "Bora", "Bora Variant", "Caddy", "Caddy Van", "Life", "California", "Caravelle", "CC", "Crafter", "Crafter Van", "Crafter Kombi", "CrossTouran", "Eos", "Fox", "Golf", "Golf Cabrio", "Golf Plus", "Golf Sportvan", "Golf Variant", "Jetta", "LT", "Lupo", "Multivan", "New Beetle", "New Beetle Cabrio", "Passat", "Passat Alltrack", "Passat CC", "Passat Variant", "Passat Variant Van", "Phaeton", "Polo", "Polo Van", "Polo Variant", "Scirocco", "Sharan", "T4", "T4 Caravelle", "T4 Multivan", "T5", "T5 Caravelle", "T5 Multivan", "T5 Transporter Shuttle", "Tiguan", "Touareg", "Touran"],
    "logo": "https://www.carlogos.org/car-logos/volkswagen-logo.png",
    "founded": 1937
  },
  {
    "brand": "Suzuki",
    "models": ["Alto", "Baleno", "Baleno kombi", "Grand Vitara", "Grand Vitara XL-7", "Ignis", "Jimny", "Kizashi", "Liana", "Samurai", "Splash", "Swift", "SX4", "SX4 Sedan", "Vitara", "Wagon R+"],
    "logo": "https://www.carlogos.org/car-logos/suzuki-logo.png",
    "founded": 1909
  },
  {
    "brand": "Mercedes-Benz",
    "models": ["100 D", "115", "124", "126", "190", "190 D", "190 E", "200 - 300", "200 D", "200 E", "210 Van", "210 kombi", "310 Van", "310 kombi", "230 - 300 CE Coupé", "260 - 560 SE", "260 - 560 SEL", "500 - 600 SEC Coupé", "Trieda A", "A", "A L", "AMG GT", "Trieda B", "Trieda C", "C", "C Sportcoupé", "C T", "Citan", "CL", "CL", "CLA", "CLC", "CLK Cabrio", "CLK Coupé", "CLS", "Trieda E", "E", "E Cabrio", "E Coupé", "E T", "Trieda G", "G Cabrio", "GL", "GLA", "GLC", "GLE", "GLK", "Trieda M", "MB 100", "Trieda R", "Trieda S", "S", "S Coupé", "SL", "SLC", "SLK", "SLR", "Sprinter"],
    "logo": "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
    "founded": 1926
  },
  {
    "brand": "Saab",
    "models": ["9-3", "9-3 Cabriolet", "9-3 Coupé", "9-3 SportCombi", "9-5", "9-5 SportCombi", "900", "900 C", "900 C Turbo", "9000"],
    "logo": "https://www.carlogos.org/car-logos/saab-logo.png",
    "founded": 1945
  },
  {
    "brand": "Audi",
    "models": ["100", "100 Avant", "80", "80 Avant", "80 Cabrio", "90", "A1", "A2", "A3", "A3 Cabriolet", "A3 Limuzina", "A3 Sportback", "A4", "A4 Allroad", "A4 Avant", "A4 Cabriolet", "A5", "A5 Cabriolet", "A5 Sportback", "A6", "A6 Allroad", "A6 Avant", "A7", "A8", "A8 Long", "Q3", "Q5", "Q7", "R8", "RS4 Cabriolet", "RS4/RS4 Avant", "RS5", "RS6 Avant", "RS7", "S3/S3 Sportback", "S4 Cabriolet", "S4/S4 Avant", "S5/S5 Cabriolet", "S6/RS6", "S7", "S8", "SQ5", "TT Coupé", "TT Roadster", "TTS"],
    "logo": "https://www.carlogos.org/car-logos/audi-logo.png",
    "founded": 1909
  },
  {
    "brand": "Kia",
    "models": ["Avella", "Besta", "Carens", "Carnival", "Cee`d", "Cee`d SW", "Cerato", "K 2500", "Magentis", "Opirus", "Optima", "Picanto", "Pregio", "Pride", "Pro Cee`d", "Rio", "Rio Combi", "Rio sedan", "Sephia", "Shuma", "Sorento", "Soul", "Sportage", "Venga"],
    "logo": "https://www.carlogos.org/car-logos/kia-logo.png",
    "founded": 1944
  },
  {
    "brand": "Land Rover",
    "models": ["109", "Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport"],
    "logo": "https://www.carlogos.org/car-logos/land-rover-logo.png",
    "founded": 1948
  },
  {
    "brand": "Dodge",
    "models": ["Avenger", "Caliber", "Challenger", "Charger", "Grand Caravan", "Journey", "Magnum", "Nitro", "RAM", "Stealth", "Viper"],
    "logo": "https://www.carlogos.org/car-logos/dodge-logo.png",
    "founded": 1900
  },
  {
    "brand": "Chrysler",
    "models": ["300 C", "300 C Touring", "300 M", "Crossfire", "Grand Voyager", "LHS", "Neon", "Pacifica", "Plymouth", "PT Cruiser", "Sebring", "Sebring Convertible", "Stratus", "Stratus Cabrio", "Town & Country", "Voyager"],
    "logo": "https://www.carlogos.org/car-logos/chrysler-logo.png",
    "founded": 1925
  },
  {
    "brand": "Ford",
    "models": ["Aerostar", "B-Max", "C-Max", "Cortina", "Cougar", "Edge", "Escort", "Escort Cabrio", "Escort kombi", "Explorer", "F-150", "F-250", "Fiesta", "Focus", "Focus C-Max", "Focus CC", "Focus kombi", "Fusion", "Galaxy", "Grand C-Max", "Ka", "Kuga", "Maverick", "Mondeo", "Mondeo Combi", "Mustang", "Orion", "Puma", "Ranger", "S-Max", "Sierra", "Street Ka", "Tourneo Connect", "Tourneo Custom", "Transit", "Transit", "Transit Bus", "Transit Connect LWB", "Transit Courier", "Transit Custom", "Transit kombi", "Transit Tourneo", "Transit Valnik", "Transit Van", "Transit Van 350", "Windstar"],
    "logo": "https://www.carlogos.org/car-logos/ford-logo.png",
    "founded": 1903
  },
  {
    "brand": "Hummer",
    "models": ["H2", "H3"],
    "logo": "https://www.carlogos.org/car-logos/hummer-logo.png",
    "founded": 1992
  },
  {
    "brand": "Hyundai",
    "models": ["Accent", "Atos", "Atos Prime", "Coupé", "Elantra", "Galloper", "Genesis", "Getz", "Grandeur", "H 350", "H1", "H1 Bus", "H1 Van", "H200", "i10", "i20", "i30", "i30 CW", "i40", "i40 CW", "ix20", "ix35", "ix55", "Lantra", "Matrix", "Santa Fe", "Sonata", "Terracan", "Trajet", "Tucson", "Veloster"],
    "logo": "https://www.carlogos.org/car-logos/hyundai-logo.png",
    "founded": 1967
  },
  {
    "brand": "Infiniti",
    "models": ["EX", "FX", "G", "G Coupé", "M", "Q", "QX"],
    "logo": "https://www.carlogos.org/car-logos/infiniti-logo.png",
    "founded": 1989
  },
  {
    "brand": "Jaguar",
    "models": ["Daimler", "F-Pace", "F-Type", "S-Type", "Sovereign", "X-Type", "X-type Estate", "XE", "XF", "XJ", "XJ12", "XJ6", "XJ8", "XJ8", "XJR", "XK", "XK8 Convertible", "XKR", "XKR Convertible"],
    "logo": "https://www.carlogos.org/car-logos/jaguar-logo.png",
    "founded": 1922
  },
  {
    "brand": "Jeep",
    "models": ["Cherokee", "Commander", "Compass", "Grand Cherokee", "Patriot", "Renegade", "Wrangler"],
    "logo": "https://www.carlogos.org/car-logos/jeep-logo.png",
    "founded": 1941
  },
  {
    "brand": "Nissan",
    "models": ["100 NX", "200 SX", "350 Z", "350 Z Roadster", "370 Z", "Almera", "Almera Tino", "Cabstar E - T", "Cabstar TL2 Valnik", "e-NV200", "GT-R", "Insterstar", "Juke", "King Cab", "Leaf", "Maxima", "Maxima QX", "Micra", "Murano", "Navara", "Note", "NP300 Pickup", "NV200", "NV400", "Pathfinder", "Patrol", "Patrol GR", "Pickup", "Pixo", "Primastar", "Primastar Combi", "Primera", "Primera Combi", "Pulsar", "Qashqai", "Serena", "Sunny", "Terrano", "Tiida", "Trade", "Vanette Cargo", "X-Trail"],
    "logo": "https://www.carlogos.org/car-logos/nissan-logo.png",
    "founded": 1933
  },
  {
    "brand": "Volvo",
    "models": ["240", "340", "360", "460", "850", "850 kombi", "C30", "C70", "C70 Cabrio", "C70 Coupé", "S40", "S60", "S70", "S80", "S90", "V40", "V50", "V60", "V70", "V90", "XC60", "XC70", "XC90"],
    "logo": "https://www.carlogos.org/car-logos/volvo-logo.png",
    "founded": 1927
  },
  {
    "brand": "Daewoo",
    "models": ["Espero", "Kalos", "Lacetti", "Lanos", "Leganza", "Lublin", "Matiz", "Nexia", "Nubira", "Nubira kombi", "Racer", "Tacuma", "Tico"],
    "logo": "https://www.carlogos.org/car-logos/daewoo-logo.png",
    "founded": 1967
  },
  {
    "brand": "Fiat",
    "models": ["1100", "126", "500", "500L", "500X", "850", "Barchetta", "Brava", "Cinquecento", "Coupé", "Croma", "Doblo", "Doblo Cargo", "Doblo Cargo Combi", "Ducato", "Ducato Van", "Ducato Kombi", "Ducato Podvozok", "Florino", "Florino Combi", "Freemont", "Grande Punto", "Idea", "Linea", "Marea", "Marea Weekend", "Multipla", "Palio Weekend", "Panda", "Panda Van", "Punto", "Punto Cabriolet", "Punto Evo", "Punto Van", "Qubo", "Scudo", "Scudo Van", "Scudo Kombi", "Sedici", "Seicento", "Stilo", "Stilo Multiwagon", "Strada", "Talento", "Tipo", "Ulysse", "Uno", "X1/9"],
    "logo": "https://www.carlogos.org/car-logos/fiat-logo.png",
    "founded": 1899
  },
  {
    "brand": "MINI",
    "models": ["Cooper", "Cooper Cabrio", "Cooper Clubman", "Cooper D", "Cooper D Clubman", "Cooper S", "Cooper S Cabrio", "Cooper S Clubman", "Countryman", "Mini One", "One D"],
    "logo": "https://www.carlogos.org/car-logos/mini-logo.png",
    "founded": 1959
  },
  {
    "brand": "Rover",
    "models": ["200", "214", "218", "25", "400", "414", "416", "620", "75"],
    "logo": "https://www.carlogos.org/car-logos/rover-logo.png",
    "founded": 1878
  },
  {
    "brand": "Smart",
    "models": ["Cabrio", "City-Coupé", "Compact Pulse", "Forfour", "Fortwo cabrio", "Fortwo coupé", "Roadster"],
    "logo": "https://www.carlogos.org/car-logos/smart-logo.png",
    "founded": 1994
  }
];

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    minYear: 1990,
    maxYear: new Date().getFullYear(),
    minPrice: 0,
    maxPrice: 100000,
    transmission: '',
    fuelType: '',
  });

  useEffect(() => {
    // Simulating API call to fetch cars
    const fetchCars = async () => {
      // In a real application, this would be an API call
      const mockCars = [
        { id: 1, make: 'Toyota', model: 'Camry', year: 2020, price: 25000, transmission: 'Automatic', fuelType: 'Petrol', mileage: 30000, photo: 'https://example.com/toyota-camry.jpg' },
        { id: 2, make: 'Honda', model: 'Civic', year: 2019, price: 22000, transmission: 'Manual', fuelType: 'Petrol', mileage: 35000, photo: 'https://example.com/honda-civic.jpg' },
        { id: 3, make: 'Ford', model: 'F-150', year: 2021, price: 35000, transmission: 'Automatic', fuelType: 'Diesel', mileage: 20000, photo: 'https://example.com/ford-f150.jpg' },
        { id: 4, make: 'Tesla', model: 'Model 3', year: 2022, price: 45000, transmission: 'Automatic', fuelType: 'Electric', mileage: 10000, photo: 'https://example.com/tesla-model3.jpg' },
        { id: 5, make: 'BMW', model: 'X5', year: 2020, price: 55000, transmission: 'Automatic', fuelType: 'Hybrid', mileage: 25000, photo: 'https://example.com/bmw-x5.jpg' },
      ];
      setCars(mockCars);
      setFilteredCars(mockCars);
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car => 
      (filters.make === '' || car.make === filters.make) &&
      (filters.model === '' || car.model === filters.model) &&
      car.year >= filters.minYear &&
      car.year <= filters.maxYear &&
      car.price >= filters.minPrice &&
      car.price <= filters.maxPrice &&
      (filters.transmission === '' || car.transmission === filters.transmission) &&
      (filters.fuelType === '' || car.fuelType === filters.fuelType)
    );
    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      // Reset model when make changes
      if (name === 'make') {
        newFilters.model = '';
      }
      return newFilters;
    });
  };

  const carMakes = ['', ...new Set(carBrands.map(brand => brand.brand))];
  const carModels = ['', ...(filters.make ? carBrands.find(brand => brand.brand === filters.make)?.models || [] : [])];

  const maxPriceInData = Math.max(...cars.map(car => car.price), 100000);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cars List</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="make">Make</Label>
              <Select value={filters.make} onValueChange={(value) => handleFilterChange('make', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {carMakes.map((make) => (
                    <SelectItem key={make} value={make}>{make || 'All Makes'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Select value={filters.model} onValueChange={(value) => handleFilterChange('model', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {carModels.map((model) => (
                    <SelectItem key={model} value={model}>{model || 'All Models'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Year Range</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={filters.minYear}
                  onChange={(e) => handleFilterChange('minYear', parseInt(e.target.value))}
                  className="w-20"
                />
                <span>to</span>
                <Input
                  type="number"
                  value={filters.maxYear}
                  onChange={(e) => handleFilterChange('maxYear', parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
            <div>
              <Label>Price Range (OMR)</Label>
              <Slider
                min={0}
                max={maxPriceInData}
                step={1000}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={(value) => {
                  handleFilterChange('minPrice', value[0]);
                  handleFilterChange('maxPrice', value[1]);
                }}
              />
              <div className="flex justify-between mt-2">
                <span>{filters.minPrice} OMR</span>
                <span>{filters.maxPrice} OMR</span>
              </div>
            </div>
            <div>
              <Label htmlFor="transmission">Transmission</Label>
              <Select value={filters.transmission} onValueChange={(value) => handleFilterChange('transmission', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="CVT">CVT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange('fuelType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <img src={car.photo} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{car.year} {car.make} {car.model}</h2>
                <p className="text-gray-600 mb-2">Price: {car.price} OMR</p>
                <p className="text-gray-600 mb-2">Mileage: {car.mileage} km</p>
                <p className="text-gray-600 mb-2">Transmission: {car.transmission}</p>
                <p className="text-gray-600 mb-2">Fuel Type: {car.fuelType}</p>
                <Button className="w-full mt-2">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CarsList;