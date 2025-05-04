import React from 'react';
import ProductCard from '../product/ProductCard';

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

interface CollectionGridProps {
  products: Product[];
  title?: string;
}

const CollectionGrid: React.FC<CollectionGridProps> = ({ products, title }) => {
  return (
    <div className="mt-8">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              handle={product.handle}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              imageSrc={product.imageSrc}
              altText={product.altText}
              available={product.available}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionGrid; 