import { NextApiRequest, NextApiResponse } from 'next';
import { getCustomerByAccessToken } from '@/lib/shopify/customer';
import { listFiles } from '@/lib/shopify/files';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get the access token from the Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }
  
  const accessToken = authHeader.substring(7); // Remove 'Bearer ' from the header value

  try {
    // Verify the user is authenticated
    const customer = await getCustomerByAccessToken(accessToken);
    
    if (!customer) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Get query parameters
    const { tags } = req.query;
    
    // Fetch files associated with this customer
    const files = await listFiles({
      customerId: customer.id,
      tags: tags ? Array.isArray(tags) ? tags : [tags as string] : undefined,
    });

    // Return files
    return res.status(200).json({
      files,
      count: files.length,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return res.status(500).json({ message: 'Failed to fetch images' });
  }
} 