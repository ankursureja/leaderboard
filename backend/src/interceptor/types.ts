require('dotenv').config();

export const ResponseMap = <T>(data: T, message?: string | ''): { data: T; message: string } => {
    return {
        data,
        message: message || '',
    };
};

export interface ResponseGlobalInterface<T> {
    data: T;
    message: string;
}

export type SuccessResponse = Record<string, unknown> | Array<unknown>;

export type GlobalResponseType = Promise<ResponseGlobalInterface<SuccessResponse>>;

export function randomTokenWithEmail(email: string, expiryTime: number = null): object {
    const currentTimestamp = Date.now();
    const currentDate = new Date();

    const exTime = (expiryTime ? expiryTime : 2) * 1; //default 2hr

    currentDate.setMinutes(currentDate.getMinutes() + exTime);

    return {
        timeStamp: currentDate.getTime(),
        email: email,
    };
}
export function convertToBase64(data: string): string {
    const reverse = data.split('').reverse().join('');
    const baseData = Buffer.from(reverse).toString('base64');
    return baseData;
}

export function convertFromBase64(data: string): string {
    const baseData = Buffer.from(data, 'base64').toString();
    const reverse = baseData.split('').reverse().join('');
    return reverse;
}

export interface EventQueryData {
    mode: string;
    rsvp: boolean;
    draft: boolean;
    tickets: boolean;
}
