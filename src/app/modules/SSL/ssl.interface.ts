export type IPaymentData = {
    amount: number;
    transactionId: string;
    name: string;
    email: string;
    address: string | null;
    phoneNumber: string | null;
}