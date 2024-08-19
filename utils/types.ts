interface ManagedAt {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface User extends ManagedAt {
  id: string
  email: string
  password: string
  token: string
  name?: string
  role: 'USER' | 'ADMIN'
}