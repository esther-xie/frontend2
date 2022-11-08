<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <img src="../../public/logo.svg">
      <router-link to="/">
        <h1 class="title">
          Fritter
        </h1>
      </router-link>
    </div>
    <div class="center">
      <router-link to="/">
        Home
      </router-link>
    </div>
    <div class="right">
      <span class="nav-create">
        <router-link
          id="create"
          v-if="$store.state.username"
          to="/create"
        >
          Create
        </router-link>
      </span>
      <router-link
        v-if="$store.state.username"
        to="/dom"
      >
        Doms
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/account"
      >
        Account
      </router-link>
      <router-link
        v-else
        to="/login"
      >
        Login
      </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>

nav {
    padding: 1vw 2vw;
    background-color:#4166bb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    font-weight: 900;
    filter: drop-shadow(0 0 1rem #4166bb)
}

a:link {
  color: #f5f5dc;
  text-decoration: none;
}

a:visited {
  color: beige;
  text-decoration: none;
}

a:hover {
  color: rgb(255, 119, 119);
}

.title {
    font-size: 32px;
    margin: 0 5px;
    color: #94d4ff;
}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
}

.center{
  margin: auto;
}

.nav-create{
  align-items: center;
  background-color: rgb(255, 119, 119);
  border-radius: 5em;
}
.nav-create:hover{
  background-color:white;
}

#create{
  margin: 0.5em;
}
.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}
</style>
