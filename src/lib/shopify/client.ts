/**
 * Shopify API Client Configuration
 */
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
import { adminClientApi } from '@shopify/admin-api-client';

// Environment variables should be set in .env.local file
const SHOP_NAME = process.env.SHOPIFY_STORE_DOMAIN || '';
const ADMIN_API_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || '';
const STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN || '';

if (!SHOP_NAME || !ADMIN_API_ACCESS_TOKEN || !STOREFRONT_API_TOKEN) {
  console.warn(
    'Missing Shopify API credentials. Please add them to your .env.local file.'
  );
}

// Initialize Shopify API
export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY || '',
  apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
  scopes: ['read_products', 'write_customers', 'read_customers', 'write_files', 'read_files'],
  hostName: SHOP_NAME.replace('.myshopify.com', ''),
  apiVersion: ApiVersion.January24,
  isEmbeddedApp: false,
});

// Initialize Admin API Client
export const adminClient = adminClientApi({
  apiVersion: '2024-01',
  accessToken: ADMIN_API_ACCESS_TOKEN,
  apiUrl: `https://${SHOP_NAME}/admin/api`,
});

// STOREFRONT API URL
export const STOREFRONT_API_URL = `https://${SHOP_NAME}/api/2024-01/graphql.json`;

// Helper function for storefront API requests
export async function storefrontApiRequest(query: string, variables = {}) {
  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Shopify Storefront API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error making Storefront API request:', error);
    throw error;
  }
} 