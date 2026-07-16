FROM node:18-alpine

WORKDIR /app

# Copy root and workspace package files
COPY package.json ./
COPY packages/core/package.json ./packages/core/
COPY packages/cli/package.json ./packages/cli/
COPY packages/web/package.json ./packages/web/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build workspaces
RUN npm run build --workspaces

# Run the CLI agent by default
WORKDIR /app/packages/cli
CMD ["node", "dist/index.js", "start"]
