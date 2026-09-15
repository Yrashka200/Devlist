
const developers = [
    {
        id: 1,
        name: "Yrashka",
        username: "@Yrashka200",
        age: 17,
        gender: "He/him",
        email: "yrashka2025@atomicmail.io",
        website: "https://blog-yrashka.vercel.app/",
        twitter: "https://x.com/Yrashka200",
        github: "https://github.com/Yrashka200",
        avatarLetter: "Y",
        bio: "dev  •open-source  • study  • shitpost",
        stack: ["python", "javascript", "html", "CSS"]
    },
    {
        id: 2,
        name: "Shreya",
        username: "techgirl-shreya200",
        age: 16,
        gender: "She/her",
        email: "None",
        website: "https://orchid-butter-20956777.figma.site/",
        twitter: "https://x.com/tech_Shreya_200",
        github: "https://github.com/techgirl-shreya200",
        avatarLetter: "S",
        bio: "A class 11 student navigating the cosmos of code, cybersecurity, and artificial intelligence — one CTF at a time",
        stack: ["python", "c", "c++", "javascript", "html", "css", "cybersecurity"]
    }

];


const techNames = {
    'cplusplus': 'C++',
    'csharp': 'C#',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'vuejs': 'Vue.js',
    'react': 'React',
    'nodejs': 'Node.js',
    'postgresql': 'PostgreSQL',
    'mysql': 'MySQL',
    'mongodb': 'MongoDB',
    'aws': 'AWS',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'flutter': 'Flutter',
    'swift': 'Swift',
    'kotlin': 'Kotlin',
    'python': 'Python',
    'django': 'Django',
    'rust': 'Rust',
    'go': 'Go',
    'java': 'Java',
    'spring': 'Spring',
    'redis': 'Redis',
    'sass': 'Sass',
    'figma': 'Figma',
    'firebase': 'Firebase',
    'unrealengine': 'Unreal Engine',
    'cmake': 'CMake',
    'c': 'C',
    'pandas': 'Pandas',
    'numpy': 'NumPy',
    'tensorflow': 'TensorFlow',
    'jupyter': 'Jupyter'
};


function formatTechName(tech) {
    return techNames[tech] || tech.charAt(0).toUpperCase() + tech.slice(1);
}


const state = {
    searchQuery: '',
    activeChip: 'all',
    sortBy: 'default'
};


function getFilteredDevelopers() {
    let result = [...developers];

      if (state.searchQuery.trim()) {
        const query = state.searchQuery.trim().toLowerCase();
        result = result.filter(dev => 
            dev.stack.some(tech => 
                tech.toLowerCase().includes(query) ||
                formatTechName(tech).toLowerCase().includes(query)
            ) ||
            dev.name.toLowerCase().includes(query) ||
            dev.username.toLowerCase().includes(query)
        );
    }

    
    if (state.activeChip !== 'all') {
        result = result.filter(dev => 
            dev.stack.includes(state.activeChip)
        );
    }

    
    switch (state.sortBy) {
        case 'name-asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'age-asc':
            result.sort((a, b) => a.age - b.age);
            break;
        case 'age-desc':
            result.sort((a, b) => b.age - a.age);
            break;
        default:
            // default — по id
            result.sort((a, b) => a.id - b.id);
    }

    return result;
}


function renderTags(stack) {
    if (!stack || stack.length === 0) return '';
    return stack.map(tech => `
        <span class="tag" onclick="event.stopPropagation(); filterByTag('${tech}')">
            <i class="devicon-${tech}-plain"></i>
            ${formatTechName(tech)}
        </span>
    `).join('');
}

function createCard(dev) {
    return `
        <div class="card" onclick="openProfile(${dev.id})">
            <div class="card-header">
                <div class="avatar">${dev.avatarLetter}</div>
                <div class="card-info">
                    <h3>${dev.name}</h3>
                    <span class="username">${dev.username}</span>
                </div>
            </div>
            
            <div class="tags">
                ${renderTags(dev.stack)}
            </div>

            <div class="details">
                <span><strong>Age:</strong> ${dev.age}</span>
                <span><strong>Gender:</strong> ${dev.gender}</span>
            </div>
            
            <div class="socials">
                ${dev.github ? `<a href="${dev.github}" target="_blank" onclick="event.stopPropagation()" title="GitHub"><i class="fab fa-github"></i></a>` : ''}
                ${dev.twitter ? `<a href="${dev.twitter}" target="_blank" onclick="event.stopPropagation()" title="X (Twitter)"><i class="fab fa-twitter"></i></a>` : ''}
                ${dev.website ? `<a href="${dev.website}" target="_blank" onclick="event.stopPropagation()" title="Website"><i class="fas fa-globe"></i></a>` : ''}
            </div>
        </div>
    `;
}

