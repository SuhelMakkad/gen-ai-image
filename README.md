## Project Overview

A Convex + Next.js full-stack application with authentication using:
- **Convex**: Backend database and server logic
- **Next.js 15**: React framework with App Router
- **Convex Auth**: Authentication system
- **Tailwind CSS + shadcn/ui**: Styling and UI components
- **TypeScript**: Type safety throughout

## Development Commands

### Core Development
```bash
# Start both frontend and backend in parallel
bun dev

# Individual services
bun dev:frontend  # Next.js development server
bun dev:backend   # Convex development server

# Setup and dashboard (runs before dev)
bun predev
```

### Build and Quality
```bash
# Build for production
bun build

# Start production server
bun

# Linting and formatting
bun lint
bun format:write   # Format all files
bun format:check   # Check formatting only
```

### Convex Commands
```bash
# Push schema and functions to Convex
npx convex dev

# Access Convex dashboard
npx convex dashboard

# Deploy to production
npx convex deploy
```

## Architecture

### Frontend Structure
- **App Router**: Uses Next.js 15 App Router pattern (`app/` directory)
- **Components**: UI components in `components/ui/` (shadcn/ui), app components in `app/components/`
- **Providers**: Global providers in `app/components/providers/` (theme, Convex client)
- **Path Aliases**: `@/*` maps to project root, with specific aliases for components, utils, hooks

### Backend Structure (Convex)
- **Functions**: `convex/myFunctions.ts` contains queries, mutations, and actions
- **Schema**: `convex/schema.ts` defines database tables and auth tables
- **Auth Config**: `convex/auth.config.ts` configures authentication providers
- **Generated**: `convex/_generated/` contains auto-generated API and types

### Authentication Flow
- **Protected Routes**: `/` and `/server` require authentication
- **Sign In Route**: `/signin` handles login/signup with email/password
- **Middleware**: `middleware.ts` handles route protection and redirects
- **Auth Integration**: Uses Convex Auth with password provider

### Database Schema
- **Auth Tables**: Automatic tables from Convex Auth
- **Numbers Table**: Simple example table with `value: number` field

## Key Patterns

### Convex Functions
- **Queries**: Read-only data fetching (`useQuery` hook)
- **Mutations**: Database writes (`useMutation` hook)  
- **Actions**: External API calls and complex operations (`useAction` hook)
- **Authentication**: Use `getAuthUserId(ctx)` in functions for user context

### React Patterns
- **Client Components**: Use `"use client"` directive for interactivity
- **Server Components**: Default in App Router for better performance
- **Hooks**: Custom hooks in `hooks/` directory (e.g., `use-mobile.ts`)

### Styling
- **Tailwind Classes**: Extensive use of Tailwind utility classes
- **Theme Support**: Dark/light mode via `next-themes`
- **Component Variants**: Uses `class-variance-authority` for component styling
- **CSS Variables**: Theme colors defined as CSS custom properties

## File Organization

### Core Files
- `app/layout.tsx`: Root layout with providers and metadata
- `app/page.tsx`: Main application page with auth-gated content
- `app/signin/page.tsx`: Authentication form
- `middleware.ts`: Route protection middleware

### Configuration
- `components.json`: shadcn/ui configuration
- `next.config.ts`: Next.js configuration
- `convex/tsconfig.json`: Convex-specific TypeScript config
- `package.json`: Defines parallel dev script pattern

### Quality Tools
- **ESLint**: `eslint.config.mjs` with Next.js rules
- **Prettier**: Auto-formatting with import sorting
- **TypeScript**: Strict mode enabled throughout