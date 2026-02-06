# Base image Playwright
FROM mcr.microsoft.com/playwright:v1.58.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install Chromium dan Chrome
RUN npx playwright install chromium
RUN npx playwright install chrome

# Install X virtual framebuffer
RUN apt-get update && apt-get install -y xvfb

# Copy source code
COPY . .

# Set Playwright headless false
ENV PLAYWRIGHT_HEADLESS=0

# Default command: jalankan tests di xvfb
CMD ["xvfb-run", "-a", "npx", "playwright", "test"]
