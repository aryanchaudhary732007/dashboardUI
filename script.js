document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE ROUTING CONTROLLER (MAIN LOGIC)
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const pages = document.querySelectorAll('.dashboard-page');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // साइडबार से पुरानी एक्टिव क्लास हटाएं और नई जोड़ें
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // कौन सा पेज खोलना है, पता लगाएं
            const targetPageId = 'page-' + this.getAttribute('data-target');

            // सभी पेजेस को छुपाएं और सिर्फ टारगेटेड पेज को दिखाएं
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPageId) {
                    page.classList.add('active');
                }
            });

            // मोबाइल व्यू में मेनू आइटम पर क्लिक करते ही साइडबार बंद हो जाए
            const sidebar = document.getElementById('sidebar');
            if(sidebar) sidebar.classList.remove('active');
        });
    });

    // 2. MOBILE SIDEBAR TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            sidebar.classList.toggle('active');
            e.stopPropagation();
        });

        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    // 3. LIVE SIMULATED DATA MACHINE (Optional Setting Connected)
    let feedActive = true;
    const feedToggle = document.getElementById('feedToggle');
    if(feedToggle) {
        feedToggle.addEventListener('change', (e) => { feedActive = e.target.checked; });
    }

    setInterval(() => {
        if(!feedActive) return;

        const revEl = document.getElementById('revenue-val');
        if (revEl) {
            let currentRev = parseInt(revEl.innerText.replace(/[^0-9]/g, ''));
            currentRev += Math.floor(Math.random() * 30) - 10;
            revEl.innerText = '$' + currentRev.toLocaleString();
        }

        const usersEl = document.getElementById('users-val');
        if (usersEl) {
            let currentUsers = parseInt(usersEl.innerText.replace(/[^0-9]/g, ''));
            currentUsers += Math.floor(Math.random() * 3) - 1;
            usersEl.innerText = currentUsers.toLocaleString();
        }
    }, 2500);

    // 4. CHART 1: DASHBOARD LINE CHART
    const chartCanvas = document.getElementById('performanceChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        const accentGradient = ctx.createLinearGradient(0, 0, 0, 250);
        accentGradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
        accentGradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue Flow',
                    data: [31000, 42000, 38000, 56000, 51000, 62000],
                    borderColor: '#6366f1',
                    borderWidth: 3,
                    backgroundColor: accentGradient,
                    fill: true,
                    tension: 0.38
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }

    // 5. CHART 2: ANALYTICS PAGE BAR CHART
    const barCanvas = document.getElementById('analyticsBarChart');
    if(barCanvas) {
        const ctxBar = barCanvas.getContext('2d');
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Q1 Regional', 'Q2 Global', 'Q3 Direct', 'Q4 Online'],
                datasets: [{
                    label: 'Conversion Milestones',
                    data: [45, 75, 62, 91],
                    backgroundColor: '#10b981',
                    borderRadius: 6
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
});