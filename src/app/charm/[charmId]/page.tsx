'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ShinyText from '@/components/ShinyText';
import { Gloria_Hallelujah } from 'next/font/google';

const gloria = Gloria_Hallelujah({ subsets: ['latin'], weight: '400' });

type CharmImage = {
  id: number;
  imageUrl: string;
  message: string;
  charm: {
    id: number;
    charmId: string;
    name: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  guestId: string | null;
  uploadedAt: string;
};

export default function CharmPage() {
  const { charmId } = useParams();
  const [data, setData] = useState<CharmImage[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [isGuestUser, setIsGuestUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsGuestUser(!token);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/${charmId}/images`
        );

        if (res.status === 404) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        const json = await res.json();
        setData(json);

        // Updated guest/user upload detection logic
        const token = localStorage.getItem('accessToken');
        const isLoggedIn = !!token;
        const guestId = localStorage.getItem('guestId') ?? '';
        let userUploaded = false;
        let guestUploadCount = 0;
        const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const loggedInEmail = payload?.sub;

        json.forEach((item: CharmImage) => {
          if (isLoggedIn && item.user?.email === loggedInEmail) {
            userUploaded = true;
          } else if (!isLoggedIn && item.guestId) {
            if (item.guestId === guestId) {
              userUploaded = true;
            }
            guestUploadCount++;
          }
        });

        setHasUploaded(userUploaded || (!isLoggedIn && guestUploadCount >= 5));
      } catch (error) {
        console.error('Failed to fetch charm data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (charmId) {
      fetchData();
    }
  }, [charmId]);

  if (notFound) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-red-500">404 – Charm Not Found</p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </main>
    );
  }

  return (
    <main className="relative">
      {isGuestUser && (
        <section className="bg-[#affafb] text-center py-4 px-2 shadow-inner text-sm">
          <h2 className="text-lg font-bold mb-1">Welcome to Charmski!</h2>
          <p className="text-gray-800 max-w-md mx-auto mb-3">
            This is a space to celebrate and share the journey of the charm you just scanned! Upload a picture and a message to mark your moment!
          </p>
          <p className="text-gray-800 max-w-md text-left mx-auto mb-1 font-medium">
            Not sure what to upload? Try:
          </p>
          <ul className="list-disc list-inside text-left text-gray-800 max-w-md mx-auto mb-4 space-y-1">
            <li>A picture with the person you got it from</li>
            <li>A pic of the stage</li>
            <li>A selfie</li>
            <li>Anything else that captures your charm&apos;s story</li>
          </ul>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-white bg-[#af90ec] rounded-full shadow"
          >
            Upload to Begin
          </button>
        </section>
      )}
      {data?.[0]?.charm?.name ? (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{opacity:1}}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3 }}
            >
                <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-4 pt-4 pb-2 mb-6">
                    <h1 className="text-xl font-semibold">{data[0].charm.name}</h1>
                </div>
                <div className="space-y-6 pb-20">
                    {[...data].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()).map((item) => (
                    <div key={item.id} className="mb-6 px-4">
                        <div className="p-4 bg-white rounded shadow-md max-w-xs mx-auto relative">
                        <motion.div
                            initial={{ opacity: -2}}
                            animate={{opacity:1}}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 4 }}
                        >
                            <Image src={item.imageUrl} alt={`Charm ${charmId}`} width={800} height={600} className="w-full h-auto object-contain rounded" />
                        </motion.div>
                        <p className={`text-sm text-gray-700 mt-2 break-words whitespace-pre-wrap ${gloria.className}`}>{item.message}</p>
                        <p className="text-sm text-gray-600 mt-1 italic flex justify-between">
                          <span>{item.user?.name ? `– ${item.user.name}` : ''}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(item.uploadedAt).toLocaleString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </span>
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                {!isGuestUser && (
                <div className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    {showTooltip && (
                    <div className="mt-2 px-3 py-1 text-sm bg-black text-white rounded text-center max-w-xs">
                        {(() => {
                        const token = localStorage.getItem('accessToken');
                        const isLoggedIn = !!token;
                        let guestId = localStorage.getItem('guestId');
                        if (!guestId) {
                            guestId = '';
                        }
                        const userUploaded = data?.some(item => isLoggedIn && item.user?.email);
                        const guestUploads = data?.filter(item => item.guestId).length ?? 0;
                        const guestAlreadyUploaded = data?.some(item => item.guestId === guestId);

                        if (!isLoggedIn && guestId && guestAlreadyUploaded) {
                            return 'You’ve already contributed to this charm!';
                        } else if (!isLoggedIn && guestUploads >= 5) {
                            return 'This charm already has 5 guest uploads. Please sign in to contribute!';
                        } else if (isLoggedIn && userUploaded) {
                            return 'You’ve already contributed to this charm!';
                        } else {
                            return 'You’re not allowed to upload to this charm.';
                        }
                        })()}
                    </div>
                    )}
                    <button
                    onClick={() => {
                        if (hasUploaded) {
                        setShowTooltip(true);
                        setTimeout(() => setShowTooltip(false), 3000);
                        } else {
                        fileInputRef.current?.click();
                        }
                    }}
                    className={`px-6 py-3 text-white rounded-full shadow-lg ${
                        hasUploaded ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#af90ec]'
                    }`}
                    >
                    <ShinyText text="Upload"  disabled={hasUploaded} speed={3}/>
                    </button>
                </div>
                )}
            </motion.div>
        </>
      ) : (
        <div className="flex flex-col items-center pt-12 min-h-screen px-4 text-center gap-6">
          <div className="bubble bubble-fade-edges max-w-md">
            <p className="text-lg sm:text-xl font-medium text-black">
              This charm hasn&#39;t been registered yet! Upload a picture of your kandi and give it a name!
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 mt-4 text-white bg-green-600 rounded-full shadow-lg"
            >
              Register Now
            </button>
          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
              const img = new window.Image();
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

      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
          <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
            <Image src={selectedImage} alt="Selected" width={800} height={600} className="w-full mb-4 rounded" />
            {!data?.[0]?.charm?.name && (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a name for this charm"
                maxLength={32}
                className="w-full p-2 border rounded mb-4"
                required
              />
            )}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message..."
              maxLength={255}
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
                disabled={isUploading}
                onClick={async () => {
                  if (!selectedImage || !fileInputRef.current?.files?.[0] || (!data?.[0]?.charm?.name && !title.trim())) return;

                  // Validation: message and title length
                  if (message.length > 255) {
                    alert("Message must be 255 characters or fewer.");
                    return;
                  }

                  if (title.length > 32) {
                    alert("Title must be 32 characters or fewer.");
                    return;
                  }

                  setIsUploading(true); // disable button

                  try {
                    if (!data?.[0]?.charm?.name && title.trim()) {
                      const nameRes = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/${charmId}/name`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ name: title.trim() }),
                      });
                      if (!nameRes.ok) throw new Error(await nameRes.text());
                    }

                    const formData = new FormData();

                    const token = localStorage.getItem('accessToken');
                    const isLoggedIn = !!token;

                    if (!isLoggedIn) {
                      if (!localStorage.getItem('guestId')) {
                        localStorage.setItem('guestId', (crypto?.randomUUID?.() ?? 'guest-' + Math.random().toString(36).substring(2, 12)));
                      }
                      formData.append('guestId', localStorage.getItem('guestId')!);
                    }

                    formData.append('file', fileInputRef.current.files[0]);
                    formData.append('message', message);


                    console.log({
                        guestId: localStorage.getItem('guestId'),
                        file: fileInputRef.current.files[0],
                        message,
                    });
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/${charmId}/images/upload`,
                      {
                        method: 'POST',
                        headers: isLoggedIn ? { Authorization: `Bearer ${token}` } : undefined,
                        credentials: 'include',
                        body: formData,
                      }
                    );

                    if (!res.ok) throw new Error(await res.text());

                    const updatedData = await fetch(
                      `${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/${charmId}/images`
                    ).then((res) => res.json());

                    setData(updatedData);
                    setHasUploaded(true); // Immediately disable the upload button
                    setIsModalOpen(false);
                    setMessage('');
                    setSelectedImage(null);
                    setTitle('');
                    fileInputRef.current.value = '';
                  } catch (error) {
                    console.error('Upload error:', error);
                    alert(error instanceof Error ? error.message : 'Upload failed. Please try again.');
                  } finally {
                    setIsUploading(false); // re-enable button
                  }
                }}
                className={`px-4 py-2 text-white rounded ${
                  isUploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600'
                }`}
              >
                {isUploading ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}