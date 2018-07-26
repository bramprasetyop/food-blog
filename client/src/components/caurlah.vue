<template>
    <div class="details">
        <div id="comment" class="row">
            <div class="content">
                <h4 id="judulbang" >{{articles[0].title}}</h4>
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
    ...mapActions(['getAll'])
  }
}
</script>

<style>

</style>
