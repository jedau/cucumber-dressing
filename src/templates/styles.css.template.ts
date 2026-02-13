export default `
/* DRESSING - Modern CSS Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --color-primary: #2563eb;
    --color-success: #10b981;
    --color-danger: #ef4444;
    --color-warning: #f59e0b;
    --color-info: #3b82f6;
    --color-muted: #6b7280;
    --color-bg: #ffffff;
    --color-bg-secondary: #f9fafb;
    --color-border: #e5e7eb;
    --color-text: #111827;
    --color-text-secondary: #6b7280;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

body.theme-dark {
    --color-bg: #1f2937;
    --color-bg-secondary: #111827;
    --color-border: #374151;
    --color-text: #f9fafb;
    --color-text-secondary: #9ca3af;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: var(--color-text);
    background-color: var(--color-bg);
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

/* Header */
.report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%);
    color: white;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-lg);
}

.brand h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.brand .tagline {
    font-size: 0.875rem;
    opacity: 0.9;
}

.report-info {
    text-align: right;
}

.report-info h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.generated-time {
    opacity: 0.9;
    font-size: 0.875rem;
}

/* Statistics */
.statistics-overview {
    margin-bottom: 2rem;
}

.statistics-overview h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--color-text);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.stat-card {
    background: var(--color-bg-secondary);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.stat-card.status-passed .stat-value {
    color: var(--color-success);
}

.stat-card.status-failed .stat-value {
    color: var(--color-danger);
}

.stat-card.status-skipped .stat-value {
    color: var(--color-warning);
}

/* Charts */
.charts-section {
    margin-bottom: 2rem;
}

.charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.chart-container {
    background: var(--color-bg-secondary);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--color-border);
}

.chart-container h4 {
    margin-bottom: 1rem;
    text-align: center;
}

/* Metadata */
.metadata-section, .custom-data-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--color-bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--color-border);
}

.metadata-section h3, .custom-data-section h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
}

.metadata-grid, .custom-data-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.metadata-item, .custom-data-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
}

.metadata-label, .custom-data-label {
    font-weight: 600;
    color: var(--color-text-secondary);
}

/* Features */
.features-section {
    margin-bottom: 2rem;
}

.features-section h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

.features-filter {
    margin-bottom: 1.5rem;
}

#searchFilter {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 1rem;
    background: var(--color-bg);
    color: var(--color-text);
}

#searchFilter:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.status-filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    color: var(--color-text);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.filter-btn:hover {
    background: var(--color-bg-secondary);
}

.filter-btn.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
}

/* Feature Cards */
.features-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.feature-card {
    background: var(--color-bg-secondary);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s;
}

.feature-card.status-passed {
    border-left: 4px solid var(--color-success);
}

.feature-card.status-failed {
    border-left: 4px solid var(--color-danger);
}

.feature-card.status-skipped {
    border-left: 4px solid var(--color-warning);
}

.feature-header {
    padding: 1.5rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-bg);
    transition: background 0.2s;
}

.feature-header:hover {
    background: var(--color-bg-secondary);
}

.feature-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.feature-title h4 {
    font-size: 1.25rem;
    color: var(--color-text);
}

.feature-stats {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.stat {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.toggle-icon {
    transition: transform 0.3s;
}

.feature-card.expanded .toggle-icon {
    transform: rotate(180deg);
}

/* Status Icons */
.status-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 0.875rem;
}

.feature-card.status-passed > .feature-header .status-icon,
.scenario-card.status-passed > .scenario-header .status-icon,
.step-item.status-passed .status-icon {
    background: var(--color-success);
    color: white;
}

.feature-card.status-failed > .feature-header .status-icon,
.scenario-card.status-failed > .scenario-header .status-icon,
.step-item.status-failed .status-icon {
    background: var(--color-danger);
    color: white;
}

.feature-card.status-skipped > .feature-header .status-icon,
.scenario-card.status-skipped > .scenario-header .status-icon,
.step-item.status-skipped .status-icon {
    background: var(--color-warning);
    color: white;
}

.feature-card.status-pending > .feature-header .status-icon,
.scenario-card.status-pending > .scenario-header .status-icon,
.step-item.status-pending .status-icon {
    background: var(--color-info);
    color: white;
}

.feature-card.status-undefined > .feature-header .status-icon,
.scenario-card.status-undefined > .scenario-header .status-icon,
.step-item.status-undefined .status-icon {
    background: var(--color-muted);
    color: white;
}

/* Tags */
.tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.tag {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: var(--color-primary);
    color: white;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
}

/* Scenarios */
.scenarios-list {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.scenario-card {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    overflow: hidden;
}

.scenario-header {
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s;
}

.scenario-header:hover {
    background: var(--color-bg-secondary);
}

.scenario-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
}

.scenario-title h5 {
    font-size: 1.1rem;
}

/* Steps */
.steps-list {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.step-item {
    padding: 0.75rem;
    background: var(--color-bg-secondary);
    border-radius: 4px;
    border-left: 3px solid var(--color-border);
}

.step-item.status-passed {
    border-left-color: var(--color-success);
}

.step-item.status-failed {
    border-left-color: var(--color-danger);
}

.step-item.status-skipped {
    border-left-color: var(--color-warning);
}

.step-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.step-keyword {
    font-weight: 600;
    color: var(--color-primary);
}

.step-name {
    flex: 1;
    color: var(--color-text);
}

.step-duration {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.step-error {
    margin-top: 0.75rem;
    padding: 1rem;
    background: rgba(239, 68, 68, 0.1);
    border-left: 3px solid var(--color-danger);
    border-radius: 4px;
}

.step-error pre {
    color: var(--color-danger);
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.step-doc-string, .step-data-table {
    margin-top: 0.75rem;
}

.step-doc-string pre {
    padding: 1rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    overflow-x: auto;
}

.step-data-table table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    overflow: hidden;
}

.step-data-table td {
    padding: 0.5rem;
    border: 1px solid var(--color-border);
}

.step-data-table tr:first-child {
    background: var(--color-bg);
    font-weight: 600;
}

.step-screenshot {
    margin-top: 0.75rem;
}

.step-screenshot img {
    max-width: 100%;
    border-radius: 4px;
    border: 1px solid var(--color-border);
}

/* Footer */
.report-footer {
    margin-top: 3rem;
    padding: 2rem;
    text-align: center;
    color: var(--color-text-secondary);
    border-top: 1px solid var(--color-border);
}

.report-footer strong {
    color: var(--color-primary);
}

.version {
    margin-top: 0.5rem;
    font-size: 0.875rem;
}

/* Descriptions */
.feature-description, .scenario-description {
    padding: 1rem 1.5rem;
    color: var(--color-text-secondary);
    line-height: 1.8;
}

.feature-content, .scenario-content {
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }

    .report-header {
        flex-direction: column;
        text-align: center;
    }

    .report-info {
        text-align: center;
        margin-top: 1rem;
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .charts-grid {
        grid-template-columns: 1fr;
    }

    .feature-header, .scenario-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }

    .feature-stats, .scenario-stats {
        width: 100%;
        justify-content: space-between;
    }
}

/* Print Styles */
@media print {
    .features-filter, .filter-btn {
        display: none;
    }

    .feature-content, .scenario-content {
        display: block !important;
    }
}
`
