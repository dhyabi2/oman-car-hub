import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const carBrands = [
  // ... (existing carBrands array)
];

const formSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  mileage: z.number().int().min(0),
  transmission: z.enum(["Automatic", "Manual", "Semi-Automatic", "CVT"]),
  fuel_type: z.enum(["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG"]),
  engine_size: z.number().int().min(0).optional(),
  color: z.string().min(1, "Color is required"),
  number_of_doors: z.enum(["2", "3", "4", "5"]),
  number_of_seats: z.enum(["2", "4", "5", "7", "8"]),
  drivetrain: z.enum(["FWD", "RWD", "AWD", "4WD"]),
  condition: z.enum(["New", "Used", "Certified Pre-Owned"]),
  price: z.number().min(0),
  vin: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  seller_type: z.enum(["Private", "Dealer"]),
  description: z.string().optional(),
  contact_phone: z.string().min(1, "Contact phone is required"),
  listing_expiration_date: z.date().optional(),
  additional_features: z.string().optional(),
});

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [cars, setCars] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      mileage: 0,
      transmission: "Automatic",
      fuel_type: "Petrol",
      engine_size: 0,
      color: "",
      number_of_doors: "4",
      number_of_seats: "5",
      drivetrain: "FWD",
      condition: "Used",
      price: 0,
      vin: "",
      location: "",
      seller_type: "Private",
      description: "",
      contact_phone: "",
      additional_features: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setCars([...cars, data]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Oman Auto Mart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="h-[calc(100vh-12rem)] overflow-hidden">
          <CardContent className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Car Brands</h2>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {carBrands.map((brand, index) => (
                  <Button
                    key={index}
                    variant={selectedBrand === brand ? "default" : "outline"}
                    className="w-full h-24 flex flex-col items-center justify-center p-2 space-y-1"
                    onClick={() => {
                      setSelectedBrand(brand);
                      setSelectedModel(null);
                    }}
                  >
                    <img src={brand.logo} alt={`${brand.brand} logo`} className="w-8 h-8 object-contain" />
                    <span className="text-xs font-semibold text-center line-clamp-1">{brand.brand}</span>
                    <span className="text-xs text-gray-500">Est. {brand.founded}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="h-[calc(100vh-12rem)] overflow-hidden">
          <CardContent className="p-4">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedBrand ? `${selectedBrand.brand} Models` : "Select a Brand"}
            </h2>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {selectedBrand && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {selectedBrand.models.map((model, index) => (
                    <Button
                      key={index}
                      variant={selectedModel === model ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setSelectedModel(model)}
                    >
                      {model}
                    </Button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {selectedModel && (
        <Card className="mt-8">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Available Cars</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Car</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add a Car for Sale</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="make"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Make</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mileage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mileage (km)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transmission</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select transmission" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["Automatic", "Manual", "Semi-Automatic", "CVT"].map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Add more form fields here following the same pattern */}
                      <Button type="submit">Submit Listing</Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="h-[300px]">
              {cars.length > 0 ? (
                <div className="space-y-4">
                  {cars.map((car, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold">{car.make} {car.model} ({car.year})</h3>
                        <p>Price: {car.price} OMR</p>
                        <p>Mileage: {car.mileage} km</p>
                        <p>Transmission: {car.transmission}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No cars available for this model. Add a car to see it listed here.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;