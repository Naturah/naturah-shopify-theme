# Naturah Shopify Theme

A modern, custom Shopify theme for Naturah's online store featuring natural and organic products, with a clean design and a focus on showcasing watercolor kits and crafts.

## Project Overview

This directory contains project documentation and planning files for the Naturah Shopify theme. It serves as a central repository of knowledge for anyone working on this project.

## Architecture

This project uses Shopify's Online Store 2.0 architecture:

- Traditional Shopify theme using Liquid templates
- Tailwind CSS for styling and utility classes
- Custom functionality implemented within Shopify's ecosystem
- Potential for custom apps to be integrated as needed

## Documentation Files Overview

- **project_brief.md**: High-level project overview, goals, and technologies
- **project_documentation.md**: Detailed documentation including brand guidelines, implementation status, and architecture decisions
- **tasks.md**: Current tasks, priorities, and future enhancements - start here if you're new to the project
- **development-notes.md**: Session-by-session development notes and change logs
- **WORKFLOW.md**: Detailed development workflow guidelines and common commands

## How to Use This Directory

If you're new to this project, we recommend reviewing these files in the following order:

1. Start with **project_brief.md** to understand the high-level goals
2. Review **project_documentation.md** for detailed information about brand guidelines and implementation
3. Check **tasks.md** to see what's been completed and what needs to be done next
4. Review **WORKFLOW.md** for development workflow processes
5. Review **development-notes.md** for recent changes and development history

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

2. Start local development server
```
npm run dev
```

This command uses Shopify CLI to connect to your store for theme development and watches for Tailwind CSS changes.

## Project Structure

```
├── assets/             # Shopify theme static assets (CSS, JS, theme-specific icons)
├── config/             # Shopify theme settings
├── layout/             # Shopify theme layouts
├── locales/            # Translation files
├── sections/           # Shopify theme sections
├── snippets/           # Shopify theme components
├── templates/          # Shopify page templates
└── memory_bank/        # Project documentation and tasks
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

## Keeping Documentation Updated

When making significant changes to the project:

1. Update the relevant files in this directory
2. Keep the tasks list current in tasks.md
3. Document any major architectural decisions
4. Update implementation status in project_documentation.md

This documentation is intended to be a living resource that evolves with the project. 