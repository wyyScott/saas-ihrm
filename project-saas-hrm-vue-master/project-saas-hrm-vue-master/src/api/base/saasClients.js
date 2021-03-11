import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/company', 'get', data)
export const details = data => createAPI(`/company/${data.id}`, 'get', data)