function renderGrid() {
    const grid = document.getElementById('devGrid');
    const emptyState = document.getElementById('emptyState');
    const resultsInfo = document.getElementById('resultsInfo');

    const filtered = getFilteredDevelopers();

    // Обновляем инфо о результатах
    resultsInfo.innerHTML = `Showing <strong>${filtered.length}</strong> of ${developers.length} developers`;

    // Пустое состояние
    if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    grid.innerHTML = filtered.map(dev => createCard(dev)).join('');
}


function filterByTag(tech) {
    
    state.searchQuery = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearch').classList.remove('visible');

    
    state.activeChip = tech;

    
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.filter === tech);
    });

    renderGrid();

    
    document.querySelector('.filter-panel').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}


const addModalOverlay = document.getElementById('modalOverlay');
const openAddModalBtn = document.getElementById('openModalBtn');
const closeAddModalBtn = document.getElementById('closeModalBtn');

openAddModalBtn.addEventListener('click', () => {
    addModalOverlay.classList.add('active');
});

closeAddModalBtn.addEventListener('click', () => {
    addModalOverlay.classList.remove('active');
});


const profileModalOverlay = document.getElementById('profileModalOverlay');
const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');
const profileModalBody = document.getElementById('profileModalBody');

function openProfile(id) {
    const dev = developers.find(d => d.id === id);
    if (!dev) return;

    const stackHtml = dev.stack.map(tech => `
        <span class="tag" onclick="closeProfileAndFilter('${tech}')">
            <i class="devicon-${tech}-plain"></i>
            ${formatTechName(tech)}
        </span>
    `).join('');

    profileModalBody.innerHTML = `
        <div class="profile-header-detail">
            <div class="avatar">${dev.avatarLetter}</div>
            <div>
                <h2>${dev.name}</h2>
                <div class="username">${dev.username}</div>
            </div>
        </div>
        
        <div class="profile-bio">
            ${dev.bio}
        </div>

        <div class="profile-section">
            <h4>Details</h4>
            <div class="details">
                <span><strong>Age:</strong> ${dev.age}</span>
                <span><strong>Gender:</strong> ${dev.gender}</span>
                <span><strong>Email:</strong> ${dev.email}</span>
            </div>
        </div>

        <div class="profile-section">
            <h4>Tech Stack</h4>
            <div class="stack-list-detail">
                ${stackHtml}
            </div>
        </div>

        <div class="profile-section">
            <h4>Contacts</h4>
            <div class="profile-contacts">
                ${dev.github ? `<a href="${dev.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
                ${dev.twitter ? `<a href="${dev.twitter}" target="_blank"><i class="fab fa-twitter"></i> Twitter / X</a>` : ''}
                ${dev.website ? `<a href="${dev.website}" target="_blank"><i class="fas fa-globe"></i> Website</a>` : ''}
            </div>
        </div>
    `;

    profileModalOverlay.classList.add('active');
}


function closeProfileAndFilter(tech) {
    profileModalOverlay.classList.remove('active');
    setTimeout(() => filterByTag(tech), 300);
}

closeProfileModalBtn.addEventListener('click', () => {
    profileModalOverlay.classList.remove('active');
});




const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');

searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    clearSearch.classList.toggle('visible', e.target.value.length > 0);
    
    
    if (e.target.value.trim()) {
        state.activeChip = 'all';
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.filter === 'all');
        });
    }
    
    renderGrid();
});

clearSearch.addEventListener('click', () => {
    state.searchQuery = '';
    searchInput.value = '';
    clearSearch.classList.remove('visible');
    renderGrid();
    searchInput.focus();
});


document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        state.activeChip = filter;

        
        state.searchQuery = '';
        searchInput.value = '';
        clearSearch.classList.remove('visible');

        // Обновляем активный чип
        document.querySelectorAll('.filter-chip').forEach(c => {
            c.classList.toggle('active', c.dataset.filter === filter);
        });

        renderGrid();
    });
});

// Сортировка
document.getElementById('sortSelect').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderGrid();
});

// Сброс фильтров
document.getElementById('resetFilters').addEventListener('click', () => {
    state.searchQuery = '';
    state.activeChip = 'all';
    state.sortBy = 'default';

    searchInput.value = '';
    clearSearch.classList.remove('visible');
    document.getElementById('sortSelect').value = 'default';

    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.filter === 'all');
    });

    renderGrid();
});


window.addEventListener('click', (e) => {
    if (e.target === addModalOverlay) addModalOverlay.classList.remove('active');
    if (e.target === profileModalOverlay) profileModalOverlay.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        addModalOverlay.classList.remove('active');
        profileModalOverlay.classList.remove('active');
    }
});


document.addEventListener('DOMContentLoaded', renderGrid);
