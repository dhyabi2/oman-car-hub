import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddCar = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Car</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" placeholder="Enter car brand" />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input id="model" placeholder="Enter car model" />
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Select>
            <SelectTrigger id="year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" placeholder="Enter price" />
        </div>
        <Button type="submit" className="w-full">Add Car</Button>
      </form>
    </div>
  );
};

export default AddCar;