// Data Service - Handles Firebase data fetching
class DataService {
    constructor() {
        this.db = firebase.firestore();
        this.cache = {
            user: null,
            projects: null,
            tools: null
        };
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Helper function to convert hex color to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Get user data
    async getUser() {
        try {
            // Check cache first
            if (this.cache.user && (Date.now() - this.cache.user.timestamp) < this.cacheTimeout) {
                return this.cache.user.data;
            }

            const snapshot = await this.db.collection("user").get();
            if (snapshot.empty) {
                throw new Error('No user data found');
            }

            const userData = snapshot.docs[0].data();
            const user = {
                activeProject: userData.activeProject || '',
                bio: userData.bio || '',
                city: userData.city || '',
                contact: {
                    email: `mailto:${userData.contact?.email || ''}`,
                    github: userData.contact?.github || '',
                    instagram: userData.contact?.instagram || '',
                    linkedIn: userData.contact?.linkedIn || ''
                },
                name: userData.name || '',
                spotifyPlaylist: userData.spotifyPlaylist || '',
                workingFor: userData.workingFor || '',
                imageUrl: userData.imageUrl || ''
            };

            // Cache the result
            this.cache.user = {
                data: user,
                timestamp: Date.now()
            };

            return user;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    // Get projects data
    async getProjects() {
        try {
            // Check cache first
            if (this.cache.projects && (Date.now() - this.cache.projects.timestamp) < this.cacheTimeout) {
                return this.cache.projects.data;
            }

            const snapshot = await this.db.collection("projects").get();
            const projects = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    name: data.name || '',
                    description: data.description || '',
                    screenShotUrl: data.screenShotUrl || '',
                    backgroundColor: data.backgroundColor || '#ffffff',
                    deployedLink: data.deployedLink || '',
                    gitHubLink: data.gitHubLink || '',
                    tags: data.tags || []
                };
            });

            // Cache the result
            this.cache.projects = {
                data: projects,
                timestamp: Date.now()
            };

            return projects;
        } catch (error) {
            console.error('Error fetching projects data:', error);
            throw error;
        }
    }

    // Get tools data
    async getTools() {
        try {
            // Check cache first
            if (this.cache.tools && (Date.now() - this.cache.tools.timestamp) < this.cacheTimeout) {
                return this.cache.tools.data;
            }

            const snapshot = await this.db.collection("tools").get();
            const tools = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    iconUrl: data.iconUrl || '',
                    color: data.color || '#ffffff',
                    labelColor: data.labelColor || '#000000',
                    name: data.name || ''
                };
            });

            // Cache the result
            this.cache.tools = {
                data: tools,
                timestamp: Date.now()
            };

            return tools;
        } catch (error) {
            console.error('Error fetching tools data:', error);
            throw error;
        }
    }

    // Clear cache
    clearCache() {
        this.cache = {
            user: null,
            projects: null,
            tools: null
        };
    }

    // Refresh all data (clear cache and refetch)
    async refreshAllData() {
        this.clearCache();
        try {
            const [user, projects, tools] = await Promise.all([
                this.getUser(),
                this.getProjects(),
                this.getTools()
            ]);
            return { user, projects, tools };
        } catch (error) {
            console.error('Error refreshing data:', error);
            throw error;
        }
    }
}

// Create global instance
const dataService = new DataService(); 