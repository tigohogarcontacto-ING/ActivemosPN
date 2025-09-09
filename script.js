// Plantillas de mensajes
const templates = {
    'nip': `🌟 Hola, espero que estés bien.

Te saludo cordialmente. Mi nombre es [Nombre del asesor], asesor de Tigo 📱, y me comunico contigo para solicitar el Código NIP de portabilidad correspondiente a la línea 📞 [Número de teléfono], cuyo titular es [Nombre del cliente], identificado con C.C. [Número de cédula].

📩 Este código ha sido enviado por mensaje de texto al número mencionado y es necesario para completar el proceso de portabilidad hacia Tigo. Agradecemos tu colaboración enviándonos el código para continuar con el trámite.

Quedo atento a tu pronta respuesta. ¡Muchas gracias!`,

    'cambio-duo': `Hola [Nombre del cliente] 👋,

Desde Tigo Hogar queremos darte una excelente noticia. Tu servicio en la dirección [Dirección], identificado con cédula [Número de cédula], tendrá una reducción en el valor mensual.

A partir de tu próxima factura pagarás solo $[Valor X] ✅. Ten presente que tu plan y los servicios que disfrutas se mantienen exactamente igual, lo único que cambia es el precio, que ahora será más bajo.

👉 Para estar al día con tu servicio, realiza tu pago de forma rápida y segura desde la app Mi Tigo. Descárgala aquí:

📲 Google Play (Android) https://play.google.com/store/apps/details?id=com.juvomobileinc.tigoshop.co
📲 App Store (iPhone) https://apps.apple.com/co/app/mi-tigo/id1512395563

¡Gracias por seguir confiando en nosotros! 💙`,

    'cambio-trio': `Hola [Nombre del cliente] 👋,

Desde Tigo Hogar queremos darte una excelente noticia. Tu servicio en la dirección [Dirección], identificado con cédula [Número de cédula], tendrá una reducción en el valor mensual.

A partir de tu próxima factura pagarás solo $[Valor X] ✅. Ten presente que tu plan y los servicios que disfrutas se mantienen exactamente igual, lo único que cambia es el precio, que ahora será más bajo.

👉 Para estar al día con tu servicio, realiza tu pago de forma rápida y segura desde la app Mi Tigo. Descárgala aquí:

📲 Google Play (Android) https://play.google.com/store/apps/details?id=com.juvomobileinc.tigoshop.co
📲 App Store (iPhone) https://apps.apple.com/co/app/mi-tigo/id1512395563

¡Gracias por seguir confiando en nosotros! 💙`
};

// Variables globales
let currentMessage = '';

// Elementos del DOM
const form = document.getElementById('messageForm');
const templateSelect = document.getElementById('template');
const nombreInput = document.getElementById('nombre');
const cedulaInput = document.getElementById('cedula');
const direccionInput = document.getElementById('direccion');
const valorInput = document.getElementById('valor');
const telefonoInput = document.getElementById('telefono');
const nombreAsesorInput = document.getElementById('nombreAsesor');
const numeroTelefonoInput = document.getElementById('numeroTelefono');
const nipFields = document.getElementById('nipFields');
const fijoGroup = document.getElementById('fijoGroup');
const incluirFijoCheckbox = document.getElementById('incluirFijo');
const preview = document.getElementById('preview');
const messageContent = document.getElementById('messageContent');
const copyButton = document.getElementById('copyMessage');
const testButton = document.getElementById('testEmojis');

// Función para formatear número de teléfono
function formatPhoneNumber(phone) {
    // Remover todos los caracteres no numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Si empieza con 57 (Colombia), mantenerlo
    if (cleaned.startsWith('57')) {
        return cleaned;
    }
    
    // Si empieza con 3 (celular colombiano), agregar 57
    if (cleaned.startsWith('3')) {
        return '57' + cleaned;
    }
    
    // Si es un número local, agregar 573
    if (cleaned.length >= 10) {
        return '57' + cleaned;
    }
    
    return cleaned;
}

