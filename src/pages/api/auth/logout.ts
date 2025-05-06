import { NextApiRequest, NextApiResponse } from 'next';
import { customerLogout } from '@/lib/shopify/customer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the access token from the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }
    
    const accessToken = authHeader.substring(7); // Remove 'Bearer ' from the header value

    // Attempt to logout
    const success = await customerLogout(accessToken);

    if (!success) {
      return res.status(400).json({ message: 'Logout failed' });
    }

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Logout failed' });
  }
} 