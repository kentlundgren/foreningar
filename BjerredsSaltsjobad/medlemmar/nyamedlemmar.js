/**
 * =========================================================================
 * NYAMEDLEMMAR.JS — Dynamisk hämtning av medlemsdata
 * =========================================================================
 * Skapad: 2025-12-26
 * Uppdaterad: 2025-12-26 — Nu generisk för ALLA månader (utom november)
 * 
 * Detta skript hämtar medlemsdata från Markdown-filen och visar
 * nya medlemmar för en valfri månad.
 * 
 * Funktioner:
 * - Hämtar och parsar data/md_komplett_251226.md
 * - Filtrerar på månad och medlemskapstyp
 * - Visar förnamn + första bokstaven i efternamnet + bokningar
 * - Triggas vid trippelklick på staplar i diagrammet
 * 
 * OBS: November 2025 hanteras separat i index.html (hårdkodad data)
 * =========================================================================
 */

// =========================================================================
// KONFIGURATION
// =========================================================================

const DATAFIL = 'data/md_komplett_251226.md';

// Medlemskapstyper som räknas som familjemedlemskap
const FAMILJETYPER = [
    'Familjemedlemskap',
    'Familjemedlemskap-fortlöpande',
    'Familjemedlemskap - extra lång säsong',
    'Registrering av familjemedlemmar'
];

// Medlemskapstyper som räknas som enskilt medlemskap
const ENSKILDA_TYPER = [
    'Enskilt medlemskap',
    'Enskilt medlemskap-fortlöpande',
    'Enskilt medlemskap - ett år',
    'Enskilt medlemskap - extra lång säsong',
    'Studentmedlemskap',
    'Ungdomsmedlemskap'
];

// =========================================================================
// VARIABLER FÖR KLICKHANTERING (generisk för alla månader)
// =========================================================================

let dynamicClickCount = 0;
let dynamicClickTimer = null;
let lastDynamicClickType = null;
let lastDynamicClickPeriod = null;  // Spara vilken period som klickades
const DYNAMIC_CLICK_DELAY = 500; // ms

// =========================================================================
// FUNKTIONER
// =========================================================================

/**
 * Hämtar och parsar Markdown-filen
 * Returnerar en array med medlemsobjekt
 */
async function fetchMemberData() {
    try {
        const response = await fetch(DATAFIL);
        if (!response.ok) {
            throw new Error(`Kunde inte hämta fil: ${response.status}`);
        }
        const content = await response.text();
        return parseMarkdownTable(content);
    } catch (error) {
        console.error('Fel vid hämtning av medlemsdata:', error);
        return [];
    }
}

/**
 * Parsar Markdown-tabellen och returnerar array med medlemsobjekt
 */
function parseMarkdownTable(content) {
    const lines = content.split('\n');
    const members = [];
    
    for (const line of lines) {
        // Hoppa över rader som inte är tabellrader
        if (!line.startsWith('|') || line.includes('---') || line.includes('Användare')) {
            continue;
        }
        
        // Dela upp raden i kolumner
        const cols = line.split('|').filter(c => c.trim());
        
        if (cols.length >= 6) {
            const medlem = {
                nr: cols[0]?.trim(),
                namn: cols[1]?.trim(),
                medlemskap: cols[2]?.trim(),
                bokningar: parseInt(cols[3]?.trim()) || 0,
                startar: cols[4]?.trim(),
                startmanad: cols[5]?.trim()
            };
            
            if (medlem.namn && medlem.startmanad) {
                members.push(medlem);
            }
        }
    }
    
    return members;
}

/**
 * Formaterar namn: Förnamn + första bokstaven i efternamnet
 * Exempel: "Kent Lundgren" → "Kent L."
 */
function formatName(fullName) {
    if (!fullName) return 'Okänt namn';
    
    const parts = fullName.trim().split(' ');
    
    if (parts.length === 1) {
        return parts[0];  // Bara ett namn
    }
    
    const firstName = parts[0];
    const lastName = parts[parts.length - 1];  // Ta sista delen som efternamn
    const lastInitial = lastName.charAt(0).toUpperCase();
    
    return `${firstName} ${lastInitial}.`;
}

/**
 * Avgör om ett medlemskap är av familjetyp
 */
function isFamilyMembership(membershipType) {
    return FAMILJETYPER.some(type => 
        membershipType?.toLowerCase().includes(type.toLowerCase())
    );
}

/**
 * Avgör om ett medlemskap är av enskild typ
 */
function isSingleMembership(membershipType) {
    return ENSKILDA_TYPER.some(type => 
        membershipType?.toLowerCase().includes(type.toLowerCase())
    );
}

/**
 * Hämtar medlemmar för en specifik månad och typ
 * @param {string} period - Månad i format YYYY-MM (t.ex. "2025-12")
 * @param {string} memberType - "familj" eller "enskild"
 */
