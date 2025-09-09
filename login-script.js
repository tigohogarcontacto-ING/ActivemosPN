// Las credenciales ahora están en credentials.js para mayor seguridad

// Elementos del DOM
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const loginButton = document.querySelector('.btn-login');

// Función para mostrar error
function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
    
    // Ocultar error después de 5 segundos
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Función para ocultar error
function hideError() {
    errorMessage.style.display = 'none';
}

// Función para validar credenciales usando el sistema encriptado
function validateCredentials(username, password) {
    // Usar la función de validación del archivo credentials.js
    return validateUserCredentials(username, password);
}

// Función para guardar sesión
function saveSession(user) {
    const sessionData = {
        userId: user.id,
        userName: user.name,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('tigoSession', JSON.stringify(sessionData));
}

// Función para verificar sesión existente
function checkExistingSession() {
    const sessionData = localStorage.getItem('tigoSession');
    
    if (sessionData) {
        try {
            const session = JSON.parse(sessionData);
            const loginTime = new Date(session.loginTime);
            const now = new Date();
            const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
            
            // Si la sesión es menor a 8 horas, redirigir automáticamente
            if (hoursDiff < 8) {
                window.location.href = 'index.html';
                return;
            } else {
                // Sesión expirada, limpiar
                localStorage.removeItem('tigoSession');
            }
        } catch (error) {
            console.error('Error al verificar sesión:', error);
            localStorage.removeItem('tigoSession');
        }
    }
}

// Función para toggle de contraseña
function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = togglePasswordBtn.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

// Función para formatear cédula
function formatCedula(value) {
    // Remover caracteres no numéricos
    const cleaned = value.replace(/\D/g, '');
    
    // Limitar a 10 dígitos
    return cleaned.substring(0, 10);
}

// Función para simular carga
function showLoading() {
    const originalText = loginButton.innerHTML;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
    loginButton.disabled = true;
    
    return originalText;
}

// Función para restaurar botón
function restoreButton(originalText) {
    loginButton.innerHTML = originalText;
    loginButton.disabled = false;
}

// Event listeners
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    // Validaciones básicas
    if (!username) {
        showError('Por favor, ingresa tu cédula');
        usernameInput.focus();
        return;
    }
    
    if (!password) {
        showError('Por favor, ingresa tu contraseña');
        passwordInput.focus();
        return;
    }
    
    // Mostrar loading
    const originalText = showLoading();
    
    // Simular delay de verificación
    setTimeout(() => {
        const validation = validateCredentials(username, password);
        
        if (validation.valid) {
            // Guardar sesión
            saveSession(validation.user);
            
            // Mostrar modal bonito de bienvenida
            showWelcomeModal(validation.user.name);
            
            // Mostrar estado en el botón
            loginButton.innerHTML = '<i class="fas fa-check"></i> ¡Acceso concedido!';
            loginButton.style.background = '#28a745';
        } else {
            // Mostrar error
            showError(validation.message);
            restoreButton(originalText);
            
            // Limpiar campos
            passwordInput.value = '';
            passwordInput.focus();
        }
    }, 1500);
});

// Toggle de contraseña
togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

// Formatear cédula mientras se escribe
usernameInput.addEventListener('input', function() {
    this.value = formatCedula(this.value);
    hideError();
});

// Limpiar error al escribir en contraseña
passwordInput.addEventListener('input', function() {
    hideError();
});

// Prevenir envío con Enter en campos individuales
usernameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        passwordInput.focus();
    }
});

// Verificar sesión existente al cargar
document.addEventListener('DOMContentLoaded', function() {
    checkExistingSession();
    
    // Focus en el primer campo
    usernameInput.focus();
    
    // Agregar animación de entrada
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Función para limpiar sesión (útil para logout)
function clearSession() {
    localStorage.removeItem('tigoSession');
    window.location.href = 'login.html';
}

// Exponer función globalmente para uso en otras páginas
window.clearSession = clearSession;

// ---------- UI: Modal de bienvenida ----------
function showWelcomeModal(userName) {
    // Crear contenedor de overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Crear tarjeta/modal
    const modal = document.createElement('div');
    modal.className = 'welcome-modal';
    
    modal.innerHTML = `
        <div class="welcome-header">
            <span class="badge">✨ Bienvenido</span>
        </div>
        <h2>Hola Lindo ${userName}</h2>
        <p>Recuerda que este sistema es <strong>la bestia</strong> pero se llama <strong>concierto para delinquir</strong>, te amo 💙</p>
        <button class="btn-continue" id="continueBtn"><i class="fas fa-arrow-right"></i> Continuar</button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Cerrar y redirigir
    const go = () => {
        overlay.classList.add('closing');
        setTimeout(() => {
            overlay.remove();
            window.location.href = 'index.html';
        }, 250);
    };
    
    document.getElementById('continueBtn').addEventListener('click', go);
    // Ya no se cierra automáticamente - solo al hacer clic en "Continuar"
}
