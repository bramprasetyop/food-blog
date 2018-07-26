<template>
  <div class="row">
    <div class="col s6">
      <div id="id01" class="modal">
        <form class="modal-content animate" action="/action_page.php">
          <div class="imgcontainer">
            <span onclick="document.getElementById('id01').style.display='none'" class="close">&times;</span>
          </div>
          <div class="container">
            <label for="name">
              <b>Email</b>
            </label>
            <input v-model="body" type="email" placeholder="Email..." name="name">

            <label for="psw">
              <b>Password</b>
            </label>
            <input v-model="status" type="password" placeholder="Password..." name="psw">

            <button onclick="document.getElementById('id01').style.display='none'" @click="login()" type="button">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

