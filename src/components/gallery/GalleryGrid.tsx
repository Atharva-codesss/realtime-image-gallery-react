import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchImages } from "../../lib/unsplash";
import ImageModal from "../image/ImageModal";

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["images", 1],
    queryFn: () => fetchImages(1),
  });

  if (isLoading) {
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="break-inside-avoid mb-4 rounded-lg bg-gray-800 overflow-hidden animate-pulse"
          >
            <div className="w-full aspect-square bg-gray-700/50" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-red-400 text-lg">Error loading images</div>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {data.map((img: any) => (
          <div
            key={img.id}
            className="break-inside-avoid mb-4 rounded-lg bg-gray-800 overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
