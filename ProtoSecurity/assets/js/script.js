// ========================================================
// 0. FUNCIONES DE UTILIDAD PARA VALIDACIÓN (JS Vanilla)
// ========================================================

/**
 * Función genérica para validar si un campo obligatorio está vacío.
 * @param {HTMLInputElement} inputElement - El elemento input/select/textarea a validar.
 * @returns {boolean} - true si es válido, false si está vacío.
 */
function validarRequerido(inputElement) {
    // Si el elemento es un <select>, verifica que el valor no sea la opción por defecto ("")
    const isSelectValid = inputElement.tagName === 'SELECT' ? inputElement.value !== '' : inputElement.value.trim() !== '';
    
    // Si el elemento es un <input type="file">, verifica que se haya seleccionado un archivo
    const isFileValid = inputElement.type === 'file' ? inputElement.files.length > 0 : true;

    if (!isSelectValid || !isFileValid) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        return false;
    }
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
    return true;
}

/**
 * Función para validar el formato de un email.
 * @param {HTMLInputElement} inputElement - El elemento email a validar.
 * @returns {boolean} - true si es válido, false si no.
 */
function validarEmail(inputElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputElement.value.trim());

    if (!validarRequerido(inputElement)) return false; // Verifica que no esté vacío primero
    
    if (!isValid) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
    } else {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
    }
    return isValid;
}

/**
 * Función para validar el formato de un archivo (CV).
 * @param {HTMLInputElement} inputElement - El input file a validar.
 * @returns {boolean} - true si es válido (pdf/doc/docx), false si no.
 */
function validarFileCV(inputElement) {
    // Verifica que el campo no esté vacío
    if (!validarRequerido(inputElement)) {
        return false;
    }
    
    // Verifica la extensión del archivo
    const fileName = inputElement.files[0].name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    const isValidExtension = ['pdf', 'doc', 'docx'].includes(extension);

    if (!isValidExtension) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        // Actualiza el mensaje de error específico para CV
        const feedbackDiv = inputElement.nextElementSibling;
        if (feedbackDiv) {
            feedbackDiv.textContent = 'El archivo debe ser PDF, DOC o DOCX.';
        }
        return false;
    } else {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        // Restaura el mensaje de error por defecto
        const feedbackDiv = inputElement.nextElementSibling;
        if (feedbackDiv) {
            feedbackDiv.textContent = 'Debe adjuntar su CV en formato PDF o DOC.';
        }
    }
    return true;
}


// ========================================================
// 1. VALIDACIÓN FORMULARIO "TRABAJA CON NOSOTROS"
// ========================================================

function validarFormularioTrabajo(event) {
    event.preventDefault(); 
    
    const form = document.getElementById('formTrabajo');
    const nombre = form.querySelector('#nombre');
    const correo = form.querySelector('#correo');
    const telefono = form.querySelector('#telefono');
    const cursoOS10 = form.querySelector('#cursoOS10');
    const cvFile = form.querySelector('#cvFile');

    let isFormValid = true;

    // Se verifica cada campo. Si uno falla, isFormValid se vuelve false.
    // El orden importa: validarRequerido(nombre) se evalúa primero.
    if (!validarRequerido(nombre)) isFormValid = false;
    if (!validarRequerido(telefono)) isFormValid = false;
    if (!validarRequerido(cursoOS10)) isFormValid = false;
    
    // Validaciones con formato específico
    if (!validarEmail(correo)) isFormValid = false;
    if (!validarFileCV(cvFile)) isFormValid = false;

    if (isFormValid) {
        console.log('Formulario de Trabajo Válido. Enviando datos...');
        alert('¡Postulación enviada con éxito! Pronto te contactaremos.');
        form.reset(); 
        
        // Remover clases 'is-valid' para dejar el formulario limpio
        [nombre, correo, telefono, cursoOS10, cvFile].forEach(el => {
            el.classList.remove('is-valid');
        });
        return true; 
    } else {
        console.log('Validación fallida. Revise los campos.');
        return false; 
    }
}


// ========================================================
// 2. VALIDACIÓN FORMULARIO "CONTACTO CORPORATIVO"
// ========================================================

function validarFormularioContacto(event) {
    event.preventDefault(); 

    const form = document.getElementById('formContacto');
    const nombre = form.querySelector('#nombreContacto');
    const empresa = form.querySelector('#empresa');
    const correo = form.querySelector('#correoContacto');
    const telefono = form.querySelector('#telefonoContacto');

    let isFormValid = true;

    // Validar campos requeridos
    if (!validarRequerido(nombre)) isFormValid = false;
    if (!validarRequerido(empresa)) isFormValid = false;
    if (!validarRequerido(telefono)) isFormValid = false;

    // Validar formato de email
    if (!validarEmail(correo)) isFormValid = false;

    if (isFormValid) {
        console.log('Formulario de Contacto Válido. Enviando datos...');
        alert('¡Mensaje enviado con éxito! Un asesor se contactará en breve.');
        form.reset(); 

        // Remover clases 'is-valid'
        [nombre, empresa, correo, telefono].forEach(el => {
            el.classList.remove('is-valid');
        });
        return true;
    } else {
        console.log('Validación fallida. Revise los campos.');
        return false; 
    }
}

// ========================================================
// 3. INICIALIZACIÓN (Mantiene la función de Scroll Suave)
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Suave para anclajes internos 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // NOTA: El menú hamburguesa es manejado por el JS de Bootstrap (bootstrap.bundle.min.js), 
    // por lo que no se requiere código adicional de Vanilla JS aquí.
});