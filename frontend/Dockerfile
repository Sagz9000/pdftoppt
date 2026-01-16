FROM node:22-alpine

WORKDIR /app

# We will mount volume, so this is just for initial build/layer caching if package.json existed
# validation: if package.json exists copy it, else just hold on
COPY package*.json ./
RUN if [ -f package.json ]; then npm install; fi

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
