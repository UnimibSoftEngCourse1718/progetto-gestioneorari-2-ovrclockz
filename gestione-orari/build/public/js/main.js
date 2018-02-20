const Auth = Vue.component('auth', {
    template: "#auth",
    data: function(){
        return {
            auth: false,
            userType: "3",
            page: 'loginForm',
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
            page: "pageHome",
            calendar: {
                lunedi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false},
                martedi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false },
                mercoledi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false },
                giovedi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false },
                venerdi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false },
            },
            auth: true,
            user:{},
        }
    },
    methods:{
        getUserData: function () {
            let component = this;
            axios.get('/getUserData').then(function(res){
                console.log(res.data);component.user = res.data.user;
                component.createCalendar();
                axios.get('/getPubblicazioni').then(function (res) { console.log(res.data); component.$set(component.user,'pubblicazioni', res.data) })
            })
        },
        createCalendar: function(){
            for (var key in this.calendar) {
                // skip loop if the property is from prototype
                if (!this.calendar.hasOwnProperty(key)) continue;

                for (var i = 0; i < this.user.corsi.length; i++) {
                    for (var j = 0; j < this.user.corsi[i].orari.length; j++) {
                        if (this.user.corsi[i].orari[j].giorno.toLowerCase().trim() === key.toLowerCase().trim()){
                            for (var k in this.calendar[key]) {
                                if (!this.calendar[key].hasOwnProperty(k)) continue;
                                if (k === this.user.corsi[i].orari[j].orario){
                                    console.log("orario user " + this.user.corsi[i].orari[j].orario);
                                    console.log("orario calendario " + k);
                                    console.log(k === this.user.corsi[i].orari[j].orario);
                                    this.$set(this.calendar[key], k, this.user.corsi[i].nome_corso);
                                }
                            }
                        }
                    }
                }
            }
        },
        iscrizioneEsame: function(corso){
            let component = this;
            axios.post('/iscrizioneEsame', {corso: corso,})
            .then(function (response) {
                console.log(response.data);
                component.getUserData();
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