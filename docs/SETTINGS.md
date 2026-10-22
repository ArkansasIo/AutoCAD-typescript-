# Settings and profiles

Preferences include theme, drawing units, autosave interval, undo history, grid visibility, object snaps, polar tracking, ortho, dynamic input, selection highlighting, grips and destructive-action confirmation.

Validate imported profiles against `config/settings.schema.json`. Store named workspace profiles separately from project drawings. Never put credentials or API tokens in settings JSON.

`src/app/Settings.ts` provides default/load/save/reset functionality. The visual settings dialog and wiring all preferences into the editor remain roadmap items.