DEFAULT_ENV_FILE := .env.default
ifneq ("$(wildcard $(DEFAULT_ENV_FILE))","")
include ${DEFAULT_ENV_FILE}
export $(shell sed 's/=.*//' ${DEFAULT_ENV_FILE})
endif

ENV_FILE := .env
ifneq ("$(wildcard $(ENV_FILE))","")
include ${ENV_FILE}
export $(shell sed 's/=.*//' ${ENV_FILE})
endif

##################################

# DEV - run apps locally for development

.PHONY: dev-frontend
dev-frontend:
	./scripts/dev-frontend.sh

.PHONY: dev-backend
dev-backend:
	./scripts/dev-backend.sh

.PHONY: dev
dev:
	./scripts/dev.sh

##################################

# BUILD - build image locally using s2i

.PHONY: build
build:
	./scripts/build.sh

##################################

# PUSH - push image to repository

.PHONY: push
push:
	./scripts/push.sh

##################################