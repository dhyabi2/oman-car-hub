import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CarsList = () => {
  // This is dummy data. In a real application, you'd fetch this from an API or database
  const cars = [
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2020, price: 25000 },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2019, price: 22000 },
    { id: 3, brand: 'Ford', model: 'Mustang', year: 2021, price: 35000 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cars List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.brand}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>${car.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CarsList;