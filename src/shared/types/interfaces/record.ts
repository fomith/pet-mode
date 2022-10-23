import { IClient } from './client'
import { IHookService } from './service'

export type IRecord = {
  id: number
  company_id: number
  datetime: string
  create_date: string
  seance_length: number
  deleted: boolean
  services: IHookService[]
  client: IClient
}
