# Base image Playwright (sudah include browser)
FROM mcr.microsoft.com/playwright:v1.58.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm ci

# Install Chromium dan Chrome (supaya tests jalan)
RUN npx playwright install chromium
RUN npx playwright install chrome

# Copy source code
COPY . .

# Install Xvfb supaya container bisa jalankan browser GUI
RUN apt-get update && apt-get install -y xvfb

# Default: jalankan Playwright dengan GUI via Xvfb
CMD ["xvfb-run", "-a", "npx", "playwright", "test"]
