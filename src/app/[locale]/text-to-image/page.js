"use client";

import { useState } from 'react';
import { CameraIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [height, setHeight] = useState(256);
  const [width, setWidth] = useState(256);
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
        <div className="divider divider-secondary"></div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Text to Image Service?</h2>
          <p className="text-center max-w-2xl mx-auto">
            Our text to image service stands out from the rest. We use cutting-edge AI technology to transform your words into stunning visuals. Whether you're a content creator, marketer, or just someone looking to bring their ideas to life, our text to image tool is here to help. With our service, you can easily convert text to image, making your content more engaging and memorable. Our text to image generator is fast, accurate, and user-friendly, ensuring that you get the best possible results every time. Try our text to image converter today and see the difference it can make in your visual content creation process. From simple concepts to complex scenes, our text to image AI can handle it all. Experience the power of text to image technology and take your creativity to the next level. With our text to image tool, the only limit is your imagination. Transform your words into captivating visuals with our state-of-the-art text to image service.
          </p>
        </section>
        <div className="divider divider-secondary"></div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Text to Image Examples</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/static/images/Aries-universe.webp" alt="Aries" className="mx-auto mb-4 rounded-lg shadow-lg" />
              <h3 className="text-xl font-semibold mb-2">Aries</h3>
              <p className="text-sm">This image showcases the power of our text-to-image generator in creating a vivid representation of the Aries zodiac sign. The AI has interpreted the concept of Aries, producing a striking image that captures the essence of this fire sign - bold, energetic, and pioneering.</p>
            </div>
            <div className="text-center">
              <img src="/static/images/christmas-tree.webp" alt="Christmas Tree" className="mx-auto mb-4 rounded-lg shadow-lg" />
              <h3 className="text-xl font-semibold mb-2">Christmas Tree</h3>
              <p className="text-sm">Here, our AI has transformed the simple phrase "Christmas tree,warm" into a festive and warm image. The generated picture beautifully captures the holiday spirit, showcasing a decorated tree with twinkling lights and ornaments, evoking feelings of joy and celebration.</p>
            </div>
            <div className="text-center">
              <img src="/static/images/beautiful-girl.webp" alt="Beautiful Girl" className="mx-auto mb-4 rounded-lg shadow-lg" />
              <h3 className="text-xl font-semibold mb-2">Beautiful Girl</h3>
              <p className="text-sm">This example demonstrates our AI's ability to generate human portraits. From the prompt "beautiful girl,cute" the system has created a lifelike image, showcasing its understanding of human features, expressions, and aesthetics. This capability is particularly useful for character design or conceptual art.</p>
            </div>
          </div>
          <div className="divider divider-secondary"></div>
          <p className="mt-8 text-center max-w-2xl mx-auto">
            These examples illustrate the versatility and power of our text-to-image generator. From abstract concepts like zodiac signs to concrete objects and human portraits, our AI can create a wide range of high-quality images. This technology opens up endless possibilities for creative expression, allowing you to visualize your ideas quickly and easily. Whether you're a designer seeking inspiration, a marketer creating visual content, or an artist exploring new mediums, our text-to-image tool can help bring your visions to life. The AI's ability to interpret and visualize text prompts demonstrates its deep understanding of language and visual concepts, making it a valuable tool for various applications in art, design, and communication.
          </p>

        </section>
      </main>
    </div>
  );

}