async function getMembersByPeriodAndType(period, memberType) {
    const allMembers = await fetchMemberData();
    
    return allMembers.filter(m => {
        const matchesPeriod = m.startmanad === period;
        const matchesType = memberType === 'familj' 
            ? isFamilyMembership(m.medlemskap)
            : isSingleMembership(m.medlemskap);
        
        return matchesPeriod && matchesType;
    });
}

/**
 * Formaterar månad för visning
 * "2025-12" → "December 2025"
 */
function formatMonth(period) {
    const monthNames = {
        '01': 'Januari', '02': 'Februari', '03': 'Mars',
        '04': 'April', '05': 'Maj', '06': 'Juni',
        '07': 'Juli', '08': 'Augusti', '09': 'September',
        '10': 'Oktober', '11': 'November', '12': 'December'
    };
    
    const [year, month] = period.split('-');
    return `${monthNames[month] || month} ${year}`;
}

// =========================================================================
// MODAL FÖR DYNAMISK DATA (alla månader utom november)
// =========================================================================

/**
 * Skapar och visar modal med medlemmar för valfri månad
 * @param {string} period - Månad i format YYYY-MM (t.ex. "2025-12")
 * @param {string} memberType - "familj" eller "enskild"
 */
async function showDynamicMemberModal(period, memberType) {
    const members = await getMembersByPeriodAndType(period, memberType);
    
    // Sortera efter antal bokningar (flest först)
    members.sort((a, b) => b.bokningar - a.bokningar);
    
    // Skapa eller hämta modal-element
    let modal = document.getElementById('dynamicMemberModal');
    
    if (!modal) {
        modal = createDynamicModal();
        document.body.appendChild(modal);
    }
    
    // Fyll i innehåll
    const typeLabel = memberType === 'familj' ? 'Familjemedlemskap' : 'Enskilda medlemskap';
    const colorVar = memberType === 'familj' ? 'var(--family-color)' : 'var(--single-color)';
    
    const header = modal.querySelector('.dynamic-modal-header');
    const title = modal.querySelector('.dynamic-modal-title');
    const countEl = modal.querySelector('.dynamic-member-count');
    const listEl = modal.querySelector('.dynamic-member-list');
    
    header.style.background = colorVar;
    title.textContent = `${typeLabel} — ${formatMonth(period)}`;
    countEl.textContent = `${members.length} nya medlemmar`;
    countEl.style.background = colorVar;
    
    // Bygg listan
    let listHTML = '';
    
    if (members.length === 0) {
        listHTML = '<div class="dynamic-no-members">Inga medlemmar hittades för denna period.</div>';
    } else {
        members.forEach((m, index) => {
            const formattedName = formatName(m.namn);
            const bookingsText = m.bokningar === 1 ? '1 bokning' : `${m.bokningar} bokningar`;
            
            listHTML += `
                <div class="dynamic-member-item" style="animation-delay: ${index * 30}ms">
                    <span class="dynamic-member-name">${formattedName}</span>
                    <span class="dynamic-member-bookings">${bookingsText}</span>
                </div>
            `;
        });
    }
    
    listEl.innerHTML = listHTML;
    
    // Visa modal
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

/**
 * Skapar HTML för den dynamiska modalen
 */
function createDynamicModal() {
    const modal = document.createElement('div');
    modal.id = 'dynamicMemberModal';
    modal.className = 'dynamic-modal-overlay';
    
    modal.innerHTML = `
        <div class="dynamic-modal-content">
            <div class="dynamic-modal-header">
                <h3 class="dynamic-modal-title">Laddar...</h3>
                <button class="dynamic-modal-close" onclick="closeDynamicModal()">×</button>
            </div>
            <div class="dynamic-modal-body">
                <div class="dynamic-member-count">0 medlemmar</div>
                <p class="dynamic-info-text">
                    📊 Data hämtad dynamiskt från <code>data/md_komplett_251226.md</code>
                </p>
                <div class="dynamic-member-list"></div>
            </div>
        </div>
    `;
    
    // Stäng vid klick utanför
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDynamicModal();
        }
    });
    
    // Lägg till styles om de inte redan finns
    addDynamicModalStyles();
    
    return modal;
}

/**
 * Stänger den dynamiska modalen
 */
function closeDynamicModal() {
    const modal = document.getElementById('dynamicMemberModal');
    if (modal) {
        modal.classList.remove('visible');
        document.body.style.overflow = '';
    }
}

/**
 * Lägger till CSS för den dynamiska modalen
 */
