// Main Application
class PortfolioApp {
    constructor() {
        this.dataService = dataService;
        this.components = components;
        this.isInitialized = false;
        this.darkMode = false;
    }

    // Initialize the application
    async init() {
        try {
            console.log('Initializing Portfolio App...');
            
            // Initialize dark mode
            this.initDarkMode();
            
            // Show loading overlay
            this.components.showLoading();

            // Load all data
            const data = await this.loadAllData();
            
            // Update all components
            this.components.updateAllComponents(data.user, data.projects, data.tools);
            
            // Hide loading overlay
            this.components.hideLoading();
            
            this.isInitialized = true;
            console.log('Portfolio App initialized successfully');
            
            // Add refresh functionality (optional)
            this.addRefreshFunctionality();
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.components.hideLoading();
            this.components.showError('Failed to load portfolio data. Please refresh the page.');
        }
    }

    // Initialize dark mode
    initDarkMode() {
        // Check for saved dark mode preference or default to light mode
        const savedDarkMode = localStorage.getItem('darkMode');
        this.darkMode = savedDarkMode === 'true';
        
        // Apply dark mode if enabled
        if (this.darkMode) {
            document.documentElement.classList.add('dark');
        }
        
        // Add dark mode toggle functionality
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }
    }

    // Toggle dark mode
    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        
        if (this.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Save preference
        localStorage.setItem('darkMode', this.darkMode.toString());
    }

    // Load all data from Firebase
    async loadAllData() {
        try {
            const [user, projects, tools] = await Promise.all([
                this.dataService.getUser(),
                this.dataService.getProjects(),
                this.dataService.getTools()
            ]);

            return { user, projects, tools };
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }

    // Add refresh functionality
    addRefreshFunctionality() {
        // Add keyboard shortcut for refresh (Ctrl+R or Cmd+R)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                this.refreshData();
            }
        });

        // Add manual refresh button (optional)
        this.addRefreshButton();
    }

    // Add refresh button to the app bar
    addRefreshButton() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const refreshBtn = document.createElement('button');
            refreshBtn.className = 'nav-link';
            refreshBtn.style.background = 'none';
            refreshBtn.style.border = 'none';
            refreshBtn.style.cursor = 'pointer';
            refreshBtn.style.fontFamily = 'inherit';
            refreshBtn.style.fontSize = 'inherit';
            refreshBtn.style.color = 'inherit';
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            refreshBtn.title = 'Refresh data (Ctrl+R)';
            
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });

            navLinks.appendChild(refreshBtn);
        }
    }

    // Refresh data
    async refreshData() {
        try {
            console.log('Refreshing data...');
            this.components.showLoading();
            
            // Clear cache and reload data
            const data = await this.dataService.refreshAllData();
            
            // Update components
            this.components.updateAllComponents(data.user, data.projects, data.tools);
            
            this.components.hideLoading();
            console.log('Data refreshed successfully');
            
            // Show success message (optional)
            this.showSuccessMessage('Data refreshed successfully!');
            
        } catch (error) {
            console.error('Error refreshing data:', error);
            this.components.hideLoading();
            this.components.showError('Failed to refresh data');
        }
    }

    // Show success message
    showSuccessMessage(message) {
        // Create a temporary success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 10000;
            font-family: var(--font-family-primary);
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;
        successMsg.textContent = message;
        
        // Add animation keyframes
        if (!document.querySelector('#success-animation')) {
            const style = document.createElement('style');
            style.id = 'success-animation';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(successMsg);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMsg.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (successMsg.parentNode) {
                    successMsg.parentNode.removeChild(successMsg);
                }
            }, 300);
        }, 3000);
    }

    // Handle window resize
    handleResize() {
        // Add any resize-specific logic here
        console.log('Window resized');
    }

    // Handle visibility change (when user switches tabs)
    handleVisibilityChange() {
        if (!document.hidden && this.isInitialized) {
            // Optionally refresh data when user returns to the tab
            // this.refreshData();
        }
    }

    // Add event listeners
    addEventListeners() {
        window.addEventListener('resize', this.handleResize.bind(this));
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    // Start the application
    async start() {
        // Add event listeners
        this.addEventListeners();
        
        // Initialize the app
        await this.init();
    }
}

// Create and start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.start();
});

// Handle errors globally
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
}); 