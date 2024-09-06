import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ photos, make, model, t }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeImage = () => setSelectedImage(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">{t.photos}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos && photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`${make} ${model}`}
            className="w-full h-40 object-cover rounded cursor-pointer transition-transform hover:scale-105"
            onClick={() => openImage(photo, index)}
          />
        ))}
      </div>
      <Dialog open={!!selectedImage} onOpenChange={closeImage}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <ScrollArea className="w-full h-full relative">
            <img
              src={photos[currentIndex]}
              alt={`${make} ${model} full size`}
              className="w-full h-auto object-contain"
            />
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;