<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <div
        v-if="$store.state.doms.length"
      >
        <CreateFreetForm />
      </div>
      <div
        v-else>
        <h3> 
          <router-link to="/dom">
            Create a dom 
          </router-link>
          to start freeting! </h3>
      </div>
    </section>
  </main>
</template>

<script>
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';

export default {
  name: 'CreateFreetPage',
  components: {CreateFreetForm},
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
