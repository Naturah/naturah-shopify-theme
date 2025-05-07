# Naturah Shopify Theme

A modern, custom Shopify theme for Naturah's online store featuring natural and organic products, with a clean design and a focus on showcasing watercolor kits and crafts.

## Architecture

This project uses Shopify's Online Store 2.0 architecture:

- Traditional Shopify theme using Liquid templates
- Tailwind CSS for styling and utility classes
- Custom functionality implemented within Shopify's ecosystem
- Potential for custom apps to be integrated as needed

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Shopify CLI](https://shopify.dev/themes/tools/cli)
- [Git](https://git-scm.com/)
- Shopify Developer account

### Local Development

1. Install dependencies
```
npm install
```

2. Start the Tailwind CSS compiler in watch mode
```
npm run tailwind:watch
```

3. Connect to your Shopify store for theme development
```
shopify theme dev --store=your-store.myshopify.com
```

### CSS Framework

This project uses Tailwind CSS for styling:
- Core styles in `src/tailwind.css`
- Component-specific styles with Tailwind utility classes
- Critical CSS optimized for fast loading

## Project Structure

```
├── assets/             # Shopify theme assets (CSS, JS, images)
├── config/             # Shopify theme settings
├── layout/             # Shopify theme layouts
├── locales/            # Translation files
├── sections/           # Shopify theme sections
├── snippets/           # Shopify theme components
├── templates/          # Shopify page templates
└── memory_bank/        # Project documentation and tasks
```

## Project Documentation

Comprehensive project documentation is available in the `memory_bank` directory:

- **[memory_bank/README.md](./memory_bank/README.md)** - Overview of documentation structure
- **[memory_bank/tasks.md](./memory_bank/tasks.md)** - Current tasks, priorities, and future enhancements
- **[memory_bank/project_documentation.md](./memory_bank/project_documentation.md)** - Detailed project information
- **[memory_bank/project_brief.md](./memory_bank/project_brief.md)** - High-level project overview

New developers should start by reviewing these documents to understand the project's current state and upcoming tasks.

## Deployment

### Shopify Theme

```
shopify theme push
```

## Features

- **Traditional Shopify Theme**
  - Clean and responsive design
  - Fast-loading pages
  - Optimized for conversions

- **User Experience**
  - Intuitive navigation
  - Enhanced product browsing experience
  - Mobile-first responsive design

- **Customizable Sections**
  - Modular section-based design
  - Easy customization through Shopify theme editor
  - Dynamic content blocks

- **Performance Optimized**
  - Fast page loads
  - Responsive design
  - SEO-friendly structure

## Best Practices

### Development Workflow

See [WORKFLOW.md](./WORKFLOW.md) for detailed development workflow guidelines.

### Liquid Templates

- Organize code logically with comments
- Use snippets for reusable components
- Follow Shopify's best practices for Liquid

### Performance

- Optimize images before upload
- Lazy load below-the-fold content
- Minimize third-party scripts

## Troubleshooting

See [WORKFLOW.md](./WORKFLOW.md) for troubleshooting information.

## Additional Resources

- [Shopify Theme Development](https://shopify.dev/themes)
- [Shopify Liquid Documentation](https://shopify.dev/api/liquid)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)