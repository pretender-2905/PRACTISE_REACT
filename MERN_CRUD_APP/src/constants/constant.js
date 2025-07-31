const devUrl = 'http://localhost:4000/'
const podUrl = 'new-node-js-two-production.up.railway.app'

const BASE_URL = devUrl

export const AppRoutes = {
    login: BASE_URL + 'auth/login',
    register: BASE_URL + 'auth/register',
    getMyInfo: BASE_URL + 'user/myInfo',
    getCourse: BASE_URL + 'course',
    addCourse: BASE_URL + 'course'
}