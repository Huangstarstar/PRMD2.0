<!-- head.php - Unified Header Navigation -->
<style>
/* ========== Top Bar Styles ========== */
.topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    z-index: 1000;
    gap: 20px;
}

.topbar .logo {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1px;
    flex-shrink: 0;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
}

.topbar .logo span {
    font-weight: 400;
    opacity: 0.8;
}

.nav-menu {
    display: flex;
    gap: 5px;
    align-items: center;
    flex: 1;
    justify-content: center;
}

.nav-menu > a,
.nav-menu > .dropdown {
    position: relative;
}

.nav-menu a {
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 6px;
    transition: background 0.2s, color 0.2s;
    display: block;
}

.nav-menu > a:hover,
.nav-menu > .dropdown:hover > .dropdown-toggle {
    background: rgba(255,255,255,0.15);
    color: #fff;
}

.nav-menu > a.active,
.nav-menu > .dropdown.active > .dropdown-toggle {
    background: rgba(255,255,255,0.2);
    color: #fff;
}

/* ========== Dropdown Menu ========== */
.dropdown {
    position: relative;
}

.dropdown-toggle {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
}

.dropdown-toggle::after {
    content: '';
    border: solid rgba(255,255,255,0.8);
    border-width: 0 2px 2px 0;
    padding: 3px;
    transform: rotate(45deg);
    transition: transform 0.2s;
    margin-left: 2px;
}

.dropdown:hover .dropdown-toggle::after {
    transform: rotate(-135deg);
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    padding: 8px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
    z-index: 1001;
}

.dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-menu a {
    color: #333;
    padding: 10px 16px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background 0.2s, color 0.2s;
}

.dropdown-menu a:hover {
    background: #e8f5e9;
    color: #2e7d32;
}

.dropdown-menu a.active {
    background: #e8f5e9;
    color: #2e7d32;
    font-weight: 600;
}

.dropdown-menu a .menu-icon {
    width: 24px;
    height: 24px;
    background: #f0f0f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.dropdown-menu a:hover .menu-icon {
    background: #c8e6c9;
}

.dropdown-divider {
    height: 1px;
    background: #e5e7eb;
    margin: 6px 0;
}

.search-box {
    display: flex;
    align-items: center;
}

.search-box input {
    width: 200px;
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    outline: none;
    font-size: 14px;
    background: rgba(255,255,255,0.2);
    color: #fff;
    transition: background 0.2s;
}

.search-box input::placeholder {
    color: rgba(255,255,255,0.6);
}

.search-box input:focus {
    background: rgba(255,255,255,0.3);
}

/* ========== Responsive ========== */
@media (max-width: 900px) {
    .topbar {
        flex-wrap: wrap;
        height: auto;
        padding: 10px;
    }

    .nav-menu {
        order: 3;
        width: 100%;
        justify-content: center;
        padding-top: 10px;
        flex-wrap: wrap;
    }

    .dropdown-menu {
        position: fixed;
        left: 10px;
        right: 10px;
        min-width: auto;
    }
}
</style>

<!-- Top Bar HTML -->
<div class="topbar">
    <a href="index.php" class="logo">PRMD <span>2.0</span></a>

    <div class="nav-menu">
        <a href="index.php" id="nav-home">Home</a>
        <a href="try_browse.php" id="nav-browse">Browse</a>
        <a href="try_links.php" id="nav-links">Links</a>
        <a href="jbrowse.php" id="nav-jbrowse">JBrowse</a>

        <!-- Tools dropdown menu -->
        <div class="dropdown" id="nav-tools">
            <a href="javascript:void(0)" class="dropdown-toggle">Tools</a>
            <div class="dropdown-menu">
                <a href="RMdiff_v2.php">
                    <span class="menu-icon">📊</span>
                    RMdiff v2.0
                </a>
                <a href="RMvar.php">
                    <span class="menu-icon">🧬</span>
                    RMvar
                </a>
                <a href="RNAmodNet.php">
                    <span class="menu-icon">🌐</span>
                    RNAmodNet
                </a>
                <a href="blast.php">
                    <span class="menu-icon">🔍</span>
                    BLAST
                </a>
                <!-- 新增基因编辑工具 -->
                <a href="gene_editor.php">
                    <span class="menu-icon">🧬</span>
                    Gene Editor
                </a>
                <div class="dropdown-divider"></div>
                <a href="results.php">
                    <span class="menu-icon">📋</span>
                    Results
                </a>
            </div>
        </div>

        <a href="download.php" id="nav-download">Download</a>
        <a href="help.php" id="nav-help">Help</a>
        <a href="contact.php" id="nav-contact">Contact</a>
    </div>

    <div class="search-box">
        <input type="text" id="globalSearch" placeholder="Search genes, species...">
    </div>
</div>

<script>
// Highlight current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.php';
    const toolPages = ['RMdiff_v2.php', 'RMvar.php', 'RNAmodNet.php', 'blast.php', 'results.php', 'gene_editor.php'];

    // Remove all active states
    document.querySelectorAll('.nav-menu > a, .nav-menu > .dropdown').forEach(function(el) {
        el.classList.remove('active');
    });
    document.querySelectorAll('.dropdown-menu a').forEach(function(a) {
        a.classList.remove('active');
    });

    // Set active state based on current page
    if (currentPage === 'index.php' || currentPage === '') {
        document.getElementById('nav-home')?.classList.add('active');
    } else if (currentPage === 'try_browse.php') {
        document.getElementById('nav-browse')?.classList.add('active');
    } else if (currentPage === 'try_links.php') {
        document.getElementById('nav-links')?.classList.add('active');
    } else if (currentPage === 'jbrowse.php') {
        document.getElementById('nav-jbrowse')?.classList.add('active');
    } else if (currentPage === 'download.php') {
        document.getElementById('nav-download')?.classList.add('active');
    } else if (currentPage === 'help.php') {
        document.getElementById('nav-help')?.classList.add('active');
    } else if (currentPage === 'contact.php') {
        document.getElementById('nav-contact')?.classList.add('active');
    } else if (currentPage === 'search_result.php') {
        // Search results page - don't highlight any navigation
    } else if (toolPages.includes(currentPage)) {
        document.getElementById('nav-tools')?.classList.add('active');
        // Highlight current item in dropdown menu
        document.querySelectorAll('.dropdown-menu a').forEach(function(a) {
            if (a.getAttribute('href') === currentPage) {
                a.classList.add('active');
            }
        });
    }
});

// Global search
document.getElementById('globalSearch')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
            window.location.href = 'search_result.php?q=' + encodeURIComponent(query);
        }
    }
});
</script>
