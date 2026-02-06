# Base image Playwright (sudah include browser)
FROM mcr.microsoft.com/playwright:v1.58.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install browser Chromium dan Chrome
RUN npx playwright install chromium
RUN npx playwright install chrome

# Copy source code
COPY . .

# Default command: jalankan Playwright headless (diatur lewat playwright.config.js via ENV)
CMD ["npx", "playwright", "test"]
