# ADR 002: Implementation of Circuit Breaker

## Context
A failure in Redis should not crash the entire Property Analytics service.

## Decision
Use `opossum` to implement a Circuit Breaker around Redis interactions.

## Consequences
- **Resilience**: The API remains responsive even if the cache is down.
- **Fault Tolerance**: Prevents cascading failures across the microservice.