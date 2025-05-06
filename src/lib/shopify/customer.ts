/**
 * Shopify Customer Authentication Utilities
 */
import { storefrontApiRequest } from './client';

/**
 * Customer interface
 */
export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phone?: string;
  defaultAddress?: any;
  addresses?: any[];
  orders?: any[];
  accessToken?: string;
}

/**
 * Login a customer with email and password
 */
export async function customerLogin(email: string, password: string): Promise<ShopifyCustomer | null> {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      password,
    },
  };

  try {
    const response = await storefrontApiRequest(mutation, variables);
    
    if (
      response.data?.customerAccessTokenCreate?.customerUserErrors?.length > 0
    ) {
      const errors = response.data.customerAccessTokenCreate.customerUserErrors;
      console.error('Customer login errors:', errors);
      return null;
    }

    const accessToken = response.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
    
    if (!accessToken) {
      return null;
    }

    // Get customer data with the access token
    return await getCustomerByAccessToken(accessToken);
  } catch (error) {
    console.error('Error during customer login:', error);
    return null;
  }
}

/**
 * Register a new customer
 */
export async function customerRegister(
  email: string, 
  password: string, 
  firstName?: string, 
  lastName?: string,
  phone?: string
): Promise<ShopifyCustomer | null> {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName,
      phone,
      acceptsMarketing: true,
    },
  };

  try {
    const response = await storefrontApiRequest(mutation, variables);
    
    if (response.data?.customerCreate?.customerUserErrors?.length > 0) {
      const errors = response.data.customerCreate.customerUserErrors;
      console.error('Customer registration errors:', errors);
      return null;
    }

    // Login the customer after successful registration
    return await customerLogin(email, password);
  } catch (error) {
    console.error('Error during customer registration:', error);
    return null;
  }
}

/**
 * Get customer data using access token
 */
export async function getCustomerByAccessToken(accessToken: string): Promise<ShopifyCustomer | null> {
  const query = `
    query {
      customer(customerAccessToken: "${accessToken}") {
        id
        email
        firstName
        lastName
        displayName
        phone
        defaultAddress {
          id
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        addresses(first: 5) {
          edges {
            node {
              id
              address1
              address2
              city
              province
              country
              zip
              phone
            }
          }
        }
        orders(first: 5) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              currentTotalPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await storefrontApiRequest(query);
    
    if (!response.data?.customer) {
      return null;
    }

    const customer = response.data.customer;
    
    // Format the response to match our ShopifyCustomer interface
    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      displayName: customer.displayName,
      phone: customer.phone,
      defaultAddress: customer.defaultAddress,
      addresses: customer.addresses?.edges?.map((edge: any) => edge.node) || [],
      orders: customer.orders?.edges?.map((edge: any) => edge.node) || [],
      accessToken: accessToken,
    };
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return null;
  }
}

/**
 * Update customer information
 */
export async function updateCustomer(
  accessToken: string, 
  customerInfo: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
  }
): Promise<ShopifyCustomer | null> {
  const mutation = `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          email
          firstName
          lastName
          displayName
          phone
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: accessToken,
    customer: {
      ...customerInfo,
    },
  };

  try {
    const response = await storefrontApiRequest(mutation, variables);
    
    if (response.data?.customerUpdate?.customerUserErrors?.length > 0) {
      const errors = response.data.customerUpdate.customerUserErrors;
      console.error('Customer update errors:', errors);
      return null;
    }

    // Get updated customer data
    return await getCustomerByAccessToken(accessToken);
  } catch (error) {
    console.error('Error updating customer data:', error);
    return null;
  }
}

/**
 * Logout customer (revoke access token)
 */
export async function customerLogout(accessToken: string): Promise<boolean> {
  const mutation = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: accessToken,
  };

  try {
    const response = await storefrontApiRequest(mutation, variables);
    
    if (response.data?.customerAccessTokenDelete?.userErrors?.length > 0) {
      console.error('Customer logout errors:', response.data.customerAccessTokenDelete.userErrors);
      return false;
    }

    return !!response.data?.customerAccessTokenDelete?.deletedAccessToken;
  } catch (error) {
    console.error('Error during customer logout:', error);
    return false;
  }
} 