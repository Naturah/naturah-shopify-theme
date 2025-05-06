import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShopifyCustomer } from '@/lib/shopify/customer';

interface AuthContextType {
  user: ShopifyCustomer | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  updateUser: (userData: Partial<ShopifyCustomer>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ShopifyCustomer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for authentication on initial load
    const storedToken = localStorage.getItem('shopifyAccessToken');
    const storedUserData = localStorage.getItem('shopifyUserData');
    
    if (storedToken && storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setUser(userData);
        setAccessToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('shopifyAccessToken');
        localStorage.removeItem('shopifyUserData');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Login user
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        return false;
      }

      const data = await response.json();
      
      if (data.customer && data.accessToken) {
        setUser(data.customer);
        setAccessToken(data.accessToken);
        
        // Store in localStorage
        localStorage.setItem('shopifyAccessToken', data.accessToken);
        localStorage.setItem('shopifyUserData', JSON.stringify(data.customer));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register new user
  const register = async (
    email: string, 
    password: string, 
    firstName?: string, 
    lastName?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
        return false;
      }

      const data = await response.json();
      
      if (data.customer && data.accessToken) {
        setUser(data.customer);
        setAccessToken(data.accessToken);
        
        // Store in localStorage
        localStorage.setItem('shopifyAccessToken', data.accessToken);
        localStorage.setItem('shopifyUserData', JSON.stringify(data.customer));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = async (): Promise<boolean> => {
    if (!accessToken) return true;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // Clear local state even if the API call fails
      setUser(null);
      setAccessToken(null);
      
      // Remove from localStorage
      localStorage.removeItem('shopifyAccessToken');
      localStorage.removeItem('shopifyUserData');
      
      return response.ok;
    } catch (error) {
      console.error('Logout error:', error);
      
      // Still clear local state on error
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('shopifyAccessToken');
      localStorage.removeItem('shopifyUserData');
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user data
  const updateUser = async (userData: Partial<ShopifyCustomer>): Promise<boolean> => {
    if (!accessToken || !user) return false;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Update failed:', errorData.message);
        return false;
      }

      const data = await response.json();
      
      if (data.customer) {
        // Update local state
        setUser(data.customer);
        
        // Update localStorage
        localStorage.setItem('shopifyUserData', JSON.stringify(data.customer));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Update error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    accessToken,
    isLoading,
    isAuthenticated: !!user && !!accessToken,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 