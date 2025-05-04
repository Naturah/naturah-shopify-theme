/**
 * Shopify Storefront API client
 * 
 * This module handles the interaction with Shopify's Storefront API,
 * providing methods to fetch products, collections, and manage cart functionality.
 */

// Environment variables to be defined in .env.local
// NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
// NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_api_token

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = '2023-10'; // Update to latest API version

/**
 * Creates a Shopify Storefront API client
 */
export async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  try {
    const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

    const options = {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`Error fetching from Shopify: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(
        `GraphQL Error: ${data.errors.map((err: any) => err.message).join(', ')}`
      );
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw error;
  }
}

/**
 * Fetches all products from Shopify
 */
export async function getAllProducts(first = 20) {
  const query = `
    query GetAllProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { first },
  });

  const products = response?.products?.edges?.map(({ node }: any) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    imageSrc: node.images.edges[0]?.node.url || '',
    altText: node.images.edges[0]?.node.altText || node.title,
    price: formatPrice(node.priceRange.minVariantPrice),
    compareAtPrice: 
      node.compareAtPriceRange.minVariantPrice.amount > 0
        ? formatPrice(node.compareAtPriceRange.minVariantPrice)
        : null,
    available: node.variants.edges[0]?.node.availableForSale || false,
  })) || [];

  return products;
}

/**
 * Fetches a single product by handle
 */
export async function getProductByHandle(handle: string) {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { handle },
  });

  const product = response?.productByHandle;
  
  if (!product) {
    return null;
  }

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    images: product.images.edges.map(({ node }: any) => ({
      src: node.url,
      altText: node.altText || product.title,
      width: node.width,
      height: node.height,
    })),
    options: product.options,
    variants: product.variants.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      available: node.availableForSale,
      price: formatPrice(node.price),
      compareAtPrice: node.compareAtPrice ? formatPrice(node.compareAtPrice) : null,
      selectedOptions: node.selectedOptions,
    })),
  };
}

/**
 * Formats the price according to the currency
 */
function formatPrice({ amount, currencyCode }: { amount: string; currencyCode: string }) {
  const price = parseInt(amount, 10);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
}

/**
 * Fetches all collections
 */
export async function getAllCollections(first = 20) {
  const query = `
    query GetAllCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { first },
  });

  const collections = response?.collections?.edges?.map(({ node }: any) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    imageSrc: node.image?.url || '',
    altText: node.image?.altText || node.title,
  })) || [];

  return collections;
}

/**
 * Fetches products by collection handle
 */
export async function getProductsByCollection(handle: string, first = 20) {
  const query = `
    query GetProductsByCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        title
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { handle, first },
  });

  const collection = response?.collectionByHandle;
  
  if (!collection) {
    return { title: '', products: [] };
  }

  const products = collection.products.edges.map(({ node }: any) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    imageSrc: node.images.edges[0]?.node.url || '',
    altText: node.images.edges[0]?.node.altText || node.title,
    price: formatPrice(node.priceRange.minVariantPrice),
    compareAtPrice: 
      node.compareAtPriceRange.minVariantPrice.amount > 0
        ? formatPrice(node.compareAtPriceRange.minVariantPrice)
        : null,
    available: node.variants.edges[0]?.node.availableForSale || false,
  }));

  return {
    title: collection.title,
    products
  };
} 