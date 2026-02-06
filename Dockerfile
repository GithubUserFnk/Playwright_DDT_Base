# Base image Playwright (sudah include browser)
FROM mcr.microsoft.com/playwright:v1.58.0-jammy

# Set working directory
WORKDIR /app

# Pastikan Playwright selalu headless
ENV PLAYWRIGHT_HEADLESS=1
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm ci

# Install browser Chromium & Chrome
RUN npx playwright install chromium
RUN npx playwright install chrome

# Copy source code
COPY . .

# Default command
CMD ["npx", "playwright", "test"]
