import * as axios from "axios";

const ax = axios.create({
    baseURL: 'http://RUARZ-W-0005:8083/Api/1.0/',
    // baseURL: 'http://localhost:44349/Api/1.0/',
    withCredentials: true,
    headers: {}
});

export const ServicesListAPI = {
    getScheduledServices(page = 1, pageSize = 15, machines = null, serviceMan = null) {
        let params = new URLSearchParams();
        page && params.append('page', page);
        pageSize && params.append('items', pageSize);
        machines && params.append('machines', machines);
        serviceMan && params.append('serviceMan', serviceMan);
        return ax.get('ServicesList/?' + params.toString())
            .then(response => response.data);
    },

    execService(data) {
        return ax.put('ServicesList/', { Id: data.id, Message: data.message, FIO: data.FIO, Measurements: data.measurements }).then(response => response)
    }
}

export const ServiceAPI = {
    getServise(id) {
        return ax.get(`Services/${id}`)
        // .then(response => response.data)
    }
}

export const MachinesAPI = {
    getMachine(id) {
        return ax.get(`Machines/${id}`)
    },

    getMachines(page = 1, pageSize = null, groupId = null) {
        return ax.get(`Machines/?page=${page}` + (pageSize && `&items=${pageSize}`) + (groupId && `&groupId=${groupId}`))
    },
}

export const ModulesAPI = {
    getModules(machine, page, pageSize) {
        let params = new URLSearchParams();
        machine && params.append('machine', machine);
        page && params.append('page', page);
        pageSize && params.append('items', pageSize);
        return ax.get('Modules/?' + params.toString());
    }
}

export const ElementsAPI = {
    getElements(module, page, pageSize) {
        let params = new URLSearchParams();
        module && params.append('module', module);
        page && params.append('page', page);
        pageSize && params.append('items', pageSize);
        return ax.get('Elements/?' + params.toString());
    }
}

export const ServiceManAPI = {
    getAllServiceMans() {
        return ax.get(`ServiceMan/`)
    }
}

export const AuthAPI = {
    getAuth() {
        return ax.get('Auth/Me').then(response => response.data)
    }
}

export const UsersAPI = {
    requestUsers() {
        return ax.get('Users')
    },

    deleteUser(userId) {
        return ax.delete(`Users/${userId}`)
    },

    updateUser(user) {
        return ax.post(`Users/${user.UserID}`, user)
    },

    createUser(user) {
        return ax.put(`Users`, user)
    },
}