// Función para generar el mensaje con los datos del formulario
function generateMessage() {
    const template = templateSelect.value;
    const nombre = nombreInput.value.trim();
    const cedula = cedulaInput.value.trim();
    const direccion = direccionInput.value.trim();
    const valor = valorInput.value;
    const nombreAsesor = nombreAsesorInput.value.trim();
    const numeroTelefono = numeroTelefonoInput.value.trim();

    // Validaciones básicas
    if (!template || !nombre || !cedula) {
        return '';
    }

    // Validaciones específicas por plantilla
    if (template === 'nip') {
        if (!nombreAsesor || !numeroTelefono) {
            return '';
        }
    } else if (template === 'cambio-duo' || template === 'cambio-trio') {
        if (!direccion || !valor) {
            return '';
        }
    }

    // Verificar que la plantilla existe
    if (!templates[template]) {
        console.error('Plantilla no encontrada:', template);
        return '';
    }

    let message = templates[template];
    
    try {
        // Reemplazar placeholders comunes
        message = message.replace(/\[Nombre del cliente\]/g, nombre);
        message = message.replace(/\[Número de cédula\]/g, cedula);
        
        // Reemplazar placeholders específicos según la plantilla
        if (template === 'nip') {
            message = message.replace(/\[Nombre del asesor\]/g, nombreAsesor);
            message = message.replace(/\[Número de teléfono\]/g, numeroTelefono);
        } else {
            message = message.replace(/\[Dirección\]/g, direccion);
            message = message.replace(/\[Valor X\]/g, valor);
        }

        return message;
    } catch (error) {
        console.error('Error al generar mensaje:', error);
        return '';
    }
}

// Función para mostrar vista previa
function showPreview(message) {
    if (message) {
        // Usar textContent para evitar problemas de renderizado
        messageContent.textContent = message;
        preview.style.display = 'block';
        currentMessage = message;
        
        // Scroll suave hacia la vista previa
        preview.scrollIntoView({ behavior: 'smooth' });
        
        // Debug: mostrar en consola para verificar emojis
        console.log('Mensaje generado:', message);
        console.log('Emojis detectados:', message.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu));
        
        // Verificar si los emojis se muestran correctamente
        setTimeout(() => {
            const content = messageContent.textContent;
            if (content !== message) {
                console.warn('Los emojis no se están mostrando correctamente');
                // Intentar con innerHTML como fallback
                messageContent.innerHTML = message.replace(/\n/g, '<br>');
            }
        }, 100);
    } else {
        preview.style.display = 'none';
        currentMessage = '';
    }
}

// Función para copiar mensaje al portapapeles
function copyToClipboard() {
    if (currentMessage) {
        // Intentar usar la API moderna del portapapeles
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(currentMessage).then(() => {
                showCopySuccess();
            }).catch(err => {
                console.error('Error al copiar: ', err);
                fallbackCopyTextToClipboard(currentMessage);
            });
        } else {
            // Fallback para navegadores más antiguos o contextos no seguros
            fallbackCopyTextToClipboard(currentMessage);
        }
    }
}

// Función de respaldo para copiar texto
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    
    // Asegurar que el texto mantenga los emojis
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    
    // Evitar que se desplace hacia abajo
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    textArea.style.zIndex = "-1";
    
    document.body.appendChild(textArea);
    
    // Seleccionar el texto
    textArea.select();
    textArea.setSelectionRange(0, 99999); // Para dispositivos móviles
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        console.error('Error al copiar: ', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

// Función para mostrar éxito al copiar
function showCopySuccess() {
    const originalText = copyButton.innerHTML;
    copyButton.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
    copyButton.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
        copyButton.innerHTML = originalText;
        copyButton.style.backgroundColor = '#007bff';
    }, 2000);
}

// Función para mostrar error al copiar
function showCopyError() {
    const originalText = copyButton.innerHTML;
    copyButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
    copyButton.style.backgroundColor = '#dc3545';
    
    setTimeout(() => {
        copyButton.innerHTML = originalText;
        copyButton.style.backgroundColor = '#007bff';
    }, 2000);
    
    // También mostrar el mensaje en un alert para que el usuario pueda copiarlo manualmente
    alert('No se pudo copiar automáticamente. El mensaje es:\n\n' + currentMessage);
}

