<template>
    <div class="details">
        <div id="comment" class="row">
            <div class="content">
                <h3 id="bahaha" >{{articles[0].title}}</h3>
                <img id="oitdah" v-bind:src="articles[0].image">
                <p v-html= "articles[0].article" align="justify">
                    {{articles[0].article}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    this.getAll()
    this.getComment()
  },
  watch: {
    $route(to, from) {
      this.getOneArticle()
    }
  },
  computed: {
    ...mapState(['articles','comments'])
  },
  methods: {
    ...mapActions(['getAll','getComment'])
  }
}
</script>

<style>

</style>
