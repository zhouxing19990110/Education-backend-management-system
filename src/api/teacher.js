// 和教师管理页面相关的接口，写在本文件中
import request from "../utils/request"
export function getTeacherList(data){
    return request({
        url:"/teacher/teacherList",
        method:"post",
        data
    })
}

// 新增教师接口
export function addTeacher(data){
    return request({
        url:"/teacher/addTeacher",
        method:"post",
        data
    })
}

// 编辑教师接口
export function editTeacher(data){
    return request({
        url:'/teacher/editTeacher',
        method:'post',
        data,
    })
}

// 删除教师接口(单个)
export function deletes(data){
    return request({
        url:'teacher/delete',
        method:'post',
        data
    })
}

// 批量删除接口
export function batchDelete(data) {
    return request({
        url: '/teacher/batchDelete',
        method: 'post',
        data
    })
} 