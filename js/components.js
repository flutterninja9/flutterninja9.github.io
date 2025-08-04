// Components - Handles UI updates and component rendering
class Components {
    constructor() {
        this.loadingOverlay = document.getElementById('loading-overlay');
    }

    // Show/hide loading overlay
    showLoading() {
        this.loadingOverlay.classList.add('show');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('show');
    }

    // Update user card
    updateUserCard(user) {
        const avatar = document.getElementById('user-avatar');
        const greeting = document.getElementById('user-greeting');
        const bio = document.getElementById('user-bio');

        if (avatar) {
            avatar.src = user.imageUrl || 'https://via.placeholder.com/120x120?text=TFN';
            avatar.alt = `${user.name} Profile Picture`;
        }

        if (greeting) {
            greeting.textContent = `Hi! My name is ${user.name}`;
        }

        if (bio) {
            bio.textContent = user.bio;
        }
    }

    // Update current status
    updateCurrentStatus(user) {
        const city = document.getElementById('user-city');
        const company = document.getElementById('user-company');
        const project = document.getElementById('user-project');
        const musicLink = document.getElementById('music-link');

        if (city) {
            city.textContent = user.city;
        }

        if (company) {
            company.textContent = user.workingFor;
        }

        if (project) {
            project.textContent = user.activeProject;
        }

        if (musicLink) {
            musicLink.href = user.spotifyPlaylist;
            musicLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openUrl(user.spotifyPlaylist);
            });
        }
    }

    // Update projects section
    updateProjects(projects) {
        const projectsGrid = document.getElementById('projects-grid');
        
        if (!projectsGrid) return;

        projectsGrid.innerHTML = '';

        projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }

    // Create project card element
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.backgroundColor = project.backgroundColor;

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.screenShotUrl}" alt="${project.name} Screenshot" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.name}</h3>
                <div class="project-divider"></div>
                <p class="project-description">${project.description}</p>
                <div class="project-buttons">
                    <a href="${project.deployedLink}" class="project-btn" target="_blank" rel="noopener noreferrer">Live</a>
                    <a href="${project.gitHubLink}" class="project-btn" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
            </div>
        `;

        return card;
    }

    // Update tools section
    updateTools(tools) {
        const toolsGrid = document.getElementById('tools-grid');
        
        if (!toolsGrid) return;

        toolsGrid.innerHTML = '';

        tools.forEach(tool => {
            const toolCard = this.createToolCard(tool);
            toolsGrid.appendChild(toolCard);
        });
    }

    // Create tool card element
    createToolCard(tool) {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.style.backgroundColor = tool.color;

        card.innerHTML = `
            <div class="tool-icon" style="color: ${tool.labelColor}">${tool.name.charAt(0)}</div>
            <div class="tool-name" style="color: ${tool.labelColor}">${tool.name}</div>
        `;

        return card;
    }

    // Update contact section
    updateContact(user) {
        const contactLinks = document.getElementById('contact-links');
        
        if (!contactLinks) return;

        const contactInfo = [
            {
                label: '@the_flutter_ninja',
                url: user.contact.instagram,
                icon: 'fab fa-instagram'
            },
            {
                label: 'Anirudh Singh',
                url: user.contact.linkedIn,
                icon: 'fab fa-linkedin'
            },
            {
                label: 'Anirudh',
                url: user.contact.email,
                icon: 'fas fa-envelope'
            },
            {
                label: 'flutterninja9',
                url: user.contact.github,
                icon: 'fab fa-github'
            }
        ];

        contactLinks.innerHTML = '';

        contactInfo.forEach(contact => {
            const contactLink = this.createContactLink(contact);
            contactLinks.appendChild(contactLink);
        });
    }

    // Create contact link element
    createContactLink(contact) {
        const link = document.createElement('a');
        link.className = 'contact-link';
        link.href = contact.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        link.innerHTML = `
            <i class="${contact.icon}"></i>
            <span>${contact.label}</span>
        `;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.openUrl(contact.url);
        });

        return link;
    }

    // Update navigation links
    updateNavigation(user) {
        const githubLink = document.getElementById('github-link');
        const contactLink = document.getElementById('contact-link');

        if (githubLink) {
            githubLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openUrl(user.contact.github);
            });
        }

        if (contactLink) {
            contactLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openUrl(user.contact.email);
            });
        }
    }

    // Open URL in new tab
    openUrl(url) {
        if (url && url.trim() !== '') {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }

    // Show error message
    showError(message) {
        console.error('Error:', message);
        // You can implement a more sophisticated error display here
        alert(`Error: ${message}`);
    }

    // Update all components with data
    updateAllComponents(user, projects, tools) {
        try {
            this.updateUserCard(user);
            this.updateCurrentStatus(user);
            this.updateProjects(projects);
            this.updateTools(tools);
            this.updateContact(user);
            this.updateNavigation(user);
        } catch (error) {
            console.error('Error updating components:', error);
            this.showError('Failed to update components');
        }
    }
}

// Create global instance
const components = new Components(); 