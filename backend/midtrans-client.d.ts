declare module 'midtrans-client' {
    interface TransactionDetails {
        order_id: string;
        gross_amount: number;
    }

    interface CreditCard {
        secure: boolean;
    }

    interface ChargeParameter {
        transaction_details: TransactionDetails;
        credit_card: CreditCard;
    }

    class CoreApi {
        constructor(config: { isProduction: boolean; serverKey: string; clientKey: string });
        charge(parameter: ChargeParameter): Promise<any>;
    }

    export { CoreApi };
}
