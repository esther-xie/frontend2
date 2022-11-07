<!-- Page for dom details and freets -->

<template>
  <main>
    <section>
        <DomComponent
          :dom=dom
        />
    </section>
    <section>
      <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet"
        />
    </section>
  </main>
</template>

<script>

import CreateDomForm from '@/components/Dom/CreateDomForm.vue';
import DomComponent from '@/components/Dom/DomComponent.vue';
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'DomPage',
  components: {CreateDomForm, DomComponent, FreetComponent},
  data(){
    return{
      loading: true,
    }
  },
  computed:{
    dom(){
      const domname = this.$route.params.domname;
      const author = this.$route.params.author;
      const alldoms = this.$store.state.alldoms;
      return alldoms.find(dom => dom.domname === domname && dom.author === author);
    }
  },
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
