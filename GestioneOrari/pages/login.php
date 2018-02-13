<template id="login">
    <form class="form-signin">
        <h2 class="form-signin-heading">Accesso</h2>
    
        <label for="inputEmail" class="sr-only">Username</label>
        <input type="email" class="form-control" placeholder="Email address" autofocus v-model="username">
    
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="password">

        <div v-show="error" class="alert alert-danger" role="alert">Username o password sbagliata!</div>
        
        <button class="btn btn-lg btn-primary btn-block" type="button" @click="login">Login</button>
    </form>
</template>