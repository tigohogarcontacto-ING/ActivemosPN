# Enviador de Mensajes WhatsApp - Tigo Hogar

Una aplicación web moderna y segura para enviar mensajes personalizados de WhatsApp con plantillas predefinidas para Tigo Hogar.

## 🔐 Sistema de Autenticación

La aplicación está protegida con un sistema de login que permite acceso solo a usuarios autorizados.

### **Usuarios Autorizados:**
- **Alejandro Zapata** - Cédula: 1088033658
- **Yhonatan Avila** - Cédula: 1000974424  
- **Felipe Loaiza** - Cédula: 1113860034

**Contraseña para todos:** `12345678`

### **Características de Seguridad:**
- ✅ **Contraseñas encriptadas** - Hash seguro con salt personalizado
- ✅ **Sesiones de 8 horas** - Se expiran automáticamente
- ✅ **Verificación automática** - Redirige al login si no hay sesión
- ✅ **Logout seguro** - Limpia la sesión al cerrar
- ✅ **Protección de rutas** - No se puede acceder sin autenticación
- ✅ **Credenciales separadas** - Archivo independiente para mayor seguridad

## 🚀 Características

- **3 Plantillas disponibles:**
  - NIP (para envío de códigos de acceso)
  - Cambio Full Tigo Duo (reducción de precio)
  - Cambio Full Tigo Trio (reducción de precio)

- **Funcionalidades principales:**
  - Formulario intuitivo para datos del cliente
  - Vista previa en tiempo real del mensaje
  - Copia automática al portapapeles
  - Envío directo por WhatsApp Web
  - Diseño responsivo y moderno
  - Validación de formularios

## 📋 Datos requeridos

### Para plantillas de cambio (Duo/Trio):
- **Nombre del cliente**
- **Número de cédula**
- **Dirección del servicio**
- **Valor del servicio** (se establece automáticamente según la opción seleccionada)
- **Incluir fijo** (checkbox que suma $5,000 al valor)
- **Número de WhatsApp** (opcional)

### Para plantilla NIP:
- **Nombre del cliente**
- **Número de cédula**
- **Nombre del asesor**
- **Número de teléfono** (del cliente)
- **Número de WhatsApp** (opcional)

## 🎯 Cómo usar

1. **Abre el archivo `login.html`** en tu navegador web
2. **Inicia sesión** con tu cédula y contraseña
3. **Selecciona la plantilla** que deseas usar
4. **Completa los datos** del cliente en el formulario
5. **Revisa la vista previa** del mensaje generado
6. **Copia el mensaje** o **envíalo directamente** por WhatsApp

## 📱 Opciones de envío

### Con número de teléfono:
- Ingresa el número de WhatsApp del cliente
- Haz clic en "Abrir WhatsApp"
- Se abrirá el chat directo con el mensaje pre-escrito

### Sin número de teléfono:
- Haz clic en "Abrir WhatsApp"
- Se abrirá WhatsApp Web
- Copia el mensaje desde la vista previa y pégalo manualmente

## 🎨 Plantillas incluidas

### NIP
Mensaje para solicitar el código NIP de portabilidad. Incluye información del asesor, número de teléfono del cliente y datos del titular.

### Cambio Full Tigo Duo
Mensaje informando sobre reducción de precio para el plan Duo. 
- **Sin fijo:** $109,900 (valor base)
- **Con fijo:** $119,900 (suma $5,000)

### Cambio Full Tigo Trio
Mensaje informando sobre reducción de precio para el plan Trio.
- **Sin fijo:** $139,900 (valor base)
- **Con fijo:** $144,900 (suma $5,000)

## 🛠️ Tecnologías utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno y responsivo
- **JavaScript** - Funcionalidad interactiva
- **Font Awesome** - Iconos
- **WhatsApp Web API** - Integración con WhatsApp

## 📱 Compatibilidad

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles

## 🔧 Personalización

Para agregar nuevas plantillas:

1. Abre el archivo `script.js`
2. Agrega tu plantilla en el objeto `templates`
3. Añade la opción en el selector del HTML
4. Usa los placeholders: `[Nombre del cliente]`, `[Número de cédula]`, `[Dirección]`, `[Valor X]`

## 📞 Soporte

Para soporte técnico o sugerencias, contacta al equipo de desarrollo.

---

**© 2024 Tigo Hogar - Herramienta de Comunicación**
