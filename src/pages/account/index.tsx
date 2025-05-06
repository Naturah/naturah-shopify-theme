import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '@/context/auth/AuthContext';
import ImageUploader from '@/components/account/ImageUploader';

const AccountPage: NextPage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch user's uploaded images
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserImages();
    }
  }, [isAuthenticated, user]);

  const fetchUserImages = async () => {
    try {
      const response = await fetch('/api/shopify/images', {
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUploadedImages(data.files || []);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push('/');
    }
  };

  const handleUploadSuccess = (fileData: any) => {
    setNotification({
      type: 'success',
      message: 'Your artwork was uploaded successfully!'
    });
    
    // Add new image to the list
    setUploadedImages(prev => [fileData, ...prev]);
    
    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleUploadError = (error: string) => {
    setNotification({
      type: 'error',
      message: error
    });
    
    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>My Account | Naturah</title>
        <meta name="description" content="Manage your account and upload your watercolor artwork" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Notification banner */}
        {notification && (
          <div 
            className={`mb-6 p-4 rounded-md ${
              notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                {notification.type === 'success' ? (
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {notification.message}
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    onClick={() => setNotification(null)}
                    className={`inline-flex rounded-md p-1.5 ${
                      notification.type === 'success' ? 'text-green-500 hover:bg-green-100' : 'text-red-500 hover:bg-red-100'
                    }`}
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User profile section */}
        <div className="bg-white shadow rounded-lg mb-8 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Account</h1>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
            >
              Log out
            </button>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <dl className="divide-y divide-gray-200">
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  {user?.displayName || `${user?.firstName || ''} ${user?.lastName || ''}`}
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="text-sm text-gray-900 col-span-2">{user?.email}</dd>
              </div>
              {user?.phone && (
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{user?.phone}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Image uploader section */}
        <div className="mb-12">
          <ImageUploader 
            onSuccess={handleUploadSuccess} 
            onError={handleUploadError} 
          />
        </div>

        {/* User's uploaded images */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Watercolor Gallery</h2>
          
          {uploadedImages.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">
                You haven't uploaded any watercolor artwork yet. Share your creations to inspire others!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {uploadedImages.map((image) => (
                <div key={image.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative aspect-w-1 aspect-h-1">
                    <img
                      src={image.url}
                      alt={image.alt || 'Watercolor artwork'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate">
                      {image.title || 'Untitled'}
                    </h3>
                    {image.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {image.tags?.map((tag: string) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountPage; 