function addDynamicModalStyles() {
    if (document.getElementById('dynamicModalStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'dynamicModalStyles';
    style.textContent = `
        /* Dynamic Modal Overlay */
        .dynamic-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(4px);
        }
        
        .dynamic-modal-overlay.visible {
            opacity: 1;
            visibility: visible;
        }
        
        /* Modal Content */
        .dynamic-modal-content {
            background: white;
            border-radius: 16px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            transform: scale(0.9) translateY(20px);
            transition: transform 0.3s ease;
        }
        
        .dynamic-modal-overlay.visible .dynamic-modal-content {
            transform: scale(1) translateY(0);
        }
        
        /* Modal Header */
        .dynamic-modal-header {
            padding: 20px 25px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .dynamic-modal-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin: 0;
        }
        
        .dynamic-modal-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }
        
        .dynamic-modal-close:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        /* Modal Body */
        .dynamic-modal-body {
            padding: 20px 25px 25px;
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .dynamic-member-count {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            color: white;
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 15px;
        }
        
        .dynamic-info-text {
            font-size: 0.85rem;
            color: #718096;
            margin-bottom: 20px;
            padding: 10px 15px;
            background: #f7fafc;
            border-radius: 8px;
            border-left: 3px solid #4299e1;
        }
        
        .dynamic-info-text code {
            background: #e2e8f0;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.8rem;
        }
        
        /* Member List */
        .dynamic-member-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .dynamic-member-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 15px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 3px solid #e2e8f0;
            opacity: 0;
            animation: dynamicSlideIn 0.3s ease forwards;
        }
        
        @keyframes dynamicSlideIn {
            from {
                opacity: 0;
                transform: translateX(-10px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .dynamic-member-name {
            font-weight: 500;
            color: #2d3748;
        }
        
        .dynamic-member-bookings {
            font-size: 0.9rem;
            color: #718096;
            background: #e2e8f0;
            padding: 4px 10px;
            border-radius: 12px;
        }
        
        .dynamic-no-members {
            text-align: center;
            padding: 30px;
            color: #a0aec0;
            font-style: italic;
        }
        
        /* Responsive */
        @media (max-width: 480px) {
            .dynamic-modal-content {
                width: 95%;
                max-height: 85vh;
            }
            
            .dynamic-modal-title {
                font-size: 1.1rem;
            }
            
            .dynamic-modal-body {
                padding: 15px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// =========================================================================
// KLICKHANTERING FÖR DYNAMISK DATA (alla månader utom november)
// =========================================================================

/**
 * Hanterar klick på valfri stapel (utom november)
 * Anropas från handleChartClick i index.html
 * @param {string} period - Månad i format YYYY-MM (t.ex. "2025-12")
 * @param {string} memberType - "familj" eller "enskild"
 */
function handleDynamicClick(period, memberType) {
    // Om användaren byter stapel eller period, återställ räknaren
    if ((lastDynamicClickType !== null && lastDynamicClickType !== memberType) ||
        (lastDynamicClickPeriod !== null && lastDynamicClickPeriod !== period)) {
        dynamicClickCount = 0;
        clearTimeout(dynamicClickTimer);
    }
    lastDynamicClickType = memberType;
    lastDynamicClickPeriod = period;
    
    // Räkna klick
    dynamicClickCount++;
    
    // Om första klicket, starta timer
    if (dynamicClickCount === 1) {
        dynamicClickTimer = setTimeout(() => {
            dynamicClickCount = 0;
            lastDynamicClickType = null;
            lastDynamicClickPeriod = null;
        }, DYNAMIC_CLICK_DELAY);
    }
    
    // Vid trippelklick - visa modal
    if (dynamicClickCount >= 3) {
        clearTimeout(dynamicClickTimer);
        dynamicClickCount = 0;
        lastDynamicClickType = null;
        lastDynamicClickPeriod = null;
        showDynamicMemberModal(period, memberType);
    }
}

// =========================================================================
// BAKÅTKOMPATIBILITET: handleDecemberClick
// =========================================================================

/**
 * Bakåtkompatibel funktion för december
 * (Behålls för eventuell äldre kod som anropar denna)
 */
function handleDecemberClick(memberType) {
    handleDynamicClick('2025-12', memberType);
}

// =========================================================================
// ESC-TANGENT FÖR ATT STÄNGA MODAL
// =========================================================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDynamicModal();
    }
});

// =========================================================================
// EXPORTERA FUNKTIONER (för användning från index.html)
// =========================================================================

// Funktionerna är globalt tillgängliga via window-objektet
window.handleDynamicClick = handleDynamicClick;
window.handleDecemberClick = handleDecemberClick;  // Bakåtkompatibilitet
window.closeDynamicModal = closeDynamicModal;
window.showDynamicMemberModal = showDynamicMemberModal;

console.log('✅ nyamedlemmar.js laddad — dynamisk datahämtning för ALLA månader (utom november) redo');

