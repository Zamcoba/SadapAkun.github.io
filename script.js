// === KONFIGURASI ===
const CONFIG = {
    qrisFileName: 'qris.png',
    price: 80000,
    sessionId: 'SAT-' + Date.now().toString().slice(-6)
};

// === VARIABEL GLOBAL ===
let currentService = 'whatsapp';
let currentStep = 1;
let isProcessing = false;
let currentTarget = '';

// === INISIALISASI ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplikasi Security Toolkit dimuat');
    init();
});

function init() {
    console.log('Menginisialisasi aplikasi...');
    
    // Setup session ID
    document.getElementById('sessionId').textContent = CONFIG.sessionId;
    
    // Setup service cards
    setupServiceCards();
    
    // Setup semua tombol
    setupButtons();
    
    // Setup input events
    setupInputEvents();
    
    // Buat QRIS image
    createQRISImage();
    
    console.log('Aplikasi siap digunakan!');
    showStep(1);
}

// === SETUP SERVICE CARDS ===
function setupServiceCards() {
    console.log('Setup service cards...');
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            if (isProcessing) return;
            
            const targetService = this.getAttribute('data-target');
            console.log('Memilih layanan:', targetService);
            selectService(targetService);
        });
    });
}

// === SETUP SEMUA TOMBOL ===
function setupButtons() {
    console.log('Setup semua tombol...');
    
    // TOMBOL NAVIGASI UTAMA
    document.getElementById('nextBtn').addEventListener('click', function() {
        console.log('Tombol "Selanjutnya" diklik');
        goToStep(2);
    });
    
    document.getElementById('hackBtn').addEventListener('click', function() {
        console.log('Tombol "Mulai Proses Hack" diklik');
        
        if (!validateInput()) {
            console.log('Validasi input gagal');
            return;
        }
        
        console.log('Validasi berhasil, pindah ke proses hacking');
        goToStep(3);
    });
    
    document.getElementById('premiumBtn').addEventListener('click', function() {
        console.log('Tombol "Buka Akses Premium" diklik');
        goToStep(5);
    });
    
    document.getElementById('paymentBtn').addEventListener('click', function() {
        console.log('Tombol "Saya Sudah Bayar" diklik');
        verifyPayment();
    });
    
    // TOMBOL KEMBALI
    document.getElementById('back1Btn').addEventListener('click', function() {
        console.log('Tombol "Kembali" ke Step 1 diklik');
        goToStep(1);
    });
    
    document.getElementById('back2Btn').addEventListener('click', function() {
        console.log('Tombol "Kembali" ke Step 2 diklik');
        goToStep(2);
    });
    
    document.getElementById('back3Btn').addEventListener('click', function() {
        console.log('Tombol "Kembali" ke Step 3 diklik');
        if (isProcessing) {
            alert('Proses hacking sedang berjalan! Tunggu sampai selesai.');
            return;
        }
        goToStep(3);
    });
    
    document.getElementById('back4Btn').addEventListener('click', function() {
        console.log('Tombol "Kembali" ke Step 4 diklik');
        goToStep(4);
    });
}

// === SETUP INPUT EVENTS ===
function setupInputEvents() {
    console.log('Setup input events...');
    
    // Enter key untuk input fields
    document.querySelectorAll('.input-field').forEach(field => {
        field.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (currentStep === 2) {
                    document.getElementById('hackBtn').click();
                }
            }
        });
    });
}

