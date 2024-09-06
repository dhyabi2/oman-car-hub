import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const ImageGallery = ({ photos, make, model, t }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => setSelectedImage(image);
  const closeImage = () => setSelectedImage(null);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">{t.photos}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos && photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`${make} ${model}`}
            className="w-full h-40 object-cover rounded cursor-pointer"
            onClick={() => openImage(photo)}
          />
        ))}
      </div>
      <Dialog open={!!selectedImage} onOpenChange={closeImage}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <ScrollArea className="w-full h-full">
            <img
              src={selectedImage}
              alt={`${make} ${model} full size`}
              className="w-full h-auto object-contain"
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;