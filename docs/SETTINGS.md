# Settings and profiles

User preferences include theme, drawing units, autosave interval, undo history, grid visibility, object snaps, polar tracking, ortho, dynamic input, selection highlighting, grips and destructive-action confirmation.

Validate imported profiles against `config/settings.schema.json`. Store named workspace profiles separately from project drawing data. Never put credentials or API tokens in settings JSON.

`src/app/Settings.ts` provides localStorage defaults/load/save/reset. The preferences dialog and full control wiring remain roadmap items.