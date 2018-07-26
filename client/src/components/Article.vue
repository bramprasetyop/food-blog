<template>
  <div class="details">

    <div class="content">

      <div v-show="seen" class="row">
        <div class="col s7 right">
          <div class="col s3 right">
            <button id="tombol" @click="toggleEdit()">Edit</button>
          </div>
          <div class="col s4 right">
            <button @click="deleteContent(article._id)" id="tombol">Delete</button>
          </div>
        </div>
      </div>

      <div v-if="!editmode" class="content">
        <h3 id="bahaha">{{article.title}}</h3>
        <img id="oitdah" v-bind:src="article.image">
        <p id="isinya" v-html="article.article" align="justify">
          {{article.article}}
        </p>
      </div>

      <div v-else class="content">

        <h4>{{article.title}}</h4>
        <VueEditor v-model="article.article"> </VueEditor>

        <div id="comment" class="row">
          <div class="col s7 right">
            <div class="col s3 right">
              <button @click="editContent(article._id)" id="tombol">Save</button>
            </div>
            <div class="col s4 right">
              <button @click="toggleEdit()" id="tombol">Cancel</button>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      article: '',
      editmode: false,
      seen: false
    }
  },
  created() {
    if (localStorage.hasOwnProperty('token') === true) {
      this.seen = true
    }

    this.getAll()
    this.getOneArticle()
  },
  watch: {
    $route(to, from) {
      this.getOneArticle()
    }
  },
  computed: {
    ...mapState(['articles'])
  },
  methods: {
    ...mapActions(['getAll']),

    getOneArticle() {
      axios({
        method: 'get',
        url: `http://localhost:3000/home/articles/${this.$route.params.id}`
      }).then(response => {
        // console.log(response.data.Article)

        this.article = response.data.Article
        // console.log(this.article.article)
      })
    },
    toggleEdit() {
      this.editmode = !this.editmode
      console.log(this.editmode)
    },
    editContent(id) {
      let token = localStorage.getItem('token')
      const body = {
        article: this.article.article
      }

      axios
        .put(`http://localhost:3000/home/articles/${id}`, body, {
          headers: {
            token: token
          }
        })
        .then(response => {
          // console.log(response);
          swal({
            text: 'Edit Article Success',
            icon: 'success'
          })

          // this.editmode = false
          this.$router.push('/')
        })
        .catch(err => {
          swal({
            text: 'Something Wrong',
            icon: 'error'
          })
        })
    },
    deleteContent(id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this Article!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          swal('Poof! Your Article has been deleted!', {
            icon: 'success'
          })
          axios
            .delete(`http://localhost:3000/home/articles/${id}`, {
              headers: {
                token: token
              }
            })
            .then(response => {
              this.$router.push('/')
            })
        } else {
          swal('Your Article is safe!')
        }
      })

      let token = localStorage.getItem('token')
    }
  }
}
</script>


<style>
#oitdah{
  padding: 20px;
}
</style>
