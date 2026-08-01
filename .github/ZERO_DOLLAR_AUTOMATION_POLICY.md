# Zero-Dollar Automation Policy

This policy governs automation, hosting, services, dependencies, assets, and infrastructure for `BlindAnatomist/hollow-and-hoard`.

## Binding rule

No repository action may create a charge, consume a paid allowance, activate a paid tier, require a purchase, or establish a service that can become billable without the owner's explicit authorization for that exact cost-bearing action.

Silence is not authorization. A technically available paid feature is not authorized merely because an account can access it.

## Allowed without additional cost authorization

The following may be used only when they are confirmed to be zero-dollar for this public repository and remain within the bounded assignment:

- ordinary GitHub repository operations;
- standard GitHub-hosted Actions runners available at no charge for public repositories;
- open-source dependencies with licenses compatible with the project;
- local or connector-based inspection and verification;
- static assets created for the project or explicitly authorized for public use;
- free local development tools that do not require a paid account or billable API.

Use of an allowed mechanism still requires ordinary scope, security, publication, and deployment authorization.

## Prohibited without explicit authorization

Do not:

- use paid or larger GitHub-hosted runners;
- use self-hosted infrastructure that creates hosting, electricity, maintenance, or account charges on the owner's behalf;
- purchase or license stock art, fonts, sound effects, music, plugins, templates, domains, certificates, or other assets;
- activate metered APIs, AI-generation services, databases, storage, analytics, monitoring, email delivery, or content-delivery services;
- upgrade a free account or accept a trial that converts to payment;
- enter billing information or create a billing relationship;
- create a Netlify, Vercel, Supabase, cloud-provider, or similar deployment solely because a free tier appears available;
- enable workflow behavior that deploys, publishes, releases, merges, or alters external state unless that consequence is separately authorized;
- create recurring automation whose cost status or execution volume is uncertain.

## GitHub Actions discipline

When Actions are useful and zero-dollar:

1. Inspect the repository and define the exact verification goal before dispatch.
2. Prefer one bounded workflow over duplicated or overlapping workflows.
3. Use least-privilege permissions.
4. Set realistic timeouts.
5. Use concurrency cancellation where repeated runs could overlap.
6. Avoid artifact retention unless the artifact is necessary; use the shortest useful retention period.
7. Inspect failure evidence before rerunning.
8. Do not use Actions as an exploratory edit-and-guess loop.
9. Record every dispatched run in the assignment completion report.

No workflow should be created until the technical stack and required commands are known.

## Dependency discipline

Before adding a dependency, verify:

- it is actually needed;
- its license is acceptable;
- it does not require a paid service or account;
- it does not silently transmit private or project data;
- it does not add a substantially heavier maintenance or security burden than the capability justifies;
- the same result cannot be achieved reliably with the existing stack.

Lockfiles must be committed once a package manager is chosen.

## Asset discipline

Only use assets that are:

- original to this project;
- created by an authorized tool under terms permitting repository use;
- public domain;
- openly licensed with required attribution preserved; or
- explicitly authorized by the owner.

“Free to view,” “free with account,” and “available in a subscription” do not automatically mean free to redistribute in a public repository.

## Deployment discipline

Repository creation or implementation permission does not authorize deployment.

Before any hosting or publication is configured, record:

- the service;
- confirmed zero-dollar status;
- account ownership;
- build and bandwidth constraints;
- whether automatic deployments consume any allowance;
- rollback and deletion paths;
- what public data or assets will be exposed;
- the owner's explicit authorization to proceed.

## Uncertainty rule

When there is uncertainty about cost, licensing, usage limits, billing conversion, or external-state effects:

1. stop before activation;
2. preserve the completed repository work;
3. state the exact uncertainty;
4. identify a zero-dollar alternative or the information needed to resolve it;
5. do not proceed until the uncertainty is resolved.

## Completion record

Every substantial assignment must state:

- whether Actions were dispatched;
- whether any external service was contacted or changed;
- whether any dependency or asset was added;
- whether any deployment occurred;
- whether any possible cost was introduced.

The expected answer is ordinarily: no cost introduced.
