FROM node:20-alpine

WORKDIR /app
COPY package.json vite.config.js /app/
COPY src /app/src

RUN npm ci
RUN npm run build

# Serve the production build with Vite preview (single container)
EXPOSE 3000
ENV HOST=0.0.0.0
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
