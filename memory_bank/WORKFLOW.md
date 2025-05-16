# Naturah Shopify Theme Development Workflow

This document outlines the development workflow for the Naturah Shopify theme, from local development to GitHub version control and Shopify deployment.

## Development Workflow

### 1. Local Development with Cursor

1. All development happens in the `development` branch
2. Make changes in Cursor
3. Use `npm run dev` for local theme development (this runs `shopify theme dev` which handles both theme serving and file watching)
4. For CSS-only changes, you can optionally use `npm run tailwind:watch` to compile CSS in real-time without running the full theme dev server
5. Update task status in `memory_bank/tasks.md` as you complete items

### 2. GitHub Version Control

1. Commit changes to the `development` branch
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin development
   ```
2. When features are complete and tested, create a pull request to merge into `main`
3. After approval, merge the PR

### 3. Shopify Deployment

#### Development/Testing Deployment
1. Deploy to a development theme in Shopify
   ```bash
   shopify theme push --theme=development
   ```
   
#### Production Deployment
1. Only deploy from the `main` branch after thorough testing
   ```bash
   shopify theme push
   ```

## Project Documentation

Before starting development work, review the project documentation in the `memory_bank` directory:

- **[memory_bank/README.md](./memory_bank/README.md)** - Documentation overview
- **[memory_bank/tasks.md](./memory_bank/tasks.md)** - Current tasks and priorities (**start here**)
- **[memory_bank/project_documentation.md](./memory_bank/project_documentation.md)** - Brand guidelines and implementation status
- **[memory_bank/project_brief.md](./memory_bank/project_brief.md)** - Project overview

As you make changes to the project:
1. Update completed tasks in `tasks.md`
2. Document any architectural decisions or implementation notes
3. Keep the documentation current for future developers

## Common Commands

### Setup & Build

```bash
# Install dependencies
npm install

# Build Tailwind CSS
npm run tailwind:build

# Run local development server (includes Tailwind watching)
npm run dev

# Watch for Tailwind CSS changes only (without theme server)
npm run tailwind:watch
```

### Shopify CLI

```bash
# Authenticate with Shopify
shopify login

# Start a local development server
shopify theme dev

# Push theme to Shopify
shopify theme push

# Pull theme from Shopify
shopify theme pull
```

### Git Branches

```bash
# Switch to development branch
git checkout development

# Create and switch to a feature branch
git checkout -b feature/new-feature

# Switch to main branch
git checkout main
```

## Best Practices

1. Always work in the `development` branch or feature branches
2. Keep commits small and focused on specific changes
3. Write descriptive commit messages
4. Test thoroughly in a development theme before deploying to production
5. Use Tailwind CSS for styling whenever possible
6. Follow component-based patterns in Liquid
7. Optimize images before uploading
8. Always run the Tailwind build process after making CSS changes

## Troubleshooting

### CSS Issues
- Run `npm run tailwind:build` to ensure the latest CSS is compiled
- Check that both theme-main.css and tailwind.css are linked in theme.liquid

### Theme Preview Issues
- Verify that the development theme is properly selected
- Run `shopify theme list` to see available themes
- Use `shopify theme info` to check the current theme

### GitHub Connection Issues
- Check remote repository settings: `git remote -v`
- Verify GitHub authentication

## Additional Resources

- [Shopify Theme Development](https://shopify.dev/themes)
- [Shopify CLI Commands](https://shopify.dev/themes/tools/cli/commands)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Liquid Documentation](https://shopify.dev/api/liquid) 