# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This repository is a comprehensive Node.js system design learning codebase that demonstrates various design patterns, system architectures, and JavaScript/TypeScript concepts. Each directory represents a different design pattern or system design concept with both TypeScript (`.ts`) source files and their compiled JavaScript (`.js`) counterparts.

## Common Commands

### Running Code
```bash
# Run any JavaScript file directly with Node.js
node <filename>.js

# Run the main assignment demonstration
node assignment.js

# Run specific pattern examples
node observer/index.js
node strategy/index.js
node decorator/index.js
```

### TypeScript Development
```bash
# Install TypeScript globally if needed
npm install -g typescript

# Compile TypeScript files (in directories with package.json)
cd state && npm run build
cd template && npm run build

# Compile individual TypeScript files
tsc <filename>.ts
```

### Working with Specific Patterns
```bash
# Navigate to pattern directories and run examples
cd async-design-pattern && node index.js
cd event-loop && node index.js
cd cancelling-async-task && node index.js
```

## Architecture Overview

### Directory Structure
The codebase is organized by design patterns and system concepts:

- **Design Patterns**: `observer/`, `strategy/`, `decorator/`, `command/`, `template/`, `state/`, `iterator/`
- **Async Patterns**: `async-design-pattern/`, `callback-pattern/`, `cancelling-async-task/`, `event-emitter/`, `event-loop/`
- **System Design**: `ecommerce-product-design/`, `notificaton-design/`, `online-offline-design/`
- **Interactive Examples**: `tictactoe/`, `assignment.ts` (coin payment system)

### Code Organization Patterns

#### Dual Implementation Strategy
Most patterns are implemented in both TypeScript and JavaScript:
- `.ts` files contain the source TypeScript implementation
- `.js` files contain either compiled output or hand-written JavaScript equivalents
- Both versions demonstrate the same concepts for learning purposes

#### Pattern Structure
Each pattern directory typically contains:
- `index.ts/js` - Main demonstration/usage example
- Individual class files implementing pattern components
- Some directories have `package.json` with build scripts

#### Configuration Files
- Individual `tsconfig.json` files in `state/` and `template/` directories
- `package.json` files in pattern directories that need dependencies (e.g., `template/` uses `js-yaml`)

### Key Implementation Details

#### State Management Patterns
- **Observer Pattern**: Weather station with multiple display observers
- **State Pattern**: Stateful message services with different operational states
- **Command Pattern**: File operations with undo functionality

#### Async Design Patterns
- **Message Services**: Authentication-dependent message queuing
- **Event Loop Concepts**: Demonstrating setTimeout vs setImmediate behavior
- **Cancellation Patterns**: Async task cancellation with generators and promises

#### Factory and Strategy Patterns
- **Payment Processing**: Multiple payment method implementations (Stripe, PayPal, Credit Card)
- **Product Strategy**: E-commerce product pricing strategies
- **Template Method**: Configuration file management (JSON/YAML)

## Development Workflow

### Testing Individual Patterns
```bash
# Test a specific pattern
node observer/index.js
node strategy/index.js

# Test the main assignment
node assignment.js
```

### Modifying Patterns
1. Edit the `.ts` source files
2. Compile with `tsc` if TypeScript is installed
3. Or work directly with `.js` files for quick iterations
4. Run with `node <filename>.js` to test changes

### Adding New Patterns
1. Create a new directory for the pattern
2. Implement both `.ts` and `.js` versions if following the existing pattern
3. Create an `index.ts/js` file demonstrating usage
4. Add `package.json` if external dependencies are needed

## Running Examples

### Core System Design Example
```bash
# Demonstrates user groups, admin coin distribution, and payment constraints
node assignment.js
```

### Design Pattern Examples
```bash
# Observer pattern with weather station
node observer/index.js

# Strategy pattern with payment methods  
node strategy/index.js

# Decorator pattern with item enhancements
node decorator/index.js

# Command pattern with file operations
node command/index.js
```

### Async Concept Examples
```bash
# Event loop behavior demonstration
node event-loop/index.js

# Async task cancellation patterns
node cancelling-async-task/index.js

# Message service state management
node async-design-pattern/index.js
```

## Project Context

This appears to be an educational codebase focused on:
- Learning fundamental design patterns in JavaScript/TypeScript
- Understanding Node.js async behavior and event loop mechanics
- Exploring system design concepts through practical implementations
- Demonstrating both functional and object-oriented programming approaches

The implementations prioritize clarity and learning over production optimization, making it ideal for studying system design concepts and design patterns.
