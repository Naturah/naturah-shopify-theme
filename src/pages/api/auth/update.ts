import { NextApiRequest, NextApiResponse } from 'next';
import { getCustomerByAccessToken, updateCustomer } from '@/lib/shopify/customer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow PUT requests
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the access token from the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }
    
    const accessToken = authHeader.substring(7); // Remove 'Bearer ' from the header value

    // Verify the token is valid by getting the customer
    const existingCustomer = await getCustomerByAccessToken(accessToken);
    
    if (!existingCustomer) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Get update data from body
    const { firstName, lastName, email, password, phone } = req.body;

    // Update the customer
    const updatedCustomer = await updateCustomer(accessToken, {
      firstName,
      lastName,
      email,
      password,
      phone
    });

    if (!updatedCustomer) {
      return res.status(400).json({ message: 'Update failed' });
    }

    // Return updated customer data
    return res.status(200).json({
      customer: {
        id: updatedCustomer.id,
        email: updatedCustomer.email,
        firstName: updatedCustomer.firstName,
        lastName: updatedCustomer.lastName,
        displayName: updatedCustomer.displayName,
        phone: updatedCustomer.phone,
      }
    });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ message: 'Update failed' });
  }
} 