// === PILIH SERVICE ===
function selectService(service) {
    currentService = service;
    
    // Update card aktif
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('active');
    });
    
    const selectedCard = document.querySelector(`.service-card[data-target="${service}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
    
    // Tampilkan input yang sesuai
    document.querySelectorAll('.input-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const inputSection = document.getElementById(`${service}-input`);
    if (inputSection) {
        inputSection.classList.add('active');
    }
    
    // Focus ke input field
    setTimeout(() => {
        const inputField = inputSection?.querySelector('.input-field');
        if (inputField) {
            inputField.focus();
        }
    }, 100);
}

// === NAVIGASI STEP ===
function goToStep(step) {
    console.log(`Mengubah step: ${currentStep} -> ${step}`);
    
    // Validasi sebelum pindah ke step 3
    if (step === 3 && currentStep === 2) {
        if (!validateInput()) {
            console.log('Validasi gagal, tidak bisa pindah ke step 3');
            return;
        }
    }
    
    currentStep = step;
    showStep(step);
}

function showStep(step) {
    console.log(`Menampilkan step: ${step}`);
    
    // Sembunyikan semua panel
    document.querySelectorAll('.step-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Tampilkan panel aktif
    const activePanel = document.getElementById(`step${step}`);
    if (activePanel) {
        activePanel.classList.add('active');
        
        // Jika pindah ke step 3, mulai proses hacking
        if (step === 3 && !isProcessing) {
            console.log('Step 3 aktif, memulai proses hacking...');
            setTimeout(() => {
                startHackingProcess();
            }, 500);
        }
        
        // Scroll ke atas
        window.scrollTo(0, 0);
    }
}

// === VALIDASI INPUT ===
function validateInput() {
    console.log('Memvalidasi input...');
    
    let inputValue = '';
    let errorMessage = '';
    
    switch (currentService) {
        case 'whatsapp':
            inputValue = document.getElementById('whatsappNumber').value.trim();
            if (!inputValue || inputValue === '+62') {
                errorMessage = 'Masukkan nomor telepon yang valid!';
            }
            break;
            
        case 'instagram':
            inputValue = document.getElementById('instagramUsername').value.trim();
            if (!inputValue) {
                errorMessage = 'Masukkan username Instagram yang valid!';
            }
            break;
            
        case 'facebook':
            inputValue = document.getElementById('facebookUsername').value.trim();
            if (!inputValue) {
                errorMessage = 'Masukkan username Facebook yang valid!';
            }
            break;
            
        case 'tiktok':
            inputValue = document.getElementById('tiktokUsername').value.trim();
            if (!inputValue) {
                errorMessage = 'Masukkan username TikTok yang valid!';
            }
            break;
    }
    
    if (errorMessage) {
        alert(errorMessage);
        return false;
    }
    
    currentTarget = inputValue;
    console.log(`Validasi berhasil. Target: ${currentTarget}`);
    return true;
}

// === PROSES HACKING ===
function startHackingProcess() {
    console.log('Memulai proses hacking...');
    
    if (isProcessing) {
        console.log('Proses hacking sudah berjalan');
        return;
    }
    
    isProcessing = true;
    
    // Reset progress
    updateProgress(0);
    
    // Reset terminal
    resetTerminal();
    
    // Buat chat preview
    createChatPreview();
    
    // Tampilkan header di terminal
    addTerminalLine('=== SECURITY ACCESS TOOLKIT v3.1 ===', 'header');
    addTerminalLine(`Target: ${currentTarget}`, 'info');
    addTerminalLine(`Layanan: ${currentService.toUpperCase()}`, 'info');
    addTerminalLine('Memulai proses hacking...', 'system');
    
    // Dapatkan langkah-langkah hacking
    const hackingSteps = getHackingSteps();
    
    // Jalankan proses hacking
    executeHackingSteps(hackingSteps);
}

// === LANGKAH-LANGKAH HACKING ===
function getHackingSteps() {
    console.log(`Membuat langkah hacking untuk ${currentService}`);
    
    const steps = [
        { type: 'command', text: `init_hack --target "${currentTarget}"`, delay: 1200, progress: 10 },
        { type: 'output', text: 'Membangun koneksi aman...', delay: 800, progress: 15 },
        { type: 'output', text: 'Melewati firewall...', delay: 2000, progress: 20 }
    ];
    
    if (currentService === 'whatsapp') {
        steps.push(
            { type: 'command', text: `whatsapp_exploit --phone ${currentTarget}`, delay: 1500, progress: 25 },
            { type: 'output', text: 'Mendekripsi enkripsi WhatsApp...', delay: 1200, progress: 30 },
            { type: 'output', text: '✓ Enkripsi berhasil dilewati', delay: 800, progress: 35, style: 'success' },
            { type: 'command', text: 'extract_messages --all', delay: 2800, progress: 45 },
            { type: 'output', text: 'Mengekstrak pesan... [██████░░░░] 60%', delay: 1600, progress: 55 },
            { type: 'output', text: '✓ Terekstrak: Semua pesan', delay: 2000, progress: 60, style: 'success' }
        );
    } else if (currentService === 'instagram') {
        steps.push(
            { type: 'command', text: `instagram_crawl --user ${currentTarget}`, delay: 1500, progress: 25 },
            { type: 'output', text: 'Mengakses API Instagram...', delay: 1200, progress: 30 },
            { type: 'output', text: '✓ API berhasil diakses', delay: 800, progress: 35, style: 'success' },
            { type: 'command', text: 'download_dm --stories', delay: 2800, progress: 45 },
            { type: 'output', text: 'Mengunduh DM dan story... [█████░░░░░] 50%', delay: 1600, progress: 55 },
            { type: 'output', text: '✓ Terunduh: file percakapan', delay: 2000, progress: 60, style: 'success' }
        );
    }
    
    // Langkah akhir
    steps.push(
        { type: 'command', text: 'encrypt_data --algo aes256', delay: 1500, progress: 70 },
        { type: 'output', text: 'Mengenkripsi data... [██████████] 100%', delay: 1200, progress: 85 },
        { type: 'output', text: '✓ Data berhasil dienkripsi', delay: 800, progress: 92, style: 'success' },
        { type: 'system', text: '=== HACKING SELESAI ===', delay: 1000, progress: 95, style: 'header' },
        { type: 'output', text: 'Semua data telah diekstrak.', delay: 800, progress: 98, style: 'info' },
        { type: 'output', text: 'Siap untuk dekripsi.', delay: 2000, progress: 100, style: 'info' }
    );
    
    return steps;
}

// === EKSEKUSI LANGKAH HACKING ===
function executeHackingSteps(steps) {
    console.log(`Menjalankan ${steps.length} langkah hacking`);
    
    let totalDelay = 0;
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            // Update progress
            updateProgress(step.progress);
            
            // Update blur chat
            updateChatBlur(step.progress);
            
            // Tampilkan di terminal
            if (step.type === 'command') {
                addTerminalLine(step.text, 'command');
            } else {
                addTerminalLine(step.text, step.style || 'output');
            }
            
            // Jika ini langkah terakhir
            if (index === steps.length - 1) {
                setTimeout(() => {
                    console.log('Proses hacking selesai!');
                    isProcessing = false;
                    
                    // Pindah ke step 4
                    setTimeout(() => {
                        goToStep(4);
                    }, 1000);
                }, 1500);
            }
        }, totalDelay);
        
        totalDelay += step.delay;
    });
}

// === VERIFIKASI PEMBAYARAN ===
function verifyPayment() {
    console.log('Memulai verifikasi pembayaran...');
    
    const btn = document.getElementById('paymentBtn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memverifikasi...';
    btn.disabled = true;
    
    // Reset terminal
    resetTerminal();
    
    addTerminalLine('=== VERIFIKASI PEMBAYARAN ===', 'header');
    addTerminalLine('Menghubungkan ke payment gateway...', 'system');
    
    // Simulasi proses verifikasi
    setTimeout(() => {
        addTerminalLine('check_payment --qris qris.png', 'command');
        
        setTimeout(() => {
            addTerminalLine('Memindai transaksi...', 'output');
            
            setTimeout(() => {
                addTerminalLine('Memeriksa bank...', 'output');
                
                setTimeout(() => {
                    // 80% sukses, 20% gagal
                    if (Math.random() > 0.2) {
                        addTerminalLine('✓ Pembayaran berhasil!', 'success');
                        addTerminalLine('Mendekripsi data...', 'system');
                        
                        setTimeout(() => {
                            addTerminalLine('✓ Data siap diakses!', 'success');
                            
                            btn.innerHTML = '<i class="fas fa-check"></i> Berhasil';
                            btn.style.background = 'linear-gradient(to right, #10b981, #22c55e)';
                            btn.disabled = true;
                            
                            alert('✅ Pembayaran berhasil! Data telah didekripsi.');
                        }, 1500);
                    } else {
                        addTerminalLine('✗ Pembayaran gagal!', 'error');
                        addTerminalLine('Transaksi tidak ditemukan.', 'output');
                        
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        
                        alert('❌ Verifikasi gagal! Pastikan pembayaran sudah berhasil.');
                    }
                }, 1500);
            }, 1000);
        }, 800);
    }, 500);
}

// === FUNGSI BANTUAN TERMINAL ===
function resetTerminal() {
    const terminal = document.getElementById('terminalContent');
    if (terminal) {
        terminal.innerHTML = '<div class="terminal-line"><span class="prompt">$</span><span class="text">Siap menerima perintah...</span></div>';
    }
}

function addTerminalLine(text, type = 'output') {
    const terminal = document.getElementById('terminalContent');
    if (!terminal) return;
    
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    let content = '';
    switch (type) {
        case 'command':
            content = `<span class="prompt">$</span> <span class="text command">${text}</span>`;
            break;
        case 'success':
            content = `<span class="text success">${text}</span>`;
            break;
        case 'error':
            content = `<span class="text error">${text}</span>`;
            break;
        case 'system':
            content = `<span class="text system">[SYSTEM] ${text}</span>`;
            break;
        case 'header':
            content = `<span class="text header">${text}</span>`;
            break;
        case 'info':
            content = `<span class="text info">[INFO] ${text}</span>`;
            break;
        default:
            content = `<span class="text output">${text}</span>`;
    }
    
    line.innerHTML = content;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

// === UPDATE PROGRESS ===
function updateProgress(percent) {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (progressFill) progressFill.style.width = percent + '%';
    if (progressPercentage) progressPercentage.textContent = percent + '%';
}

// === BUAT CHAT PREVIEW ===
function createChatPreview() {
    const preview = document.getElementById('previewContent');
    if (!preview) return;
    
    const avatarText = currentTarget.substring(0, 2).toUpperCase();
    const serviceName = currentService.charAt(0).toUpperCase() + currentService.slice(1);
    
    const chatHTML = `
        <div class="chat-container">
            <div class="chat-header">
                <div class="chat-avatar">${avatarText}</div>
                <div class="chat-info">
                    <h4>${currentTarget}</h4>
                    <p>Online • ${serviceName}</p>
                </div>
            </div>
            <div class="chat-messages">
                <div class="message incoming">
                    *******************
                    <div class="message-time"></div>
                </div>
                <div class="message outgoing">
                    ********************
                    <div class="message-time"></div>
                </div>
            </div>
        </div>
    `;
    
    preview.innerHTML = chatHTML;
    
    // Set blur awal
    document.querySelectorAll('.message').forEach(msg => {
        msg.style.filter = 'blur(5px)';
        msg.style.opacity = '0.7';
    });
}

// === UPDATE BLUR CHAT ===
function updateChatBlur(progress) {
    const messages = document.querySelectorAll('.message');
    const blurAmount = 5 - (progress / 100) * 5;
    const opacityAmount = 0.7 + (progress / 100) * 0.3;
    
    messages.forEach((msg, index) => {
        setTimeout(() => {
            msg.style.filter = `blur(${Math.max(0, blurAmount)}px)`;
            msg.style.opacity = opacityAmount;
        }, index * 50);
    });
}

// === BUAT QRIS IMAGE ===
function createQRISImage() {
    const qrisImage = document.getElementById('qrisImage');
    if (!qrisImage) return;
    
    qrisImage.innerHTML = '';
    const img = document.createElement('img');
    img.src = CONFIG.qrisFileName;
    img.alt = 'QRIS Payment';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '8px';
    
    // Fallback jika gambar tidak ada
    img.onerror = function() {
        this.onerror = null;
        this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><rect width="240" height="240" fill="%23f0f0f0"/><text x="120" y="120" font-family="Arial" font-size="14" text-anchor="middle" fill="%23666">QRIS.PNG</text></svg>';
    };
    
    qrisImage.appendChild(img);
                      }
