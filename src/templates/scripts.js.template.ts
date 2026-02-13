export default `
// DRESSING - JavaScript for interactivity

// Toggle feature visibility
function toggleFeature(id) {
    const element = document.getElementById(id);
    const card = element.closest('.feature-card');

    if (element.style.display === 'none') {
        element.style.display = 'block';
        card.classList.add('expanded');
    } else {
        element.style.display = 'none';
        card.classList.remove('expanded');
    }
}

// Toggle scenario visibility
function toggleScenario(id) {
    const element = document.getElementById(id);
    const card = element.closest('.scenario-card');

    if (element.style.display === 'none') {
        element.style.display = 'block';
        card.classList.add('expanded');
    } else {
        element.style.display = 'none';
        card.classList.remove('expanded');
    }
}

// Search and filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchFilter');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const featureCards = document.querySelectorAll('.feature-card');

    let currentStatusFilter = 'all';

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterFeatures(searchTerm, currentStatusFilter);
        });
    }

    // Status filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentStatusFilter = this.dataset.status;

            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            filterFeatures(searchTerm, currentStatusFilter);
        });
    });

    // Filter features based on search and status
    function filterFeatures(searchTerm, statusFilter) {
        featureCards.forEach(card => {
            const featureName = card.querySelector('.feature-title h4')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            const scenarios = Array.from(card.querySelectorAll('.scenario-title h5')).map(s => s.textContent.toLowerCase());
            const status = card.dataset.status;

            const matchesSearch = !searchTerm ||
                featureName.includes(searchTerm) ||
                tags.some(tag => tag.includes(searchTerm)) ||
                scenarios.some(scenario => scenario.includes(searchTerm));

            const matchesStatus = statusFilter === 'all' || status === statusFilter;

            if (matchesSearch && matchesStatus) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Expand failed features by default
    expandFailedFeatures();
});

// Initialize Chart.js charts
function initializeCharts() {
    // Status Distribution Chart
    const statusChartCanvas = document.getElementById('statusChart');
    if (statusChartCanvas) {
        const ctx = statusChartCanvas.getContext('2d');

        // Get data from the page
        const statsCards = document.querySelectorAll('.stat-card');
        let passed = 0, failed = 0, skipped = 0;

        statsCards.forEach(card => {
            const label = card.querySelector('.stat-label')?.textContent.toLowerCase();
            const value = parseInt(card.querySelector('.stat-value')?.textContent) || 0;

            if (label === 'passed') passed = value;
            if (label === 'failed') failed = value;
            if (label === 'skipped') skipped = value;
        });

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Passed', 'Failed', 'Skipped'],
                datasets: [{
                    data: [passed, failed, skipped],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(245, 158, 11, 0.8)'
                    ],
                    borderColor: [
                        'rgb(16, 185, 129)',
                        'rgb(239, 68, 68)',
                        'rgb(245, 158, 11)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return label + ': ' + value + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }

    // Pass Rate Chart
    const passRateChartCanvas = document.getElementById('passRateChart');
    if (passRateChartCanvas) {
        const ctx = passRateChartCanvas.getContext('2d');

        // Get pass rate from the page
        const passRateCard = Array.from(document.querySelectorAll('.stat-card')).find(card =>
            card.querySelector('.stat-label')?.textContent.toLowerCase() === 'pass rate'
        );

        const passRate = passRateCard ? parseFloat(passRateCard.querySelector('.stat-value')?.textContent) : 0;
        const failRate = 100 - passRate;

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Passed', 'Failed'],
                datasets: [{
                    data: [passRate, failRate],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                        'rgb(16, 185, 129)',
                        'rgb(239, 68, 68)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return label + ': ' + value.toFixed(1) + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Expand failed features automatically
function expandFailedFeatures() {
    const failedFeatures = document.querySelectorAll('.feature-card.status-failed');
    failedFeatures.forEach(feature => {
        const featureContent = feature.querySelector('.feature-content');
        if (featureContent) {
            featureContent.style.display = 'block';
            feature.classList.add('expanded');

            // Also expand failed scenarios within
            const failedScenarios = feature.querySelectorAll('.scenario-card.status-failed');
            failedScenarios.forEach(scenario => {
                const scenarioContent = scenario.querySelector('.scenario-content');
                if (scenarioContent) {
                    scenarioContent.style.display = 'block';
                    scenario.classList.add('expanded');
                }
            });
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('searchFilter');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchFilter');
        if (searchInput && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    }

    // Ctrl/Cmd + E to expand all
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        expandAll();
    }

    // Ctrl/Cmd + C to collapse all
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        collapseAll();
    }
});

// Expand all features and scenarios
function expandAll() {
    document.querySelectorAll('.feature-content').forEach(content => {
        content.style.display = 'block';
        content.closest('.feature-card')?.classList.add('expanded');
    });

    document.querySelectorAll('.scenario-content').forEach(content => {
        content.style.display = 'block';
        content.closest('.scenario-card')?.classList.add('expanded');
    });
}

// Collapse all features and scenarios
function collapseAll() {
    document.querySelectorAll('.feature-content').forEach(content => {
        content.style.display = 'none';
        content.closest('.feature-card')?.classList.remove('expanded');
    });

    document.querySelectorAll('.scenario-content').forEach(content => {
        content.style.display = 'none';
        content.closest('.scenario-card')?.classList.remove('expanded');
    });
}

// Add Chart.js CDN and initialize charts after loading
(function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    script.onload = function() {
        console.log('Chart.js loaded successfully');
        // Initialize charts after Chart.js is loaded
        initializeCharts();
    };
    script.onerror = function() {
        console.error('Failed to load Chart.js');
    };
    document.head.appendChild(script);
})();
`
