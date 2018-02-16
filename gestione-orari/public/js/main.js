const Auth = Vue.component('auth', {
    template: "#auth",
    data: function(){
        return {
            registrazioneForm: false,
            loginForm: true,
            username: null,
            password: null,
            error: false,
            success: false,
            userExists: false,
        }
    },
    methods:{
        register: function(){
            var component = this;
            this.error = !this.validate();
            if(!this.error){
                axios.post('/register', {
                    username: component.username,
                    password: component.password
                })
                .then(function (response) {
                    console.log(response.data);
                        component.error = response.data.error;
                        component.success = response.data.success;
                        component.userExists = response.data.userExists;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        login: function(){
            var component = this;
            this.error = !this.validate();
            if(!this.error){
                axios.post('/login', {
                    username: component.username,
                    password: component.password
                })
                .then(function (response) {
                    console.log(response.data);
                        component.error = response.data.error;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        validate: function(){
            return true;
        }
    }
});

const routes = [
    { path: '/', component: Auth },
];

const router = new VueRouter({
    mode: 'history',
    routes,  
});

new Vue({
    el: "#app",
    router
});