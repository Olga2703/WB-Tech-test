export interface User {
    id: string,
    createdAt: string,
    name: string,
    avatar: string,
    email: string,
    phone: string,
    address: string,
}

export type CreateUserData = Omit<User, 'id' | 'createdAt'>;