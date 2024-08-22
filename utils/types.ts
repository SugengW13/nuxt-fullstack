export interface FormEditProfile {
  email: undefined | string
  name: undefined | string
}

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