// Función para probar emojis
function testEmojis() {
    if (currentMessage) {
        // Verificar compatibilidad del navegador
        const emojiTest = '😀🎉✅📱💙';
        const canDisplayEmojis = emojiTest.length === 5; // Si se muestran correctamente
        
        // Crear un mensaje de prueba con emojis
        const testMessage = `🧪 PRUEBA DE EMOJIS 🧪

Mensaje original:
${currentMessage}

Emojis detectados:
${currentMessage.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || 'No se detectaron emojis'}

Compatibilidad del navegador:
- Emojis básicos: ${emojiTest}
- Soporte: ${canDisplayEmojis ? 'SÍ' : 'NO'}
- Navegador: ${navigator.userAgent}

Longitud del mensaje: ${currentMessage.length} caracteres
Codificación: ${encodeURIComponent(currentMessage).length} caracteres codificados`;

        // Mostrar en consola
        console.log('=== PRUEBA DE EMOJIS ===');
        console.log('Mensaje original:', currentMessage);
        console.log('Mensaje codificado:', encodeURIComponent(currentMessage));
        console.log('Emojis encontrados:', currentMessage.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu));
        console.log('Compatibilidad:', canDisplayEmojis);
        
        // Mostrar en alert
        alert(testMessage);
        
        // Abrir WhatsApp con mensaje de prueba
        const phone = telefonoInput.value.trim();
        if (phone) {
            const formattedPhone = formatPhoneNumber(phone);
            const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent('🧪 PRUEBA DE EMOJIS 🧪\n\n' + currentMessage)}`;
            window.open(whatsappUrl, '_blank');
        } else {
            alert('Ingresa un número de WhatsApp para probar el envío de emojis.');
        }
    } else {
        alert('No hay mensaje para probar. Completa el formulario primero.');
    }
}


// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mostrar indicador de carga
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abriendo WhatsApp...';
    submitButton.disabled = true;
    
    // Simular un pequeño delay para mostrar el indicador
    setTimeout(() => {
        const message = generateMessage();
        if (message) {
            // Solo abrir WhatsApp, no generar vista previa
            openWhatsAppWithMessage(message);
        } else {
            showValidationError();
        }
        
        // Restaurar el botón
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 300);
});

// Función para mostrar errores de validación
function showValidationError() {
    const template = templateSelect.value;
    
    if (!template) {
        alert('Por favor, selecciona una plantilla.');
        templateSelect.focus();
        return;
    }
    
    if (!nombreInput.value.trim()) {
        alert('Por favor, ingresa el nombre del cliente.');
        nombreInput.focus();
        return;
    }
    
    if (!cedulaInput.value.trim()) {
        alert('Por favor, ingresa el número de cédula.');
        cedulaInput.focus();
        return;
    }
    
    if (template === 'nip') {
        if (!nombreAsesorInput.value.trim()) {
            alert('Por favor, ingresa el nombre del asesor.');
            nombreAsesorInput.focus();
            return;
        }
        if (!numeroTelefonoInput.value.trim()) {
            alert('Por favor, ingresa el número de teléfono.');
            numeroTelefonoInput.focus();
            return;
        }
    } else {
        if (!direccionInput.value.trim()) {
            alert('Por favor, ingresa la dirección.');
            direccionInput.focus();
            return;
        }
        if (!valorInput.value) {
            alert('Por favor, verifica que el valor del servicio esté correcto.');
            valorInput.focus();
            return;
        }
    }
    
    alert('Por favor, completa todos los campos requeridos.');
}

// Función para abrir WhatsApp con el mensaje
function openWhatsAppWithMessage(message) {
    const phone = telefonoInput.value.trim();
    
    if (phone) {
        // Si hay número de teléfono, abrir chat directo
        const formattedPhone = formatPhoneNumber(phone);
        
        // Codificar el mensaje correctamente para preservar emojis
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
        
        // Abrir en nueva ventana
        const newWindow = window.open(whatsappUrl, '_blank');
        
        // Verificar si se abrió correctamente
        if (!newWindow) {
            alert('No se pudo abrir WhatsApp. Por favor, permite ventanas emergentes o copia el mensaje manualmente desde la vista previa.');
        }
    } else {
        // Si no hay número, abrir WhatsApp Web para copiar manualmente
        const whatsappWebUrl = `https://web.whatsapp.com/`;
        window.open(whatsappWebUrl, '_blank');
        
        // Mostrar instrucciones
        setTimeout(() => {
            alert('WhatsApp Web se ha abierto. El mensaje ya está en la vista previa para que lo copies y pegues en el chat correspondiente.');
        }, 1000);
    }
}

// Función para calcular el valor según la plantilla y el checkbox
function calculateValue() {
    const template = templateSelect.value;
    const incluirFijo = incluirFijoCheckbox.checked;
    
    if (template === 'cambio-duo') {
        return incluirFijo ? '119900' : '109900';
    } else if (template === 'cambio-trio') {
        return incluirFijo ? '144900' : '139900';
    }
    return '';
}

