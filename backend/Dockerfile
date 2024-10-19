FROM node:18-alpine AS base

# Step 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat mi>
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies using pnpm
COPY package.json pnpm-lock.yaml ./

# Enable corepack, install pnpm globally, install dependencies with pnpm
RUN \
    if [ -f pnpm-lock.yaml ]; then corepack enable && corepack prepare pnpm@9.12.1 --activate && pnpm install; \
    else echo "Warning: Lockfile not found." && yarn install; \
    fi

# Step 2: Final production-ready image
FROM base AS runner
WORKDIR /app

# Copy the entire project to the working directory
COPY . .

# Copy the dependencies from the previous stage to the container
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules

# Set read and write permissions recursively for all files and directories
RUN chmod -R 777 .

# Note: Don't expose ports here, Compose will handle that for us

# Start the Node.js application
CMD ["node", "src/server.js"]