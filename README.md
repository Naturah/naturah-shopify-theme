# Naturah Shopify Theme

A modern, custom Shopify theme for Naturah's online store featuring natural and organic products, with headless e-commerce capabilities and a community gallery for watercolor artwork sharing.

## Architecture

This project combines Shopify's Online Store 2.0 architecture with a Next.js headless implementation:

- Shopify backend for product management, checkout, and customer accounts
- Next.js frontend for custom UI and enhanced user experience
- Community features for watercolor artwork sharing

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Shopify CLI](https://shopify.dev/themes/tools/cli)
- [Git](https://git-scm.com/)
- Shopify Developer account

### Environment Configuration

Create a `.env.local` file in the root of the project with the following variables:

```
# Shopify API Credentials
# Required for authentication and API interactions

# Your Shopify store domain (without protocol)
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# API key and secret for your Shopify app
SHOPIFY_API_KEY=xxxxxxxxxxxxxxxxxxxxx
SHOPIFY_API_SECRET=xxxxxxxxxxxxxxxxxxxxx

# Admin API access token for your custom app
# Required for Files API operations (image uploads)
SHOPIFY_ADMIN_API_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxx

# Storefront API access token for your custom app
# Required for customer authentication and store data access
SHOPIFY_STOREFRONT_API_TOKEN=shpst_xxxxxxxxxxxxxxxxxxxx
```

### Obtaining Shopify API Credentials

#### Storefront API Token
1. Log in to your Shopify Admin dashboard
2. Go to Apps > Develop apps
3. Create a new app (or use an existing custom app)
4. Under "Storefront API Integration," click "Configure"
5. Enable the required scopes (you'll need at least `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, and customer-related scopes)
6. Click "Save" to generate your Storefront API token

#### Admin API Access Token
1. Log in to your Shopify Admin dashboard
2. Go to Apps > Develop apps
3. Create a new app (or use an existing custom app)
4. Under "Admin API Integration," click "Configure"
5. Select the required scopes for your app (you'll need at least `read_files` and `write_files` for image upload)
6. Click "Save" to generate your Admin API access token

### Local Development

1. Install dependencies
```
npm install
```

2. Start the development server
```
npm run dev
```

3. Connect to your Shopify store (for theme development)
```
shopify theme dev --store=your-store.myshopify.com
```

### CSS Framework

This project uses Tailwind CSS for styling:
- Core styles in `src/styles/globals.css`
- Component-specific styles with Tailwind utility classes
- Critical CSS optimized for fast loading

## Project Structure

```
├── assets/             # Shopify theme assets
├── config/             # Shopify theme settings
├── layout/             # Shopify theme layouts
├── locales/            # Translation files
├── sections/           # Shopify theme sections
├── snippets/           # Shopify theme components
├── templates/          # Shopify page templates
├── src/                # Next.js application source
│   ├── components/     # React components
│   ├── context/        # React context providers
│   ├── lib/            # Utility functions and API clients
│   ├── pages/          # Next.js pages and API routes
│   └── styles/         # Global styles and Tailwind config
└── memory_bank/        # Project documentation
```

## Deployment

### Next.js Application

```
npm run build
npm run start
```

### Shopify Theme

```
shopify theme push
```

## Features

- **Headless E-commerce**
  - Next.js frontend with Shopify backend
  - Seamless checkout flow
  - Enhanced product browsing experience

- **User Authentication**
  - Shopify Customer Accounts integration
  - Secure login and registration
  - User account management

- **Community Gallery**
  - Image upload for watercolor artwork
  - Gallery showcasing community artwork
  - Social sharing capabilities

- **Performance Optimized**
  - Fast page loads
  - Responsive design
  - SEO-friendly structure

## Best Practices

### Development Workflow

See [WORKFLOW.md](./WORKFLOW.md) for detailed development workflow guidelines.

### JavaScript/TypeScript

- Use ES6+ syntax and TypeScript for type safety
- Follow React best practices for components
- Organize code by functionality

### Performance

- Optimize images before upload
- Lazy load below-the-fold content
- Minimize third-party scripts

## Troubleshooting

See [WORKFLOW.md](./WORKFLOW.md) for troubleshooting information.

## Additional Resources

- [Shopify Theme Development](https://shopify.dev/themes)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shopify Storefront API](https://shopify.dev/api/storefront)
- [Shopify Admin API](https://shopify.dev/api/admin)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)