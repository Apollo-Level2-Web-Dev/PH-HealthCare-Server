import axios from "axios";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { IPaymentData } from "./ssl.interface";

const initPayment = async (paymentData: IPaymentData) => {
    try {
        const data = {
            store_id: config.ssl.storeId,
            store_passwd: config.ssl.storePass,
            total_amount: paymentData.amount,
            currency: 'BDT',
            tran_id: paymentData.transactionId, // use unique tran_id for each api call
            success_url: config.ssl.successUrl,
            fail_url: config.ssl.failUrl,
            cancel_url: config.ssl.cancelUrl,
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'N/A',
            product_name: 'Appointment',
            product_category: 'Service',
            product_profile: 'general',
            cus_name: paymentData.name,
            cus_email: paymentData.email,
            cus_add1: paymentData.address,
            cus_add2: 'N/A',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: paymentData.phoneNumber,
            cus_fax: '01711111111',
            ship_name: 'N/A',
            ship_add1: 'N/A',
            ship_add2: 'N/A',
            ship_city: 'N/A',
            ship_state: 'N/A',
            ship_postcode: 1000,
            ship_country: 'N/A',
        };

        const response = await axios({
            method: 'post',
            url: config.ssl.sslPaymentApi,
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return response.data;
    }
    catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Payment erro occured!")
    }
};


const validatePayment = async (payload: any) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${config.ssl.sslValidationApi}?val_id=${payload.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`
        });

        return response.data;
    }
    catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Payment validation failed!")
    }
}


export const SSLService = {
    initPayment,
    validatePayment
}