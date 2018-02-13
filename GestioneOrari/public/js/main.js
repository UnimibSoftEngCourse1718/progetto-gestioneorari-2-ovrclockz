const Login = Vue.component('login', {
    template: "#login",
    data: function(){
        return {
            username: null,
            password: null,
            error: false
        }
    },
    methods:{
        login: function(){
            var component = this;
            this.error = !this.validate();
            if(!this.error){
                axios.post('/login.php', {
                    username: component.username,
                    password: component.password
                })
                .then(function (response) {
                    console.log(response);
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
    { path: '/', component: Login },
];

const router = new VueRouter({
    mode: 'history',
    routes,  
});

new Vue({
    el: "#container",
    router
});