import * as axios from "axios";

const ax = axios.create({
    /*baseURL: 'http://localhost:8083/Api/1.0/',*/
    baseURL: 'http://localhost:44349/Api/1.0/',
    withCredentials: true,
    headers: {}
});

export const ServicesListAPI = {
    getScheduledServices(page = 1, pageSize = 15) {
        return ax.get(`ServicesList/?page=${page}&items=${pageSize}`).then(response => response.data);
    },

    execService(id, message, FIO) {
        return ax.put('ServicesList/', { ServiceID: id, ExecDesc: message, FIO }).then(response => response)
    }
}

export const AuthAPI = {
    getAuth() {
        return ax.get('Auth/Me').then(response => response.data);
    }
}

export const UsersAPI = {
    requestUsers() {
        return ax.get('Users');
    },

    deleteUser(userId) {
        return ax.delete(`Users/${userId}`);
    },

    updateUser(user) {
        return ax.post(`Users/${user.UserID}`, user);
    },

    createUser(user) {
        return ax.put(`Users`, user);
    },


}