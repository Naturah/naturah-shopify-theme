import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Layout from '../../components/layout/Layout';
import CollectionGrid from '../../components/collection/CollectionGrid';
import { getAllCollections, getProductsByCollection } from '../../lib/shopify';

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

interface CollectionProps {
  title: string;
  handle: string;
  products: Product[];
}

export default function CollectionPage({ title, handle, products }: CollectionProps) {
  const router = useRouter();

  // Handle loading state
  if (router.isFallback) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-12 w-64"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="mb-8">
                  <div className="h-72 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{title || handle} | Naturah Collections</title>
        <meta 
          name="description" 
          content={`Shop ${title || 'our collection'} of premium watercolor kits and art supplies at Naturah.`} 
        />
      </Head>

      <div className="bg-gray-100">
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src="/placeholder-collection-banner.jpg"
            alt={title || handle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              {title || handle}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Collection description would go here */}
        
        {/* Filter and sort options could go here */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                name="sort"
                className="border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-gray-700 focus:ring-green-500 focus:border-green-500"
                defaultValue="featured"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products */}
        <CollectionGrid products={products} />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const collections = await getAllCollections();
    
    const paths = collections.map((collection) => ({
      params: { handle: collection.handle },
    }));
    
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Error generating collection paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const handle = params?.handle as string;
    const { title, products } = await getProductsByCollection(handle);
    
    return {
      props: {
        title,
        handle,
        products,
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching collection data:', error);
    return {
      props: {
        title: '',
        handle: params?.handle || '',
        products: [],
      },
      revalidate: 60 * 5, // Try again in 5 minutes if there was an error
    };
  }
}; 