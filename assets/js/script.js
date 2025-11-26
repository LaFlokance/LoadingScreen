// Configuration des scènes
const scenes = [
    {
        title: "Explorer Plus",
        description: "Découvrez du contenu et des fonctionnalités supplémentaires.",
        image: "assets/images/1.png"
    },
    {
        title: "Mode Roleplay",
        description: "Incarnez votre personnage dans un monde immersif.",
        image: "assets/images/2.png"
    },
    {
        title: "Économie Réaliste",
        description: "Gérez vos affaires et développez votre empire.",
        image: "assets/images/3.png"
    },
    {
        title: "Activités Illégales",
        description: "Construisez votre empire criminel dans la ville.",
        image: "assets/images/4.png"
    },
    {
        title: "Forces de l'Ordre",
        description: "Maintenez la loi et l'ordre dans les rues.",
        image: "assets/images/5.png"
    }
];

// Playlist de musiques
const playlist = [
    {
        title: "Nocif",
        artist: "Hamza ft. Damso",
        duration: "3:42",
        file: "assets/music/nocif.mp3",
        cover: "assets/covers/nocif.png",
        color: "linear-gradient(135deg, #f97316 0%, #e11d48 100%)"
    },
    {
        title: "Casanova",
        artist: "Soolking ft. Gazo",
        duration: "3:04",
        file: "assets/music/casanova.mp3",
        cover: "assets/covers/casanova.png",
        color: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)"
    },
    {
        title: "La Bandite",
        artist: "Jul",
        duration: "2:57",
        file: "assets/music/labandite.mp3",
        cover: "assets/covers/labandite.png",
        color: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)"
    },
    {
        title: "Miami Vice",
        artist: "Gims",
        duration: "3:43",
        file: "assets/music/miamivice.mp3",
        cover: "assets/covers/miamivice.png",
        color: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
    },
    {
        title: "Meuda",
        artist: "Tiakola",
        duration: "2:34",
        file: "assets/music/meuda.mp3",
        cover: "assets/covers/meuda.png",
        color: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)"
    },
    {
        title: "Mon Bébé",
        artist: "RnBoi",
        duration: "2:10",
        file: "assets/music/monbebe.mp3",
        cover: "assets/covers/monbebe.png",
        color: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)"
    }
];

// Messages de chargement
const loadingMessages = [
    "Chargement en cours...",
    "Connexion au serveur...",
    "Chargement des ressources...",
    "Synchronisation des données...",
    "Préparation de votre session...",
    "Finalisation..."
];

// État de l'application
let currentScene = 0;
let currentTrack = 0;
let progress = 0;
let isPlaying = true;
let uiHideTimeout;
let audioPlayer = null;
let currentVolume = 50;
let isDraggingVolume = false;
let sceneChangeInterval = null;

// Fonction pour obtenir un index aléatoire
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

// Initialiser avec des valeurs aléatoires au démarrage
currentScene = getRandomIndex(scenes.length);
currentTrack = getRandomIndex(playlist.length);

// Éléments DOM
const uiOverlay = document.getElementById('ui-overlay');
const sceneTitle = document.getElementById('scene-title');
const sceneDescription = document.getElementById('scene-description');
const progressBar = document.getElementById('progress-bar');
const progressPercentage = document.getElementById('progress-percentage');
const loadingText = document.getElementById('loading-text');
const prevImageBtn = document.getElementById('prev-image');
const nextImageBtn = document.getElementById('next-image');
const playPauseBtn = document.getElementById('play-pause');
const backgroundImages = document.querySelectorAll('.background-image');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const albumArt = document.getElementById('album-art');
const playlistToggle = document.getElementById('playlist-toggle');
const playlistMenu = document.getElementById('playlist-menu');
const closePlaylist = document.getElementById('close-playlist');
const playlistItems = document.getElementById('playlist-items');
const volumeBtn = document.getElementById('volume');
const volumeSlider = document.getElementById('volume-slider');
const volumeThumb = document.getElementById('volume-thumb');
const volumeFill = document.getElementById('volume-fill');
const volumePercentage = document.getElementById('volume-percentage');
const volumeSliderContainer = document.getElementById('volume-slider-container');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitleText = document.getElementById('modal-title-text');
const modalIcon = document.getElementById('modal-icon');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

