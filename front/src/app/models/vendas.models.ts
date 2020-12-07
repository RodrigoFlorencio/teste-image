export interface Vendas {
    id_pedido?: number
    id_user: number
    data: string
    frete: number
    desconto: number
    valor_total: number
    pagamento_tipo: string
    parcelamento: string
    entrega_tipo: string
    entrega_prazo: string
    status_entrega: number
    cep: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    uf: string
    telefone: string
}