// TODO interfaces definidas no angular para data e hora?
export interface Consulta {
  id: number
  dia: string
  horario: string
  dataAgendamento: string
  medico: Medico
}

export interface Medico {
  id: number
  crm: string
  nome: string
  email: any
  especialidade: Especialidade
}

export interface Especialidade {
  id: number
  nome: string
}

export interface User {
  id: number
  username: string
  password: string
  email: any
  enabled: boolean
  accountNonExpired: boolean
  credentialsNonExpired: boolean
  accountNonLocked: boolean
}
