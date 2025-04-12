# 🌿 Naturah Shopify Theme

A modern, premium Shopify theme for Naturah watercolor kits featuring Tailwind CSS and elegant UI elements.

## 🎨 Features

- **Modern Design**: Clean, elegant UI with premium animations and effects
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Custom Sections**:
  - Animated hero banner with premium gradient overlays
  - Featured products with animated product cards
  - Values section for brand storytelling
  - Newsletter signup with elegant styling
- **Responsive**: Optimized for all device sizes
- **Performance**: Optimized for speed and SEO
- **Customizable**: Easy to customize in Shopify Theme Editor

## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [Shopify CLI](https://shopify.dev/tools/cli)
- [Shopify Partner Account](https://partners.shopify.com/)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Naturah/naturah-shopify-theme.git
   cd naturah-shopify-theme
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build Tailwind CSS**:
   ```bash
   npm run tailwind:build
   ```

4. **Start development server**:
   ```bash
   shopify theme dev --store=your-store.myshopify.com
   ```

### Building for Production

To create a production-ready theme:

```bash
npm run build
```

This will compile Tailwind CSS with purge, optimize images, and prepare the theme for deployment.

### Deployment

You can deploy the theme to your Shopify store using one of these methods:

1. **Using Shopify CLI**:
   ```bash
   shopify theme push
   ```

2. **Manual Upload**:
   - Zip the theme directory (excluding node_modules and src)
   - Go to Shopify Admin > Online Store > Themes
   - Click "Add Theme" > "Upload Zip File"

## 🧩 Folder Structure

```
/
├── assets/              # Theme assets (CSS, JS, images)
├── config/              # Theme settings
├── layout/              # Theme layouts
├── locales/             # Translations
├── sections/            # Shopify sections
│   ├── naturah-hero.liquid             # Custom hero banner
│   ├── naturah-featured-products.liquid # Featured products
│   ├── naturah-values.liquid           # Brand values
│   └── naturah-newsletter.liquid       # Newsletter signup
├── snippets/           # Reusable code snippets
│   └── naturah-card-product.liquid     # Product card
├── templates/          # Page templates
├── src/                # Source files
│   └── tailwind.css    # Tailwind source CSS
├── .github/            # GitHub workflows
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind configuration
└── README.md           # Project documentation
```

## 🎨 Customization

You can customize the theme by:

1. **Editing theme settings** in the Shopify Theme Editor
2. **Modifying source code** for advanced customizations
3. **Adding new sections** by creating new liquid files in the sections directory

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Shopify](https://www.shopify.com/) - E-commerce platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Dawn Theme](https://github.com/Shopify/dawn) - Base theme reference