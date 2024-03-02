export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const cpfRegex = /^(?!([0-9])\1{10})[0-9]{11}$/

//fonte: https://www.devmedia.com.br/validar-cpf-com-javascript/23916
export function verifyCPF(cpf) {
    if (!cpfRegex.test(cpf)) return false
    let cpfArray = cpf.split('').map(num => parseInt(num))
    let sum = 0
    for (let i = 1; i <= 9; i++) sum += cpfArray[i - 1] * (11 - i)
    let rest = (sum * 10) % 11;
    if(rest === 10 || rest === 11) rest = 0;
    if (rest !== cpfArray[9]) return false
    sum = 0
    for (let i = 1; i <= 10; i++) sum += cpfArray[i - 1] * (12 - i)
    rest = (sum * 10) % 11;
    if(rest === 10 || rest === 11) rest = 0;
    return rest === cpfArray[10];
}


