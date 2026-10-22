# Security baseline

- Never commit `.env` or production secrets.
- Use a least-privilege database account and TLS.
- Add authentication, project-level authorization, validation, rate limits, request-size limits, audit logs and safe error handling before public use.
- Treat scripts, DXF, JSON, images and references as untrusted data.
- A future Lua VM must disable OS/process/file/network/package/debug/native-module access by default and expose only allowlisted CAD APIs.
- Bound script execution time, memory, instruction count and generated entity count.
- Keep database secrets server-side.
- Use a properly licensed SDK for native DWG interoperability.