// Initialisation
function init() {
    console.log(`🎲 Scène aléatoire: ${currentScene + 1}/${scenes.length} - ${scenes[currentScene].title}`);
    console.log(`🎵 Musique aléatoire: ${currentTrack + 1}/${playlist.length} - ${playlist[currentTrack].title}`);
    
    setupEventListeners();
    startProgressSimulation();
    setupAutoHideUI();
    updateScene();
    initPlaylist();
    updateTrackInfo();
    initAudioPlayer();
    loadBackgroundImages();
    updateVolumeUI();
    startAutoSceneChange();
}

// Démarrer le changement automatique de scène
function startAutoSceneChange() {
    // Changer de scène toutes les 5 secondes
    sceneChangeInterval = setInterval(() => {
        changeScene(1); // Passer à la scène suivante
        console.log(`🔄 Changement automatique vers: ${scenes[currentScene].title}`);
    }, 5000);
}

// Arrêter le changement automatique de scène
function stopAutoSceneChange() {
    if (sceneChangeInterval) {
        clearInterval(sceneChangeInterval);
        sceneChangeInterval = null;
    }
}

// Charger les images de fond
function loadBackgroundImages() {
    backgroundImages.forEach((bgElement, index) => {
        if (scenes[index] && scenes[index].image) {
            const img = document.createElement('img');
            img.src = scenes[index].image;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            
            const gradient = bgElement.querySelector('.bg-gradient');
            if (gradient) {
                bgElement.insertBefore(img, gradient);
            }
        }
    });
}

// Initialiser le lecteur audio
function initAudioPlayer() {
    audioPlayer = new Audio();
    audioPlayer.volume = currentVolume / 100;
    
    if (playlist[currentTrack] && playlist[currentTrack].file) {
        audioPlayer.src = playlist[currentTrack].file;
    }
    
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
    });
    
    audioPlayer.play().catch(err => {
        console.log('Autoplay bloqué:', err);
        isPlaying = false;
        updatePlayPauseButton();
    });
}

// Configuration des événements
function setupEventListeners() {
    // Navigation images
    prevImageBtn.addEventListener('click', () => changeScene(-1));
    nextImageBtn.addEventListener('click', () => changeScene(1));
    
    // Player controls
    playPauseBtn.addEventListener('click', togglePlay);
    document.getElementById('prev-track').addEventListener('click', prevTrack);
    document.getElementById('next-track').addEventListener('click', nextTrack);
    volumeBtn.addEventListener('click', toggleVolumeSlider);
    
    // Playlist
    playlistToggle.addEventListener('click', togglePlaylist);
    closePlaylist.addEventListener('click', () => playlistMenu.classList.remove('active'));
    
    // Volume Slider Events
    volumeThumb.addEventListener('mousedown', startDraggingVolume);
    volumeSliderContainer.addEventListener('mousedown', handleVolumeClick);
    document.addEventListener('mousemove', dragVolume);
    document.addEventListener('mouseup', stopDraggingVolume);
    
    // Empêcher la propagation des clics sur le volume slider
    volumeSlider.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    volumeSlider.addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });
    
    // Show UI on mouse move
    document.addEventListener('mousemove', showUI);
    
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.textContent.trim();
            openSection(section);
        });
    });
    
    // Fermer le volume slider si on clique ailleurs
    document.addEventListener('click', (e) => {
        if (!volumeSlider.contains(e.target) && !volumeBtn.contains(e.target)) {
            volumeSlider.classList.remove('active');
        }
        if (!playlistMenu.contains(e.target) && !playlistToggle.contains(e.target)) {
            playlistMenu.classList.remove('active');
        }
    });
    
    // Modal events
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// Gestion du Volume Slider
function toggleVolumeSlider(e) {
    e.stopPropagation();
    volumeSlider.classList.toggle('active');
    playlistMenu.classList.remove('active');
    showUI();
}

