# Security baseline

- Do not commit `.env` or secrets.
- Use a least-privilege database account and TLS.
- Add authentication, authorization, input validation, rate limits, request-size limits, audit logs and safe error handling before public launch.
- Treat scripts and imported drawings as untrusted inputs.
- A future Lua VM must disable OS/process/file/network/package/debug/native-module access by default and expose only a restricted CAD API.
- Bound script time, memory, instructions and entity count.
- Keep database secrets server-side.
- Use a licensed SDK for native DWG.