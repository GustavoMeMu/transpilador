// Función para convertir el código
const convertirCodigo = () => {
    const codigoJava = document.getElementById('CodigoJava').value.trim();

    // Validar que el campo no esté vacío
    if (!codigoJava) {
        alert('El campo no puede estar vacío. Por favor, ingrese código Java.');
        return;
    }

    // Validar que el código contenga al menos un punto y coma
    if (!codigoJava.includes(';')) {
        alert('El código ingresado no parece ser válido. Asegúrese de incluir instrucciones terminadas con ";"');
        return;
    }

    // Reemplazo de tipos, métodos y arrays
    const codigoJS = codigoJava
        // Tipos de datos básicos
        .replace(/\b(int|String|boolean|float|double)\b/g, 'let')
        // Imprimir en consola
        .replace(/System\.out\.println\((.*?)\);/g, 'console.log($1);')
        // Método main
        .replace(/\bpublic static void main\(String\[\] args\)/g, 'function main()')
        // Arrays - Declaración con new
        .replace(/\b(int|float|double|boolean|String)\[\]\s+(\w+)\s*=\s*new\s+\1\[(\d+)\];/g, 'let $2 = new Array($3);')
        // Arrays - Inicialización con valores
        .replace(/\b(int|float|double|boolean|String)\[\]\s+(\w+)\s*=\s*\{([^\}]+)\};/g, 'let $2 = [$3];')
        // Bucle for
        .replace(/for\s*\((.*?)\)/g, 'for ($1)');

    // Mostrar el código convertido
    document.getElementById('ResultadoJS').textContent = codigoJS;
};

// Función para pegar texto desde el portapapeles
const pegarTexto = async () => {
    try {
        const texto = await navigator.clipboard.readText();
        document.getElementById('CodigoJava').value = texto;
    } catch (err) {
        alert('Error al acceder al portapapeles: ' + err.message);
    }
};

// Función para copiar texto al portapapeles
const copiarTexto = async () => {
    try {
        const texto = document.getElementById('ResultadoJS').textContent;
        await navigator.clipboard.writeText(texto);
        const alerta = document.getElementById('alertaTexto');
        alerta.style.display = 'block';
        setTimeout(() => alerta.style.display = 'none', 2000);
    } catch (err) {
        alert('Error al copiar al portapapeles: ' + err.message);
    }
};

// Función para limpiar los campos
const limpiarCampos = () => {
    document.getElementById('CodigoJava').value = '';
    document.getElementById('ResultadoJS').textContent = '';
};

// Asignar eventos a los botones
document.getElementById('convertirCodigo').addEventListener('click', convertirCodigo);
document.getElementById('pegarTexto').addEventListener('click', pegarTexto);
document.getElementById('copiarTexto').addEventListener('click', copiarTexto);
document.getElementById('limpiarCampos').addEventListener('click', limpiarCampos);