function startDraggingVolume(e) {
    e.preventDefault();
    e.stopPropagation();
    isDraggingVolume = true;
    volumeThumb.style.cursor = 'grabbing';
    volumeThumb.classList.add('dragging');
}

function stopDraggingVolume() {
    if (isDraggingVolume) {
        isDraggingVolume = false;
        volumeThumb.style.cursor = 'grab';
        volumeThumb.classList.remove('dragging');
    }
}

function dragVolume(e) {
    if (!isDraggingVolume) return;
    e.preventDefault();
    updateVolumeFromMouse(e, true);
}

function handleVolumeClick(e) {
    if (e.target === volumeThumb) return;
    e.preventDefault();
    e.stopPropagation();
    updateVolumeFromMouse(e, false);
}

function updateVolumeFromMouse(e, isDragging = false) {
    e.stopPropagation();
    const trackElement = volumeSliderContainer.querySelector('.volume-track');
    const rect = trackElement.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    
    // Inverser car le slider est vertical (haut = 100%, bas = 0%)
    let newVolume = Math.round(((height - y) / height) * 100);
    newVolume = Math.max(0, Math.min(100, newVolume));
    
    currentVolume = newVolume;
    
    if (audioPlayer) {
        audioPlayer.volume = currentVolume / 100;
    }
    
    updateVolumeUI(isDragging);
    updateVolumeIcon();
}

function updateVolumeUI(isDragging = false) {
    // Désactiver temporairement la transition pendant le drag pour plus de réactivité
    if (isDragging) {
        volumeFill.style.transition = 'none';
        volumeThumb.style.transition = 'transform 0.2s';
    } else {
        volumeFill.style.transition = 'height 0.2s ease-out';
        volumeThumb.style.transition = 'transform 0.2s, bottom 0.2s ease-out';
    }
    
    volumeFill.style.height = `${currentVolume}%`;
    volumePercentage.textContent = `${currentVolume}%`;
    
    // Positionner le thumb pour qu'il coïncide exactement avec le niveau de remplissage
    const trackElement = volumeSliderContainer.querySelector('.volume-track');
    const trackHeight = trackElement.offsetHeight;
    const thumbHeight = 16;
    
    // Calculer la position exacte basée sur le pourcentage
    const fillHeight = (currentVolume / 100) * trackHeight;
    const thumbPosition = fillHeight - (thumbHeight / 2);
    
    volumeThumb.style.bottom = `${thumbPosition}px`;
}

