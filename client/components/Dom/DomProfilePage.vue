<!-- Page for dom details and freets -->

<template>
  <main>
    <h3> Dom page for {{dom.domname}}</h3>
    <section>
        <DomComponent
          :dom=dom
        />
    </section>
    <section>
      <FreetComponent
          :freet=freet
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
      const alldoms = this.$store.state.alldoms;
      const dom = alldoms
                .filter(dom => dom.domname === this.$route.params.domname)
                .filter(filtered => filtered.author === this.$route.params.author)[0];
      return dom;
    },
    freet(){
      const allfreets = this.$store.state.freets;
      const freet = allfreets
                .filter(freet => freet.domId.domname === this.$route.params.domname)[0];
      return freet;
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
