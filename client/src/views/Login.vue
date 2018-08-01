<template>
  <div>
    <Navbar/>
    <SecondNavbar/>
    <LoginPage/>
  </div>

</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import LoginPage from '@/components/LoginPage.vue'
import Navbar from '@/components/navbar.vue'
import SecondNavbar from '@/components/LoginNavbar.vue'

export default {
  name: 'logins',
  components: {
    LoginPage,
    Navbar,
    SecondNavbar
  }
}
</script>