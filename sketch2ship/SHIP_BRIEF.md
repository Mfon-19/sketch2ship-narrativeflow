# NarrativeFlow Ship Brief

## 1. Project Overview
NarrativeFlow is a specialized CMS for serialized fiction. This prototype focuses on the **Core Editor Experience (Milestone m-2)** and the **Publishing Workflow (REQ-103)**. It provides a distraction-free writing environment and a clean reader interface, simulating a Next.js environment with local browser storage.

## 2. Execution Plan
- **Phase 1: Foundation (m-1)**: Implement a LocalStorage-based data layer to simulate the PostgreSQL schema (TECH-202). Setup a mock authentication state (REQ-101).
- **Phase 2: Writing Experience (m-2)**: Build a Markdown-enabled editor (REQ-102) with auto-save functionality. Implement a preview toggle to visualize content as a reader would (task-202).
- **Phase 3: Publishing & Reading**: Develop the dashboard to manage story chapters and a reader mode with SEO-friendly structure simulations (ISSUE-01).

## 3. Acceptance Criteria
- [ ] Users can toggle between 'Writer' and 'Reader' modes.
- [ ] The editor supports basic Markdown formatting (simulated via CSS/JS parser).
- [ ] Stories are persistent across page refreshes via LocalStorage.
- [ ] Chapter-based navigation is functional for readers.
- [ ] UI provides a distraction-free 'Zen' mode for authors.

## 4. Technical Constraints
- **Storage**: Browser LocalStorage serves as the mock database.
- **Dependencies**: Zero external dependencies (Vanilla HTML/CSS/JS).
- **Structure**: Single Page Application logic within `app.js`.