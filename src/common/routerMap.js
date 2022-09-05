import { HomeOutlined, UserOutlined, TeamOutlined, MailOutlined, MehOutlined, ProfileOutlined, SolutionOutlined, FormOutlined, UnorderedListOutlined, CarOutlined, AccountBookOutlined } from '@ant-design/icons';

export const asyncRouterMap = [
    {
        path: '/home',
        name: 'Home',
        meta: { title: "首页", role: ['admin', 'teacher', 'manager'], icon: <HomeOutlined /> },
    },
    {
        path: '/personal',
        name: 'Personal',
        meta: { title: "个人中心", role: ['admin', 'teacher', 'manager'], icon: <UserOutlined /> },
    },
    {
        path: '/teacher',
        name: 'Teacher',
        meta: { title: "教师管理", role: ['admin'], icon: <TeamOutlined /> },
    },
    {
        path: '/admissions',
        name: 'Admissions',
        meta: { title: "招生管理", role: ['admin', 'manager'], icon: <MailOutlined /> },
        children: [
            {
                path: '/admissions/intentional',
                name: 'Intentional',
                meta: { title: "意向学员管理", role: ['admin', 'manager'], icon: <MehOutlined />, bread: ['招生管理', '意向学员管理'], keepAlive: true },
            },
            {
                path: '/admissions/solicitation',
                name: 'Solicitation',
                meta: { title: "邀约查询", role: ['admin'], icon: <ProfileOutlined />, bread: ['招生管理', '邀约查询'] },

            }
        ]
    },
    {
        path: '/student',
        name: 'Student',
        meta: { title: "学生管理", role: ['admin', 'teacher', 'manager'], icon: <SolutionOutlined /> },
        children: [
            {
                path: '/student/info',
                name: 'Info',
                meta: { title: "学生信息", role: ['admin', 'teacher', 'manager'], icon: <ProfileOutlined />, bread: ['学生管理', '学生信息'] },
            },
            {
                path: '/student/exam',
                name: 'Exam',
                meta: { title: "考试管理", role: ['admin', 'teacher'], icon: <FormOutlined />, bread: ['学生管理', '考试管理'] },
            }
        ]
    },
    {
        path: '/class',
        name: 'Class',
        meta: { title: "排课管理", role: ['admin'], icon: <UnorderedListOutlined /> },
    },
    {
        path: '/administrative',
        name: 'Administrative',
        meta: { title: "行政管理", role: ['admin'], icon: <CarOutlined /> },
    },
    {
        path: '/finance',
        name: 'Finance',
        meta: { title: "财务管理", role: ['admin'], icon: <AccountBookOutlined /> },
    },
]
