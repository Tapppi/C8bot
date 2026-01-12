# AGENTS.md

This file provides guidance for AI coding agents working in this codebase.

## Project Overview

C8bot is a Discord bot built with TypeScript, discord.js v14, and PostgreSQL (via Knex.js + Objection.js ORM). It runs on Node.js >= 24 using ESM modules.

## Build, Lint, and Test Commands

| Task                     | Command                               |
| ------------------------ | ------------------------------------- |
| Install dependencies     | `npm install`                         |
| Build                    | `npm run build`                       |
| Build (watch)            | `npm run build:watch`                 |
| Run dev server           | `npm run dev`                         |
| Start production         | `npm run start`                       |
| Lint                     | `npm run lint`                        |
| Lint + fix               | `npm run lint:fix`                    |
| Format                   | `npm run format`                      |
| Run all tests            | `npm run test`                        |
| Run tests (watch)        | `npm run test:watch`                  |
| **Run single test file** | `npx ava src/path/to/file.test.ts`    |
| **Run single test case** | `npx ava --match='test name pattern'` |
| DB migrate               | `npm run migrate`                     |
| DB rollback              | `npm run rollback`                    |
| DB seed                  | `npm run seed`                        |
| Clean build artifacts    | `npm run clean`                       |

## Directory Structure

```
src/
├── index.ts              # Main entry point
├── config.ts             # Configuration loading
├── environment.d.ts      # TypeScript env type definitions
├── knexfile.ts           # Database configuration
├── commands/             # Bot command handlers
├── models/               # Objection.js models
├── model-utils/          # Model utilities/mixins
├── migrations/           # Knex database migrations
├── seeds/                # Database seed files
└── public/               # Static data
```

## Code Style Guidelines

This project uses **XO** (opinionated ESLint wrapper) with **Prettier** integration. A pre-commit hook runs lint-staged automatically.

### Formatting Rules

- **Single quotes** for strings (double quotes in JSON files)
- **No semicolons** (XO default)
- **Trailing commas** in all contexts
- **2-space indentation**
- **No bracket spacing**: `{foo}` not `{ foo }`

### Import Style

Imports must be ordered as follows:

1. Node.js built-in modules with `node:` prefix
2. External packages
3. Internal modules with `.js` extension (required for ESM)

```typescript
// Correct import ordering
import process from 'node:process';
import {Client, GatewayIntentBits} from 'discord.js';
import knex, {type Knex as _Knex} from 'knex';
import type _ from './environment.d.js';
import {handleCommand} from './commands/index.js';
import config from './config.js';
```

**Critical rules:**

- Always use `node:` prefix for Node.js built-ins
- Local imports MUST include `.js` extension (ESM requirement)
- Use `import type` for type-only imports

### File Naming Conventions

| Location              | Convention | Example                    |
| --------------------- | ---------- | -------------------------- |
| `src/models/*.ts`     | PascalCase | `Trivia.ts`                |
| `src/migrations/*.ts` | snake_case | `20210423231235_trivia.ts` |
| `src/seeds/**/*.ts`   | snake_case | `trivia_heikki.ts`         |
| All other files       | kebab-case | `model-generate-id.ts`     |

### TypeScript Conventions

- **Strict mode** is enabled with all strict checks
- `noUnusedLocals` and `noUnusedParameters` are enabled
- Prefix unused variables with `_` (e.g., `_unusedVar`) to suppress errors
- Use `!` for model properties that are always set by the database
- Use `type` keyword for type-only imports: `import type {Foo} from 'bar'`

```typescript
// Model property pattern
export default class Trivia extends generateIds(Model) {
  id!: string; // Non-null assertion for DB-set fields
  author!: string;
  categoryCount?: number; // Optional for computed fields
}
```

### Export Patterns

- **Default exports** for main module exports (config, models, utility functions)
- **Named exports** for functions that are imported alongside other things

### Error Handling

- Throw explicit `Error` objects with descriptive messages
- Use early return pattern for validation

```typescript
// Early return pattern
if (!match?.[1]) {
  await printHelp(message);
  return;
}
```

### Comments

- Prefer self-documenting code over comments
- Place eslint-disable comments on the line above the code

## Database Patterns

### Migrations

Located in `src/migrations/`. Use timestamp prefix format: `YYYYMMDDHHMMSS_description.ts`

### Models (Objection.js)

Located in `src/models/`. Follow this pattern:

```typescript
import {Model, type Pojo} from 'objection';
import generateIds from '../model-utils/model-generate-id.js';

export default class Trivia extends generateIds(Model) {
  static tableName = 'trivia';

  static jsonSchema = {
    type: 'object',
    required: ['author', 'category', 'content'],
    properties: {
      author: {type: 'string', minLength: 1, maxLength: 64},
      // ... more properties
    },
  };

  id!: string;
  // ... more properties
}
```

## Environment

- Copy `.env.dist` to `.env` for local development
- Use `compose.yaml` to run PostgreSQL locally: `docker compose up -d`
- Node.js >= 24 required
