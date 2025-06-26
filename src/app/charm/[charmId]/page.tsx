'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';

type CharmImage = {
  id: number;
  imageUrl: string;
  message: string;
  charm: {
    id: number;
    charmId: string;
    name: string;
  };
};

export default function CharmPage() {
  const { charmId } = useParams();
  const [data, setData] = useState<CharmImage[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/${charmId}/images`
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch charm data:', error);
      }
    }

    if (charmId) {
      fetchData();
    }
  }, [charmId]);

  return (
    <main className="relative">
      <div className="space-y-6 pb-20">
        {[...data || []].reverse().map((item) => (
          <div key={item.id} className="mb-6 px-4">
            <div className="p-4 bg-white rounded shadow-md">
              <img src={item.imageUrl} alt={`Charm ${charmId}`} className="w-full h-auto object-contain rounded" />
              <p className="text-sm text-gray-700 mt-2">{item.message}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 text-white bg-blue-600 rounded-full shadow-lg"
      >
        Upload
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
              const img = new Image();
              img.src = reader.result as string;
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxSize = 1024;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                  if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                  }
                } else {
                  if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                  }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.drawImage(img, 0, 0, width, height);
                  canvas.toBlob((blob) => {
                    if (blob) {
                      const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
                      setSelectedImage(URL.createObjectURL(compressedFile));
                      fileInputRef.current!.files = new DataTransfer().files;
                      const dt = new DataTransfer();
                      dt.items.add(compressedFile);
                      fileInputRef.current!.files = dt.files;
                      setIsModalOpen(true);
                    }
                  }, 'image/jpeg', 0.75);
                }
              };
            };
            reader.readAsDataURL(file);
          }
        }}
        className="hidden"
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
          <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
            {selectedImage && (
              <img src={selectedImage} alt="Selected" className="w-full mb-4 rounded" />
            )}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message..."
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!selectedImage || !fileInputRef.current?.files?.[0]) return;

                  const formData = new FormData();
                  formData.append('file', fileInputRef.current.files[0]);
                  formData.append('message', message);

                  try {
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/${charmId}/images/upload`,
                      {
                        method: 'POST',
                        credentials: 'include',
                        body: formData,
                      }
                    );
                    if (res.ok) {
                      setIsModalOpen(false);
                      setMessage('');
                      setSelectedImage(null);
                      fileInputRef.current.value = '';
                      const updatedData = await fetch(
                        `${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/${charmId}/images`
                      ).then((res) => res.json());
                      setData(updatedData);
                    } else {
                      console.error('Upload failed:', await res.text());
                    }
                  } catch (error) {
                    console.error('Upload error:', error);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}