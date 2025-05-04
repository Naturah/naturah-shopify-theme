import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  title: string;
  handle: string;
  price: string;
  compareAtPrice?: string;
  imageSrc: string;
  altText: string;
  available: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  handle,
  price,
  compareAtPrice,
  imageSrc,
  altText,
  available
}) => {
  const onSale = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);

  return (
    <div className="group relative">
      <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-100">
        <Link href={`/products/${handle}`}>
          <div className="h-full w-full relative">
            <Image
              src={imageSrc}
              alt={altText || title}
              fill
              className="object-cover object-center transition-opacity group-hover:opacity-75"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          </div>
        </Link>
        {!available && (
          <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Sold out
          </div>
        )}
        {onSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Sale
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            <Link href={`/products/${handle}`} className="hover:text-green-700">
              {title}
            </Link>
          </h3>
        </div>
        <div className="text-sm font-medium">
          {onSale ? (
            <div className="flex items-center gap-1">
              <span className="text-red-600">{price}</span>
              <span className="text-gray-500 line-through text-xs">{compareAtPrice}</span>
            </div>
          ) : (
            <span className="text-gray-900">{price}</span>
          )}
        </div>
      </div>
      <div className="mt-2">
        <button 
          disabled={!available}
          className={`w-full py-2 px-4 rounded ${
            available 
              ? 'bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {available ? 'Add to cart' : 'Sold out'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 