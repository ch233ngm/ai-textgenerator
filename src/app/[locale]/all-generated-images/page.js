"use client";

import { useState, useEffect } from 'react';
import { CameraIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchAlert, setShowSearchAlert] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/all-generated-images`);
      const data = await response.json();

      let images = data.images.map((url, index) => ({
        url: url,
        title: url.split('/').pop().split('.')[0],
        description: `Generated image ${index + 1}`
      }));

      setImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSearchAlert(true);
    setTimeout(() => setShowSearchAlert(false), 3000); // 3秒后隐藏提示
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center mr-4">
              <CameraIcon className="h-8 w-8 mr-2" />
              Image Gallery
            </h1>
            <span className="text-sm text-gray-500">
              Total Images: {images.length}
            </span>
          </div>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search images..."
              className="input input-bordered w-full max-w-xs pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </button>
          </form>
        </div>
      </header>

      {showSearchAlert && (
        <div className="alert alert-info shadow-lg max-w-md mx-auto mt-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Search functionality is not yet implemented.</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <figure className="px-4 pt-4">
                  <img
                    src={image.url}
                    alt={image.title || `Image ${index + 1}`}
                    className="rounded-xl object-cover w-full h-48"
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-sm">{image.title || `Image ${index + 1}`}</h2>
                  <p className="text-xs text-gray-500">{image.description || 'No description available'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}