function updateVolumeIcon() {
    const volumeIcon = volumeBtn.querySelector('svg');
    
    if (currentVolume === 0) {
        // Muted icon
        volumeIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
        `;
    } else if (currentVolume < 50) {
        // Low volume icon
        volumeIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        `;
    } else {
        // Full volume icon
        volumeIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        `;
    }
}

// Ouvrir une section (Règlement, Histoires, etc.)
function openSection(section) {
    console.log(`Ouverture de la section: ${section}`);
    
    let icon = '📜';
    let title = section;
    let content = '';
    
    switch(section) {
        case 'Règlement':
            icon = '📜';
            content = `
                <h3>Règles Générales</h3>
                <ul>
                    <li>Respectez les autres joueurs en toutes circonstances</li>
                    <li>Aucun comportement toxique ou discriminatoire toléré</li>
                    <li>Le metagaming est strictement interdit</li>
                    <li>Restez dans votre personnage à tout moment (RP)</li>
                </ul>
                
                <h3>Règles de Combat</h3>
                <ul>
                    <li>Pas de freekill/RDM (Random Death Match)</li>
                    <li>Toujours avoir une raison RP valide avant d'engager un combat</li>
                    <li>Respecter les règles de prise d'otage</li>
                </ul>
                
                <h3>Sanctions</h3>
                <p>Le non-respect de ces règles peut entraîner :</p>
                <ul>
                    <li>Avertissement</li>
                    <li>Kick temporaire</li>
                    <li>Ban définitif en cas de récidive</li>
                </ul>
                
                <div class="modal-footer">
                    Pour plus de détails, consultez notre Discord officiel
                </div>
            `;
            break;
            
        case 'Histoires':
            icon = '📖';
            content = `
                <h3>Légendes du Serveur</h3>
                <p>Découvrez les histoires marquantes qui ont façonné notre communauté.</p>
                
                <h3>Événements Mémorables</h3>
                <ul>
                    <li>Le Grand Braquage de la Banque Centrale</li>
                    <li>La Guerre des Gangs de 2024</li>
                    <li>L'Élection du Maire Controversé</li>
                    <li>Le Festival d'Été Légendaire</li>
                </ul>
                
                <h3>Personnages Iconiques</h3>
                <p>Rencontrez les joueurs qui ont laissé leur marque dans l'histoire du serveur.</p>
                
                <div class="modal-footer">
                    Rendez-vous sur notre site web pour lire toutes les histoires
                </div>
            `;
            break;
            
        case 'Crédits':
            icon = '👥';
            content = (function(){
                const _0x3ad1=["\x3C\x68\x33\x3E\xC9\x71\x75\x69\x70\x65\x20\x64\x65\x20\x44\xE9\x76\x65\x6C\x6F\x70\x70\x65\x6D\x65\x6E\x74\x3C\x2F\x68\x33\x3E\x0A\x3C\x75\x6C\x3E\x0A\x20\x20\x3C\x6C\x69\x3E\x3C\x73\x74\x72\x6F\x6E\x67\x3E\x4C\x61\x20\x46\x6C\x6F\x6B\x61\x6E\x63\x65\x3C\x2F\x73\x74\x72\x6F\x6E\x67\x3E\x20\x2D\x20\x44\xE9\x76\x65\x6C\x6F\x70\x70\x65\x6D\x65\x6E\x74\x20\x70\x72\x69\x6E\x63\x69\x70\x61\x6C\x3C\x2F\x6C\x69\x3E\x0A\x20\x20\x3C\x6C\x69\x3E\x3C\x73\x74\x72\x6F\x6E\x67\x3E\x4C\x61\x20\x46\x6C\x6F\x6B\x61\x6E\x63\x65\x3C\x2F\x73\x74\x72\x6F\x6E\x67\x3E\x20\x2D\x20\x49\x6E\x74\x65\x72\x66\x61\x63\x65\x20\x26\x20\x47\x72\x61\x70\x68\x69\x73\x6D\x65\x73\x3C\x2F\x6C\x69\x3E\x0A\x3C\x2F\x75\x6C\x3E\x0A\x0A\x3C\x68\x33\x3E\x52\x65\x6D\x65\x72\x63\x69\x65\x6D\x65\x6E\x74\x73\x3C\x2F\x68\x33\x3E\x0A\x3C\x70\x3E\x55\x6E\x20\x67\x72\x61\x6E\x64\x20\x6D\x65\x72\x63\x69\x20\xE0\x20\x3A\x3C\x2F\x70\x3E\x0A\x3C\x75\x6C\x3E\x0A\x20\x20\x3C\x6C\x69\x3E\x54\x6F\x75\x74\x65\x20\x6C\x61\x20\x63\x6F\x6D\x6D\x75\x6E\x61\x75\x74\xE9\x20\x70\x6F\x75\x72\x20\x73\x6F\x6E\x20\x73\x6F\x75\x74\x69\x65\x6E\x3C\x2F\x6C\x69\x3E\x0A\x20\x20\x3C\x6C\x69\x3E\x4C\x65\x73\x20\x74\x65\x73\x74\x65\x75\x72\x73\x20\x62\xEA\x74\x61\x20\x70\x6F\x75\x72\x20\x6C\x65\x75\x72\x73\x20\x72\x65\x74\x6F\x75\x72\x73\x3C\x2F\x6C\x69\x3E\x0A\x3C\x2F\x75\x6C\x3E\x0A\x0A\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x6D\x6F\x64\x61\x6C\x2D\x66\x6F\x6F\x74\x65\x72\x22\x3E\x0A\x20\x20\x56\x65\x72\x73\x69\x6F\x6E\x20\x31\x2E\x30\x2E\x30\x20\x2D\x20\xC2\xA9\x20\x32\x30\x32\x35\x20\x4C\x61\x20\x46\x6C\x6F\x6B\x61\x6E\x63\x65\x0A\x3C\x2F\x64\x69\x76\x3E"];
                return _0x3ad1[0];
                })();
            break;
            
        case 'Paramètres':
            icon = '⚙️';
            content = `
                <h3>Audio</h3>
                <ul>
                    <li><strong>Volume Musique:</strong> ${currentVolume}%</li>
                    <li><strong>Effets Sonores:</strong> Activés</li>
                </ul>
                
                <h3>Interface</h3>
                <ul>
                    <li><strong>Auto-hide UI:</strong> 3 secondes</li>
                    <li><strong>Animations:</strong> Activées</li>
                    <li><strong>Effets visuels:</strong> Haute qualité</li>
                </ul>
                
                <h3>Raccourcis Clavier</h3>
                <ul>
                    <li><strong>← →</strong> Changer de scène</li>
                    <li><strong>Espace</strong> Play/Pause musique</li>
                    <li><strong>↑ ↓</strong> Ajuster le volume</li>
                </ul>
                
                <div class="modal-footer">
                    Plus de paramètres disponibles prochainement
                </div>
            `;
            break;
    }
    
    openModal(icon, title, content);
    showUI();
}

// Fonctions Modal
function openModal(icon, title, content) {
    modalIcon.textContent = icon;
    modalTitleText.textContent = title;
    modalBody.innerHTML = content;
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

// Changement de scène
function changeScene(direction) {
    currentScene = (currentScene + direction + scenes.length) % scenes.length;
    updateScene();
    showUI();
    
    // Réinitialiser le timer quand on change manuellement
    stopAutoSceneChange();
    startAutoSceneChange();
}

// Mise à jour de la scène
function updateScene() {
    sceneTitle.textContent = scenes[currentScene].title;
    sceneDescription.textContent = scenes[currentScene].description;
    
    backgroundImages.forEach((img, index) => {
        if (index === currentScene) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });
}

// Simulation de progression
function startProgressSimulation() {
    const interval = setInterval(() => {
        progress += Math.random() * 2;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            onLoadingComplete();
        }
        
        updateProgress();
    }, 300);
}

// Mise à jour de la progression
function updateProgress() {
    const roundedProgress = Math.round(progress);
    
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${roundedProgress}%`;
    
    const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
    loadingText.textContent = loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)];
}

