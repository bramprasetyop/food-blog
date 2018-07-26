<template>
  <div>
    <div class="row col s12 m2 l2 right">
      <button @click="back()" id="addnew">Back</button>
    </div>

    <br>
    <br>
    <br>
    <br>
    <label for="">
      <h5>Title</h5>
    </label>
    <input v-model="title" type="text" placeholder="Add Here ...">
    <label for="name">
      <h5>Image</h5>
    </label>
    <div class="file-field input-field">
      <div class="btn">
        <span>File</span>
        <input @change="fetchImg" type="file">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div>

    <label for="">
      <h5>Article</h5>
    </label>&nbsp;
    <VueEditor v-model="content"></VueEditor>
    <div class="row col s12 m6 l6 right">
      <button @click="post" id="addnew">Add New Article</button>
    </div>

  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: '',
      title: '',
      img: ''
    }
  },
  methods: {
    fetchImg(e) {
      this.img = e.target.files[0]
    },
    post() {
      let formData = new FormData()
      formData.append('image', this.img)
      formData.append('title', this.title)
      formData.append('article', this.content)

      // ====================== axios ==========================

      axios({
        url: 'http://localhost:3000/home',
        method: 'post',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response);
          
          swal({
            text: 'Add Article Success',
            icon: 'success'
          })
          this.$router.push('/')
        })
        .catch(err => {
          swal({
            text: 'Something Error',
            icon: 'error'
          })
        })
      // ====================== axios ==========================
    },
    back() {
      this.$router.push('/')
    }
  }
}
</script>
