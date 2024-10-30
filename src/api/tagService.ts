import instance from '@/plugins/axios'

export const getAll = (): Promise<{ tags: string[] }> => {
  return instance.get('/tags')
}
