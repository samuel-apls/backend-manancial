export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const cpfRegex = /^[0-9]{11}$/

export function verifyNewMember(member) {
    const {
        full_name, occupation, marital_status, cpf, rg, address, email, phone_number,
        password, birth_date, entry_membership_date, exit_membership_date
    } = member;

    if (!full_name || !occupation || !marital_status ||
        !cpf || !rg || !address || !email || !phone_number ||
        !birth_date || !entry_membership_date || !password) {
        return "Preencha todos os campos";
    }

    if (password.length < 6) {
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
