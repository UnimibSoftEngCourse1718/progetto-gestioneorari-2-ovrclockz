const Auth = Vue.component('auth', {
    template: "#auth",
    data: function(){
        return {
            auth: false,
            userType: "3",
            page: 'loginForm',
            username: "",
            password: "",
            corsi: [],
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
                    password: component.password,
                    corsi: component.corsi
                })
                .then(function (response) {
                    console.log(response.data);
                    component.error = response.data.error;
                    component.success = response.data.success;
                    component.userExists = response.data.userExists;
                    setTimeout(function() {
                        component.error = "";
                        component.success = "";
                        component.userExists = "";    
                    }, 3000);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                component.error = "error";
                setTimeout(function () {
                    component.error = "";
                }, 3000);
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
                    setTimeout(function () {
                        component.error = "";
                    }, 3000);
                    if (response.data.user){
                        window.location.replace('/dashboard');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                component.error = "error";
                setTimeout(function () {
                    component.error = "";
                }, 3000);
            }
        },

        validate: function(){
            return !this.username.match(/^\s*$/) && !this.password.match(/^\s*$/);
        },
        getListaCorsi: function(){
            var component = this;
            axios.get('/getListaCorsi').then(function (res) { console.log(res.data); component.$set(component, 'corsi', res.data.value) })
        }
    },
    created: function(){ this.getListaCorsi(); },
    mounted: function(){ document.getElementById('auth').remove(); }
});

