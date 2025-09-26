
function gerarDigitoVerificador(cpfParcial) {
    let soma = 0;
    for (let i = 0; i < cpfParcial.length; i++) {
        soma += parseInt(cpfParcial.charAt(i)) * (cpfParcial.length + 1 - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    const novePrimeiros = cpf.substring(0, 9);
    const primeiroDigito = gerarDigitoVerificador(novePrimeiros);
    if (primeiroDigito !== parseInt(cpf.charAt(9))) {
        return false;
    }
    const dezPrimeiros = cpf.substring(0, 10);
    const segundoDigito = gerarDigitoVerificador(dezPrimeiros);
    return segundoDigito === parseInt(cpf.charAt(10));
}

function encontrarCPFCorreto(cpfInvalido) {
    const cpfsCandidatos = [];
    cpfInvalido = cpfInvalido.replace(/[^\d]+/g, '');

    for (let i = 0; i < 11; i++) {
        const cpfArray = cpfInvalido.split('');
        for (let j = 0; j < 10; j++) {
            cpfArray[i] = j.toString();
            const novoCpf = cpfArray.join('');
            if (validarCPF(novoCpf)) {
                cpfsCandidatos.push(novoCpf);
            }
        }
    }
    return cpfsCandidatos;
}

// CPF fornecido: 178.250.957-14
const cpfInvalido = "00801393072";
const candidatos = encontrarCPFCorreto(cpfInvalido);

const CPFValidos = []

console.log("CPFs matematicamente válidos que podem ser o correto:");
candidatos.forEach(cpf => {
    // Formata o CPF para exibição
    const cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    console.log(cpfFormatado);
    CPFValidos.push(cpfFormatado)
});