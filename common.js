/**
 * English IDE Game - Common JavaScript Functions
 * Funciones compartidas entre todas las páginas HTML del juego
 */

// Variables globales del juego
let gameState = {
    selectedOption: -1,
    currentPage: 'unknown',
    shortcuts: true,
    animations: true
};

// === FUNCIONES DE INICIALIZACIÓN ===

/**
 * Inicializa el modo IDE para index.html
 */
function initializeIDEMode() {
    gameState.currentPage = 'ide';
    console.log('🎮 English Game IDERRORS initiated');
    console.log('⌨️ Shortcuts: 1-4 to select, Enter to compile, R to restart, Ctrl+Enter to compile');
    
    // Configurar interactions del sidebar
    setupSidebarInteractions();
    
    // Configurar file tree
    setupFileTreeInteractions();
    
    // Configurar tooltips de errores
    setupErrorTooltips();
    
    // Mensaje de bienvenida
    showWelcomeMessage();
}

/**
 * Inicializa el modo de validación para validate.html
 */
function initializeValidationMode() {
    gameState.currentPage = 'validation';
    console.log('⚡ Validation mode initiated');
    
    // Configurar animaciones de resultado
    setupResultAnimations();
    
    // Configurar efectos de console output
    setupConsoleAnimations();
}

/**
 * Inicializa el modo de resultados para result.html
 */
function initializeResultsMode() {
    gameState.currentPage = 'results';
    console.log('🏆 Results page loaded');
    
    // Configurar animaciones de progreso
    setupProgressAnimations();
    
    // Configurar efectos de celebración
    setupCelebrationEffects();
    
    // Configurar funciones de compartir
    setupShareFunctions();
    
    // Efectos de entrada escalonados
    staggerElementAnimations();
}

/**
 * Inicializa el modo welcome para welcome.html
 */
function initializeWelcomeMode() {
    gameState.currentPage = 'welcome';
    console.log('🎮 Welcome page loaded');
    
    // Configurar animaciones específicas de welcome
    setupWelcomeAnimations();
}

// === FUNCIONES DE INTERACCIÓN ===

/**
 * Configurar interacciones del sidebar
 */
function setupSidebarInteractions() {
    // Tab switching
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.sidebar-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Configurar interacciones del file tree
 */
function setupFileTreeInteractions() {
    document.querySelectorAll('.tree-node').forEach(node => {
        node.addEventListener('click', function() {
            document.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

/**
 * Configurar tooltips para errores de código
 */
function setupErrorTooltips() {
    document.querySelectorAll('.error').forEach(error => {
        error.addEventListener('mouseenter', function() {
            this.title = 'Complete this line with the correct phrasal verb to fix the compilation error';
        });
    });
}

/**
 * Seleccionar una opción de respuesta
 */
function selectOption(optionIndex) {
    gameState.selectedOption = optionIndex;
    
    // Remover selección previa
    document.querySelectorAll('.option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Marcar opción seleccionada
    const selectedItem = document.querySelectorAll('.option-item')[optionIndex];
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    // Habilitar botón de compilar
    const compileBtn = document.getElementById('compileBtn');
    if (compileBtn) {
        compileBtn.disabled = false;
        compileBtn.style.background = '#0e639c';
    }
    
    // Actualizar campo hidden
    const hiddenField = document.getElementById('selectedAnswer');
    if (hiddenField) {
        hiddenField.value = optionIndex;
    }
    
    // Actualizar status bar
    updateStatusBar('Selected option - Ready to compile');
}

/**
 * Enviar respuesta del usuario
 */
function submitAnswer() {
    if (gameState.selectedOption === -1) {
        showNotification('Please select an option before compiling.', 'warning');
        return;
    }
    
    // Animación de compilación
    const compileBtn = document.getElementById('compileBtn');
    if (compileBtn) {
        compileBtn.innerHTML = '⏳ Compiling...';
        compileBtn.disabled = true;
        compileBtn.style.background = '#666';
    }
    
    updateStatusBar('Compiling code...');
    
    setTimeout(() => {
        // En lugar de form.submit(), usar la función específica de cada página
        if (window.submitAnswer) {
            window.submitAnswer(); // Función definida en index.html
        }
    }, 1000);
}

// === FUNCIONES DE ANIMACIÓN ===

/**
 * Configurar animaciones de welcome
 */
function setupWelcomeAnimations() {
    // Animación de typing para el terminal
    setTimeout(() => {
        const command = document.querySelector('.command');
        if (command) {
            const text = command.textContent;
            command.textContent = '';
            command.style.borderRight = '2px solid #4fc1ff';
            command.style.animation = 'blink 1s infinite';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                command.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    command.style.borderRight = 'none';
                    command.style.animation = 'none';
                }
            }, 100);
        }
    }, 1000);
    
    // Animación de partículas
    animateParticles();
}

/**
 * Animar partículas de fondo
 */
function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = (index * 0.5) + 's';
        
        const size = Math.random() * 4 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
    });
}

/**
 * Configurar animaciones de progreso
 */
function setupProgressAnimations() {
    setTimeout(() => {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            const targetWidth = progressFill.getAttribute('data-width') || progressFill.style.width;
            progressFill.style.width = targetWidth;
        }
    }, 500);
}