// Función para mostrar/ocultar campos según la plantilla
function toggleFieldsByTemplate() {
    const template = templateSelect.value;
    
    if (template === 'nip') {
        nipFields.style.display = 'grid';
        direccionInput.closest('.form-group').style.display = 'none';
        valorInput.closest('.form-group').style.display = 'none';
        fijoGroup.style.display = 'none';
    } else if (template === 'cambio-duo' || template === 'cambio-trio') {
        nipFields.style.display = 'none';
        direccionInput.closest('.form-group').style.display = 'block';
        valorInput.closest('.form-group').style.display = 'block';
        fijoGroup.style.display = 'block';
        valorInput.readOnly = true;
        incluirFijoCheckbox.checked = true; // Marcar el checkbox por defecto
        updateValue();
    } else {
        nipFields.style.display = 'none';
        direccionInput.closest('.form-group').style.display = 'block';
        valorInput.closest('.form-group').style.display = 'block';
        fijoGroup.style.display = 'none';
        valorInput.value = '';
        valorInput.readOnly = false;
    }
}

// Función para actualizar el valor
function updateValue() {
    const newValue = calculateValue();
    if (newValue) {
        valorInput.value = newValue;
    }
}

// Event listener para cambio de plantilla
templateSelect.addEventListener('change', function() {
    toggleFieldsByTemplate();
    // Actualizar vista previa cuando cambie la plantilla
    updatePreviewInRealTime();
});


// Actualizar vista previa en tiempo real cuando cambien los campos
[nombreInput, cedulaInput, direccionInput, valorInput, nombreAsesorInput, numeroTelefonoInput, templateSelect].forEach(input => {
    input.addEventListener('input', function() {
        updatePreviewInRealTime();
    });
});

// Event listener para el checkbox de fijo
incluirFijoCheckbox.addEventListener('change', function() {
    updateValue();
    updatePreviewInRealTime();
});

// Función para actualizar la vista previa en tiempo real
function updatePreviewInRealTime() {
    const message = generateMessage();
    if (message) {
        showPreview(message);
    } else {
        preview.style.display = 'none';
        currentMessage = '';
    }
}

copyButton.addEventListener('click', copyToClipboard);
testButton.addEventListener('click', testEmojis);

// Validación en tiempo real para el campo de valor
valorInput.addEventListener('input', function() {
    if (this.value < 0) {
        this.value = 0;
    }
});

// Formateo automático del número de teléfono
telefonoInput.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    
    // Si empieza con 57, mantenerlo
    if (value.startsWith('57')) {
        this.value = '+' + value;
    } else if (value.startsWith('3')) {
        this.value = '+57' + value;
    } else if (value.length > 0) {
        this.value = '+57' + value;
    }
});

// Función para limpiar formulario
function clearForm() {
    form.reset();
    preview.style.display = 'none';
    currentMessage = '';
    // Mostrar todos los campos por defecto
    nipFields.style.display = 'none';
    fijoGroup.style.display = 'none';
    direccionInput.closest('.form-group').style.display = 'block';
    valorInput.closest('.form-group').style.display = 'block';
    valorInput.readOnly = false;
    incluirFijoCheckbox.checked = false; // Desmarcar el checkbox
}

// Agregar botón de limpiar (opcional)
const clearButton = document.createElement('button');
clearButton.type = 'button';
clearButton.className = 'btn-clear';
clearButton.innerHTML = '<i class="fas fa-trash"></i> Limpiar Formulario';
clearButton.addEventListener('click', clearForm);

// Insertar botón de limpiar después del botón de enviar
form.appendChild(clearButton);

// Verificar compatibilidad de emojis al cargar la página
function checkEmojiSupport() {
    const emojiTest = '😀🎉✅📱💙';
    const testElement = document.createElement('div');
    testElement.textContent = emojiTest;
    document.body.appendChild(testElement);
    
    const canDisplayEmojis = testElement.textContent === emojiTest;
    document.body.removeChild(testElement);
    
    if (!canDisplayEmojis) {
        console.warn('⚠️ El navegador no soporta emojis correctamente');
        // Mostrar advertencia al usuario
        setTimeout(() => {
            alert('⚠️ ADVERTENCIA: Tu navegador no muestra emojis correctamente.\n\nLos emojis se enviarán correctamente por WhatsApp, pero no los verás en la vista previa.\n\nRecomendaciones:\n- Usa Chrome o Firefox actualizado\n- Actualiza tu sistema operativo\n- Los emojis funcionarán en WhatsApp');
        }, 2000);
    } else {
        console.log('✅ El navegador soporta emojis correctamente');
    }
    
    return canDisplayEmojis;
}

// Ejecutar verificación al cargar
document.addEventListener('DOMContentLoaded', function() {
    checkEmojiSupport();
    checkSession();
});

