.PHONY: up down

up:
	docker-compose -f app-service.yaml up -d --build

down:
	docker-compose -f app-service.yaml down
