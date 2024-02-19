export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function verifyNewMember(member) {
    const {
        nome_completo, profissao, estado_civil, cpf,
        rg, endereco, email, celular, data_nascimento,
        data_membresia_entrada, data_membresia_saida,
    } = member;

    if (!nome_completo || !profissao || !estado_civil ||
        !cpf || !rg || !endereco || !email || !celular ||
        !data_nascimento || !data_membresia_entrada) {
        return "Preencha todos os campos";
    }

    if (!emailRegex.test(email)) {
        return "Email inválido";
    }

    return true
}
