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
    const link = target.closest('a, button, div, span');
    
    const isMapClick = 
      target.alt === 'map' ||
      target.src?.includes('external-content.duckduckgo.com/ssv2') ||
      (link && (
        link.href?.includes('iaxm=maps') ||
        link.href?.includes('ia=maps') ||
        (link.textContent?.toLowerCase().includes('maps') && 
         !link.href?.includes('google.com'))
      ));
    
    if (isMapClick) {
      e.preventDefault();
      e.stopPropagation();
      
      const query = new URLSearchParams(window.location.search).get('q');
      if (query) {
        window.location.href = 'https://www.google.com/maps/search/' + encodeURIComponent(query);
      }
      return false;
    }
  }, true);
})();