# Naturah Shopify Theme Project Documentation

## Project Overview
Naturah is a brand focused on selling watercolor kits and crafts through a Shopify store. The project involves implementing a custom Shopify theme with brand-specific styling and functionality.

## Brand Context

### Target Audience
- Watercolor art enthusiasts
- DIY and creative kit products
- Eco-friendly shoppers

### Brand Identity
- Natural, organic aesthetics
- Clean and minimal design language
- Emphasis on product quality and sustainability

### Key Features
- Product showcase with detailed information
- Mobile-first responsive design
- Fast loading and optimized assets
- Custom product cards and collections
- User image upload functionality (planned)

### User Journey
- Homepage introduction to brand
- Category/collection browsing
- Product detail pages with comprehensive information
- Streamlined checkout process

## Architecture Approach
- Traditional Shopify theme using Liquid templates
- Tailwind CSS for styling and utility classes
- Custom functionality implemented within Shopify's ecosystem
- Potential for custom apps to be integrated as needed

## Brand Style Guide

### Typography
- Font Family: Nunito
- Headings: Nunito Bold (H1: 60px)
- Display Text: Nunito 24px
- Various weights used: Regular (400), Medium (500), Semibold (600), Bold (700)

### Colors
#### Neutral Colors
- Dark Gray/Green: #494E3B
- Medium Gray: #7E7F76
- Light Gray: #D9DAD5

#### Brand Colors
- Dark Green: #748F24
- Medium Green: #B4D455
- Light Green: #DBEBAD

#### Background
- Page Background: #FAFCF3

## Implementation Status

The following files have been updated to implement the brand style guide:

1. **tailwind.config.js** - Updated color palette and typography settings
2. **assets/base.css** - Implemented CSS variables for colors and typography
3. **layout/theme.liquid** - Updated critical CSS with brand colors and fonts
4. **sections/header.liquid** - Updated header styling with new brand colors
5. **sections/announcement-bar.liquid** - Updated styling with brand colors
6. **sections/hero.liquid** - Updated hero section with new brand colors and styling
7. **sections/featured-products.liquid** - Updated product cards with brand colors and Tailwind classes
8. **sections/newsletter.liquid** - Updated newsletter section with brand styles and improved form styling
9. **sections/footer.liquid** - Updated footer with brand colors and enhanced styling

Each file now consistently uses the brand color system through CSS variables and Tailwind utility classes:
- `--color-neutral-dark`, `--color-neutral-medium`, `--color-neutral-light` for neutral colors
- `--color-brand-dark`, `--color-brand-medium`, `--color-brand-light` for brand colors
- `--color-background` for the page background
- Tailwind classes like `bg-brand-dark`, `text-neutral-medium`, etc.

## Development Status

### Completed Tasks
- Removed all Next.js files and dependencies (project originally started as headless implementation)
- Updated documentation to reflect traditional Shopify theme architecture
- Configured Tailwind CSS for a traditional Shopify theme
- Implemented brand styling across core theme files

### Image Management
- Product and collection images are hosted on Shopify's CDN, not in theme files
- Images are uploaded and managed through the Shopify admin interface
- Theme code references images using Liquid objects (e.g., `{{ product.featured_image | img_url: 'large' }}`)
- Any theme-specific decorative elements (icons, logos) should be placed in assets directory
- Image optimization is handled automatically by Shopify's CDN

### Current Focus Areas
- Implementing remaining sections with brand styling
- Ensuring responsive design on all pages
- Setting up product filtering and sorting

### Next Steps
1. Complete the implementation of brand styles across all remaining sections
2. Ensure all essential functionality is implemented in Liquid
3. Thoroughly test the theme
4. Deploy to Shopify development theme
5. Document any additional custom functionality for future developers

## Planned Features

### User Image Uploads
- Implementing using Shopify's native file upload capabilities
- Potential for a custom Shopify app if needed for more advanced functionality
- Using metafields to store user-generated content

### Community Gallery
- Creating a Liquid-based gallery section
- Using Shopify's product collections or blog for organizing content
- Implementing with standard Shopify theme features

## Benefits of Traditional Approach

1. **Simplicity**: Easier to maintain and update
2. **Performance**: Native Shopify rendering is optimized
3. **Compatibility**: Works with all Shopify features out of the box
4. **Updates**: Easier to apply Shopify platform updates
5. **Learning Curve**: Requires less specialized knowledge

*This document consolidates key project information and will be updated as development progresses.* 