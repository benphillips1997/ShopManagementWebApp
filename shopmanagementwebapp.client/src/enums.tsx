
const UserType = {
    customer: 0,
    admin: 1,
    superAdmin: 2,
    guest: 3
}

export type UserType = typeof UserType[keyof typeof UserType];


const OrderStatus = {
    notSet: 0,
    cancelled: 1,
    processing: 2,
    confirmed: 3,
    shipped: 4,
    returned: 5
}

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];


const PaymentStatus = {
    notSet: 0,
    failed: 1,
    pending: 2,
    successful: 3,
    refunded: 4
}

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];