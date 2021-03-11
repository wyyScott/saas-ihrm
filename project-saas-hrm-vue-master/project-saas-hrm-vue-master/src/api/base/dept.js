import {createAPI} from '@/utils/request'

//查询部门列表
export const list = data => createAPI('/company/department', 'get', data)
//根据id查询部门
export const queryById = data => createAPI(`/company/department/${data.id}`, 'get', data)
//根据id删除部门
export const deleteById = data => createAPI(`/company/department/${data.id}`,'delete',data)
//添加部门
export const add = data => createAPI('/company/department','post',data)
//修改部门
export const update = data => createAPI('/company/department','put',data)
