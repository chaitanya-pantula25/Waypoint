// Application State
const AppState = {
    currentUser: null,
    treks: [],
    userTreks: [],
    completedTreks: [],
    theme: 'light'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadData();
    loadTheme();
    checkAuth();
    setupEventListeners();
    initializeSearch();
}

// Data Management
function loadData() {
    // Load user data
    const userData = localStorage.getItem('waypoint_user');
    if (userData) {
        AppState.currentUser = JSON.parse(userData);
    }

    // Load treks
    const savedTreks = localStorage.getItem('waypoint_treks');
    if (savedTreks) {
        AppState.treks = JSON.parse(savedTreks);
    } else {
        // Initialize with sample treks
        initializeSampleTreks();
    }

    // Load user treks
    const userTreksData = localStorage.getItem('waypoint_user_treks');
    if (userTreksData) {
        AppState.userTreks = JSON.parse(userTreksData);
    }

    // Load completed treks
    const completedTreksData = localStorage.getItem('waypoint_completed_treks');
    if (completedTreksData) {
        AppState.completedTreks = JSON.parse(completedTreksData);
    }
}

function saveData() {
    if (AppState.currentUser) {
        localStorage.setItem('waypoint_user', JSON.stringify(AppState.currentUser));
    }
    localStorage.setItem('waypoint_treks', JSON.stringify(AppState.treks));
    localStorage.setItem('waypoint_user_treks', JSON.stringify(AppState.userTreks));
    localStorage.setItem('waypoint_completed_treks', JSON.stringify(AppState.completedTreks));
}

