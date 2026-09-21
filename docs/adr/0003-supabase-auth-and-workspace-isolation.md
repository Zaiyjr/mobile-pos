# ADR-0003: Keep Supabase Auth and enforce Workspace isolation in backend-v2

- **Status:** Accepted
- **Date:** 2026-09-19
- **Decision owner:** Product/Engineering

## Context

The current product already uses Supabase Auth. Replacing credential storage and recovery while also rewriting the backend would expand risk without improving the MVP outcome. The SaaS must support multiple isolated Workspaces, but a Supabase access token alone does not define the application's Workspace and role model.

## Decision

Keep Supabase Auth as the credential and token provider. backend-v2 owns the application profile, role, and Workspace association. Every protected request resolves Workspace context from the authenticated application profile before reaching a Workspace-owned repository.

The MVP schema uses non-null Workspace ownership for Workspace-owned records. The first security gate is application-level context enforcement plus cross-Workspace integration tests. RLS is a required decision before external rollout if the chosen database access path can enforce it correctly; it must not be treated as implemented merely because the database is Supabase.

## Consequences

Positive:

- Password storage, recovery, and token lifecycle remain with Supabase Auth.
- Business authorization stays in the application where role and Workspace rules are visible.
- The frontend receives one stable application profile shape.

Costs and risks:

- Auth provisioning can fail between external Auth creation and application Workspace creation; a recovery flow is required.
- The backend must never trust a client-supplied Workspace ID.
- RLS design must account for the server's database connection mode and service-role behavior.

