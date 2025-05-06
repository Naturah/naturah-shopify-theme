import { NextApiRequest, NextApiResponse } from 'next';
import { customerLogin } from '@/lib/shopify/customer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Attempt to login
    const customer = await customerLogin(email, password);

    if (!customer || !customer.accessToken) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return customer data and access token
    return res.status(200).json({
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        displayName: customer.displayName,
        phone: customer.phone,
        defaultAddress: customer.defaultAddress,
      },
      accessToken: customer.accessToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Authentication failed' });
  }
} 