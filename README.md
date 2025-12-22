# KickerClub München Ladder

A modern React application for managing a foosball club challenge pyramid ladder system. Built with React, TypeScript, Vite, and Material-UI.

## Features

- 🏆 Pyramid-style ladder system with challenge rules
- 🎯 Drag-and-drop challenge interface
- 🎨 Modern UI with Material-UI v7
- 🌙 Dark mode support
- ⚡ Fast development with Vite
- 🐳 Docker support for development and production

## Prerequisites

- Node.js 20+ and Yarn (for local development)
- Docker and Docker Compose (for containerized development/production)

## Local Development (Without Docker)

1. Install dependencies:
```bash
yarn install
```

2. Create a `.env` file (optional):
```bash
VITE_API_URL=http://localhost:8000
```

3. Start the development server:
```bash
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Docker Development

### Quick Start

Start the development server in Docker:
```bash
docker-compose up frontend-dev
```

The app will be available at [http://localhost:3000](http://localhost:3000) with hot-reload enabled.

### Development Commands

```bash
# Start development server
docker-compose up frontend-dev

# Start in detached mode
docker-compose up -d frontend-dev

# View logs
docker-compose logs -f frontend-dev

# Stop the container
docker-compose down
```

## Docker Production

### Build and Run Production Container

```bash
# Build the production image
docker build -t ladder-frontend:latest .

# Run the production container
docker run -d -p 8080:80 --name ladder-frontend ladder-frontend:latest
```

The app will be available at [http://localhost:8080](http://localhost:8080)

### Using Docker Compose for Production

```bash
# Build and start production container
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop the container
docker-compose -f docker-compose.prod.yml down
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally
- `yarn test` - Run tests with Vitest

## Project Structure

```
ladder/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── services/        # API service layer
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── public/              # Static assets
├── Dockerfile           # Production Docker image
├── Dockerfile.dev       # Development Docker image
├── docker-compose.yml   # Development Docker Compose
└── docker-compose.prod.yml  # Production Docker Compose
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client.

## Challenge Rules

The ladder follows pyramid challenge rules:

1. Players can only challenge opponents ranked above them
2. Challenge range is limited based on the player's row in the pyramid
3. If the challenger wins, they swap positions with the opponent
4. If the challenger loses, positions remain unchanged

## Technology Stack

- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite 6** - Build tool and dev server
- **Material-UI v7** - Component library
- **React DnD** - Drag and drop functionality
- **Vitest** - Testing framework
- **Nginx** - Production web server (Docker)

## License

Private project for KickerClub München
