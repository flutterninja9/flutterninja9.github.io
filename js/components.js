// Components — renders data into the Utilitarian DOM
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
        const greeting = document.getElementById('user-greeting');
        const bio      = document.getElementById('user-bio');

        if (avatar) {
            avatar.src = user.imageUrl || '';
            avatar.alt = user.name;
            if (!user.imageUrl) avatar.style.display = 'none';
        }
        if (greeting) {
            // Uppercase, split on space for two-line display
            const parts = (user.name || 'ANIRUDH SINGH').toUpperCase().split(' ');
            greeting.innerHTML = parts[0] + '<br>' + (parts.slice(1).join(' ') || '');
        }
        if (bio) bio.textContent = user.bio;
    }

    // ── Current Status ───────────────────────────────────────────
    updateCurrentStatus(user) {
        const city      = document.getElementById('user-city');
        const company   = document.getElementById('user-company');
        const project   = document.getElementById('user-project');
        const musicLink = document.getElementById('music-link');

        if (city)    city.textContent    = (user.city || '—').toUpperCase();
        if (company) company.textContent = user.workingFor  || '—';
        if (project) project.textContent = user.activeProject || '—';

        if (musicLink && user.spotifyPlaylist) {
            musicLink.href = user.spotifyPlaylist;
            musicLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openUrl(user.spotifyPlaylist);
            });
        }
    }

    // ── Selected Works ───────────────────────────────────────────
    updateProjects(projects) {
        // Target the <tbody> inside the projects table
        const tbody = document.querySelector('#projects-grid tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        projects.forEach((p, i) => tbody.appendChild(this.createProjectRow(p, i)));
    }

    createProjectRow(project, index) {
        const tr = document.createElement('tr');
        const id = `PRJ-${String(index + 1).padStart(3, '0')}`;

        const tagsHtml = (project.tags && project.tags.length)
            ? project.tags.map(t => `<span class="badge badge-muted">${t.toUpperCase()}</span>`).join(' ')
            : '<span class="badge badge-muted">—</span>';

        const liveLink = project.deployedLink
            ? `<a href="${project.deployedLink}" class="link-action" target="_blank" rel="noopener noreferrer">LIVE</a>`
            : '';
        const ghLink = project.gitHubLink
            ? `<a href="${project.gitHubLink}" class="link-action" target="_blank" rel="noopener noreferrer">SOURCE</a>`
            : '';

        tr.innerHTML = `
            <td class="td-id">${id}</td>
            <td class="td-name">${project.name.toUpperCase()}</td>
            <td class="td-desc">${project.description}</td>
            <td class="td-tags">${tagsHtml}</td>
            <td class="td-actions">${liveLink}${ghLink}</td>
        `;

        return tr;
    }

    // ── Tools ────────────────────────────────────────────────────
    updateTools(tools) {
        const grid = document.getElementById('tools-grid');
        if (!grid) return;
        grid.innerHTML = '';
        tools.forEach(t => grid.appendChild(this.createToolCell(t)));
    }

    createToolCell(tool) {
        const cell = document.createElement('div');
        cell.className = 'tool-cell';
        cell.textContent = tool.name.toUpperCase();
        return cell;
    }

    // ── Contact ──────────────────────────────────────────────────
    updateContact(user) {
        const tbody = document.querySelector('#contact-links tbody') ||
                      document.getElementById('contact-links');
        if (!tbody) return;

        const contactInfo = [
            { channel: 'LinkedIn',  handle: 'Anirudh Singh',       url: user.contact.linkedIn,  label: 'CONNECT' },
            { channel: 'GitHub',    handle: 'flutterninja9',        url: user.contact.github,    label: 'VIEW' },
            { channel: 'Instagram', handle: '@the_flutter_ninja',   url: user.contact.instagram, label: 'FOLLOW' },
            { channel: 'Email',     handle: 'Direct message',       url: user.contact.email,     label: 'SEND' },
        ];

        tbody.innerHTML = '';
        contactInfo.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="td-channel">${c.channel.toUpperCase()}</td>
                <td class="status-sep">//</td>
                <td class="td-handle">${c.handle}</td>
                <td class="td-contact-link">
                    <a href="${c.url}" target="_blank" rel="noopener noreferrer">${c.label}</a>
                </td>
            `;
            // Intercept click
            tr.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                this.openUrl(c.url);
            });
            tbody.appendChild(tr);
        });
    }

    // ── Navigation ────────────────────────────────────────────────
    updateNavigation(user) {
        const githubLink = document.getElementById('github-link');
        if (githubLink) {
            githubLink.href = user.contact.github;
            githubLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openUrl(user.contact.github);
            });
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