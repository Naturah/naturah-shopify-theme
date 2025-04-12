# Naturah Shopify Theme

A modern, custom Shopify theme for Naturah's online store featuring natural and organic products.

## Theme Architecture

This theme follows Shopify's Online Store 2.0 architecture with:

- Section-based templates
- App blocks
- Metafields support
- JSON templates

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Shopify CLI](https://shopify.dev/themes/tools/cli)
- [Git](https://git-scm.com/)

### Local Development

1. Install Shopify CLI
```
npm install -g @shopify/cli @shopify/theme
```

2. Clone the repository
```
git clone https://github.com/Naturah/naturah-shopify-theme.git
cd naturah-shopify-theme
```

3. Connect to your store
```
shopify theme dev --store=your-store.myshopify.com
```

### CSS Framework

This theme uses a utility-first CSS approach with:
- Core styles in `assets/base.css`
- Component-specific styles in relevant section files
- Critical CSS inline in `theme.liquid`

## Theme Structure

```
├── assets/             # CSS, JS, images, and fonts
├── config/             # Settings schema and data
├── layout/             # Theme layouts
├── locales/            # Translation files
├── sections/           # Reusable sections
├── snippets/           # Reusable components
└── templates/          # Page templates
    └── customers/      # Customer account templates
```

## Deployment

### Via Shopify CLI

```
shopify theme push
```

### Via GitHub

1. Push changes to the main branch
2. Connect GitHub repository to Shopify theme in the admin

## Best Practices

### CSS

- Use utility classes for layout and common styling
- Add component-specific styles within sections
- Keep critical styles inline for fast page loading

### JavaScript

- Use ES6+ syntax
- Defer non-critical scripts
- Organize by functionality

### Sections & Blocks

- Make sections highly customizable
- Use blocks for repeatable content
- Include appropriate schema settings

### Performance

- Optimize images before upload
- Lazy load below-the-fold images
- Minimize third-party scripts

## Common Issues & Solutions

### CSS Not Loading
- Check browser console for errors
- Verify asset paths in theme.liquid
- Clear browser cache

### Sections Not Rendering
- Verify liquid syntax in section files
- Check for required settings in schema

### JavaScript Errors
- Open browser console to identify the error
- Ensure dependencies are loaded first

## Recommended Development Tools

- [Shopify Theme Inspector for Chrome](https://chrome.google.com/webstore/detail/shopify-theme-inspector-f/fndnankcflemoafdeboboehphmiijkgp)
- [Shopify Theme Check](https://github.com/shopify/theme-check)
- [VS Code Liquid extension](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode)