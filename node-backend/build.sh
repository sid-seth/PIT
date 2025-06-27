#!/bin/bash
set -e  # Exit on any error

echo "🏗️ Compiling personal_investment_guide.cpp..."
g++ personal_investment_guide.cpp -o personal_investment_guide_linux

echo "🔧 Setting executable permissions..."
chmod +x personal_investment_guide_linux

echo "✅ Build completed."
