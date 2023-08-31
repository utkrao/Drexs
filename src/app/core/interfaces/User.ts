import { Response } from './Response'

export interface SignupRequest {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    emailVerified: boolean;
    userType: keyof typeof UserType;
    publicKeys: Keys;
}

export interface Keys {
    BTC: string;
    ETH: string;
    WATT: string;
    DREXS: string;
}

export enum UserType {
    masternode="masternode",
    userwallet="userwallet"
}

export interface SignupResponse extends Response {
    id: string;
}

export interface BeneficiaryListPayload {
    coinCode: string;
    address: string;
}

export interface BeneficialListing {
    beneficiary: {
        coinCode: string;
        beneficiaryAddress: string;
        name: string;
    }
}

export interface BeneficialUser {
        coinCode: string;
        beneficiaryAddress: string;
        name: string;
        userId:string
    
}

export interface PowerDataPayload {
    power: number;
    device: string;
    os: string;
}