# DRESSING Color Customization Guide

## Overview

DRESSING allows you to customize report colors through the `--colors` CLI option or programmatically via the `colors` property in `ReportOptions`.

---

## Quick Start

### CLI Usage

```bash
# Custom purple theme
dressing generate -i report.json -o report.html \
  --colors '{"primary":"#9333ea","success":"#22c55e","danger":"#dc2626"}'

# Ocean blue theme
dressing generate -i report.json -o report.html \
  --colors '{"primary":"#0ea5e9","success":"#10b981","danger":"#f43f5e"}'
```

### Programmatic Usage

```typescript
import { generate } from 'dressing'

await generate({
  jsonFile: 'cucumber.json',
  output: 'report.html',
  colors: {
    primary: '#9333ea',
    success: '#22c55e',
    danger: '#dc2626',
    warning: '#eab308',
  },
})
```

---

## Available Color Properties

| Property              | Description                            | Default (Modern Theme) |
| --------------------- | -------------------------------------- | ---------------------- |
| `primary`             | Primary/accent color (header, buttons) | `#2563eb` (blue)       |
| `success`             | Success/pass color                     | `#10b981` (green)      |
| `danger`              | Failure/error color                    | `#ef4444` (red)        |
| `warning`             | Warning/skip color                     | `#f59e0b` (orange)     |
| `info`                | Info/pending color                     | `#3b82f6` (light blue) |
| `muted`               | Muted/undefined color                  | `#6b7280` (gray)       |
| `background`          | Main background color                  | `#ffffff` (white)      |
| `backgroundSecondary` | Secondary background (cards)           | `#f9fafb` (light gray) |
| `border`              | Border color                           | `#e5e7eb` (gray)       |
| `text`                | Primary text color                     | `#111827` (dark gray)  |
| `textSecondary`       | Secondary text color                   | `#6b7280` (gray)       |

---

## Color Presets

### 🟣 Purple Theme (Vibrant)

```bash
--colors '{
  "primary": "#9333ea",
  "success": "#22c55e",
  "danger": "#dc2626",
  "warning": "#eab308",
  "info": "#8b5cf6"
}'
```

### 🌊 Ocean Blue (Professional)

```bash
--colors '{
  "primary": "#0ea5e9",
  "success": "#06b6d4",
  "danger": "#f43f5e",
  "warning": "#fbbf24",
  "info": "#3b82f6"
}'
```

### 🌲 Forest Green (Calm)

```bash
--colors '{
  "primary": "#059669",
  "success": "#10b981",
  "danger": "#dc2626",
  "warning": "#f59e0b",
  "info": "#14b8a6"
}'
```

### 🔥 Ember (Bold)

```bash
--colors '{
  "primary": "#ea580c",
  "success": "#22c55e",
  "danger": "#dc2626",
  "warning": "#f59e0b",
  "info": "#f97316"
}'
```

### 🌸 Rosé (Elegant)

```bash
--colors '{
  "primary": "#ec4899",
  "success": "#10b981",
  "danger": "#ef4444",
  "warning": "#f59e0b",
  "info": "#d946ef"
}'
```

### ⚡ Electric Yellow (Energetic)

```bash
--colors '{
  "primary": "#eab308",
  "success": "#84cc16",
  "danger": "#ef4444",
  "warning": "#f97316",
  "info": "#facc15"
}'
```

### 🌙 Dark Mode Custom

```bash
dressing generate -i report.json -o report.html \
  --theme dark \
  --colors '{
    "primary": "#818cf8",
    "success": "#34d399",
    "danger": "#f87171",
    "warning": "#fbbf24",
    "background": "#0f172a",
    "backgroundSecondary": "#1e293b",
    "border": "#334155",
    "text": "#f1f5f9",
    "textSecondary": "#94a3b8"
  }'
```

### 🎨 Pastel (Soft)

```bash
--colors '{
  "primary": "#a78bfa",
  "success": "#86efac",
  "danger": "#fca5a5",
  "warning": "#fde047",
  "info": "#93c5fd"
}'
```

---

## Corporate Branding Examples

### GitHub Style

```bash
--colors '{
  "primary": "#0969da",
  "success": "#1a7f37",
  "danger": "#d1242f",
  "warning": "#bf8700",
  "background": "#ffffff",
  "backgroundSecondary": "#f6f8fa",
  "border": "#d0d7de",
  "text": "#1f2328"
}'
```

### GitLab Style

```bash
--colors '{
  "primary": "#fc6d26",
  "success": "#108548",
  "danger": "#dd2b0e",
  "warning": "#fca326",
  "info": "#1f75cb"
}'
```

### Slack Style

```bash
--colors '{
  "primary": "#611f69",
  "success": "#2eb67d",
  "danger": "#e01e5a",
  "warning": "#ecb22e",
  "info": "#36c5f0"
}'
```

---

## Usage Examples

### Example 1: Company Brand Colors

