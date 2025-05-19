export interface JwtPayload{ 
    id: number,
    role: 'admin' | 'staff' | 'passenger'
}