// Sample Trek Data (20+ treks in India)
function initializeSampleTreks() {
    AppState.treks = [
        {
            id: 1,
            name: "Valley of Flowers",
            location: "Uttarakhand",
            coordinates: [30.7333, 79.6167],
            distance: 17,
            elevation: 3658,
            difficulty: 6,
            description: "A stunning alpine valley filled with colorful flowers during monsoon season.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            gpxData: null
        },
        {
            id: 2,
            name: "Hampta Pass",
            location: "Himachal Pradesh",
            coordinates: [32.2394, 77.1889],
            distance: 26,
            elevation: 4270,
            difficulty: 7,
            description: "A beautiful crossover trek from Manali to Spiti Valley.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            gpxData: null
        },
        {
            id: 3,
            name: "Kedarkantha",
            location: "Uttarakhand",
            coordinates: [31.0167, 78.3167],
            distance: 20,
            elevation: 3810,
            difficulty: 5,
            description: "A popular winter trek with stunning snow-covered landscapes.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            gpxData: null
        },
        {
            id: 4,
            name: "Roopkund",
            location: "Uttarakhand",
            coordinates: [30.2583, 79.7333],
            distance: 53,
            elevation: 5029,
            difficulty: 8,
            description: "The mysterious skeleton lake trek in the Himalayas.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            gpxData: null
        },
        {
            id: 5,
            name: "Sandakphu",
            location: "West Bengal",
            coordinates: [27.1067, 88.0000],
            distance: 32,
            elevation: 3636,
            difficulty: 6,
            description: "Highest point in West Bengal with views of four of the world's five highest peaks.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            gpxData: null
        },
        {
            id: 6,
            name: "Triund",
            location: "Himachal Pradesh",
            coordinates: [32.2833, 76.3167],
            distance: 9,
            elevation: 2875,
            difficulty: 3,
            description: "An easy trek offering panoramic views of the Dhauladhar range.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            gpxData: null
        },
        {
            id: 7,
            name: "Chadar Trek",
            location: "Ladakh",
            coordinates: [34.1526, 77.5771],
            distance: 105,
            elevation: 3390,
            difficulty: 9,
            description: "A challenging winter trek on the frozen Zanskar River.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            gpxData: null
        },
        {
            id: 8,
            name: "Goechala",
            location: "Sikkim",
            coordinates: [27.7000, 88.2000],
            distance: 90,
            elevation: 4940,
            difficulty: 8,
            description: "A challenging trek offering close-up views of Mt. Kanchenjunga.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            gpxData: null
        },
        {
            id: 9,
            name: "Har Ki Dun",
            location: "Uttarakhand",
            coordinates: [31.0833, 78.4167],
            distance: 47,
            elevation: 3566,
            difficulty: 6,
            description: "A beautiful valley trek in the Garhwal Himalayas.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            gpxData: null
        },
        {
            id: 10,
            name: "Pin Parvati Pass",
            location: "Himachal Pradesh",
            coordinates: [31.8333, 77.8333],
            distance: 110,
            elevation: 5319,
            difficulty: 10,
            description: "One of the most challenging treks in India, crossing from Kullu to Spiti.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            gpxData: null
        },
        {
            id: 11,
            name: "Nag Tibba",
            location: "Uttarakhand",
            coordinates: [30.7833, 78.0833],
            distance: 16,
            elevation: 3022,
            difficulty: 4,
            description: "A weekend trek perfect for beginners with great mountain views.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            gpxData: null
        },
        {
            id: 12,
            name: "Bhrigu Lake",
            location: "Himachal Pradesh",
            coordinates: [32.2833, 77.2500],
            distance: 26,
            elevation: 4235,
            difficulty: 6,
            description: "A high-altitude alpine lake trek near Manali.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            gpxData: null
        },
        {
            id: 13,
            name: "Kuari Pass",
            location: "Uttarakhand",
            coordinates: [30.5167, 79.5833],
            distance: 33,
            elevation: 4264,
            difficulty: 7,
            description: "A classic trek with views of Nanda Devi and other peaks.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            gpxData: null
        },
        {
            id: 14,
            name: "Dayara Bugyal",
            location: "Uttarakhand",
            coordinates: [30.8333, 78.5000],
            distance: 24,
            elevation: 4084,
            difficulty: 5,
            description: "One of India's most beautiful high-altitude meadows.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            gpxData: null
        },
        {
            id: 15,
            name: "Stok Kangri",
            location: "Ladakh",
            coordinates: [33.9833, 77.4500],
            distance: 38,
            elevation: 6153,
            difficulty: 9,
            description: "A challenging peak climbing trek in Ladakh.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            gpxData: null
        },
        {
            id: 16,
            name: "Brahmatal",
            location: "Uttarakhand",
            coordinates: [30.2500, 79.7500],
            distance: 24,
            elevation: 3734,
            difficulty: 6,
            description: "A winter trek with stunning views of Mt. Trishul and Nanda Ghunti.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            gpxData: null
        },
        {
            id: 17,
            name: "Rupin Pass",
            location: "Himachal Pradesh",
            coordinates: [31.1667, 78.0833],
            distance: 52,
            elevation: 4650,
            difficulty: 8,
            description: "A challenging crossover trek with dramatic landscapes.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            gpxData: null
        },
        {
            id: 18,
            name: "Kumara Parvatha",
            location: "Karnataka",
            coordinates: [12.4167, 75.7167],
            distance: 28,
            elevation: 1712,
            difficulty: 7,
            description: "One of the most challenging treks in the Western Ghats.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            gpxData: null
        },
        {
            id: 19,
            name: "Tadiandamol",
            location: "Karnataka",
            coordinates: [12.2167, 75.6833],
            distance: 14,
            elevation: 1748,
            difficulty: 4,
            description: "Highest peak in Karnataka, perfect for beginners.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            gpxData: null
        },
        {
            id: 20,
            name: "Chembra Peak",
            location: "Kerala",
            coordinates: [11.5167, 76.0167],
            distance: 7,
            elevation: 2100,
            difficulty: 5,
            description: "A beautiful trek in Wayanad with a heart-shaped lake at the top.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            gpxData: null
        },
        {
            id: 21,
            name: "Dzongri",
            location: "Sikkim",
            coordinates: [27.6500, 88.2000],
            distance: 40,
            elevation: 4020,
            difficulty: 7,
            description: "A high-altitude trek with stunning views of the Kanchenjunga range.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            gpxData: null
        },
        {
            id: 22,
            name: "Markha Valley",
            location: "Ladakh",
            coordinates: [34.0167, 77.5000],
            distance: 65,
            elevation: 5150,
            difficulty: 7,
            description: "A classic Ladakhi trek through remote villages and high passes.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            gpxData: null
        }
    ];
    saveData();
}