/**
 * Configurar animaciones de resultados
 */
function setupResultAnimations() {
    const resultHeader = document.querySelector('.result-header');
    const executionHeader = document.querySelector('.execution-header');
    
    if (resultHeader && resultHeader.dataset.result === 'success') {
        setTimeout(() => {
            resultHeader.style.animation = 'pulse 1s ease-in-out';
        }, 1000);
    } else if (resultHeader && resultHeader.dataset.result === 'error') {
        setTimeout(() => {
            resultHeader.style.animation = 'shake 0.5s ease-in-out';
        }, 500);
    }
    
    if (executionHeader && executionHeader.dataset.result === 'success') {
        setTimeout(() => {
            executionHeader.style.animation = 'pulse 1s ease-in-out';
        }, 1000);
    } else if (executionHeader && executionHeader.dataset.result === 'error') {
        setTimeout(() => {
            executionHeader.style.animation = 'shake 0.5s ease-in-out';
        }, 500);
    }
}

/**
 * Configurar animaciones del console output
 */
function setupConsoleAnimations() {
    const consoleLines = document.querySelectorAll('.console-line');
    consoleLines.forEach((line, index) => {
        line.style.animationDelay = `${(index + 1) * 0.5}s`;
    });
}

/**
 * Efectos de entrada escalonados para elementos
 */
function staggerElementAnimations() {
    const elements = document.querySelectorAll('.stats-panel, .phrasal-verbs-panel');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
    });
}

/**
 * Configurar efectos de celebración para puntuaciones altas
 */
function setupCelebrationEffects() {
    const accuracyElement = document.querySelector('[data-accuracy]');
    if (accuracyElement) {
        const accuracy = parseFloat(accuracyElement.dataset.accuracy);
        if (accuracy >= 80) {
            setTimeout(createConfettiEffect, 1000);
        }
    }
}

/**
 * Crear efecto de confetti
 */
function createConfettiEffect() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = ['#4fc1ff', '#dcdcaa', '#ce9178'][Math.floor(Math.random()*3)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 100);
    }
    
    // Agregar keyframes para la animación de caída
    if (!document.getElementById('confetti-style')) {
        const confettiStyle = document.createElement('style');
        confettiStyle.id = 'confetti-style';
        confettiStyle.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);
    }
}

// === FUNCIONES DE KEYBOARD SHORTCUTS ===

/**
 * Configurar atajos de teclado
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (!gameState.shortcuts) return;
        
        // Atajos para páginas IDE
        if (gameState.currentPage === 'ide') {
            if (e.key >= '1' && e.key <= '4') {
                e.preventDefault();
                const optionIndex = parseInt(e.key) - 1;
                const maxOptions = document.querySelectorAll('.option-item').length;
                if (optionIndex < maxOptions) {
                    selectOption(optionIndex);
                }
            } else if (e.key === 'Enter' && gameState.selectedOption !== -1) {
                e.preventDefault();
                submitAnswer();
            } else if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                if (confirm('¿Restart the game?')) {
                    restartGame();
                }
            } else if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                if (gameState.selectedOption !== -1) {
                    submitAnswer();
                }
            }
        }
        
        // Atajos para páginas de validación
        else if (gameState.currentPage === 'validation') {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextBtn = document.getElementById('nextButton');
                const resultsBtn = document.getElementById('resultsButton');
                if (nextBtn && nextBtn.style.display !== 'none') {
                    nextBtn.click();
                } else if (resultsBtn && resultsBtn.style.display !== 'none') {
                    resultsBtn.click();
                }
            }
        }
        
        // Atajos para páginas de resultados
        else if (gameState.currentPage === 'results') {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                restartGame();
            } else if (e.key === 'p' || e.key === 'P') {
                e.preventDefault();
                window.print();
            }
        }
        
        // Atajos para página de bienvenida
        else if (gameState.currentPage === 'welcome') {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (window.startGame) {
                    window.startGame();
                }
            }
        }
        
        // Atajos globales
        if (e.key === 'Escape') {
            e.preventDefault();
            if (confirm('¿Exit the game?')) {
                restartGame();
            }
        } else if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            showHelpDialog();
        }
    });
}

// === FUNCIONES DE JUEGO ===

/**
 * Reiniciar el juego (reemplaza resetSession.jsp)
 */
function restartGame() {
    const newGameState = {
        score: 0,
        answered: 0,
        learned: [],
        currentExercise: 0
    };
    localStorage.setItem('englishIDEGame', JSON.stringify(newGameState));
    window.location.href = 'index.html';
}

// === FUNCIONES DEL MENU BAR ===

function showFileMenu() {
    showNotification('File: New, Save, Exit available', 'info');
}

function showEditMenu() {
    showNotification('Editing: Copy, Paste, Undo available', 'info');
}

