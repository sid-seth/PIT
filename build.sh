#!/bin/bash
set -e  # Exit on any error

echo "🏗️ Compiling personal_investment_guide.cpp..."
g++ node-backend/personal_investment_guide.cpp -o node-backend/personal_investment_guide_linux

echo "🔧 Setting executable permissions..."
chmod +x node-backend/personal_investment_guide_linux

echo "✅ Build completed."
