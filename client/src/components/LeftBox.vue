<template>
  <div>
    <div class="col s12" id="oit">

      <div class="col s5">
        <div id="oii">
          <router-link to="/about">
            <img id="itu" src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/10616439_10201985757480330_8973849717563076250_n.jpg?_nc_cat=0&_nc_eui2=AeE0txLW7RkfgZeWyFftSDPJbvX8mji5U4p5ozdkSWYbKKKDkqVBPabH73GdsHZN3qDVPenBhIawezobfUhXTHA3zu8I8_UM91m40UMRgej_6w&oh=f3c11d595e45d6af22090853f42bd53e&oe=5BE599FB" class="img-responsive" alt="">
          </router-link>

        </div>
      </div>

      <div id="rightprofile" class="col s7">

        <h6 id="nama">
          <b>Bram Prasetyo</b>
        </h6>
        <div class="row">
          <div id="actionprofile" class="col s6">

            <a style="font-size:40px" @click="twitter" class="fa fa-twitter"></a>

          </div>
          <div id="actionprofile" class="col s6">
            <a @click="facebook" style="font-size:40px" class="fa fa-facebook"></a>
          </div>
        </div>
      </div>

    </div>
    <div id="leftright">
      <h4 style="color:white">
        <strong>Articles</strong>
      </h4>

      <div v-for="(article,index) in articles" :key="index">

        <div class="row col s12">

          <a>
            <b>
              <router-link @click="changeHome()" :to="`/content/${article._id}`">{{article.title}}</router-link>
            </b>
          </a>
          <router-link @click="changeHome()" :to="`/content/${article._id}`"> <img v-bind:src="article.image"></router-link>

        </div>

      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      homepage: true
    }
  },
  created() {
    this.getAll()
  },
  computed: {
    ...mapState(['articles', 'article'])
  },
  methods: {
    ...mapActions(['getAll']),
    logout() {
      localStorage.clear()
      this.$router.push('/')
    },
    getOneArticle(id) {
      axios({
        method: 'get',
        url: `https://api-blog.bramaprasetyo.co/home/articles/${id}`
      })
        .then(({ data }) => {
          console.log('xxxxxxx', data)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    changeHome() {
      homepage: false
    },
    twitter() {
      window.location.href = 'https://twitter.com/bramaprasetyo'
    },
    facebook() {
      window.location.href = 'https://web.facebook.com/bram.prasetyo.98'
    }
  }
}
</script>


