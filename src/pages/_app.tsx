import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CartProvider } from '../context/CartContext';
import CartDrawer from '../components/ui/CartDrawer';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <CartDrawer />
    </CartProvider>
  );
} 