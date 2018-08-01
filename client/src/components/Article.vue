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
      <div id="comment" class="row">
        <div v-if="!editmode" class="content">
          <h3 id="bahaha">{{article.title}}</h3>
          <img id="oitdah" v-bind:src="article.image">
          <p id="isinya" v-html="article.article" align="justify">
            {{article.article}}
          </p>

          <div v-if="!comment" @click="commentButton($route.params.id)" id="commentbutton" class="col s3 right">
            <button>Comment</button>
          </div>

        </div>

        <div id="foreditarticle" v-else class="content">

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
      <hr>
      <div id="tablecomment" class="row">
        <div class="col s6 m3 l3">
          <h6>
            <a @click="showcomment()" id="commenthide">Comments --></a>
          </h6>
        </div>

        <div v-if="hiddencomment">
          <div v-if="userComment.articleId === $route.params.id" v-for="userComment in comments" :key="userComment" class="col s12 m12 l12">
            <div class="card white darken-1">
              <div class="card-action grey">

              </div>
              <div class="card-content white-text">
                <h6 id="commentcontent" v-html="userComment.body" style="text-align:left">{{userComment.body}}</h6>
              </div>
            </div>

          </div>
        </div>

        <div v-if="hiddencomment" class="col s6 m4 l4 right">
          <h6>
            <a @click="hideforcomment()" id="commenthide"> Less comments--> </a>
          </h6>
        </div>
      </div>

      <div v-if="comment" id="editorrow" class="row">
        <vue-editor v-model="bodyComment"></vue-editor>
        <div class="row">

          <div v-if="comment" id="commentbuttonfix" class="col s3 right">
            <button @click="addComment({id:$route.params.id,comment:bodyComment})">Comment</button>
          </div>

          <div v-if="comment" id="commentbuttonfix" class="col s3 right">
            <button @click="cancel()">Cancel</button>
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
      seen: false,
      comment: false,
      bodyComment: '',
      hiddencomment: false
    }
  },
  created() {
    if (localStorage.hasOwnProperty('token') === true) {
      this.seen = true
    }
    this.getComment()
    this.getAll()
    this.getOneArticle()
  },
  watch: {
    $route(to, from) {
      this.getOneArticle()
    }
  },
  computed: {
    ...mapState(['articles', 'comments'])
  },
  methods: {
    ...mapActions(['getAll', 'addComment', 'getComment']),
    showcomment() {
      this.hiddencomment = true
    },
    hideforcomment() {
      this.hiddencomment = false
    },
    commentButton(id) {
      if (localStorage.hasOwnProperty('users')) {
        this.comment = true
      } else {
        this.$router.push(`/login/${id}`)
      }
    },
    cancel() {
      this.$router.push('/')
    },
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
#oitdah {
  padding: 20px;
}

#commenthide {
  color: black;
}

#commenthide:hover {
  color: blue;
}

#commentcontent {
  color: rgb(61, 59, 59);
}
#foreditarticle {
  margin-left: -10px;
}

#tablecomment {
}

#commentbutton {
  /* border: 1px solid black; */
  margin-right: 20px;
  /* background-color: rgb(233, 75, 88); */
  border-radius: 5px;
  color: white;
  font-family: cursive;
}

#commentbuttonfix {
  /* border: 1px solid black; */
  /* margin-right: 40px; */
  /* background-color: rgb(233, 75, 88); */
  border-radius: 5px;
  color: white;
  font-family: cursive;
}

#editorrow {
  /* border: 1px solid black; */
  width: 90%;
  margin-left: 20px;
}
</style>