// Theme Management
function loadTheme() {
    const savedTheme = localStorage.getItem('waypoint_theme') || 'light';
    AppState.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', AppState.theme);
    localStorage.setItem('waypoint_theme', AppState.theme);
}

// Authentication
function checkAuth() {
    if (AppState.currentUser) {
        updateAuthUI();
    }
}

function updateAuthUI() {
    const authSection = document.getElementById('authSection');
    if (!authSection) return;

    if (AppState.currentUser) {
        const profilePhoto = AppState.currentUser.profilePhoto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(AppState.currentUser.name || 'User') + '&background=00A8FF&color=fff';
        authSection.innerHTML = `
            <img src="${profilePhoto}" alt="Profile" class="profile-photo" id="profilePhoto">
        `;
        document.getElementById('profilePhoto')?.addEventListener('click', () => {
            window.location.href = 'statistics.html';
        });
    } else {
        authSection.innerHTML = `
            <button class="nav-btn auth-btn" id="loginBtn">Log in/Sign Up</button>
        `;
        document.getElementById('loginBtn')?.addEventListener('click', () => {
            window.location.href = 'auth.html';
        });
    }
}

// Event Listeners
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Navigation buttons
    const discoverBtn = document.getElementById('discoverBtn');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', () => {
            window.location.href = 'discover.html';
        });
    }

    const addTrekBtn = document.getElementById('addTrekBtn');
    if (addTrekBtn) {
        addTrekBtn.addEventListener('click', () => {
            if (AppState.currentUser) {
                window.location.href = 'add-trek.html';
            } else {
                window.location.href = 'auth.html';
            }
        });
    }

    const planTrekBtn = document.getElementById('planTrekBtn');
    if (planTrekBtn) {
        planTrekBtn.addEventListener('click', () => {
            window.location.href = 'plan-trek.html';
        });
    }

    const heroDiscoverBtn = document.getElementById('heroDiscoverBtn');
    if (heroDiscoverBtn) {
        heroDiscoverBtn.addEventListener('click', () => {
            window.location.href = 'discover.html';
        });
    }

    const heroPlanBtn = document.getElementById('heroPlanBtn');
    if (heroPlanBtn) {
        heroPlanBtn.addEventListener('click', () => {
            window.location.href = 'plan-trek.html';
        });
    }

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'auth.html';
        });
    }
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `discover.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}

// Utility Functions
function getAllTreks() {
    return [...AppState.treks, ...AppState.userTreks];
}

function searchTreks(query) {
    const allTreks = getAllTreks();
    const lowerQuery = query.toLowerCase();
    return allTreks.filter(trek => 
        trek.name.toLowerCase().includes(lowerQuery) ||
        trek.location.toLowerCase().includes(lowerQuery) ||
        (trek.description && trek.description.toLowerCase().includes(lowerQuery))
    );
}

function getTrekById(id) {
    const allTreks = getAllTreks();
    return allTreks.find(trek => trek.id === id);
}

function markTrekCompleted(trekId) {
    if (!AppState.completedTreks.includes(trekId)) {
        AppState.completedTreks.push(trekId);
        saveData();
    }
}

function getUserStatistics() {
    const completedTrekIds = AppState.completedTreks;
    const completedTreks = getAllTreks().filter(trek => completedTrekIds.includes(trek.id));
    
    return {
        totalDistance: completedTreks.reduce((sum, trek) => sum + (trek.distance || 0), 0),
        totalElevation: completedTreks.reduce((sum, trek) => sum + (trek.elevation || 0), 0),
        totalTreks: completedTreks.length,
        totalTime: completedTreks.length * 8 // Assuming average 8 hours per trek
    };
}

// Export for use in other pages
if (typeof window !== 'undefined') {
    window.WaypointApp = {
        AppState,
        loadData,
        saveData,
        getAllTreks,
        searchTreks,
        getTrekById,
        markTrekCompleted,
        getUserStatistics,
        updateAuthUI,
        checkAuth,
        toggleTheme
    };
}