// Variables globales para el sistema de inactividad
let inactivityTimer;
let warningTimer;
const INACTIVITY_TIME = 15 * 60 * 1000; // 15 minutos en milisegundos
const WARNING_TIME = 2 * 60 * 1000; // 2 minutos de advertencia

// Función para verificar sesión
function checkSession() {
    const sessionData = localStorage.getItem('tigoSession');
    
    if (!sessionData) {
        // No hay sesión, redirigir al login
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const session = JSON.parse(sessionData);
        const loginTime = new Date(session.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        // Si la sesión es mayor a 8 horas, expirar
        if (hoursDiff >= 8) {
            localStorage.removeItem('tigoSession');
            alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            window.location.href = 'login.html';
            return;
        }
        
        // Mostrar nombre del usuario
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = session.userName;
        }
        
        // Configurar botón de logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                    clearSession();
                }
            });
        }
        
        // Iniciar sistema de inactividad
        startInactivityTimer();
        
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        localStorage.removeItem('tigoSession');
        window.location.href = 'login.html';
    }
}

// Función para limpiar sesión
function clearSession() {
    localStorage.removeItem('tigoSession');
    clearTimeout(inactivityTimer);
    clearTimeout(warningTimer);
    window.location.href = 'login.html';
}

// Función para iniciar el temporizador de inactividad
function startInactivityTimer() {
    // Limpiar timers existentes
    clearTimeout(inactivityTimer);
    clearTimeout(warningTimer);
    
    // Configurar timer de advertencia (2 minutos antes del cierre)
    warningTimer = setTimeout(() => {
        showInactivityWarning();
    }, INACTIVITY_TIME - WARNING_TIME);
    
    // Configurar timer de cierre de sesión
    inactivityTimer = setTimeout(() => {
        showSessionExpiredModal();
    }, INACTIVITY_TIME);
}

// Función para mostrar advertencia de inactividad
function showInactivityWarning() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'warningModal';
    
    const modal = document.createElement('div');
    modal.className = 'warning-modal';
    
    modal.innerHTML = `
        <div class="warning-header">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Advertencia de Inactividad</h3>
        </div>
        <p>Tu sesión se cerrará en <strong id="countdown">2:00</strong> minutos por inactividad.</p>
        <p>Haz clic en "Continuar" para mantener tu sesión activa.</p>
        <div class="warning-actions">
            <button class="btn-continue" id="continueSessionBtn">
                <i class="fas fa-check"></i> Continuar
            </button>
            <button class="btn-logout" id="logoutNowBtn">
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Contador regresivo
    let timeLeft = 120; // 2 minutos en segundos
    const countdownElement = document.getElementById('countdown');
    
    const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(countdown);
        }
    }, 1000);
    
    // Event listeners
    document.getElementById('continueSessionBtn').addEventListener('click', () => {
        clearInterval(countdown);
        overlay.remove();
        startInactivityTimer(); // Reiniciar timer
    });
    
    document.getElementById('logoutNowBtn').addEventListener('click', () => {
        clearInterval(countdown);
        clearSession();
    });
}

// Función para mostrar modal de sesión expirada
function showSessionExpiredModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'expiredModal';
    
    const modal = document.createElement('div');
    modal.className = 'expired-modal';
    
    modal.innerHTML = `
        <div class="expired-header">
            <i class="fas fa-clock"></i>
            <h3>Sesión Expirada</h3>
        </div>
        <p>Tu sesión ha expirado por inactividad.</p>
        <p>Serás redirigido al login en <strong id="redirectCountdown">5</strong> segundos.</p>
        <button class="btn-login" id="goToLoginBtn">
            <i class="fas fa-sign-in-alt"></i> Ir al Login
        </button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Contador de redirección
    let redirectTime = 5;
    const redirectElement = document.getElementById('redirectCountdown');
    
    const redirectCountdown = setInterval(() => {
        redirectElement.textContent = redirectTime;
        redirectTime--;
        
        if (redirectTime < 0) {
            clearInterval(redirectCountdown);
            clearSession();
        }
    }, 1000);
    
    // Event listener para ir al login inmediatamente
    document.getElementById('goToLoginBtn').addEventListener('click', () => {
        clearInterval(redirectCountdown);
        clearSession();
    });
}

// Función para detectar actividad del usuario
function resetInactivityTimer() {
    startInactivityTimer();
}

// Event listeners para detectar actividad
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);

// Detectar recarga de página
window.addEventListener('beforeunload', function() {
    // Limpiar sesión al recargar
    localStorage.removeItem('tigoSession');
});

// Exponer función globalmente
window.clearSession = clearSession;