const Dashboard = Vue.component('Dashboard', {
    template: "#dashboard",
    data: function(){
        return {
            auth: true,
            page: "pageHome",
            calendar: {
                lunedi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false},
                martedi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false },
                mercoledi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false },
                giovedi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false },
                venerdi: { '8:30 - 10:30': false, '10:30 - 12:30': false, '12:30 - 14:30': false, '14:30 - 16:30': false, '16:30 - 18:30': false },
            },
            user:{},
            schedaCorso: {},
            nuovoDocente: { username: "", password: "", corsi: [] },
            docenti: {},
            corsi: {},
            aule: {},
            nuovoEsame: { id_corso: "",id_aula: "",data_esame: ""},
            orariDisponibili: {},
            corsoDaGestire: { id_orario: "",id_corso: "", id_aula: "" },
            news: "",
            nuovaRisorsa: "",
            msgPubblicazione: "",
            msgRisorsa: "",
            msgNuovoDocente: "",
            msgNuovoOrario: "",
            prenotazioneSucces: "",
            esameMsg: "",
            corsoScelto: false
        }
    },
    methods:{
        getUserData: function () {
            let component = this;
            axios.get('/getUserData').then(function(res){
                console.log(res.data);component.user = res.data.user;
                if (res.data.user.studente) {
                    axios.post('/getListaEsamiStudente', { id_studente: res.data.user.studente.id_studente }).then(function (res) { console.log(res.data); component.$set(component.user, 'esami', res.data.value) })
                }
                if (res.data.user.docente || res.data.user.studente) {
                    component.createCalendar();
                }
                if (res.data.user.docente || res.data.user.segretario){
                    axios.get('/getListaRisorse').then(function (res) { console.log(res.data); component.$set(component.user, 'risorse', res.data.value) })
                }
                if (res.data.user.docente){
                    axios.post('/getListaEsamiDocente', { id_docente: res.data.user.docente.id_docente }).then(function (res) { console.log(res.data); component.$set(component.user, 'esami', res.data.value) })
                    axios.post('/getListaRisorsePrenotate', { id_docente: res.data.user.docente.id_docente }).then(function (res) { console.log(res.data); component.$set(component.user, 'risorsePrenotate', res.data.value) })
                }
                if (res.data.user.segretario) {
                    axios.get('/getListaEsamiAll').then(function (res) { console.log(res.data); component.$set(component.user, 'esami', res.data.value) })
                    axios.get('/getListaDocenti').then(function (res) { console.log(res.data); component.$set(component, 'docenti', res.data.value) })
                    axios.get('/getListaCorsi').then(function (res) { console.log(res.data); component.$set(component, 'corsi', res.data.value) })
                    //axios.get('/getListaOrariDisponibili').then(function (res) { console.log(res.data); component.$set(component, 'orariDisponibili', res.data.value) })
                    axios.get('/getListaAule').then(function (res) { console.log(res.data); component.$set(component, 'aule', res.data.value) })
                }
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
                                    this.$set(this.calendar[key], k, this.user.corsi[i].nome_corso + "<br>(" + this.user.corsi[i].orari[j].nome_aula + ")");
                                }
                            }
                        }
                    }
                }
            }
        },

        schedaCorsi: function(index){
            var component = this;
            this.page = 'pageSchedaCorso';
            this.$set(this,'schedaCorso',this.user.corsi[index]);
            axios.post('/getPubblicazioniCorso',{ id_corso: component.schedaCorso.id_corso }).then(function (res) { console.log(res.data); component.$set(component.schedaCorso, 'pubblicazioni', res.data) })
        },

        iscrizioneEsame: function(esame){
            let component = this;
            axios.post('/iscrizioneEsame', {esame: esame,})
            .then(function (response) {
                console.log(response.data);
                component.getUserData();
            })
        },

        prenotazioneRisorsa: function(risorsa){
            let component = this;
            risorsa.id_docente = this.user.docente.id_docente;
            date = new Date(risorsa.giorno_richiesta_prenotazione);
            today = new Date();
            if (date > today && risorsa.orario_richiesta_prenotazione){
                axios.post('/prenotazioneRisorsa', { risorsa: risorsa, })
                    .then(function (response) {
                    console.log(response.data);
                    if (response.data.value){
                        component.getUserData();
                        component.prenotazioneSucces = "success";
                        setTimeout(function(){
                            component.prenotazioneSucces = "";
                        }, 3000);
                    } else { 
                        component.prenotazioneSucces = "error"; 
                        setTimeout(function () {
                            component.prenotazioneSucces = "";
                        }, 3000);
                    }
                })
            }else{
                component.prenotazioneSucces = "dateError";
                setTimeout(function () {
                    component.prenotazioneSucces = "";
                }, 3000);
            }
        },

        cancellarePrenotazione: function(risorsa){
            let component = this;
            axios.post('/cancellarePrenotazione', { risorsa: risorsa, })
            .then(function (response) {
                console.log(response.data);
                if (response.data.value){
                    component.getUserData();
                    component.prenotazioneSucces = "successCancel";
                    setTimeout(function(){
                        component.prenotazioneSucces = "";
                    }, 3000);
                    this.getUserData();
                }
            })
        },

        pubblicareNews: function(id_corso){
            let component = this;
            let news = {};
            news.id_user = component.user.docente ? component.user.docente.id : component.user.segretario.id;
            news.content = component.news;
            if (!news.content.match(/^\s*$/)){
                if(id_corso){
                    axios.post('/pubblicareNewsCorso', { id_corso: id_corso, news: news, })
                    .then(function (response) {
                        console.log(response.data);
                        if (response.data.status) {
                            component.getUserData();
                            component.news = "";
                            axios.post('/getPubblicazioniCorso', { id_corso: component.schedaCorso.id_corso }).then(function (res) { console.log(res.data); component.$set(component.schedaCorso, 'pubblicazioni', res.data) })
                        } else {
                            component.msgPubblicazione = "error";
                        }
                    })
                }else{
                    axios.post('/pubblicareNews', { news: news, })
                    .then(function (response) {
                        console.log(response.data);
                        if (response.data.status){
                            component.getUserData();
                            component.news = "";
                        }else{
                            component.msgPubblicazione = "error";
                        }
                    })
                }
            }else{
                component.msgPubblicazione = "errorInput";
                setTimeout(function() {
                    component.msgPubblicazione = "";
                }, 3000);
            }
        },

        inserireRisorsa: function(){
            var component = this;
            if (!component.nuovaRisorsa.match(/^\s*$/)){
                axios.post('/inserireRisorsa', { nome_risorsa: component.nuovaRisorsa, })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.status) {
                        component.getUserData();
                        component.nuovaRisorsa = "";
                        component.msgRisorsa = "success";
                        setTimeout(function () {
                            component.msgRisorsa = "";
                        }, 3000);
                    }
                })
            }else{
                component.msgRisorsa = "error";
                setTimeout(function () {
                    component.msgRisorsa = "";
                }, 3000);
                
            }
        },

        inserireOrario: function(){
            var component = this;
            if (component.corsoDaGestire.id_aula !== "" && component.corsoDaGestire.id_corso && component.corsoDaGestire.id_orario){
                axios.post('/inserireOrario', { dati: component.corsoDaGestire })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.status) {
                        component.getUserData();
                        component.corsoDaGestire.id_aula = "";
                        component.corsoDaGestire.id_corso = "";
                        component.corsoDaGestire.id_orario = "";

                        component.msgNuovoOrario = "success";
                        setTimeout(function () {
                            component.msgNuovoOrario = "";
                            component.corsoScelto = false;
                        }, 3000);
                    }else{
                        component.msgNuovoOrario = "error";
                        setTimeout(function () {
                            component.msgNuovoOrario = "";
                        }, 3000);
                    }
                })
            }else{
                component.msgNuovoOrario = "errorInput";
            }
        },

        inserireDocente: function(){
            var component = this;
            let corsi = this.bindCorsi();
            if (!component.nuovoDocente.username.match(/^\s*$/) && !component.nuovoDocente.password.match(/^\s*$/)){
                axios.post('/inserireDocente', { username: component.nuovoDocente.username, password: component.nuovoDocente.password, corsi: corsi  })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.status) {
                        component.getUserData();
                        component.nuovoDocente.username = "";
                        component.nuovoDocente.password = "";
                        component.nuovoDocente.corsi = [];

                        component.msgNuovoDocente = "success";
                        setTimeout(function () {
                            component.msgNuovoDocente = "";
                        }, 3000);
                    }else{
                        component.msgNuovoDocente = "error";
                        setTimeout(function () {
                            component.msgNuovoDocente = "";
                        }, 3000);
                    }
                })
            }else{
                component.msgNuovoDocente = "errorInput";
                setTimeout(function () {
                    component.msgNuovoDocente = "";
                }, 3000);
            }
        },

        gestireCorso: function(index){
            this.$set(this.corsoDaGestire, 'id_corso', this.corsi[index].id);
            this.corsoScelto = this.corsi[index].nome_corso;
        },

        bindCorsi: function(){
            let corsi = [];
            for (var i = 0; i < this.nuovoDocente.corsi.length; i++) {
                if (this.nuovoDocente.corsi[i]) { corsi.push(this.corsi[i]); }
            }
            return corsi;
        },

        inserireEsame: function(){
            var component = this;
            var date = new Date(this.nuovoEsame.data_esame);
            today = new Date();
            if (this.nuovoEsame.id_aula !== "" && this.nuovoEsame.id_corso !== "" && this.nuovoEsame.data_esame !== "" && date > today){
                axios.post('/inserireEsame', { esame: component.nuovoEsame })
                .then(function (res) { 
                    if(res.data.status){
                        component.getUserData();
                        component.esameMsg = "success";
                        setTimeout(function () {
                            component.esameMsg = "";
                        }, 3000);
                    }else{
                        component.esameMsg = "errorExists";
                        setTimeout(function () {
                            component.esameMsg = "";
                        }, 3000);        
                    }    
                })
            }else{
                component.esameMsg = "error";
                setTimeout(function(){
                    component.esameMsg = "";
                }, 3000);
            }
        },

        getListaOrariDisponibili: function(){
            var component = this;
            let id_aula = component.corsoDaGestire.id_aula;
            component.corsoDaGestire.id_orario = "";
            axios.post('/getListaOrariDisponibili', { id_aula: id_aula }).then(function (res) { console.log(res.data); component.$set(component, 'orariDisponibili', res.data.value) })
        },
        
        print: function(){
            window.print();
        },

        logout: function(){
            window.location.replace('/logout');
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