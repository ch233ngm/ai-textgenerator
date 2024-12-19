"use client";

import { useState } from 'react';
import { CameraIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const parsedHeight = parseInt(height);
    const parsedWidth = parseInt(width);

    if (isNaN(parsedHeight) || isNaN(parsedWidth) || 
        parsedHeight < 256 || parsedHeight > 2048 || 
        parsedWidth < 256 || parsedWidth > 2048) {
      setError('Height and width must be between 256 and 2048 pixels.');
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/text-to-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, height: parsedHeight, width: parsedWidth }),
      });
      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating the image.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Text to Image Generator</h1>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your text
            </label>
            <textarea
              id="inputText"
              rows="4"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-2">
                Width (px)
              </label>
              <input
                id="width"
                type="number"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="256-2048"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                Height (px)
              </label>
              <input
                id="height"
                type="number"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="256-2048"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <CameraIcon className="w-5 h-5 mr-2" />
                Generate Image
              </>
            )}
          </button>
        </form>

        {imageUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Generated Image</h2>
            <img src={imageUrl} alt="Generated image" className="mx-auto max-w-full h-auto rounded-lg shadow-lg" />
          </div>
        )}

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">About Text to Image</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Instant text to image conversion</li>
                <li>High-quality image generation</li>
                <li>User-friendly interface</li>
                <li>Fast processing times</li>
                <li>Wide range of image styles</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">FAQ</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">What is text to image?</dt>
                  <dd>Text to image is a technology that converts textual descriptions into visual representations.</dd>
                </div>
                <div>
                  <dt className="font-medium">How does text to image work?</dt>
                  <dd>Text to image uses advanced AI models to interpret text and generate corresponding images.</dd>
                </div>
                <div>
                  <dt className="font-medium">Is text to image accurate?</dt>
                  <dd>Text to image accuracy depends on the AI model and the clarity of the input text.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Text to Image Service?</h2>
          <p className="text-center max-w-2xl mx-auto">
            Our text to image service stands out from the rest. We use cutting-edge AI technology to transform your words into stunning visuals. Whether you're a content creator, marketer, or just someone looking to bring their ideas to life, our text to image tool is here to help. With our service, you can easily convert text to image, making your content more engaging and memorable. Our text to image generator is fast, accurate, and user-friendly, ensuring that you get the best possible results every time. Try our text to image converter today and see the difference it can make in your visual content creation process. From simple concepts to complex scenes, our text to image AI can handle it all. Experience the power of text to image technology and take your creativity to the next level. With our text to image tool, the only limit is your imagination. Transform your words into captivating visuals with our state-of-the-art text to image service.
          </p>
        </section>
      </main>
    </div>
  );

}