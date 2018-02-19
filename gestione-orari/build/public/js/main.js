const Auth = Vue.component('auth', {
    template: "#auth",
    data: function(){
        return {
            auth: false,
            userType: "3",
            registrazioneForm: true,
            loginForm: false,
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
                    usertype: component.userType,
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
                    if (response.data.user){
                        window.location.replace('/dashboard');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },

        validate: function(){
            return true;
        }
    },
    mounted: function(){ document.getElementById('auth').remove(); }
});

const Dashboard = Vue.component('Dashboard', {
    template: "#dashboard",
    data: function(){
        return {
            pageHome: true,
            pageCalendario: false,
            auth: true,
            user:{},
        }
    },
    methods:{
        getUserData: function () {
            axios.get('/getUserData').then(function(res){
                console.log(res);
            })
        }
    },
    created: function(){
        this.getUserData();
    },
    mounted: function () { document.getElementById('dashboard').remove(); }
});

/*
const routes = [
    { path: '/', component: Auth },
];

const router = new VueRouter({
    mode: 'history',
    routes,  
});
*/

new Vue({
    el: "#app",
    components:{
        Auth,
        Dashboard
    }
    //router
});