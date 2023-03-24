FROM mcr.microsoft.com/playwright:focal
RUN apt-get install xvfb
COPY ./ ./
RUN npm install
RUN npx playwright install chromium