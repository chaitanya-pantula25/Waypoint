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
            startLat: 30.7280,
            startLon: 79.6053,
            startLat: 30.7280,
            startLon: 79.6053,
            distance: 17,
            elevation: 3658,
            elevationGain: "~3,300 ft",
            difficulty: 6,
            description: "A UNESCO World Heritage site known for its alpine flora. A stunning alpine valley filled with colorful flowers during monsoon season. The most difficult stretch is the steep 6km ascent from Ghangaria to Hemkund Sahib at 14,107 ft, where the air thins significantly.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            images: [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive Dehradun to Govindghat", details: "Drive from Dehradun to Govindghat, the starting point of the trek." },
                { day: 2, title: "Trek to Ghangaria", details: "Trek 13km to Ghangaria, the base camp for Valley of Flowers." },
                { day: 3, title: "Explore Valley of Flowers", details: "Spend the day exploring the beautiful Valley of Flowers." },
                { day: 4, title: "Steep climb to Hemkund Sahib", details: "Challenging steep climb to Hemkund Sahib at 14,107 ft." },
                { day: 5, title: "Descend to Govindghat", details: "Descend back to Govindghat and conclude the trek." }
            ],
            gpxData: null,
            gpxFile: 'gpx/valley-of-flowers.gpx'
        },
        {
            id: 2,
            name: "Hampta Pass",
            location: "Himachal Pradesh",
            coordinates: [32.2394, 77.1889],
            startLat: 32.2276,
            startLon: 77.2644,
            startLat: 32.2276,
            startLon: 77.2644,
            distance: 26,
            elevation: 4270,
            elevationGain: "~3,500 ft",
            difficulty: 7,
            description: "A crossover trek from the lush Kullu valley to the desert of Lahaul. A beautiful crossover trek from Manali to Spiti Valley. The most difficult stretch is the pass crossing on Day 3, involving a steep climb through snow and a sharp, rocky descent to Shea Goru.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            images: [
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive Manali to Jobra; Trek to Chikka", details: "Drive from Manali to Jobra and begin trek to Chikka camp." },
                { day: 2, title: "Trek to Balu Ka Ghera", details: "Continue trekking to Balu Ka Ghera, a beautiful campsite." },
                { day: 3, title: "Cross Hampta Pass to Shea Goru", details: "The most challenging day - cross Hampta Pass with steep snow climb and rocky descent." },
                { day: 4, title: "Trek to Chhatru; Visit Chandratal Lake", details: "Trek to Chhatru and visit the stunning Chandratal Lake." },
                { day: 5, title: "Drive back to Manali", details: "Drive back to Manali, completing the crossover trek." }
            ],
            gpxData: null,
            gpxFile: 'gpx/jilang-hampta-pass-chhika.gpx'
        },
        {
            id: 3,
            name: "Kedarkantha",
            location: "Uttarakhand",
            coordinates: [31.0167, 78.3167],
            startLat: 31.0231,
            startLon: 78.1714,
            startLat: 31.0231,
            startLon: 78.1714,
            distance: 20,
            elevation: 3810,
            elevationGain: "~6,000 ft total",
            difficulty: 5,
            description: "Famous for its 360-degree summit views. A popular winter trek with stunning snow-covered landscapes. The most difficult stretch is the midnight/early morning summit push in sub-zero temperatures over steep, icy slopes.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            images: [
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive Dehradun to Sankri", details: "Drive from Dehradun to Sankri village, the base for the trek." },
                { day: 2, title: "Trek to Juda Ka Talab", details: "Trek through beautiful forests to Juda Ka Talab, a frozen lake." },
                { day: 3, title: "Trek to Kedarkantha Base", details: "Continue to Kedarkantha Base Camp, preparing for summit." },
                { day: 4, title: "Summit Push (12,500 ft); Descend to Hargaon", details: "Early morning summit push to 12,500 ft, then descend to Hargaon." },
                { day: 5, title: "Descend to Sankri", details: "Final descent back to Sankri, completing the trek." }
            ],
            gpxData: null,
            gpxFile: 'gpx/kedarkanta-trek.gpx'
        },
        {
            id: 4,
            name: "Roopkund",
            location: "Uttarakhand",
            coordinates: [30.2583, 79.7333],
            startLat: 30.2642,
            startLon: 79.7317,
            startLat: 30.2642,
            startLon: 79.7317,
            distance: 53,
            elevation: 5029,
            elevationGain: "~8,000 ft",
            difficulty: 8,
            description: "Known for the mystery \"Skeleton Lake.\" The mysterious skeleton lake trek in the Himalayas. The most difficult stretch is the trek from Bhagwabasa to Roopkund (15,750 ft), a steep 4km climb on snow with very low oxygen levels.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            images: [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive to Lohajung", details: "Drive to Lohajung, the base camp for Roopkund trek." },
                { day: 2, title: "Trek to Didna Village", details: "Begin trekking to Didna Village through beautiful forests." },
                { day: 3, title: "Trek to Ali Bugyal", details: "Trek to Ali Bugyal, one of India's largest meadows." },
                { day: 4, title: "Trek to Patar Nachuni", details: "Continue ascending to Patar Nachuni camp." },
                { day: 5, title: "Trek to Bhagwabasa", details: "Trek to Bhagwabasa, the last camp before Roopkund." },
                { day: 6, title: "Summit Roopkund; Descend to Bedni Bugyal", details: "Challenging climb to Roopkund Lake (15,750 ft), then descend to Bedni Bugyal." }
            ],
            gpxData: null
        },
        {
            id: 5,
            name: "Sandakphu",
            location: "West Bengal",
            coordinates: [27.1067, 88.0000],
            startLat: 27.1042,
            startLon: 88.0019,
            startLat: 27.1042,
            startLon: 88.0019,
            distance: 32,
            elevation: 3636,
            elevationGain: "~5,600 ft",
            difficulty: 6,
            description: "Offers views of Everest and Kanchenjunga. Highest point in West Bengal with views of four of the world's five highest peaks. The most difficult stretch is the relentless incline from Kalipokhri to Sandakphu, featuring steep switchbacks that test leg endurance.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            images: [
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive to Manebhanjan", details: "Drive to Manebhanjan, the starting point of the trek." },
                { day: 2, title: "Trek to Tumling", details: "Begin trekking to Tumling, crossing the India-Nepal border." },
                { day: 3, title: "Trek to Kalipokhri", details: "Continue trekking to Kalipokhri, a sacred black water pond." },
                { day: 4, title: "Steep climb to Sandakphu", details: "The most challenging day - steep climb to Sandakphu with incredible mountain views." },
                { day: 5, title: "Trek to Phalut", details: "Trek to Phalut, another viewpoint for the Himalayan range." },
                { day: 6, title: "Descend to Gorkhey", details: "Descend to Gorkhey village, completing the trek." }
            ],
            gpxData: null
        },
        {
            id: 6,
            name: "Triund",
            location: "Himachal Pradesh",
            coordinates: [32.2833, 76.3167],
            startLat: 32.2591,
            startLon: 76.3533,
            startLat: 32.2591,
            startLon: 76.3533,
            distance: 9,
            elevation: 2875,
            elevationGain: "~2,500 ft",
            difficulty: 3,
            description: "A classic beginner trek in the Dhauladhars. An easy trek offering panoramic views of the Dhauladhar range. The most difficult stretch is the \"22 curves\" just before reaching the top, where the trail becomes significantly steeper.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            images: [
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            ],
            itinerary: [
                { day: 1, title: "Trek McLeodganj to Triund (9km)", details: "Trek from McLeodganj to Triund, passing through the challenging \"22 curves\" section." },
                { day: 2, title: "Optional walk to Snowline; Descend to McLeodganj", details: "Optional walk to Snowline for better views, then descend back to McLeodganj." }
            ],
            gpxData: null
        },
        {
            id: 7,
            name: "Chadar Trek",
            location: "Ladakh",
            coordinates: [34.1526, 77.5771],
            startLat: 33.9189,
            startLon: 77.1706,
            startLat: 33.9189,
            startLon: 77.1706,
            distance: 105,
            elevation: 3390,
            elevationGain: "Minimal (Flat walk), but extreme conditions",
            difficulty: 9,
            description: "A trek on the frozen Zanskar River. A challenging winter trek on the frozen Zanskar River. The most difficult stretch is navigating \"Nerak\" waterfall area where the ice (chadar) can be unstable or non-existent, forcing climbs over icy rocks.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            images: [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Reach Leh (Acclimatization)", details: "Arrive in Leh and begin acclimatization to high altitude." },
                { day: 2, title: "Medical check and local walks", details: "Medical check-up and short local walks for acclimatization." },
                { day: 3, title: "Medical check and local walks", details: "Continue acclimatization with local walks." },
                { day: 4, title: "Drive to Shingra Koma; Trek to Gyalpo", details: "Drive to Shingra Koma and begin trekking on frozen Zanskar to Gyalpo." },
                { day: 5, title: "Trek to Tibb Cave", details: "Continue trekking on the chadar to Tibb Cave." },
                { day: 6, title: "Trek to Nerak (Frozen Waterfall)", details: "Trek to Nerak, the most challenging section with unstable ice conditions." },
                { day: 7, title: "Return trek to Leh", details: "Begin return journey, trekking back along the frozen river." },
                { day: 8, title: "Return trek to Leh", details: "Continue return trek to base." },
                { day: 9, title: "Return trek to Leh", details: "Complete return journey and drive back to Leh." }
            ],
            gpxData: null
        },
        {
            id: 8,
            name: "Goechala",
            location: "Sikkim",
            coordinates: [27.7000, 88.2000],
            startLat: 27.5961,
            startLon: 88.1887,
            startLat: 27.5961,
            startLon: 88.1887,
            distance: 90,
            elevation: 4940,
            elevationGain: "~9,500 ft",
            difficulty: 8,
            description: "A grand trek to Kanchenjunga base. A challenging trek offering close-up views of Mt. Kanchenjunga. The most difficult stretch is the 1 AM summit push from Lamuney to View Point 1 (15,100 ft) due to extreme cold and thin air.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            images: [
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Reach Yuksom", details: "Arrive in Yuksom, the starting point of the Goechala trek." },
                { day: 2, title: "Trek to Sachen", details: "Begin trekking through forests to Sachen camp." },
                { day: 3, title: "Trek to Tsokha", details: "Continue ascending to Tsokha, a beautiful campsite." },
                { day: 4, title: "Trek to Dzongri", details: "Trek to Dzongri, offering stunning views of the Kanchenjunga range." },
                { day: 5, title: "Trek to Lamuney", details: "Trek to Lamuney, the base camp for Goechala summit." },
                { day: 6, title: "Summit View Point; Descend to Kokechurang", details: "Early morning (1 AM) summit push to View Point 1 (15,100 ft), then descend to Kokechurang." }
            ],
            gpxData: null
        },
        {
            id: 9,
            name: "Har Ki Dun",
            location: "Uttarakhand",
            coordinates: [31.0833, 78.4167],
            startLat: 31.1495,
            startLon: 78.3364,
            startLat: 31.1495,
            startLon: 78.3364,
            distance: 47,
            elevation: 3566,
            elevationGain: "~3,800 ft",
            difficulty: 6,
            description: "A beautiful cradle-shaped valley. A beautiful valley trek in the Garhwal Himalayas. The most difficult stretch is the long, optional trek to Jaundhar Glacier over unstable moraine and scree.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            images: [
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive to Sankri", details: "Drive to Sankri village, the base for Har Ki Dun trek." },
                { day: 2, title: "Trek to Pauni Garaat", details: "Begin trekking through forests to Pauni Garaat camp." },
                { day: 3, title: "Trek to Kalkatiyadhar", details: "Continue trekking to Kalkatiyadhar camp." },
                { day: 4, title: "Trek to Har Ki Dun and Jaundhar Glacier", details: "Reach Har Ki Dun valley and optional challenging trek to Jaundhar Glacier." },
                { day: 5, title: "Descend to Boslo", details: "Descend to Boslo camp, beginning the return journey." }
            ],
            gpxData: null
        },
        {
            id: 10,
            name: "Pin Parvati Pass",
            location: "Himachal Pradesh",
            coordinates: [31.8333, 77.8333],
            startLat: 31.8481,
            startLon: 77.8488,
            startLat: 31.8481,
            startLon: 77.8488,
            distance: 110,
            elevation: 5319,
            elevationGain: "~10,000 ft",
            difficulty: 10,
            description: "One of India's most challenging crossovers. One of the most challenging treks in India, crossing from Kullu to Spiti. The most difficult stretch is the crevasse-ridden glacier traverse on the Parvati side leading to the 17,450 ft pass.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            images: [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Barsheni to Kalga", details: "Begin trek from Barsheni to Kalga camp." },
                { day: 2, title: "Kheerganga", details: "Trek to Kheerganga, known for its hot springs." },
                { day: 3, title: "Tunda Bhuj", details: "Continue ascending to Tunda Bhuj camp." },
                { day: 4, title: "Thakur Kuan", details: "Trek to Thakur Kuan camp." },
                { day: 5, title: "Mantalai Lake", details: "Reach Mantalai Lake, a beautiful high-altitude lake." },
                { day: 6, title: "Base Camp", details: "Trek to base camp, preparing for pass crossing." },
                { day: 7, title: "Cross Pass to Spiti", details: "The most challenging day - cross Pin Parvati Pass (17,450 ft) to Spiti side." }
            ],
            gpxData: null
        },
        {
            id: 11,
            name: "Nag Tibba",
            location: "Uttarakhand",
            coordinates: [30.7833, 78.0833],
            startLat: 30.5855,
            startLon: 78.1517,
            startLat: 30.5855,
            startLon: 78.1517,
            distance: 16,
            elevation: 3022,
            elevationGain: "~3,000 ft",
            difficulty: 4,
            description: "The highest peak in the lesser Himalayan region. A weekend trek perfect for beginners with great mountain views. The most difficult stretch is the final summit climb from the base camp, which can be slippery with snow or loose soil.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            images: [
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive Dehradun to Pantwari; Trek to Base Camp", details: "Drive from Dehradun to Pantwari and begin trek to base camp." },
                { day: 2, title: "Summit Nag Tibba; Descend to Pantwari; Drive to Dehradun", details: "Summit Nag Tibba peak, then descend to Pantwari and drive back to Dehradun." }
            ],
            gpxData: null
        },
        {
            id: 12,
            name: "Bhrigu Lake",
            location: "Himachal Pradesh",
            coordinates: [32.2833, 77.2500],
            startLat: 32.2905,
            startLon: 77.2389,
            startLat: 32.2905,
            startLon: 77.2389,
            distance: 26,
            elevation: 4235,
            elevationGain: "~4,200 ft",
            difficulty: 6,
            description: "A high-altitude glacial lake trek near Manali. A high-altitude alpine lake trek near Manali. The most difficult stretch is the steep, direct ascent from Gulaba to the first campsite (Rola Kholi).",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            images: [
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive Manali to Gulaba; Trek to Rola Kholi", details: "Drive from Manali to Gulaba and begin steep trek to Rola Kholi camp." },
                { day: 2, title: "Trek to Bhrigu Lake (14,000 ft) and back", details: "Trek to Bhrigu Lake at 14,000 ft and return to camp." },
                { day: 3, title: "Descend to Gulaba", details: "Descend back to Gulaba, completing the trek." }
            ],
            gpxData: null
        },
        {
            id: 13,
            name: "Kuari Pass",
            location: "Uttarakhand",
            coordinates: [30.5167, 79.5833],
            startLat: 30.4851,
            startLon: 79.5492,
            startLat: 30.4851,
            startLon: 79.5492,
            distance: 33,
            elevation: 4264,
            elevationGain: "~4,200 ft",
            difficulty: 7,
            description: "Offers unparalleled views of Nanda Devi. A classic trek with views of Nanda Devi and other peaks. The most difficult stretch is the steep climb from Tali to the pass (12,516 ft) through exposed ridges.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            images: [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive to Joshimath", details: "Drive to Joshimath, the base for Kuari Pass trek." },
                { day: 2, title: "Trek to Gulling Top", details: "Begin trekking to Gulling Top camp." },
                { day: 3, title: "Trek to Tali Camp", details: "Continue to Tali Camp, preparing for pass crossing." },
                { day: 4, title: "Cross Kuari Pass; Trek to Khullara", details: "Challenging day - cross Kuari Pass (12,516 ft) and trek to Khullara." },
                { day: 5, title: "Descend to Auli", details: "Descend to Auli, completing the trek." }
            ],
            gpxData: null
        },
        {
            id: 14,
            name: "Dayara Bugyal",
            location: "Uttarakhand",
            coordinates: [30.8333, 78.5000],
            startLat: 30.8522,
            startLon: 78.5524,
            startLat: 30.8522,
            startLon: 78.5524,
            distance: 24,
            elevation: 4084,
            elevationGain: "~4,000 ft",
            difficulty: 5,
            description: "One of India's most expansive high-altitude meadows. One of India's most beautiful high-altitude meadows. The most difficult stretch is the initial steep climb through the oak forests from Barsu to Barnala Tal.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            images: [
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive Dehradun to Barsu", details: "Drive from Dehradun to Barsu village." },
                { day: 2, title: "Trek to Barnala", details: "Begin trekking with steep climb through oak forests to Barnala Tal." },
                { day: 3, title: "Trek to Dayara Bugyal summit (12,000 ft)", details: "Trek to Dayara Bugyal summit, one of India's largest meadows." },
                { day: 4, title: "Descend to Barsu", details: "Descend back to Barsu, completing the trek." }
            ],
            gpxData: null
        },
        {
            id: 15,
            name: "Stok Kangri",
            location: "Ladakh",
            coordinates: [33.9833, 77.4500],
            startLat: 33.9861,
            startLon: 77.4261,
            startLat: 33.9861,
            startLon: 77.4261,
            distance: 38,
            elevation: 6153,
            elevationGain: "~7,000 ft from Base Camp to Peak",
            difficulty: 9,
            description: "A non-technical 6,000m peak. A challenging peak climbing trek in Ladakh. The most difficult stretch is the 10-12 hour summit day involving a steep glacier crossing and a long, oxygen-depleted ridge walk to 20,187 ft.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            images: [
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800"
            ],
            itinerary: [
                { day: 1, title: "Leh (Acclimatization)", details: "Arrive in Leh and begin acclimatization." },
                { day: 2, title: "Leh (Acclimatization)", details: "Continue acclimatization with local walks." },
                { day: 3, title: "Leh (Acclimatization)", details: "Final day of acclimatization before trek." },
                { day: 4, title: "Drive to Stok; Trek to Chang Ma", details: "Drive to Stok and begin trekking to Chang Ma camp." },
                { day: 5, title: "Trek to Base Camp", details: "Trek to Stok Kangri Base Camp." },
                { day: 6, title: "Training/Acclimatization", details: "Training day and final acclimatization at base camp." },
                { day: 7, title: "Summit Push; Return to Base", details: "The most challenging day - 10-12 hour summit push to 20,187 ft, then return to base." },
                { day: 8, title: "Descend to Stok", details: "Descend to Stok, completing the trek." }
            ],
            gpxData: null
        },
        {
            id: 16,
            name: "Brahmatal",
            location: "Uttarakhand",
            coordinates: [30.2500, 79.7500],
            startLat: 30.0163,
            startLon: 79.5700,
            startLat: 30.0163,
            startLon: 79.5700,
            distance: 24,
            elevation: 3734,
            elevationGain: "~4,500 ft",
            difficulty: 6,
            description: "A classic winter trek. A winter trek with stunning views of Mt. Trishul and Nanda Ghunti. The most difficult stretch is the exposed ridge walk from the lake to the Brahmatal Summit (12,250 ft) against high winds.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            images: [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive to Lohajung", details: "Drive to Lohajung, the base for Brahmatal trek." },
                { day: 2, title: "Trek to Bekaltal", details: "Begin trekking to Bekaltal camp." },
                { day: 3, title: "Trek to Brahmatal", details: "Continue to Brahmatal camp." },
                { day: 4, title: "Summit Push; Descend to Tilandi", details: "Challenging summit push to Brahmatal Summit (12,250 ft), then descend to Tilandi." },
                { day: 5, title: "Descend to Lohajung", details: "Descend back to Lohajung, completing the trek." }
            ],
            gpxData: null
        },
        {
            id: 17,
            name: "Rupin Pass",
            location: "Himachal Pradesh",
            coordinates: [31.1667, 78.0833],
            startLat: 31.1444,
            startLon: 78.1344,
            startLat: 31.1444,
            startLon: 78.1344,
            distance: 52,
            elevation: 4650,
            elevationGain: "~8,000 ft",
            difficulty: 8,
            description: "A legendary crossover trek. A challenging crossover trek with dramatic landscapes. The most difficult stretch is the \"Rupin Gully,\" a near-vertical climb through snow just below the 15,250 ft pass.",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            images: [
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive to Dhaula", details: "Drive to Dhaula, the starting point of Rupin Pass trek." },
                { day: 2, title: "Sewa", details: "Trek to Sewa camp." },
                { day: 3, title: "Jhakha", details: "Continue trekking to Jhakha camp." },
                { day: 4, title: "Lower Waterfall", details: "Trek to Lower Waterfall camp." },
                { day: 5, title: "Upper Waterfall", details: "Trek to Upper Waterfall camp." },
                { day: 6, title: "Cross Rupin Pass to Sangla", details: "The most challenging day - cross Rupin Pass (15,250 ft) via Rupin Gully to Sangla." }
            ],
            gpxData: null
        },
        {
            id: 18,
            name: "Kumara Parvatha",
            location: "Karnataka",
            coordinates: [12.4167, 75.7167],
            startLat: 12.6657,
            startLon: 75.6171,
            startLat: 12.6657,
            startLon: 75.6171,
            distance: 28,
            elevation: 1712,
            elevationGain: "~5,600 ft",
            difficulty: 7,
            description: "The toughest trek in South India. One of the most challenging treks in the Western Ghats. The most difficult stretch is the \"Shesha Parvatha\" ascent, which is very steep and entirely exposed to the sun.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            images: [
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            ],
            itinerary: [
                { day: 1, title: "Trek Kukke Subramanya to Bhattara Mane", details: "Begin trek from Kukke Subramanya to Bhattara Mane camp." },
                { day: 2, title: "Summit Kumara Parvatha; Descend to base", details: "Challenging day - summit Kumara Parvatha via Shesha Parvatha, then descend to base." }
            ],
            gpxData: null
        },
        {
            id: 19,
            name: "Tadiandamol",
            location: "Karnataka",
            coordinates: [12.2167, 75.6833],
            startLat: 12.2172,
            startLon: 75.6083,
            startLat: 12.2172,
            startLon: 75.6083,
            distance: 14,
            elevation: 1748,
            elevationGain: "~1,500 ft",
            difficulty: 4,
            description: "The highest peak in Coorg. Highest peak in Karnataka, perfect for beginners. The most difficult stretch is the final, narrow incline leading to the summit which can be slippery during monsoons.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            images: [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Trek from Kakkabe to Tadiandamol Summit and back (14km)", details: "Day trek from Kakkabe to Tadiandamol Summit and return, covering 14km." }
            ],
            gpxData: null
        },
        {
            id: 20,
            name: "Chembra Peak",
            location: "Kerala",
            coordinates: [11.5167, 76.0167],
            startLat: 11.5451,
            startLon: 76.0883,
            startLat: 11.5451,
            startLon: 76.0883,
            distance: 7,
            elevation: 2100,
            elevationGain: "~2,500 ft",
            difficulty: 5,
            description: "Famous for its heart-shaped lake. A beautiful trek in Wayanad with a heart-shaped lake at the top. The most difficult stretch is the final trek from the lake to the actual peak summit (currently often restricted by forest dept).",
            image: "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
            images: [
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Trek from Meppadi to Heart Lake and Summit (7km)", details: "Trek from Meppadi to the famous Heart Lake and summit Chembra Peak, covering 7km." }
            ],
            gpxData: null
        },
        {
            id: 21,
            name: "Dzongri",
            location: "Sikkim",
            coordinates: [27.6500, 88.2000],
            startLat: 27.4912,
            startLon: 88.1633,
            startLat: 27.4912,
            startLon: 88.1633,
            distance: 40,
            elevation: 4020,
            elevationGain: "~4,000 ft",
            difficulty: 7,
            description: "A shorter version of the Goechala trek. A high-altitude trek with stunning views of the Kanchenjunga range. The most difficult stretch is the steep, stone-step climb from Tsokha to Phedang at high altitude.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            images: [
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            ],
            itinerary: [
                { day: 1, title: "Yuksom", details: "Arrive in Yuksom, the starting point of Dzongri trek." },
                { day: 2, title: "Trek to Sachen", details: "Begin trekking through forests to Sachen camp." },
                { day: 3, title: "Trek to Tsokha", details: "Continue ascending to Tsokha camp." },
                { day: 4, title: "Trek to Dzongri Top (13,000 ft)", details: "Challenging day - steep stone-step climb to Dzongri Top at 13,000 ft." },
                { day: 5, title: "Descend to Yuksom", details: "Descend back to Yuksom, completing the trek." }
            ],
            gpxData: null
        },
        {
            id: 22,
            name: "Markha Valley",
            location: "Ladakh",
            coordinates: [34.0167, 77.5000],
            startLat: 33.8833,
            startLon: 77.4833,
            startLat: 33.8833,
            startLon: 77.4833,
            distance: 65,
            elevation: 5150,
            elevationGain: "~6,000 ft",
            difficulty: 7,
            description: "A \"tea-house\" trek in the high desert. A classic Ladakhi trek through remote villages and high passes. The most difficult stretch is crossing the Kongmaru La pass (17,060 ft) on the final day due to its steepness and altitude.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            images: [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                "https://images.unsplash.com/photo-1464822759844-d150ad8496ec?w=800",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Leh", details: "Arrive in Leh and begin acclimatization." },
                { day: 2, title: "Drive to Chilling; Trek to Skiu", details: "Drive to Chilling and begin trekking to Skiu village." },
                { day: 3, title: "Markha", details: "Trek to Markha village, a key stop on the route." },
                { day: 4, title: "Thachungtse", details: "Continue trekking to Thachungtse camp." },
                { day: 5, title: "Nimaling", details: "Trek to Nimaling camp, preparing for pass crossing." },
                { day: 6, title: "Cross Kongmaru La; Descend to Shang Sumdo", details: "The most challenging day - cross Kongmaru La pass (17,060 ft) and descend to Shang Sumdo." }
            ],
            gpxData: null
        },
        {
            id: 23,
            name: "Kalsubai Peak",
            location: "Maharashtra",
            coordinates: [19.6015, 73.7088],
            startLat: 19.6015,
            startLon: 73.7088,
            distance: 7,
            elevation: 1646,
            elevationGain: "~3,000 ft",
            difficulty: 6,
            description: "The highest peak in Maharashtra, offering sweeping views of the Sahyadris. The most challenging section is the steep iron ladder climbs near the summit, which can be slippery in the monsoon.",
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
            ],
            itinerary: [
                { day: 1, title: "Bari village to Kalsubai summit and back", details: "Start from Bari village and ascend via rocky steps and iron ladders to Kalsubai summit, then descend along the same trail." }
            ],
            gpxData: null
        },
        {
            id: 24,
            name: "Harishchandragad",
            location: "Maharashtra",
            coordinates: [19.3831, 73.7761],
            startLat: 19.3831,
            startLon: 73.7761,
            distance: 12,
            elevation: 1422,
            elevationGain: "~3,500 ft",
            difficulty: 8,
            description: "A rugged Sahyadri trek famous for the Konkan Kada cliff and ancient caves. The most demanding stretch is the steep, rocky ascent along exposed sections on the original trail.",
            image: "https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?w=800",
            images: [
                "https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?w=800"
            ],
            itinerary: [
                { day: 1, title: "Ascend to Harishchandragad fort", details: "Climb from the base village through dense forest and rocky patches to reach the fort plateau." },
                { day: 2, title: "Explore Konkan Kada and descend", details: "Explore Konkan Kada and surrounding caves, then descend back to the base village." }
            ],
            gpxData: null
        },
        {
            id: 25,
            name: "Lohagad Fort",
            location: "Maharashtra",
            coordinates: [18.7067, 73.4795],
            startLat: 18.7067,
            startLon: 73.4795,
            distance: 5,
            elevation: 1033,
            elevationGain: "~1,200 ft",
            difficulty: 3,
            description: "A popular monsoon fort trek near Lonavala, ideal for beginners. The stone steps can get slippery in rain, especially near the final ascent to the fort top.",
            image: "https://images.unsplash.com/photo-1535979862256-9d4a0aa3f2c1?w=800",
            images: [
                "https://images.unsplash.com/photo-1535979862256-9d4a0aa3f2c1?w=800"
            ],
            itinerary: [
                { day: 1, title: "Bhaje village to Lohagad fort and back", details: "Climb via well-laid steps to Lohagad fort, explore the ramparts and viewpoints, then descend to the base." }
            ],
            gpxData: null
        },
        {
            id: 26,
            name: "Rajmachi Fort",
            location: "Maharashtra",
            coordinates: [18.8286, 73.3986],
            startLat: 18.8286,
            startLon: 73.3986,
            distance: 16,
            elevation: 826,
            elevationGain: "~1,800 ft",
            difficulty: 5,
            description: "A scenic trek through forests and meadows to the twin forts of Shrivardhan and Manaranjan. The long, undulating approach trail can feel exhausting in humidity and slush.",
            image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
            images: [
                "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800"
            ],
            itinerary: [
                { day: 1, title: "Drive to Udhewadi; explore Rajmachi", details: "Trek from the road head to Udhewadi village and explore Shrivardhan and Manaranjan forts." },
                { day: 2, title: "Return trek to base", details: "Descend back to the starting point through forests and meadows." }
            ],
            gpxData: null
        },
        {
            id: 27,
            name: "Harihar Fort",
            location: "Maharashtra",
            coordinates: [19.9042, 73.4725],
            startLat: 19.9042,
            startLon: 73.4725,
            distance: 4,
            elevation: 1120,
            elevationGain: "~1,800 ft",
            difficulty: 7,
            description: "A dramatic fort trek known for its near-vertical rock-cut staircase with carved handholds. The exposed stair section to the top is the crux and requires a strong head for heights.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            images: [
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Nirgudpada to Harihar fort and back", details: "Trek from Nirgudpada village, negotiate the iconic steep steps to reach the summit, then descend carefully by the same route." }
            ],
            gpxData: null
        },
        {
            id: 28,
            name: "Ratangad Fort",
            location: "Maharashtra",
            coordinates: [19.5039, 73.7083],
            startLat: 19.5039,
            startLon: 73.7083,
            distance: 9,
            elevation: 1297,
            elevationGain: "~2,300 ft",
            difficulty: 6,
            description: "A beautiful fort overlooking the Bhandardara region, famous for its 'Nedhe' (natural rock window). The steep forest climb and rocky scrambles near the summit demand good fitness.",
            image: "https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?w=800",
            images: [
                "https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?w=800"
            ],
            itinerary: [
                { day: 1, title: "Ratangad base to fort and back", details: "Trek from the base village through forested sections and ladders to Ratangad fort, explore the Nedhe, then descend." }
            ],
            gpxData: null
        },
        {
            id: 29,
            name: "Sinhagad Fort",
            location: "Maharashtra",
            coordinates: [18.3663, 73.7554],
            startLat: 18.3663,
            startLon: 73.7554,
            distance: 3,
            elevation: 1312,
            elevationGain: "~1,500 ft",
            difficulty: 3,
            description: "A short, steep climb near Pune with strong historical significance. The trail can be crowded on weekends, and the rocky path becomes slippery in the rains.",
            image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=800",
            images: [
                "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=800"
            ],
            itinerary: [
                { day: 1, title: "Pune side base to Sinhagad fort and back", details: "Ascend from the base trailhead to Sinhagad fort, explore the ramparts and viewpoints, then descend to the base." }
            ],
            gpxData: null
        },
        {
            id: 30,
            name: "Torna Fort",
            location: "Maharashtra",
            coordinates: [18.2778, 73.6111],
            startLat: 18.2778,
            startLon: 73.6111,
            distance: 10,
            elevation: 1403,
            elevationGain: "~2,800 ft",
            difficulty: 7,
            description: "One of the tallest forts near Pune and the first fort captured by Chhatrapati Shivaji Maharaj. The long ridge walk with steep, rocky sections can be demanding, especially in windy or wet conditions.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
            images: [
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
            ],
            itinerary: [
                { day: 1, title: "Velhe to Torna fort and back", details: "Begin from Velhe village, climb steadily through ridges and rocky scrambles to Torna fort, explore, and descend by the same route." }
            ],
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

// Haversine distance calculation (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const toRad = (deg) => deg * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Global GPX download helper
function downloadGpx(trekId) {
    // Normalize ID to number
    const id = typeof trekId === 'string' ? parseInt(trekId, 10) : trekId;

    if (!Number.isFinite(id)) {
        alert("GPX route for this trek is coming soon!");
        return;
    }

    // Find trek in main treks list
    const trek = AppState.treks.find(t => t.id === id);

    if (!trek || !trek.gpxFile) {
        alert("GPX route for this trek is coming soon!");
        return;
    }

    // Build a user-friendly filename like "Valley_of_Flowers_Route.gpx"
    const baseName = (trek.name || 'Trek')
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^\w\-]+/g, '');
    const fileName = `${baseName}_Route.gpx`;

    const link = document.createElement('a');
    link.href = trek.gpxFile;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// GPX Parsing Function
async function loadGpxData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load GPX file: ${response.statusText}`);
        }
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Extract all track points
        const trkpts = xmlDoc.querySelectorAll('trkpt');
        const coordinates = [];
        
        trkpts.forEach(trkpt => {
            const lat = parseFloat(trkpt.getAttribute('lat'));
            const lon = parseFloat(trkpt.getAttribute('lon'));
            if (!isNaN(lat) && !isNaN(lon)) {
                coordinates.push([lat, lon]);
            }
        });
        
        return coordinates;
    } catch (error) {
        console.error('Error loading GPX file:', error);
        return null;
    }
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
        toggleTheme,
        loadGpxData,
        calculateDistance
    };
}
