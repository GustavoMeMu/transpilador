const convertirCodigo = () => {
    const codigoJava = document.getElementById('CodigoJava').value.trim();
    if (!codigoJava) return alert('El campo no puede estar vacío. Por favor, ingrese código Java.');
    if (!codigoJava.includes(';')) return alert('El código ingresado no parece ser válido. Asegúrese de incluir instrucciones terminadas con ";"');
    const codigoJS = codigoJava
        .replace(/\b(int|String|boolean|float|double)\b/g, 'let')
        .replace(/System\.out\.println\((.*?)\);/g, 'console.log($1);')
        .replace(/\b(public static)?\s*(\w+)\s+(\w+)\(([^)]*)\)\s*\{([^}]*)\}/g, 'function $3($4) { $5 }')
        .replace(/\b(private static)?\s*(\w+)\s+(\w+)\(([^)]*)\)\s*\{([^}]*)\}/g, 'function $3($4) { $5 }')
        .replace(/\b(int|float|double|boolean|String)\[\]\s+(\w+)\s*=\s*\{([^}]+)\};/g, 'let $2 = [$3];')
        .replace(/for\s*\((.*?)\)/g, 'for ($1)');
    document.getElementById('ResultadoJS').textContent = codigoJS;
};
const pegarTexto = async () => {
    try {
        const texto = await navigator.clipboard.readText();
        document.getElementById('CodigoJava').value = texto;
    } catch (err) { alert('Error al acceder al portapapeles: ' + err.message); }
};
const copiarTexto = async () => {
    try {
        const texto = document.getElementById('ResultadoJS').textContent;
        await navigator.clipboard.writeText(texto);
        const alerta = document.getElementById('alertaTexto');
        alerta.style.display = 'block';
        setTimeout(() => alerta.style.display = 'none', 2000);
    } catch (err) { alert('Error al copiar al portapapeles: ' + err.message); }
};
const limpiarCampos = () => {
    document.getElementById('CodigoJava').value = '';
    document.getElementById('ResultadoJS').textContent = '';
};
document.getElementById('convertirCodigo').addEventListener('click', convertirCodigo);
document.getElementById('pegarTexto').addEventListener('click', pegarTexto);
document.getElementById('copiarTexto').addEventListener('click', copiarTexto);
document.getElementById('limpiarCampos').addEventListener('click', limpiarCampos);
