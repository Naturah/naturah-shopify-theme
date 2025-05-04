export const env = {
    // Shopify Storefront API Configuration
    SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'naturah-shop.myshopify.com',
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    
    // Site Configuration
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  };