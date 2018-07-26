<template>
  <div id="ciat" class="row">
    <div id="nah" class=" col s2">
      <h6>
        <router-link to="/">
          <a> Home</a>
        </router-link>
        
      </h6>
    </div>
    <div id="nah" class=" col s2">
      <h6>
        <a>About</a>
      </h6>
    </div>
    <div id="nah" class=" col s2">
      <h6>
        <a>profile</a>
      </h6>
    </div>
    <div id="nah" class=" col s2">
      <h6>
        <a>Contact</a>
      </h6>
    </div>
    <div id="nah" class=" col s3">
      <div v-show="post" id="nahi" class="col s4">
        <button class="waves-effect waves-light btn-small">
          <router-link to="/post">
            <h6 id="postbuton">Post</h6>
          </router-link>
        </button>
      </div>
      <div id="nahi" class="col s6 m6 l6">
        <button onclick="document.getElementById('id01').style.display='block'" class="waves-effect waves-light btn-small">Login</button>
      </div>
      <div v-show="post" id="nahi" class="col s6 m6 l6">
        <button @click="logout()" class="waves-effect waves-light btn-small">Logout</button>
      </div>
    </div>

    <div class="row">
      <div class="col s12 m6 l6">
        <div id="id01" class="modal">

          <form class="modal-content animate">

            <div class="row">
              <div class="col s12 m12 l12">
                <label>
                  <b>Email</b>
                </label>
                <input v-model="body" type="email" placeholder="Enter Email">

                <label>
                  <b>Password</b>
                </label>
                <input v-model="status" type="password" placeholder="Enter Password">

                <div class="col s12 m12 l12 right">
                  <button onclick="document.getElementById('id01').style.display='none'" @click="login()" class="cancelbtnn" type="button">Login</button>

                </div>
                <div class="col s12 m12 l12 right">
                  <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                </div>
              </div>

            </div>

          </form>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
// Get the modal
var modal = document.getElementById('id01')

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
import { VueEditor } from 'vue2-editor'

import axios from 'axios'

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      status: '',
      body: '',
      title: '',
      article: '',
      loginStatus: '',
      content: '',
      post: false
    }
  },
  created() {
    if (localStorage.hasOwnProperty('token') === true) {
      this.post = true
    }
  },
  methods: {
    logout() {
      if (localStorage.hasOwnProperty('token') === true) {
        swal({
          text: 'Logout Success',
          icon: 'success'
        })
        localStorage.clear()
        this.$router.push('/')
        this.post = false
      }
    },
    login() {
      let obj = {
        email: this.body,
        password: this.status
      }
      axios
        .post('http://localhost:3000/login', obj)
        .then(response => {
          // console.log(response);
          localStorage.setItem('token', response.data.token)
          this.$router.push('/')
          this.post = true
          this.body = ''
          this.status = ''
          swal({
            text: 'Login Success',
            icon: 'success'
          })
        })
        .catch(err => {
          swal({
            text: 'Email/ Username Wrong',
            icon: 'error'
          })
        })
    }
  }
}
</script>






