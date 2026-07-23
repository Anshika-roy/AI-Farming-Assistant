# ---- Build stage ------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Install deps first for better layer caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build the production bundle
COPY . .
RUN npm run build

# ---- Runtime stage ------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# SPA-aware nginx config (client-side routing fallback to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
