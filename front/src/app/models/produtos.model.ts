export interface Produtos {
    id?: number
    nome: string
    preco: number
    categoria: number
    tipo: string
    descricao: string
    desconto: number
    promo: number
    quantidade: number
    id_fornecedor: number
    imagem: string
}

export interface Img {
    id?: number
    imagem: string
}

export interface serverResponse  {
    count: number;
    produtos: Produtos[]
}
