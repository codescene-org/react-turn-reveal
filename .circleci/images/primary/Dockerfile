FROM node:lts-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
	git \
	openssh-client \
	openssh-server \
	tar \
	gzip \
	ca-certificates

# Install pnpm
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

# Install node-prune
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash

# Cleanup
RUN rm -rf /var/lib/apt/lists/* && apt-get autoclean
