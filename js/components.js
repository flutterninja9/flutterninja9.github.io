// Components — renders data into the clean monochromatic DOM
class Components {
    constructor() {
        this.loadingOverlay = document.getElementById('loading-overlay');
    }

    // ── Loading ──────────────────────────────────────────────────
    showLoading() {
        if (this.loadingOverlay) this.loadingOverlay.classList.remove('hidden');
    }
    hideLoading() {
        if (this.loadingOverlay) this.loadingOverlay.classList.add('hidden');
    }

    // ── Identity / Hero ──────────────────────────────────────────
    updateUserCard(user) {
        const avatar   = document.getElementById('user-avatar');
        const nameEl   = document.getElementById('user-name');
        const bio      = document.getElementById('user-bio');

        if (avatar) {
            if (user.imageUrl) {
                avatar.src = user.imageUrl;
                avatar.alt = user.name || 'Anirudh Singh';
            } else {
                avatar.style.display = 'none';
            }
        }
        if (nameEl) nameEl.textContent = user.name || 'Anirudh Singh';
        if (bio)    bio.textContent    = user.bio  || '';
    }

    // ── Current Status ───────────────────────────────────────────
    updateCurrentStatus(user) {
        // Now cards
        const nowCity    = document.getElementById('now-city');
        const nowCompany = document.getElementById('now-company');
        const nowProject = document.getElementById('now-project');
        const nowMusic   = document.getElementById('now-music');

        if (nowCity)    nowCity.textContent    = user.city        || '—';
        if (nowCompany) nowCompany.textContent = user.workingFor  || '—';
        if (nowProject) nowProject.textContent = user.activeProject || '—';

        if (nowMusic && user.spotifyPlaylist) {
            nowMusic.href = user.spotifyPlaylist;
        }

        // Status chips
        const chipLocation = document.getElementById('chip-location');
        const chipCompany  = document.getElementById('chip-company');
        const chipProject  = document.getElementById('chip-project');

        if (chipLocation) chipLocation.textContent = user.city        || '—';
        if (chipCompany)  chipCompany.textContent  = user.workingFor  || '—';
        if (chipProject)  chipProject.textContent  = user.activeProject || '—';
    }

    // ── Selected Works ───────────────────────────────────────────
    updateProjects(projects) {
        const list = document.getElementById('projects-list');
        if (!list) return;
        list.innerHTML = '';
        projects.forEach(p => list.appendChild(this.createProjectCard(p)));
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';

        const tagsHtml = (project.tags && project.tags.length)
            ? project.tags.map(t => `<span class="tag">${t}</span>`).join('')
            : '';

        const liveLink = project.deployedLink
            ? `<a href="${project.deployedLink}" class="project-link" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live
               </a>`
            : '';

        const ghLink = project.gitHubLink
            ? `<a href="${project.gitHubLink}" class="project-link" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                Source
               </a>`
            : '';

        // Screenshot badge — shown only when an image exists
        const imgBadge = project.screenShotUrl
            ? `<span class="project-img-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Preview
               </span>`
            : '';

        card.innerHTML = `
            <div class="project-info">
                <p class="project-name">${project.name}</p>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">${tagsHtml}${imgBadge}</div>
            </div>
            <div class="project-links">${liveLink}${ghLink}</div>
        `;

        // Open lightbox on card click (if screenshot exists)
        if (project.screenShotUrl) {
            card.classList.add('has-image');
            card.addEventListener('click', (e) => {
                // Don't intercept clicks on the external links
                if (e.target.closest('a')) return;
                if (typeof window.openLightbox === 'function') {
                    window.openLightbox(
                        project.screenShotUrl,
                        project.backgroundColor || '#1a1a1a',
                        project.name,
                        project.deployedLink || '',
                        project.gitHubLink   || ''
                    );
                }
            });
        }

        return card;
    }

    // ── Tools / Stack ────────────────────────────────────────────
    updateTools(tools) {
        const grid = document.getElementById('tools-grid');
        if (!grid) return;
        grid.innerHTML = '';
        tools.forEach(t => grid.appendChild(this.createStackItem(t)));
    }

    createStackItem(tool) {
        const div = document.createElement('div');
        div.className = 'stack-item';
        div.textContent = tool.name;
        return div;
    }

    // ── Contact ──────────────────────────────────────────────────
    updateContact(user) {
        const grid = document.getElementById('contact-links');
        if (!grid) return;

        const contactInfo = [
            { platform: 'LinkedIn',  handle: 'Anirudh Singh',      url: user.contact.linkedIn,  label: 'Connect ↗' },
            { platform: 'GitHub',    handle: 'flutterninja9',       url: user.contact.github,    label: 'View profile ↗' },
            { platform: 'Instagram', handle: '@the_flutter_ninja',  url: user.contact.instagram, label: 'Follow ↗' },
            { platform: 'Email',     handle: 'Direct message',      url: user.contact.email,     label: 'Send email ↗' },
        ];

        grid.innerHTML = '';
        contactInfo.forEach(c => {
            const card = document.createElement('div');
            card.className = 'contact-card';
            card.innerHTML = `
                <p class="contact-card-platform">${c.platform}</p>
                <p class="contact-card-handle">${c.handle}</p>
                <p class="contact-card-action">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    ${c.label}
                </p>
            `;
            card.addEventListener('click', () => this.openUrl(c.url));
            grid.appendChild(card);
        });
    }

    // ── Navigation ────────────────────────────────────────────────
    updateNavigation(user) {
        const githubLink       = document.getElementById('github-link');
        const githubLinkMobile = document.getElementById('github-link-mobile');

        const openGH = (e) => {
            e.preventDefault();
            this.openUrl(user.contact.github);
        };

        if (githubLink) {
            githubLink.href = user.contact.github;
            githubLink.addEventListener('click', openGH);
        }
        if (githubLinkMobile) {
            githubLinkMobile.href = user.contact.github;
            githubLinkMobile.addEventListener('click', openGH);
        }
    }

    // ── Helpers ───────────────────────────────────────────────────
    openUrl(url) {
        if (url && url.trim()) window.open(url, '_blank', 'noopener,noreferrer');
    }

    showError(message) {
        console.error('Portfolio error:', message);
    }

    updateAllComponents(user, projects, tools) {
        try {
            this.updateUserCard(user);
            this.updateCurrentStatus(user);
            this.updateProjects(projects);
            this.updateTools(tools);
            this.updateContact(user);
            this.updateNavigation(user);
        } catch (err) {
            console.error('Error updating components:', err);
        }
    }
}

const components = new Components();