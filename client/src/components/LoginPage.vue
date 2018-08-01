<template>
  <div class="login">

    <div class="container">
      <div class="row">
        <div id="oiiiii" class="col s5 left">
          <div class="col s12">
            <label class="active left" for="full_name">Full Name</label>
            <input v-model="name" type="text" class="validate">

          </div>
          <div class="col s12">
            <label class="active left" for="email">Email</label>
            <input v-model="email" type="email" class="validate">

          </div>
          <div class="col s12">
            <label class="active left" for="password">Password</label>
            <input v-model="password" type="password" class="validate">

          </div>

          <div class="col s5 left">
            <button @click="signup($route.params.id)" class="btn waves-effect waves-light" type="submit" name="action">Signup
              <i class="material-icons right">send</i>
            </button>

          </div>
        </div>

        <div id="oiiii" class="col s2">
          <div class="vl">
            <span class="vl-innertext">or</span>
          </div>
        </div>

        <div id="oitt" class="col s5 right">
          <div class="col s12">
            <label class="active left" for="email">Email</label>
            <input v-model="emaillogin" type="email" class="validate">

          </div>
          <div class="col s12">
            <label class="active left" for="password">Password</label>
            <input v-model="passwordlogin" type="password" class="validate">

          </div>

          <div class="col s5 left">
            <button @click="signin($route.params.id)" class="btn waves-effect waves-light" type="submit" name="action">Login
              <i class="material-icons right">send</i>
            </button>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      emaillogin: '',
      passwordlogin: ''
    }
  },
  methods: {
    signup(id) {
      if (this.name === '' || this.email === '' || this.password === '') {
        swal({
          text: 'Something wrong',
          icon: 'success'
        })
      } else {
        let obj = {
          guestname: this.name,
          email: this.email,
          password: this.password
        }
        axios
          .post('https://api-blog.bramaprasetyo.co/guest/signup', obj)
          .then(response => {
            console.log(response)
            this.$router.push(`/login/${id}`)
            swal({
              text: 'Signup Success',
              icon: 'success'
            })

            this.name = ''
            this.email = ''
            this.password = ''
          })
      }
    },
    signin(id) {
      if (this.email === '' || this.password === '') {
        swal({
          text: 'Something wrong',
          icon: 'success'
        })
      } else {
        let obj = {
          email: this.emaillogin,
          password: this.passwordlogin
        }
        axios
          .post('https://api-blog.bramaprasetyo.co/guest/login', obj)
          .then(response => {
            console.log(response)
            localStorage.setItem('users', response.data.token)
            console.log(response)

            this.$router.push(`/content/${id}`)
            swal({
              text: 'Signin Success',
              icon: 'success'
            })
          })
          .catch(err => {
            swal({
              text: 'Something wrong',
              icon: 'success'
            })
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* .login{
  background-color: rgb(127, 214, 230);
  height: 700px;

  margin-top: -100px;
} */

#oiiiii {
  /* // border: 2px solid black; */
  margin-top: 60px;
  background-color: rgb(188, 225, 238);
  border-radius: 8px;
  padding: 50px;
  -webkit-box-shadow: 10px 10px 5px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px -7px rgba(0, 0, 0, 0.75);
}

#oitt {
  /* // border: 2px solid black; */
  margin-top: 100px;
  background-color: rgb(186, 213, 223);
  border-radius: 8px;
  padding: 50px;
  -webkit-box-shadow: 10px 10px 5px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px -7px rgba(0, 0, 0, 0.75);
}

#oiiii {
  /* // border: 2px solid black; */
  margin-top: 60px;

  padding: 50px;
}

.vl {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  border: 2px solid #ddd;
  height: 240px;
}

/* text inside the vertical line */
.vl-innertext {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 8px 10px;
}
</style>