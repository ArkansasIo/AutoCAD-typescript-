# MySQL database

Apply `db/schema.sql` on MySQL 8. Tables define users, projects, drawings, layers, entities and revision snapshots. The Express API currently includes a health check and a project drawing-list route.

Before public use, add authentication, project-level authorization, schema validation, rate limits, audit logs, transactional CRUD and backups. GitHub Pages is only a static client; host API/MySQL separately and never expose database credentials in browser code.