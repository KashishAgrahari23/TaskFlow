# TaskFlow — Product Requirements Document (PRD)

---

## 1. Project Title & One-liner

**TaskFlow** — a team task & project management backend that starts simple and grows into a production-ready system.
One-liner: *A scalable, secure REST API for creating projects, assigning tasks, tracking status and activity, and supporting team collaboration.*

---

## 2. Vision & Goals (why we build TaskFlow)

1. Provide a clean, well-structured backend project to learn backend fundamentals end-to-end.
2. Teach core backend concepts incrementally (auth, RBAC, DB modeling, pagination, caching, queues, testing, deployment).
3. Produce a portfolio-grade repository and architecture that can be explained in interviews.
4. Build a service that can be extended into real-world features (notifications, analytics, file storage).

---

## 3. Target Users & Personas

1. **Team Member (User)** — creates/updates tasks, comments, changes status, views assigned tasks.
2. **Project Manager (Manager)** — creates projects, assigns members, sets deadlines, views reports.
3. **Admin** — user management, global settings, system health.

---

## 4. Core Principles / Non-functional goals

1. **Modular & Readable**: MVC + services, small controllers, single responsibility.
2. **Testable**: unit + integration tests for critical flows.
3. **Secure by default**: hashed passwords, JWT, input validation, rate limits.
4. **Incremental complexity**: start with core features, add caching, queues, and infra later.
5. **Observability-ready**: structured logs and health endpoints.

---

## 5. Scope — Phased feature list (ascending order of implementation)

### Phase 1 — Core (MVP)

1. Project scaffold (MVC folders, env config).
2. User auth: signup, login, logout (bcrypt + JWT).
3. Role support: `member`, `manager`, `admin`.
4. Projects CRUD (create/read/update/delete).
5. Tasks CRUD: title, description, priority, status (`todo`, `in_progress`, `done`), due date, assignee.
6. Assign/Unassign tasks to users.
7. Basic comments on tasks.
8. Route protection & RBAC middleware.
9. Basic validation and error handling.
10. Health & status endpoints.

### Phase 2 — Useful additions (Intermediate)

1. Pagination & filtering for lists (projects, tasks).
2. Sorting & search (task title, tags).
3. Activity log (who did what) — simple DB model.
4. File attachments for tasks (local storage initially).
5. Email notifications mock (jobs queued later).
6. Rate limiting & security headers.

### Phase 3 — Production features (Advanced)

1. Refresh tokens + secure cookie flow + refresh token rotation (Redis optional).
2. Background job queue (Redis + Bull/BullMQ) for emails, attachment processing.
3. Caching frequently-read endpoints (Redis).
4. Aggregation endpoints / basic analytics (tasks per user, overdue tasks).
5. Docker + docker-compose (app, mongo, redis).
6. CI pipeline (lint, tests).
7. Integration tests, load considerations, graceful shutdown.

### Phase 4 — Stretch / Optional

1. Webhooks for external integrations.
2. GraphQL read endpoint for dashboards.
3. Multi-tenant support (per-organization isolation).
4. Horizontal scaling guidance and docs.

---

## 6. High-level User Stories (examples)

1. As a **user**, I can register and sign in so I can access TaskFlow.
2. As a **manager**, I can create a project and invite members to it.
3. As a **member**, I can create tasks in a project and assign them to myself or others.
4. As a **user**, I can comment on a task.
5. As a **manager**, I can view tasks filtered by status and assignee.
6. As an **admin**, I can deactivate abusive users.

---

## 7. API Surface (Top-level endpoints)

*(Exact request/response shapes will be defined later; this is the minimal endpoint map to start)*

1. `POST /api/v1/auth/register` — register user
2. `POST /api/v1/auth/login` — login (access token)
3. `POST /api/v1/auth/refresh` — refresh access token (later)
4. `GET /api/v1/users/me` — profile
5. `GET /api/v1/projects` — list projects (supports pagination)
6. `POST /api/v1/projects` — create project
7. `GET /api/v1/projects/:projectId` — get project details
8. `PUT /api/v1/projects/:projectId` — update project (manager/admin)
9. `DELETE /api/v1/projects/:projectId` — delete project (manager/admin)
10. `GET /api/v1/projects/:projectId/tasks` — list tasks for project
11. `POST /api/v1/projects/:projectId/tasks` — create task
12. `GET /api/v1/tasks/:taskId` — task details
13. `PUT /api/v1/tasks/:taskId` — update task (status, assignee)
14. `DELETE /api/v1/tasks/:taskId` — delete task
15. `POST /api/v1/tasks/:taskId/comments` — add comment
16. `GET /api/v1/health` — health check

