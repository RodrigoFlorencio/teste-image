export interface Fornecedor {
    id?: number
    nome: string
    fantasia: string
    cpfCnpj: string
    inscEst: string
    rg: string
    cep: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    uf: string
    codEstado: number
    codMunicipio: number
    fone1: number
    fone2: number
    fone3: number
    email: string
}

export interface FornecedorCreate {
    id?: number
    nome: string
    fantasia: string
    cpfCnpj: string
    inscEst: string
    rg: string
    cep: string
    logradouro: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    uf: string
    codEstado: number
    codMunicipio: number
    fone1: number
    fone2?: number
    fone3?: number
    email: string
}
