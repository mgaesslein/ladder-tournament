.PHONY: help dev build prod up down logs clean test

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start development server with Docker
	docker-compose up frontend-dev

dev-build: ## Build development Docker image
	docker-compose build frontend-dev

dev-down: ## Stop development server
	docker-compose down

dev-logs: ## View development server logs
	docker-compose logs -f frontend-dev

build: ## Build production Docker image
	docker build -t ladder-frontend:latest .

prod: ## Start production server with Docker Compose
	docker-compose -f docker-compose.prod.yml up -d

prod-down: ## Stop production server
	docker-compose -f docker-compose.prod.yml down

prod-logs: ## View production server logs
	docker-compose -f docker-compose.prod.yml logs -f

up: dev ## Alias for dev

down: dev-down ## Alias for dev-down

logs: dev-logs ## Alias for dev-logs

clean: ## Remove Docker containers and images
	docker-compose down
	docker-compose -f docker-compose.prod.yml down
	docker rmi ladder-frontend:latest ladder-frontend:test 2>/dev/null || true

test: ## Run tests locally
	yarn test

install: ## Install dependencies locally
	yarn install

