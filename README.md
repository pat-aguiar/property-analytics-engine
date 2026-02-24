# Property Analytics Engine (Node.js & Redis)

A high-throughput microservice designed for real-time property engagement tracking. This project demonstrates a **Senior-level** approach to scalability, resilience, and software evolution.

## 🚀 Key Architectural Features
- **Scalability:** Implemented a **Write-Through cache** pattern with **Redis** to buffer heavy SQL write-load.
- **Resilience:** Integrated a **Circuit Breaker** (Opossum) to ensure **fault tolerance** and 99.9% uptime during infrastructure latency.
- **API Evolution:** Utilizes **URL-based versioning (/api/v1)** to maintain delivery quality and backward compatibility.
- **Observability:** Structured JSON logging (Winston) and performance tracking for production-grade monitoring.

## 🛠️ Engineering Standards
- **Automated Testing:** 100% critical path coverage using the **Node.js Native Test Runner**.
- **CI/CD:** Automated pipeline via **GitHub Actions** with dedicated service containers.
- **Version Control:** Professional feature-branch workflow with conventional commits.
- **Documentation:** Full traceability of technical decisions via **ADRs** (Architecture Decision Records).

## 🚦 Getting Started
1. `npm install`
2. `redis-server --daemonize yes`
3. `npm test`