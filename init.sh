#!/bin/bash

# DRESSING - Initial Setup Script
# This script helps you get started with DRESSING development

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║   DRESSING - Initial Setup                                     ║"
echo "║   Detailed Report of Executed Scenarios, Steps and INsights   ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js
echo "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 14.0.0"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✓ Node.js version: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm >= 6.0.0"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✓ npm version: $NPM_VERSION"
echo ""

# Install dependencies
echo "Installing dependencies..."
echo "This may take a few minutes..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed successfully"
echo ""

# Build the project
echo "Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build the project"
    exit 1
fi

echo "✓ Project built successfully"
echo ""

# Run tests
echo "Running tests..."
npm test

if [ $? -ne 0 ]; then
    echo "⚠ Some tests failed. Please review the output above."
else
    echo "✓ All tests passed"
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "🎉 Setup complete! DRESSING is ready to use."
echo ""
echo "Next steps:"
echo ""
echo "1. Try the example:"
echo "   npm run example"
echo ""
echo "2. Test the CLI:"
echo "   node dist/cli.js --help"
echo "   node dist/cli.js generate -i examples/sample-report.json -o test.html --open"
echo ""
echo "3. Link globally (optional):"
echo "   npm link"
echo "   dressing --help"
echo ""
echo "4. Read the documentation:"
echo "   - README.md - Main documentation"
echo "   - QUICKSTART.md - Quick start guide"
echo "   - SETUP.md - Development guide"
echo "   - COMMANDS.md - Command reference"
echo ""
echo "5. Start developing:"
echo "   npm run build:watch"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "For more information, visit: https://github.com/jedau/dressing"
echo ""
