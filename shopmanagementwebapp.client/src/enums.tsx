
const UserType = {
    customer: 0,
    admin: 1,
    superAdmin: 2,
    guest: 3
}

export type UserType = typeof UserType[keyof typeof UserType];

const OrderStatus = {
    failed: 0,
    pending: 1,
    successful: 2,
    delivered: 3
}

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];