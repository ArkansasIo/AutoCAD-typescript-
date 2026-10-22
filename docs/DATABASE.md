# MySQL database

Apply `db/schema.sql` to MySQL 8. The schema defines users, projects, drawings, layers, entities and drawing revision snapshots. `server/` is an API foundation with a database health check and project drawing list endpoint only.

Before public deployment, add authentication, project-level authorization, schema validation, limits, audit logging, transactional CRUD/revision endpoints and backups. GitHub Pages hosts static assets only; the API and MySQL must be separately hosted. Never expose database credentials to frontend code.