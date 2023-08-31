export interface SendCoinsPayload {
    hash: string;
    coinCode: keyof typeof Coins;
    fromAddress: string;
    toAddress: string;
    amount: number;
    transactionType: string;
    txrefs?: any
    tokenId?: any
}

export enum Coins {
    WATT = 'WATT',
    ETH = 'ETH',
    BTC = 'BTC',
    DREXS = 'DREXS'
}

export enum PaymentTypes {
    BUY_COIN_PAYMENT = '1',
    MARKETPLACE_PURCHASE_PAYMENT = '2',
}

export enum PaymentByTypes {
    BY_CREDIT_DEBIT_CARD = '1',
    BY_BANK_TRANSFER = '2',
    BY_WALLET = '3',
}

export interface GetAssetResponse {
    success: boolean;
    data: {
        BTC: GetAsset;
        DREXS: GetAsset;
        ETH: GetAsset;
        WATT: GetAsset;
    }
}

export interface GetWalletBalanceResponse {
    success: boolean;
    data: {
        USD: GetAsset;
        WATT: GetAsset;
    }
}


export interface GetAsset {
    address: string;
    balance: number;
    coinCode: string;
    coinValue: number;
    fiatBalance: string;
    fiatValue: number;
    tokenBalance: string;
    txrefs?: any;
}

export interface TransactionHistory {
    hash: string;
    transactionType: string;
    amount: number;
    coinCode: Coins;
    change: string;
    transactionStatus: string;
    transactionDate: string;
    toAddress: string;
    name: string;
}

export interface purchaseSummary {
    paying_amount: number;
    network_fee: number;
    drexs_fee: number;
    amount_payable: number
}

export interface GetFiatValuePayload {
    tokenAmount: number;
    coinCode: keyof typeof Coins;
}


export interface buyData {
    amount: number,
    coinCode: keyof typeof Coins;
    quantity: number,
    transactionType: string,
    network_fee: number
}

export interface PaymentDataI {
    paymentType : number,
    amount: number,
    quantity: number,
    network_fee: number
}

export interface SwapCoinsPayload {
    hash: string;
    coinCode: keyof typeof Coins;
    // fromAddress: string;
    // toAddress: string;
    amount: number;
    transactionType: string;
}

export interface StakeSummaryPayload {
    drexsStacked: string;
    amount: string;
    energy: string;
    total: string;

}


export enum TransactionPinAction {
    SendCoin = 'SendCoin',
    BuyCoin = 'BuyCoin',
    Staking = 'Staking',
    SwapCoin = 'SwapCoin',
    Bidding = 'Bidding',

}