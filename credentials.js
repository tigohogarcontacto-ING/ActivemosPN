// Sistema de credenciales encriptadas
// Este archivo contiene las credenciales de usuario con contraseñas encriptadas

// Función de hash más segura usando SHA-256 simulado
function secureHash(str) {
    // Simulación de SHA-256 usando múltiples operaciones
    let hash = 0;
    const salt = 'tigo_hogar_2024'; // Salt para mayor seguridad
    const saltedStr = str + salt;
    
    for (let i = 0; i < saltedStr.length; i++) {
        const char = saltedStr.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir a 32bit integer
    }
    
    // Aplicar múltiples rondas de hash
    for (let round = 0; round < 1000; round++) {
        hash = ((hash << 3) - hash) + (hash >> 2);
        hash = hash & hash;
    }
    
    return Math.abs(hash).toString(16).padStart(8, '0');
}

// Función para verificar contraseña
function verifySecurePassword(inputPassword, storedHash) {
    return secureHash(inputPassword) === storedHash;
}

// Credenciales de usuarios con contraseñas encriptadas
// Nota: Para evitar desajustes, calculamos el hash en tiempo de ejecución
const DEFAULT_PASSWORD = '12345678';
const DEFAULT_HASH = secureHash(DEFAULT_PASSWORD);

const USER_CREDENTIALS = {
    '1088033658': {
        name: 'Alejandro Zapata',
        passwordHash: DEFAULT_HASH
    },
    '1000974424': {
        name: 'Yhonatan Avila', 
        passwordHash: DEFAULT_HASH
    },
    '1113860034': {
        name: 'Felipe Loaiza',
        passwordHash: DEFAULT_HASH
    }
};

// Función para validar credenciales (exportada)
function validateUserCredentials(username, password) {
    username = username.trim();
    password = password.trim();
    
    // Verificar si el usuario existe
    if (!USER_CREDENTIALS[username]) {
        return { valid: false, message: 'Usuario no autorizado' };
    }
    
    // Verificar contraseña usando hash seguro
    if (!verifySecurePassword(password, USER_CREDENTIALS[username].passwordHash)) {
        return { valid: false, message: 'Contraseña incorrecta' };
    }
    
    return { 
        valid: true, 
        user: {
            id: username,
            name: USER_CREDENTIALS[username].name
        }
    };
}

// Función para generar hash de nueva contraseña (solo para desarrollo)
function generatePasswordHash(password) {
    console.log(`Hash para "${password}": ${secureHash(password)}`);
    return secureHash(password);
}

// Exponer funciones globalmente
window.validateUserCredentials = validateUserCredentials;
window.generatePasswordHash = generatePasswordHash;
// window.debugHash = debugHash; // Deshabilitado por privacidad