// Chargement terminé
function onLoadingComplete() {
    console.log('Loading complete!');
    
    // Arrêter le changement automatique de scène quand le chargement est terminé
    stopAutoSceneChange();
    
    if (typeof loadComplete !== 'undefined') {
        loadComplete();
    }
}

// Initialiser la playlist
function initPlaylist() {
    playlistItems.innerHTML = '';
    
    playlist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === currentTrack ? 'active' : ''}`;
        
        const artStyle = track.cover 
            ? `background-image: url('${track.cover}'); background-size: cover; background-position: center;`
            : `background: ${track.color}`;
        
        item.innerHTML = `
            <div class="playlist-item-art" style="${artStyle}"></div>
            <div class="playlist-item-info">
                <p class="playlist-item-title">${track.title}</p>
                <p class="playlist-item-artist">${track.artist}</p>
            </div>
            <span class="playlist-item-duration">${track.duration}</span>
        `;
        
        item.addEventListener('click', () => {
            changeTrack(index);
        });
        
        playlistItems.appendChild(item);
    });
}

// Changer de musique
function changeTrack(index) {
    currentTrack = index;
    updateTrackInfo();
    updatePlaylistItems();
    playlistMenu.classList.remove('active');
    
    if (audioPlayer && playlist[currentTrack].file) {
        audioPlayer.src = playlist[currentTrack].file;
        audioPlayer.play().catch(err => console.log('Erreur lecture:', err));
        isPlaying = true;
        updatePlayPauseButton();
    }
}

// Musique précédente
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    changeTrack(currentTrack);
}

// Musique suivante
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    changeTrack(currentTrack);
}

// Mettre à jour les infos de la musique
function updateTrackInfo() {
    const track = playlist[currentTrack];
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    
    if (track.cover) {
        albumArt.style.backgroundImage = `url('${track.cover}')`;
        albumArt.style.backgroundSize = 'cover';
        albumArt.style.backgroundPosition = 'center';
    } else {
        albumArt.style.background = track.color;
        albumArt.style.backgroundImage = 'none';
    }
}

// Mettre à jour la playlist
function updatePlaylistItems() {
    const items = playlistItems.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === currentTrack) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Toggle playlist
function togglePlaylist() {
    playlistMenu.classList.toggle('active');
    volumeSlider.classList.remove('active');
    showUI();
}

// Toggle lecture musique
function togglePlay() {
    isPlaying = !isPlaying;
    
    if (audioPlayer) {
        if (isPlaying) {
            audioPlayer.play().catch(err => console.log('Erreur lecture:', err));
        } else {
            audioPlayer.pause();
        }
    }
    
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    const svg = playPauseBtn.querySelector('svg');
    
    if (isPlaying) {
        svg.innerHTML = `
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
        `;
    } else {
        svg.innerHTML = `
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        `;
    }
}

// Gestion de l'auto-hide UI
function setupAutoHideUI() {
    hideUIAfterDelay();
}

function showUI() {
    uiOverlay.classList.remove('hidden');
    clearTimeout(uiHideTimeout);
    hideUIAfterDelay();
}

function hideUIAfterDelay() {
    uiHideTimeout = setTimeout(() => {
        uiOverlay.classList.add('hidden');
    }, 3000);
}

// Gestion des événements FiveM (si applicable)
window.addEventListener('message', (event) => {
    const data = event.data;
    
    switch (data.eventName) {
        case 'loadProgress':
            if (typeof data.loadFraction !== 'undefined') {
                progress = data.loadFraction * 100;
                updateProgress();
            }
            break;
            
        case 'startInitFunction':
        case 'startInitFunctionOrder':
            if (typeof data.name !== 'undefined') {
                loadingText.textContent = `Chargement: ${data.name}`;
            }
            break;
            
        case 'endInitFunction':
            break;
            
        case 'startDataFileEntries':
            loadingText.textContent = 'Chargement des ressources...';
            break;
            
        case 'performMapLoadFunction':
            loadingText.textContent = 'Chargement de la carte...';
            break;
    }
});

// Support des raccourcis clavier
document.addEventListener('keydown', (e) => {
    // Fermer la modal avec Escape
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
        return;
    }
    
    switch(e.key) {
        case 'ArrowLeft':
            changeScene(-1);
            break;
        case 'ArrowRight':
            changeScene(1);
            break;
        case ' ':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowUp':
            e.preventDefault();
            currentVolume = Math.min(100, currentVolume + 5);
            if (audioPlayer) audioPlayer.volume = currentVolume / 100;
            updateVolumeUI();
            updateVolumeIcon();
            break;
        case 'ArrowDown':
            e.preventDefault();
            currentVolume = Math.max(0, currentVolume - 5);
            if (audioPlayer) audioPlayer.volume = currentVolume / 100;
            updateVolumeUI();
            updateVolumeIcon();
            break;
    }
});

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', init);

// Message console
console.log('🎮 FiveM Loading Screen - GTA Style');
console.log('📱 Utilisez les flèches ← → pour naviguer');
console.log('⏯️  Utilisez la barre d\'espace pour play/pause');
console.log('🔊 Utilisez les flèches ↑ ↓ pour le volume');