import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '../components/layout/Layout';
import CollectionGrid from '../components/collection/CollectionGrid';
import { getAllProducts, getAllCollections } from '../lib/shopify';

interface Product {
  id: string;
  title: string;
  handle: string;
  price: string;
  compareAtPrice?: string;
  imageSrc: string;
  altText: string;
  available: boolean;
}

interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  imageSrc: string;
  altText: string;
}

interface HomePageProps {
  featuredProducts: Product[];
  collections: Collection[];
}

export default function HomePage({ featuredProducts, collections }: HomePageProps) {
  return (
    <Layout>
      <Head>
        <title>Naturah | Premium Watercolor Kits & Art Supplies</title>
        <meta name="description" content="Naturah offers premium watercolor kits and art supplies for artists of all levels. Discover our collection of watercolor paints, brushes, and paper." />
      </Head>

      {/* Hero Section */}
      <div className="relative">
        <div className="w-full h-[70vh] relative">
          <Image
            src="/placeholder-hero.jpg"
            alt="Naturah watercolor paints and brushes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Premium Watercolor Kits
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8">
              Artist-grade supplies for your creative journey
            </p>
            <Link
              href="/collections/all"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <CollectionGrid products={featuredProducts} />
        <div className="mt-12 text-center">
          <Link
            href="/collections/all"
            className="inline-block bg-white border border-gray-300 hover:border-gray-400 text-gray-800 px-6 py-3 rounded-md text-base font-medium transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link 
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group block overflow-hidden rounded-lg"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={collection.imageSrc || '/placeholder-collection.jpg'}
                    alt={collection.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white">{collection.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Artist-grade materials for vibrant colors and smooth application</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
            <p className="text-gray-600">Sustainable materials and environmentally conscious manufacturing</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a4 4 0 00-4-4H8.8a4 4 0 00-3.9 3.8L4 12c-.1.6 0 1.2.2 1.8m8-10V3m0 0v3m0-3h3m-3 0H9m1.8 14.8L8.8 19c-1 0-1.9-.3-2.6-.9-.8-.7-1.2-1.6-1.2-2.7 0-2.2 1.8-4 4-4h2c1.9 0 3.5 1.3 3.9 3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Perfect for All Levels</h3>
            <p className="text-gray-600">Whether you're a beginner or professional, our products help you create beautiful art</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to get updates on new products, special offers, and creative inspiration.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-r-md font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [featuredProducts, collections] = await Promise.all([
      getAllProducts(8), // Fetch 8 featured products
      getAllCollections()
    ]);

    return {
      props: {
        featuredProducts,
        collections
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching data for homepage:', error);
    
    // Return empty data if there's an error
    return {
      props: {
        featuredProducts: [],
        collections: []
      },
      revalidate: 60 * 5, // Try again in 5 minutes if there was an error
    };
  }
}; 