function showSourceMenu() {
    showNotification('Source code: Format, Available imports', 'info');
}

function showRefactorMenu() {
    showNotification('Refactoring: Rename, Extract Method available', 'info');
}

function showNavigateMenu() {
    showNotification('Navigation: Go to class, Search for available classes', 'info');
}

function showSearchMenu() {
    showNotification('Search: Find, Replace available', 'info');
}

function showProjectMenu() {
    showNotification('Project: Build, Clean, Properties available', 'info');
}

function showRunMenu() {
    showNotification('Execute: Run, Debug, Test available', 'info');
}

function showWindowMenu() {
    showNotification('Window: Show View, Change Available Layouts', 'info');
}

function showHelpMenu() {
    showHelpDialog();
}

// === FUNCIONES DE TOOLBAR ===

function newFile() {
    showNotification('New file created in the project', 'success');
}

function saveFile() {
    showNotification('File saved successfully', 'success');
}

function copyText() {
    showNotification('Code copied to clipboard', 'success');
}

function pasteText() {
    showNotification('Code pasted from the clipboard', 'success');
}

function compileAndRun() {
    if (gameState.selectedOption !== -1) {
        submitAnswer();
    } else {
        showNotification('Select an option before compiling', 'warning');
    }
}

function debugCode() {
    showNotification('Debugger started - Breakpoints active', 'info');
}

function buildProject() {
    showNotification('Building project... Build successful', 'success');
}

// === FUNCIONES DE UTILIDAD ===

/**
 * Mostrar notificación temporal
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#f48771' : type === 'success' ? '#4fc1ff' : '#dcdcaa'};
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Actualizar la barra de estado
 */
function updateStatusBar(message) {
    const statusBar = document.querySelector('.status-bar div:first-child, .status-bar span:first-child');
    if (statusBar) {
        statusBar.textContent = message;
    }
}

/**
 * Mostrar mensaje de bienvenida
 */
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('¡Welcome to the English IDE Game! Use keys 1-4 to select options.', 'success');
    }, 1000);
}

/**
 * Mostrar diálogo de ayuda
 */
function showHelpDialog() {
    const helpContent = `🎮  ENGLISH IDE GAME - HELP

⌨️ KEYBOARD SHORTCUTS:
• 1-4: Select answer option
• Enter: Compile and execute code
• Ctrl+Enter: Quick compile
• R: Restart game
• Esc: Exit game
• Ctrl+H: Show this help

🎯 OBJECTIVE:
Complete programming exercises using the correct phrasal verbs.
Learn technical English in the context of software development.

📚 TIPS:
• Read the programming context carefully
• Think about the meaning of the phrasal verb
• Notice how it relates to the programming concept

Good luck learning!`;
    
    alert(helpContent);
}

/**
 * Configurar funciones de compartir para páginas de resultados
 */
function setupShareFunctions() {
    window.shareResults = function() {
        const scoreElement = document.querySelector('[data-score]');
        const answeredElement = document.querySelector('[data-answered]');
        const accuracyElement = document.querySelector('[data-accuracy]');
        const learnedElement = document.querySelector('[data-learned]');
        
        const score = scoreElement ? scoreElement.dataset.score : '0';
        const answered = answeredElement ? answeredElement.dataset.answered : '0';
        const accuracy = accuracyElement ? accuracyElement.dataset.accuracy : '0';
        const learned = learnedElement ? learnedElement.dataset.learned : '0';
        
        const text = `¡I just completed the English Game IDERRORS! 🎮\n` +
                    `Score: ${score}/${answered} (${accuracy}%)\n` +
                    `Phrasal Verbs learned: ${learned}\n` +
                    `#EnglishProgramming #PhrasalVerbs #CodingChallenge`;
                    
        if (navigator.share) {
            navigator.share({
                title: 'Results English Game IDERRORS',
                text: text
            });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('¡Results copied to clipboard!', 'success');
            }).catch(() => {
                // Fallback si clipboard no funciona
                console.log(text);
                showNotification('Check console for results text', 'info');
            });
        }
    };
}

// === INICIALIZACIÓN AUTOMÁTICA ===

document.addEventListener('DOMContentLoaded', function() {
    // Detectar tipo de página automáticamente
    if (document.querySelector('.welcome-page-container') || document.querySelector('.welcome-container')) {
        initializeWelcomeMode();
    } else if (document.querySelector('.challenge-panel')) {
        initializeIDEMode();
    } else if (document.querySelector('.execution-panel') || document.querySelector('.result-container')) {
        initializeValidationMode();
    } else if (document.querySelector('.results-container')) {
        initializeResultsMode();
    }
    
    // Configurar atajos de teclado siempre
    setupKeyboardShortcuts();
    
    // Agregar estilos para notificaciones si no existen
    if (!document.getElementById('notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes blink {
                0%, 50% { border-right-color: #4fc1ff; }
                51%, 100% { border-right-color: transparent; }
            }
        `;
        document.head.appendChild(notificationStyles);
    }

});
