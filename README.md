# Joint FPL Charts Library

TypeScript library for building Fantasy Premier League Draft dashboards with Observable Framework.

## Installation

```bash
npm install @joint-fantasy/fpl-charts
```

## Usage

```typescript
import { bumpChart, giniIndexChart, PremierLeagueAPI } from '@joint-fantasy/fpl-charts';

// Fetch data
const api = new PremierLeagueAPI();
const data = await api.getMatchResults(LEAGUE_ID);

// Create charts
const chart = bumpChart(data, { width: 800, title: "Custom Title", subtitle: "Custom Subtitle" });
```

## Features

- 📊 Pre-built chart components (bump charts, Gini index, bonus points, etc.)
- 🔌 API client for FPL Draft endpoints
- 🎨 Customizable color schemes
- 📝 Full TypeScript support
- ✅ Comprehensive test coverage

## API Documentation

See [API.md](./API.md) for detailed documentation.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build
npm run build

# Lint
npm run lint
```

## License

MIT
