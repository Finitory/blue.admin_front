# syntax=docker/dockerfile:1

# Build stage
FROM node:26-bookworm-slim AS build

WORKDIR /app

RUN npm install -g pnpm@12.15.0

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY index.html tsconfig*.json vite.config.ts ./
COPY public/ public/
COPY src/ src/

RUN pnpm build

# Runtime stage
FROM nginxinc/nginx-unprivileged:stable-bookworm AS runtime

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build \
    /app/dist/ /usr/share/nginx/html/

EXPOSE 8080
