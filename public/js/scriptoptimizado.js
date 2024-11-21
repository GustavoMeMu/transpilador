const convertirCodigo = () => {
    const codigoJava = document.getElementById('CodigoJava').value.trim();
    if (!codigoJava) {
        return alert('El campo no puede estar vacío. Por favor, ingrese código Java.');
    }
    if (!codigoJava.includes(';')) {
        return alert('El código ingresado no parece ser válido. Asegúrese de incluir instrucciones terminadas con ";"');
    }
    const conversiones = [
        { regex: /\b(int|String|boolean|float|double)\b/g, reemplazo: 'let' },
        { regex: /System\.out\.println\((.*?)\);/g, reemplazo: 'console.log($1);' },
        { regex: /\bpublic static void main\(String\[\] args\)/g, reemplazo: 'function main()' },
        { regex: /\b(int|float|double|boolean|String)\[\]\s+(\w+)\s*=\s*new\s+\1\[(\d+)\];/g, reemplazo: 'let $2 = new Array($3);' },
        { regex: /\b(int|float|double|boolean|String)\[\]\s+(\w+)\s*=\s*\{([^\}]+)\};/g, reemplazo: 'let $2 = [$3];' },
        { regex: /for\s*\((.*?)\)/g, reemplazo: 'for ($1)' },
    ];
    const codigoJS = conversiones.reduce(
        (codigo, { regex, reemplazo }) => codigo.replace(regex, reemplazo),
        codigoJava
    );
    document.getElementById('ResultadoJS').textContent = codigoJS;
};
const pegarTexto = async () => {
    try {
        const texto = await navigator.clipboard.readText();
        document.getElementById('CodigoJava').value = texto;
    } catch (err) {
        alert(`Error al acceder al portapapeles: ${err.message}`);
    }
};
const copiarTexto = async () => {
    try {
        const texto = document.getElementById('ResultadoJS').textContent;
        await navigator.clipboard.writeText(texto);
        mostrarAlerta('Texto copiado al portapapeles.');
    } catch (err) {
        alert(`Error al copiar al portapapeles: ${err.message}`);
    }
};
const limpiarCampos = () => {
    document.getElementById('CodigoJava').value = '';
    document.getElementById('ResultadoJS').textContent = '';
};
const mostrarAlerta = (mensaje) => {
    const alerta = document.getElementById('alertaTexto');
    alerta.textContent = mensaje;
    alerta.style.display = 'block';
    setTimeout(() => alerta.style.display = 'none', 2000);
};
document.getElementById('convertirCodigo').addEventListener('click', convertirCodigo);
document.getElementById('pegarTexto').addEventListener('click', pegarTexto);
document.getElementById('copiarTexto').addEventListener('click', copiarTexto);
document.getElementById('limpiarCampos').addEventListener('click', limpiarCampos);
