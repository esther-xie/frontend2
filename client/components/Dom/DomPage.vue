<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <h3>New Dom</h3>
        <CreateDomForm />
        <div>
          <h2>
            Doms for @{{ $store.state.username }}
          </h2>
        </div>
      <section
        v-if="$store.state.doms.length"
      >
        <DomComponent
          v-for="dom in $store.state.doms"
          :key="dom.id"
          :dom="dom"
        />
      </section>
      <!-- CHANGE LATER: CAN'T HAVE NO DOM -->
      <article
        v-else
      >
        <h3>No doms found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import CreateDomForm from '@/components/Dom/CreateDomForm.vue';
import DomComponent from '@/components/Dom/DomComponent.vue';

export default {
  name: 'DomPageComponent',
  components: {CreateDomForm, DomComponent},
  data(){
    return{
      loading: true,
    }
  },
  async mounted() {
    await this.getMyDoms();
  },
  methods:{
    async getMyDoms(){
        await this.$store.commit('refreshMyDoms');
        this.loading = false;
    }
  }
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