---

## 8. Data Models (brief — will expand before implementation)

### User

* `_id`, `name`, `email` (unique), `passwordHash`, `role` (`member|manager|admin`), `isActive`, `createdAt`, `updatedAt`

### Project

* `_id`, `title`, `description`, `owner` (userId), `members` ([userId]), `createdAt`, `updatedAt`

### Task

* `_id`, `projectId`, `title`, `description`, `priority` (`low|medium|high`), `status`, `assignee` (userId), `dueDate`, `attachments` ([url]), `createdBy`, `createdAt`, `updatedAt`

### Comment

* `_id`, `taskId`, `userId`, `body`, `createdAt`

### ActivityLog (simple append-only)

* `_id`, `actorId`, `action` (string), `meta` (object), `createdAt`

---

## 9. Security & Auth considerations

1. Passwords hashed with bcrypt (cost factor tuned for dev/prod).
2. JWT for stateless access tokens; refresh token strategy planned for Phase 3.
3. Role-based middleware to protect routes.
4. Input validation to prevent injection and malformed data.
5. CORS configured per environment.
6. Rate limiting for sensitive endpoints (login, register).
7. HTTPS required in production (note in README).

---

## 10. Non-functional Requirements (NFR)

1. **Performance**: API should respond in <200ms for most simple reads on local dev.
2. **Reliability**: graceful handling of DB connection issues, proper error responses.
3. **Maintainability**: code organized in MVC + services; easy to extend.
4. **Testability**: critical flows covered in unit/integration tests.
5. **Observability**: structured logs and a `/health` endpoint.

---

## 11. Tech Stack

* **Runtime**: Node.js (current LTS)
* **Framework**: Express.js
* **DB**: MongoDB (Mongoose)
* **Queue / Cache** (Phase 3): Redis + Bull/BullMQ
* **Auth**: JWT + bcrypt
* **Testing**: Jest + supertest
* **Dev tooling**: nodemon, ESLint, Prettier
* **Optional infra**: Docker, GitHub Actions

---

## 12. Milestones & Timeline (estimate, assuming 3–4 hrs/day)

1. **Week 0** — Project PRD, scaffold, app & server, health endpoint (Session 1).
2. **Week 1** — User model, auth, register/login, RBAC middleware, simple tests (Session 2).
3. **Week 2** — Projects & tasks basic CRUD, controllers, services, routes (Session 3).
4. **Week 3** — Comments, activity log, validation, pagination, simple frontend integration tests (Session 4).
5. **Week 4** — File attachments, rate limiting, search & indexes (Session 5).
6. **Week 5** — Redis + background jobs + email mock (Session 6).
7. **Week 6** — Dockerize, tests, CI pipeline, deploy docs (Session 7).
8. **Week 7** — Polish, interview prep, prepare architecture doc & talk track.

---

## 13. Acceptance Criteria (for MVP Phase 1)

1. Users can register and login (with hashed password).
2. Auth-protected endpoints return 401 for unauthenticated access.
3. Managers can create projects and add members.
4. Members can create tasks within projects they belong to.
5. Tasks can be assigned and status changed.
6. Basic validation and consistent error responses.
7. Basic tests for auth and a core task route passing locally.

---

## 14. Risks & Mitigations

1. **Over-scoping early** — mitigate by strictly following phases.
2. **Performance surprises with naive queries** — mitigate by adding indexes and profiling before Phase 3.
3. **Security gaps** — mitigate by following standard practices (bcrypt, helmet, validation) and reviewing endpoints.
4. **Time constraints** — keep daily goals small and focused.

---

## 15. Documentation to include in README (what you’ll paste)

* Project overview & vision
* Quick start (install, run, env variables) — to be added after scaffold created
* API list & examples (Phase 1)
* Data model summary
* Roadmap & phases
* Contribution guide & coding conventions
* How to run tests & CI notes

---

## 16. Next Steps (immediate)

1. Confirm PRD and phase prioritization.
2. I will create a minimal `README.md` front-matter from this PRD (developer-friendly) if you approve.
3. After approval, we start **Session 1 implementation guidance** (scaffold + health route) — I will explain each required file in chunks and guide you to implement it yourself.

---

### Permission to proceed

I’ve explained the PRD in clear chunks and ordered tasks ascending by implementation complexity.

Do I have your **permission to generate the `README.md` front-matter (a concise version of this PRD suitable for the repo)** and then move to **Session 1: scaffold & minimal server guidance**?

Reply with:

* **Approve README + Scaffold** — to start Session 1, or
* **Request changes** — tell me what to change in the PRD.
