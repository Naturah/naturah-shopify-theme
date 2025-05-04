import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '../../components/layout/Layout';
import { getAllProducts, getProductByHandle } from '../../lib/shopify';
import { useCart } from '../../context/CartContext';

interface ProductImage {
  src: string;
  altText: string;
  width?: number;
  height?: number;
}

interface ProductVariant {
  id: string;
  title: string;
  available: boolean;
  price: string;
  compareAtPrice: string | null;
  selectedOptions: { name: string; value: string }[];
}

interface ProductOption {
  name: string;
  values: string[];
}

interface ProductProps {
  product: {
    id: string;
    title: string;
    handle: string;
    description: string;
    images: ProductImage[];
    options: ProductOption[];
    variants: ProductVariant[];
  } | null;
}

export default function ProductPage({ product }: ProductProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] || null
  );
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    product?.options.reduce((options, option) => {
      options[option.name] = option.values[0];
      return options;
    }, {} as Record<string, string>) || {}
  );

  // Handle loading state and non-existent products
  if (router.isFallback || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-6 w-64"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
              <div className="md:w-1/2">
                <div className="h-8 bg-gray-200 rounded mb-4 w-36"></div>
                <div className="h-6 bg-gray-200 rounded mb-6 w-24"></div>
                <div className="h-32 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Update selected variant when options change
  const updateSelectedVariant = (name: string, value: string) => {
    const newSelectedOptions = { ...selectedOptions, [name]: value };
    setSelectedOptions(newSelectedOptions);

    // Find the variant that matches all selected options
    const matchingVariant = product.variants.find((variant) => {
      return variant.selectedOptions.every(
        (option) => newSelectedOptions[option.name] === option.value
      );
    });

    setSelectedVariant(matchingVariant || null);
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart({
      id: selectedVariant.id,
      variantId: selectedVariant.id,
      title: product.title,
      handle: product.handle,
      imageSrc: product.images[0]?.src || '',
      altText: product.images[0]?.altText || product.title,
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice,
      options: selectedVariant.selectedOptions,
    }, quantity);
  };

  return (
    <Layout>
      <Head>
        <title>{product.title} | Naturah</title>
        <meta name="description" content={product.description.substring(0, 160)} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="relative h-96 mb-4 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[0]?.src || '/placeholder-product.jpg'}
                alt={product.images[0]?.altText || product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.slice(0, 5).map((image, index) => (
                  <div key={index} className="relative h-20 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.altText || `${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover cursor-pointer hover:opacity-80"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <div className="mb-6">
              <span className="text-xl font-semibold text-gray-900 mr-2">
                {selectedVariant?.price}
              </span>
              {selectedVariant?.compareAtPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {selectedVariant.compareAtPrice}
                </span>
              )}
            </div>

            {/* Product Description */}
            <div className="prose prose-green mb-8" dangerouslySetInnerHTML={{ __html: product.description }} />

            {/* Product Options */}
            {product.options.map((option) => (
              <div key={option.name} className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {option.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      onClick={() => updateSelectedVariant(option.name, value)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedOptions[option.name] === value
                          ? 'bg-green-700 text-white border-green-700'
                          : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-4 py-2 text-gray-700 flex-1 text-center">{quantity}</span>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.available}
              className={`w-full py-3 px-6 rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                selectedVariant?.available
                  ? 'bg-green-700 text-white hover:bg-green-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedVariant?.available ? 'Add to Cart' : 'Sold Out'}
            </button>

            {/* Additional Info */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex items-center mb-4">
                <svg className="h-5 w-5 text-green-700 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-700 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-600">30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await getAllProducts();
    
    const paths = products.map((product) => ({
      params: { handle: product.handle },
    }));
    
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Error generating product paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const handle = params?.handle as string;
    const product = await getProductByHandle(handle);
    
    return {
      props: {
        product,
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return {
      props: {
        product: null,
      },
      revalidate: 60 * 5, // Try again in 5 minutes if there was an error
    };
  }
}; 