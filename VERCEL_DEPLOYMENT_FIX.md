# Vercel Deployment Guide - 404 & Preload Fixes

## Issues Fixed

### 1. 🔴 404 Not Found Errors
**Problem:** Resources (logo, scripts, stylesheets) were returning 404
**Solutions Applied:**
- ✅ Fixed favicon path: `logo2.png` → `/logo2.png` (absolute path)
- ✅ Added `vercel.json` for proper routing configuration
- ✅ Cleaned up duplicate Google Fonts links in index.html
- ✅ Added Font Awesome integrity hash for security

### 2. ⚠️ Preload Warning
**Problem:** "Resource preloaded but not used within a few seconds"
**Solutions Applied:**
- ✅ Changed Razorpay script from `<script src="">` to `<script async src="">`
- ✅ Added `display=swap` to all Google Fonts (prevents CLS - Cumulative Layout Shift)
- ✅ Removed redundant/duplicate font declarations
- ✅ Optimized preconnect directives

### 3. ⚡ Build & Performance Optimizations
**Vite Configuration Updates:**
- ✅ Enabled code splitting (vendor, redux, ui chunks)
- ✅ Disabled source maps in production (faster builds)
- ✅ Configured Terser minification
- ✅ Added development proxy for local API calls
- ✅ Explicit output directory: `dist`

## Files Modified

```
client/
├── index.html           (UPDATED - fixed paths & preload)
├── vite.config.js       (UPDATED - optimized build config)
├── vercel.json          (NEW - deployment routing config)
└── package.json         (no changes - already correct)
```

## Deployment Steps

### Option 1: Redeploy on Vercel (Recommended)
```bash
# The changes will be picked up automatically on next push
git add .
git commit -m "Fix: 404 errors and preload warnings for Vercel"
git push
```

### Option 2: Manual Vercel Deployment
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Navigate to client directory
cd client

# Deploy
vercel --prod
```

## What Each Fix Does

### vercel.json Configuration
```json
{
  "buildCommand": "npm run build",        // Build with Vite
  "outputDirectory": "dist",              // Output to dist folder
  "installCommand": "npm install",        // Install dependencies
  "routes": [
    {
      "src": "/assets/.*",                // Cache assets for 1 year
      "headers": { "cache-control": "public, max-age=31536000, immutable" }
    },
    {
      "src": "/.*",                       // Fallback to index.html for SPA routing
      "dest": "/index.html",
      "status": 200
    }
  ]
}
```

### HTML Optimizations
- **Logo Path:** `/logo2.png` - Vercel serves public folder assets at root
- **Razorpay Script:** `async` attribute prevents blocking page load
- **Font Display:** `display=swap` ensures text is visible while fonts load
- **Preconnect:** Speeds up connection to Google services

### Build Optimizations
- **Code Splitting:** Separate chunks for vendor libraries reduce main bundle size
- **Minification:** Terser provides better compression than default
- **No Sourcemaps:** Reduces production bundle size

## Expected Results

### Before Fixes
- ❌ Logo: 404 Not Found
- ❌ Console warning: "Resource preloaded but not used"
- ❌ Slow asset loading
- ⚠️ Layout shift while fonts load

### After Fixes
- ✅ Logo loads correctly
- ✅ No preload warnings
- ✅ Faster asset delivery with caching
- ✅ Better Core Web Vitals scores
- ✅ Proper SPA routing (URLs don't break on refresh)

## Verification Checklist

After deploying to Vercel, verify:

- [ ] Website loads without console errors
- [ ] Logo appears correctly
- [ ] No 404 errors in Network tab (DevTools → Network → Filter by 404)
- [ ] No preload warnings in DevTools console
- [ ] Page refresh works for all routes (SPA routing)
- [ ] API calls still work (check Network tab for `/api/` calls)
- [ ] Images load correctly
- [ ] Fonts render properly (no Flash of Unstyled Text)

## Troubleshooting

### Still seeing 404s?
1. Check DevTools Network tab for exact URL
2. Verify the resource exists in `client/public/`
3. Hard refresh (Ctrl+Shift+R) to bypass cache

### Preload warning persists?
1. Check for any third-party scripts in index.html
2. Verify all stylesheets have `href` attributes
3. Ensure all preload links have `as` attribute

### API calls failing?
1. Check your `.env` file has correct `VITE_API_URL`
2. Verify backend is deployed and running
3. Check CORS settings on backend

## Performance Metrics

Monitor these in Vercel Analytics:
- **First Contentful Paint (FCP)** - Should be < 1.8s
- **Largest Contentful Paint (LCP)** - Should be < 2.5s
- **Cumulative Layout Shift (CLS)** - Should be < 0.1
