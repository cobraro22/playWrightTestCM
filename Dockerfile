FROM mcr.microsoft.com/playwright:v1.41.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npx", "playwright", "test"]

