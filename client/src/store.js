import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    comments: []
  },
  mutations: {
    SET_ARTICLES(state, payload) {
      // console.log("msk mtate");

      state.articles = payload
    },
    SET_ARTICLE(state, payload) {
      state.article = payload
    },
    set_get_comment(state, payload) {
      state.comments = payload
    }
  },
  actions: {
    addComment({
      commit
    }, payload) {
      if (payload.comment === '') {
        swal({
          text: 'Cannot post empty comment',
          icon: 'error'
        })
      } else {
        let addComment = {
          body: payload.comment,
          articleId: payload.id,
        }
        
        axios.post('https://api-blog.bramaprasetyo.co/comments', addComment, {
            headers: {
              users: localStorage.getItem('users')
            }
          })
          .then(response => {
            Router.push(`/`)
            console.log(response);
            localStorage.removeItem('users')

          })
      }
    },
    getComment({
      commit
    }, payload) {
      axios.get('https://api-blog.bramaprasetyo.co/comments/all')
        .then(response => {
          // console.log('===============',response.data.Comment);
          payload = response.data.Comment
          commit("set_get_comment", payload)


        })
    },
    getAll({
      commit
    }, payload) {
      axios({
          method: "get",
          url: "https://api-blog.bramaprasetyo.co/home/articles"
        })
        .then(({
          data
        }) => {
          payload = data.Article
          commit("SET_ARTICLES", payload)
        })
        .catch(err => {
          console.log(err.message);
        })
    }
  }
})