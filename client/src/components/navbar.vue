<template>

  <img id="gambar" src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/36946922_10209811063148081_2038285663572328448_n.jpg?_nc_cat=0&oh=4f0f35118e28c5f0a9f564623a8e8306&oe=5BE6BAA2" >
  
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>
<style>

</style>






