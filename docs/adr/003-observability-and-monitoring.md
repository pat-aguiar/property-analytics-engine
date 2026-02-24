# ADR 003: Observability through Structured Logging

## Context
Production environments require clear visibility into system health and performance without manual debugging.

## Decision
Implemented **Winston** for JSON-based structured logging and integrated `performance.now()` to track Redis latency.

## Consequences
- Enables automated log parsing and alerting.
- Provides high-standard **observability**, aligned with Senior Engineering practices.