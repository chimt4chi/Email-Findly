#!/bin/bash

# Update the package lists
apt-get update

# Install the necessary dependencies
apt-get install -y \
  libnss3 \
  libxss1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdrm2 \
  libxdamage1 \
  libgbm1 \
  libxrandr2 \
  libgtk-3-0 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libatk1.0-0 \
  libcairo2 \
  libnss3 \
  libxcomposite1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxrandr2 \
  libasound2 \
  libatspi2.0-0 \
  libcurl4 \
  libdbus-glib-1-2 \
  libgtk2.0-0 \
  libnspr4
