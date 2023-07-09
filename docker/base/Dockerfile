FROM node:alpine AS base

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN npm install next@latest
COPY dist .

# USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", ".next/standalone/server.js"]
