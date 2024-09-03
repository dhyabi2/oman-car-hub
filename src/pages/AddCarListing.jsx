import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

const AddCarListing = () => {
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
    // Here you would typically send the data to your backend
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add a Car for Sale</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <FormField
            control={form.control}
            name="fuel_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG"].map((option) => (
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
          <FormField
            control={form.control}
            name="engine_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Engine Size (cc)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number_of_doors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Doors</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of doors" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["2", "3", "4", "5"].map((option) => (
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
          <FormField
            control={form.control}
            name="number_of_seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Seats</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of seats" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["2", "4", "5", "7", "8"].map((option) => (
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
          <FormField
            control={form.control}
            name="drivetrain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drivetrain</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select drivetrain" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["FWD", "RWD", "AWD", "4WD"].map((option) => (
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
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["New", "Used", "Certified Pre-Owned"].map((option) => (
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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (OMR)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VIN (Vehicle Identification Number)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seller_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seller Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select seller type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Private", "Dealer"].map((option) => (
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="listing_expiration_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Expiration Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} onChange={(e) => field.onChange(new Date(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additional_features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Features</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit Listing</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddCarListing;