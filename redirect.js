// DuckDuckGo to Google Maps Redirect Extension
(function() {
  'use strict';
  
  // Immediate redirect for maps URLs
  const currentUrl = window.location.href;
  if (currentUrl.includes('iaxm=maps') || currentUrl.includes('ia=maps')) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      window.location.replace('https://www.google.com/maps/search/' + encodeURIComponent(query));
      return;
    }
  }
  
  // Intercept map clicks
  document.addEventListener('click', function(e) {
    const target = e.target;
    const link = target.closest('a');
    
    // Check if this is a map-related click
    const isMapImage = target.alt === 'map' || target.src?.includes('external-content.duckduckgo.com/ssv2');
    const isMapLink = link && link.href && (
      link.href.includes('iaxm=maps') ||
      link.href.includes('ia=maps')
    );
    
    if (isMapLink || isMapImage) {
      e.preventDefault();
      e.stopPropagation();
      
      // Try to extract query from the link first, then fall back to current page query
      let query = null;
      if (link && link.href) {
        const linkUrl = new URL(link.href);
        query = linkUrl.searchParams.get('q');
      }
      if (!query) {
        query = new URLSearchParams(window.location.search).get('q');
      }
      
      if (query) {
        window.location.href = 'https://www.google.com/maps/search/' + encodeURIComponent(query);
      }
      return false;
    }
  }, true);
})();
