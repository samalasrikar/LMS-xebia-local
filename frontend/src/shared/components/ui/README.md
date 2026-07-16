# UI Components Directory

This directory contains `shadcn/ui` components that serve as the single source of truth for the application's user interface.

## Contributing Conventions

1. **Check Existing Components First**: Before building any new UI element (e.g., button, dropdown, modal, date picker, table, tabs, badge, tooltip, etc.), check this folder (`src/shared/components/ui/`) first for an existing `shadcn/ui` component.
2. **Reuse over Rebuild**: Reuse and compose existing components rather than writing custom HTML/styling duplicates.
3. **Install via CLI**: If a required `shadcn/ui` component is missing from this directory, install it using the shadcn CLI:
   ```bash
   npx shadcn@latest add <component>
   ```
   Do not build custom alternatives unless no shadcn equivalent exists or covers the project requirements.
4. **Theme Configuration**: Maintain consistency with the Xebia brand colors by utilizing the preconfigured CSS custom properties (`--primary`, `--accent`, etc.) or custom styling variables rather than scatter-styling or inline hacks.
