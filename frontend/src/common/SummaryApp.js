
export const baseURL = "http://localhost:9000"

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    forgot_password :{
        url : '/api/user/forgot-password',
        method : 'put'
    }
}

export default SummaryApi