```bash
# Use your company's brand colors
dressing generate \
  -i cucumber.json \
  -o report.html \
  --colors '{
    "primary": "#0066cc",
    "success": "#28a745",
    "danger": "#dc3545",
    "warning": "#ffc107"
  }'
```

### Example 2: Combining with Themes

```bash
# Dark theme with custom accent colors
dressing generate \
  -i cucumber.json \
  -o report.html \
  --theme dark \
  --colors '{"primary":"#818cf8","success":"#34d399"}'
```

### Example 3: Accessibility (High Contrast)

```bash
# High contrast colors for better accessibility
dressing generate \
  -i cucumber.json \
  -o report.html \
  --colors '{
    "primary": "#0000ff",
    "success": "#008000",
    "danger": "#ff0000",
    "warning": "#ff8c00",
    "text": "#000000",
    "background": "#ffffff"
  }'
```

### Example 4: Programmatic with TypeScript

```typescript
import { generate, ColorCustomization } from 'dressing'

const companyColors: ColorCustomization = {
  primary: '#0066cc',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
}

await generate({
  jsonFile: 'cucumber-report.json',
  output: 'branded-report.html',
  colors: companyColors,
  brandTitle: 'Acme Corp Tests',
})
```

---

## Tips & Best Practices

### 1. Color Contrast

- Ensure sufficient contrast between text and background colors
- Test with tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- WCAG AA requires 4.5:1 contrast ratio for normal text

### 2. Consistent Color Meanings

- **Green (success)**: Pass, success, positive
- **Red (danger)**: Fail, error, critical
- **Yellow/Orange (warning)**: Skip, warning, attention needed
- **Blue (info)**: Information, pending, neutral

### 3. Brand Consistency

- Use your company's official brand colors for primary
- Maintain accessibility while matching brand guidelines
- Consider light and dark theme variants

### 4. Testing

Always test your custom colors on both:

- Light backgrounds (default)
- Dark theme (if using `--theme dark`)
- Different screen sizes and devices

### 5. Color Values

- Use hex format: `#RRGGBB` (e.g., `#ff0000`)
- RGB/RGBA also supported: `rgb(255, 0, 0)` or `rgba(255, 0, 0, 0.5)`
- Named colors: `red`, `blue`, etc. (limited palette)
- HSL supported: `hsl(0, 100%, 50%)`

---

## Color Picker Tools

- [Coolors](https://coolors.co/) - Color scheme generator
- [Adobe Color](https://color.adobe.com/) - Color wheel
- [Paletton](https://paletton.com/) - Color palette designer
- [Material Design Palette](https://materialui.co/colors/) - Material colors
- [TailwindCSS Colors](https://tailwindcss.com/docs/customizing-colors) - Modern color palette

---

## Troubleshooting

### Colors not applying?

1. Check JSON syntax is valid
2. Ensure color values are valid CSS colors
3. Clear browser cache and refresh

### Colors look wrong on dark theme?

```bash
# Provide specific colors for dark theme
--theme dark \
--colors '{
  "background": "#1a1a1a",
  "text": "#ffffff",
  "primary": "#60a5fa"
}'
```

### Want to reset to defaults?

Simply omit the `--colors` option or set to empty object:

```bash
--colors '{}'
```

---

## Examples in the Wild

### Generate Reports for Different Environments

**Staging (Yellow)**

```bash
dressing generate -i staging.json -o staging-report.html \
  --colors '{"primary":"#eab308"}' \
  --title "Staging Tests"
```

**Production (Green)**

```bash
dressing generate -i prod.json -o prod-report.html \
  --colors '{"primary":"#059669"}' \
  --title "Production Tests"
```

**Development (Blue)**

```bash
dressing generate -i dev.json -o dev-report.html \
  --colors '{"primary":"#3b82f6"}' \
  --title "Development Tests"
```

---

## Advanced: Color Themes JSON File

For complex setups, create a color themes file:

**colors.json**

```json
{
  "production": {
    "primary": "#059669",
    "success": "#10b981",
    "danger": "#dc2626"
  },
  "staging": {
    "primary": "#eab308",
    "success": "#84cc16",
    "danger": "#f97316"
  },
  "development": {
    "primary": "#3b82f6",
    "success": "#06b6d4",
    "danger": "#f43f5e"
  }
}
```

**Usage Script (Node.js)**

```javascript
const { generate } = require('dressing')
const fs = require('fs')

const colorThemes = JSON.parse(fs.readFileSync('colors.json', 'utf8'))
const environment = process.env.ENV || 'development'

await generate({
  jsonFile: 'cucumber-report.json',
  output: `${environment}-report.html`,
  colors: colorThemes[environment],
  reportTitle: `${environment.toUpperCase()} Test Report`,
})
```

---

## Contributing

Have a great color preset? Share it with the community!

- Open a PR adding your preset to this guide
- Share screenshots in GitHub Discussions
- Tag with `#dressing-themes` on social media

---

**Happy customizing! 🎨**
