// Components - Handles UI updates and component rendering
class Components {
    constructor() {
        this.loadingOverlay = document.getElementById('loading-overlay');
    }

    // Show/hide loading overlay
    showLoading() {
        this.loadingOverlay.classList.remove('opacity-0', 'invisible');
        this.loadingOverlay.classList.add('opacity-100', 'visible');
    }

    hideLoading() {
        this.loadingOverlay.classList.add('opacity-0', 'invisible');
        this.loadingOverlay.classList.remove('opacity-100', 'visible');
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
        card.className = 'flex items-center bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex-col lg:flex-row';
        card.style.backgroundColor = project.backgroundColor;

        // Create tags HTML if tags exist
        const tagsHtml = project.tags && project.tags.length > 0 
            ? `<div class="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6">
                ${project.tags.map(tag => 
                    `<span class="px-2 py-1 text-xs bg-primary bg-opacity-10 text-primary-dark dark:text-dark-text border border-primary border-opacity-20 rounded-full font-roboto font-medium">#${tag}</span>`
                ).join('')}
               </div>`
            : '';

        card.innerHTML = `
            <div class="flex-1 max-w-[450px] h-[150px] sm:h-[180px] lg:h-[300px] overflow-hidden flex items-center justify-center">
                <img src="${project.screenShotUrl}" alt="${project.name} Screenshot" loading="lazy" class="w-full h-full object-contain p-2 sm:p-4">
            </div>
            <div class="flex-1 max-w-[450px] min-h-[300px] lg:min-h-[300px] p-4 sm:p-6 lg:p-8 m-2 rounded-md bg-canvas dark:bg-dark-canvas flex flex-col justify-between">
                <div class="flex flex-col items-center">
                    <h3 class="font-bebas text-lg sm:text-xl lg:text-2xl text-primary-dark dark:text-dark-text text-center mb-3 sm:mb-4">${project.name}</h3>
                    <div class="w-5 h-0.5 bg-primary-dark dark:bg-dark-text mx-auto mb-4 sm:mb-6"></div>
                    <p class="font-dm-sans text-xs sm:text-sm lg:text-base text-primary-dark dark:text-dark-text-light text-center mb-4 sm:mb-6 leading-relaxed flex-grow">${project.description}</p>
                    ${tagsHtml}
                </div>
                <div class="flex justify-evenly gap-2 sm:gap-3 flex-col sm:flex-row mt-auto">
                    <a href="${project.deployedLink}" class="px-3 py-2 sm:px-4 bg-primary text-canvas border-none rounded-sm font-roboto text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1 text-center" target="_blank" rel="noopener noreferrer">Live</a>
                    <a href="${project.gitHubLink}" class="px-3 py-2 sm:px-4 bg-primary text-canvas border-none rounded-sm font-roboto text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1 text-center" target="_blank" rel="noopener noreferrer">GitHub</a>
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
        card.className = 'w-20 h-20 sm:w-24 sm:h-24 bg-card dark:bg-dark-card rounded-md flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300';
        card.style.backgroundColor = tool.color;

        card.innerHTML = `
            <div class="font-ubuntu text-2xl sm:text-3xl font-black leading-tight" style="color: ${tool.labelColor}">${tool.name.charAt(0)}</div>
            <div class="font-ubuntu text-xs font-normal leading-tight text-center" style="color: ${tool.labelColor}">${tool.name}</div>
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
        link.className = 'flex items-center gap-4 text-white hover:text-primary transition-colors duration-300';
        link.href = contact.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        link.innerHTML = `
            <i class="${contact.icon} text-lg w-5 text-center"></i>
            <span class="font-lato text-base font-normal text-white">${contact.label}</span>
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