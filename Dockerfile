# Base image Playwright (sudah include browser)
FROM mcr.microsoft.com/playwright:v1.58.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Default command (bisa diganti saat docker run)
CMD ["npx", "playwright", "test"]
