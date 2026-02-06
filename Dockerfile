# Base image Playwright (sudah include browser)
FROM mcr.microsoft.com/playwright:v1.58.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm ci

# Install browser Chromium (supaya bisa dipakai tests)
RUN npx playwright install chromium

# Copy source code
COPY . .

# Default command (bisa diganti saat docker run)
CMD ["npx", "playwright", "test"]
