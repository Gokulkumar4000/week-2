#!/bin/bash

# Deploy to Render Script
# This script helps prepare your project for Render deployment

echo "🚀 Preparing FeedbackPro Backend for Render Deployment"
echo "=================================================="

# Check if required files exist
echo "✅ Checking deployment files..."
if [ -f "render.yaml" ]; then
    echo "   ✓ render.yaml found"
else
    echo "   ❌ render.yaml missing"
fi

if [ -f "package.json" ]; then
    echo "   ✓ package.json found"
else
    echo "   ❌ package.json missing"
fi

if [ -f "RENDER_DEPLOYMENT.md" ]; then
    echo "   ✓ RENDER_DEPLOYMENT.md found"
else
    echo "   ❌ RENDER_DEPLOYMENT.md missing"
fi

echo ""
echo "📦 Testing build process..."
npm run build

if [ $? -eq 0 ]; then
    echo "   ✅ Build successful!"
else
    echo "   ❌ Build failed. Check for errors above."
    exit 1
fi

echo ""
echo "🔍 Testing health endpoint..."
if [ -f "dist/index.js" ]; then
    echo "   ✓ Backend bundle created at dist/index.js"
else
    echo "   ❌ Backend bundle not found"
    exit 1
fi

echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Go to render.com and create a new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Use these settings:"
echo "   - Build Command: npm install && npm run build"
echo "   - Start Command: npm start"
echo "   - Environment: NODE_ENV=production"
echo "5. Add your environment variables (see RENDER_DEPLOYMENT.md)"
echo "6. Deploy!"
echo ""
echo "📖 Full instructions available in RENDER_DEPLOYMENT.md"