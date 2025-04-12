// Naturah Theme Javascript

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.site-header');
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const searchButton = document.querySelector('.search-button');
  
  // Sticky header
  if (header) {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        header.classList.add('sticky', 'top-0', 'left-0', 'w-full', 'animate-slideDown', 'z-50');
      } else {
        header.classList.remove('sticky', 'top-0', 'left-0', 'w-full', 'animate-slideDown', 'z-50');
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // Mobile menu toggle
  if (mobileMenuButton) {
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu', 'fixed', 'inset-0', 'z-50', 'invisible', 'opacity-0', 'transition-all', 'duration-300');
    mobileMenu.innerHTML = `
      <div class="mobile-menu-overlay absolute inset-0 bg-naturah-black/30" data-action="close-mobile-menu"></div>
      <div class="mobile-menu-content absolute top-0 left-0 h-full w-full max-w-sm bg-white shadow-lg transform -translate-x-full transition-transform duration-300 flex flex-col">
        <div class="mobile-menu-header flex items-center justify-between p-4 border-b border-naturah-cream">
          <h3 class="text-lg font-medium">Menu</h3>
          <button data-action="close-mobile-menu" class="p-2 rounded-full hover:bg-naturah-cream/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mobile-menu-body flex-1 overflow-y-auto p-4">
          <nav class="mobile-navigation">
            <ul class="space-y-3">
              ${Array.from(document.querySelectorAll('.header-navigation > ul > li')).map(item => {
                const link = item.querySelector('a');
                const submenu = item.querySelector('.submenu');
                
                if (submenu) {
                  const childLinks = Array.from(submenu.querySelectorAll('li a')).map(childLink => {
                    return `<li><a href="${childLink.getAttribute('href')}" class="block py-2 pl-8 text-naturah-black/70 hover:text-naturah-green transition-colors">${childLink.textContent}</a></li>`;
                  }).join('');
                  
                  return `
                    <li>
                      <div class="flex items-center justify-between">
                        <a href="${link.getAttribute('href')}" class="text-naturah-black font-medium">${link.textContent}</a>
                        <button class="toggle-submenu p-1 rounded-full hover:bg-naturah-cream/20">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                      </div>
                      <ul class="mobile-submenu mt-2 space-y-2 hidden">
                        ${childLinks}
                      </ul>
                    </li>
                  `;
                } else {
                  return `<li><a href="${link.getAttribute('href')}" class="block text-naturah-black font-medium hover:text-naturah-green transition-colors">${link.textContent}</a></li>`;
                }
              }).join('')}
            </ul>
          </nav>
        </div>
      </div>
    `;
    
    document.body.appendChild(mobileMenu);
    
    // Open mobile menu
    mobileMenuButton.addEventListener('click', function() {
      document.body.style.overflow = 'hidden';
      mobileMenu.classList.remove('invisible', 'opacity-0');
      mobileMenu.querySelector('.mobile-menu-content').classList.remove('-translate-x-full');
    });
    
    // Close mobile menu
    mobileMenu.querySelectorAll('[data-action="close-mobile-menu"]').forEach(button => {
      button.addEventListener('click', function() {
        mobileMenu.classList.add('opacity-0');
        mobileMenu.querySelector('.mobile-menu-content').classList.add('-translate-x-full');
        
        setTimeout(() => {
          mobileMenu.classList.add('invisible');
          document.body.style.overflow = '';
        }, 300);
      });
    });
    
    // Toggle submenus in mobile menu
    mobileMenu.querySelectorAll('.toggle-submenu').forEach(button => {
      button.addEventListener('click', function() {
        const submenu = this.closest('li').querySelector('.mobile-submenu');
        
        if (submenu.classList.contains('hidden')) {
          submenu.classList.remove('hidden');
          this.classList.add('rotate-180');
        } else {
          submenu.classList.add('hidden');
          this.classList.remove('rotate-180');
        }
      });
    });
  }
  
  // Search functionality
  if (searchButton) {
    const searchOverlay = document.createElement('div');
    searchOverlay.classList.add('search-overlay', 'fixed', 'inset-0', 'bg-naturah-black/70', 'z-50', 'invisible', 'opacity-0', 'transition-all', 'duration-300', 'flex', 'items-center', 'justify-center');
    searchOverlay.innerHTML = `
      <div class="search-container bg-white p-6 rounded-lg w-full max-w-2xl mx-4 relative">
        <button type="button" class="search-close absolute top-4 right-4 p-2 rounded-full hover:bg-naturah-cream/20 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 class="text-xl font-medium mb-4">${window.theme?.strings?.search?.title || 'Search our store'}</h3>
        <form action="/search" method="get" class="search-form">
          <div class="relative">
            <input 
              type="search" 
              name="q" 
              placeholder="${window.theme?.strings?.search?.placeholder || 'Search for products'}" 
              class="w-full py-3 px-4 pr-10 rounded-md border border-naturah-cream focus:outline-none focus:ring-1 focus:ring-naturah-green"
              required
            >
            <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 text-naturah-black/70 hover:text-naturah-green transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(searchOverlay);
    
    // Open search
    searchButton.addEventListener('click', function() {
      document.body.style.overflow = 'hidden';
      searchOverlay.classList.remove('invisible', 'opacity-0');
      searchOverlay.querySelector('input').focus();
    });
    
    // Close search
    searchOverlay.querySelector('.search-close').addEventListener('click', function() {
      searchOverlay.classList.add('opacity-0');
      
      setTimeout(() => {
        searchOverlay.classList.add('invisible');
        document.body.style.overflow = '';
      }, 300);
    });
    
    // Close search on overlay click
    searchOverlay.addEventListener('click', function(e) {
      if (e.target === this) {
        searchOverlay.querySelector('.search-close').click();
      }
    });
  }
});