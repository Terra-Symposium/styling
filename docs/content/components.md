Browse the [interactive component showcase](/styling-docs/component-demo/) to inspect the exported controls, menus, and shadcn sidebar.

The package preserves Terra's original shadcn primitives and variants. Import them from `@terra-symposium/styling/ui` and load `@terra-symposium/styling/ui.css` once in your application.

The shared exports include buttons, form controls, menus, dialogs, cards, tabs, tooltips, searchable directories, and the responsive `Sidebar` family. Keyboard and pointer interactions are provided by the original Radix-backed components.

Use `FormSelect` with option data, and render repeated form controls from a field array. The required marker, label, description, error, and control wiring are handled by the shared renderer:

```tsx
<MappedFormFields
  data={[
    { type: 'input', name: 'name', label: 'Name', required: true },
    {
      type: 'select',
      name: 'role',
      label: 'Role',
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'member', label: 'Member' },
      ],
    },
  ]}
/>

<FormSelect
  name='status'
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ]}
/>
```

Mapped checkbox fields use a vertical (stacked) control and label by default. Set `orientation: 'horizontal'` on an individual checkbox to place the checkbox before its label; description and error feedback stay below the label and remain referenced by the checkbox:

```tsx
<MappedFormFields
  data={[
    {
      type: 'checkbox',
      name: 'termsAccepted',
      label: 'I agree to the terms',
      orientation: 'horizontal',
      description: 'This choice is required to continue.',
    },
  ]}
/>
```

Use `DataTable` with `rows` and `columns` for repeated table structure. Cell renderers remain available for values that need custom presentation.
