// Liquid-glass interaction layer: cursor-tracked specular highlight for the
// glass surfaces defined in index.html (.nav-inner, .theme-toggle, .btn-ghost,
// .chip, .lightbox, .lightbox-close, .lightbox-link). The refraction filter
// and press-bulge state are pure CSS (see the "LIQUID GLASS" block in
// index.html); this file only (1) gates the whole effect behind a support
// check, and (2) updates --mx/--my so the highlight follows the pointer.
(function () {
    'use strict';

    var SELECTOR = '.nav-inner, .theme-toggle, .btn-ghost, .chip, .lightbox, .lightbox-close, .lightbox-link';

    function supportsLiquidGlass() {
        // Firefox and older Safari don't reliably combine backdrop-filter
        // with an SVG feDisplacementMap filter reference — keep them on the
        // plain blur+border glass that's already in place.
        var isGecko = 'MozAppearance' in document.documentElement.style;
        if (isGecko) return false;
        if (typeof CSS === 'undefined' || !CSS.supports) return false;
        return CSS.supports('backdrop-filter', 'blur(1px)') ||
            CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
    }

    if (!supportsLiquidGlass()) return;

    document.documentElement.classList.add('liquid-refract');

    var rafId = null;
    var pendingEl = null;
    var pendingX = 0;
    var pendingY = 0;

    function flush() {
        rafId = null;
        var rect = pendingEl.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        var mx = ((pendingX - rect.left) / rect.width) * 100;
        var my = ((pendingY - rect.top) / rect.height) * 100;
        pendingEl.style.setProperty('--mx', mx + '%');
        pendingEl.style.setProperty('--my', my + '%');
    }

    document.addEventListener('pointermove', function (e) {
        var el = e.target.closest && e.target.closest(SELECTOR);
        if (!el) return;
        pendingEl = el;
        pendingX = e.clientX;
        pendingY = e.clientY;
        if (rafId === null) rafId = requestAnimationFrame(flush);
    }, { passive: true });
})();
