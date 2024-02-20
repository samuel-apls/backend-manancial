export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const cpfRegex = /^[0-9]{11}$/

export function verifyNewMember(member) {
    const {
        nome_completo, profissao, estado_civil, cpf,
        rg, endereco, email, celular, data_nascimento,
        data_membresia_entrada, data_membresia_saida,
        senha
    } = member;

    if (!nome_completo || !profissao || !estado_civil ||
        !cpf || !rg || !endereco || !email || !celular ||
        !data_nascimento || !data_membresia_entrada || !senha) {
        return "Preencha todos os campos";
    }

    if (senha.length < 6) {
        return "Senha deve ter no mínimo 6 caracteres";
    }

    if (!emailRegex.test(email)) {
        return "Email inválido";
    }

    if (!cpfRegex.test(cpf)) {
        return "CPF inválido";
    }

    return true
}
