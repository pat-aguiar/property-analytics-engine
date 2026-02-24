# ADR 001: Native Testing and API Versioning

## Context
We need a robust testing suite and a way to evolve the API without breaking client-server contracts.

## Decision
1. Use the **Node.js native test runner** to reduce dependencies and improve performance.
2. Implement **URL-based versioning (/api/v1)**.

## Consequences
- Better "Delivery Quality" by ensuring backward compatibility.
- Lower maintenance overhead by using built-in Node.js tools.