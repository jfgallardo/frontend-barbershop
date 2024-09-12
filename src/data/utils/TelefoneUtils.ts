export default class TelefoneUtils {
    static formatar(telefone: string): string {
        if (!telefone) return ''
        const numeros = this.desformatar(telefone)
        return numeros.length <= 10
            ? this.substituirNumeros(numeros, '(xx) xxxx-xxxx')
            : this.substituirNumeros(numeros, '(xx) xxxxx-xxxx')
    }

    static desformatar(telefone: string): string {
        if (!telefone) return ''
        return telefone.replace(/\D/g, '').slice(0, 11)
    }

    private static substituirNumeros(telefone: string, ref: string): string {
        let formatado = telefone
            .split('')
            .reduce((telefone, numero) => {
                return telefone.replace('x', numero)
            }, ref)
            .replace(/x/g, '')
        if (telefone.length <= 2) formatado = formatado.replace(')', '').replace(' ', '')
        if (telefone.length <= 6) formatado = formatado.replace('-', '')
        return formatado
    }
}
