
export function getEnumName<T extends Record<string, string | number>>(enumType: T, value: number): keyof T {
    return Object.keys(enumType).find(key => enumType[key as keyof T] === value) as keyof T;
}

export const UserType = {
    customer: 0,
    admin: 1,
    superAdmin: 2,
    guest: 3
} as const;

export type UserType = typeof UserType[keyof typeof UserType];


export const OrderStatus = {
    notSet: 0,
    cancelled: 1,
    processing: 2,
    confirmed: 3,
    shipped: 4,
    returned: 5
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];


export const PaymentStatus = {
    notSet: 0,
    failed: 1,
    pending: 2,
    successful: 3,
    refunded: 4
} as const;

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];