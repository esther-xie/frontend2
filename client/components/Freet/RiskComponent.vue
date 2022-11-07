<!-- If not signed in
    -	Cannot see high risk posts
    -	Cannot see risk components
If signed in
    -	Self post
        o	Can see self’s high risk posts
        o	Cannot see risk components
    -	Others’ post
        o	High risk posts folded
        o	Can see risk components  
-->

<template>
    <article
      v-if="$store.state.username !== freet.author && $store.state.username !== null" 
      class="risk"
    >
      <p
        v-if="$store.state.numrisks > 3">
        Might be unfriendly contents.
      </p>

      <!-- if the user has not added fight -->
      <button 
        v-if="$store.state.addfight" 
        @click="addFight"
        id="fight0">
        <img class="fight-icon"
          src="../../public/fight0.svg"/>
      </button>
      <!-- else -->
      <button 
        v-else
        @click="removeFight"
      >
        <img class="fight-icon"
          src="../../public/fight1.svg"/> 
      </button>

      <!-- only for high risks posts -->
      <!-- if has not added peace -->
      <button 
        v-if="$store.state.numrisks > 3">
        @click="addPeace"
      >
        ♡ 
      </button>
      <!-- else -->
      <!-- <button 
        @click="removePeace"
      >
        ♥ 
      </button> -->
      <section class="alerts">
        <article
          v-for="(status, alert, index) in alerts"
          :key="index"
          :class="status"
        >
          <p>{{ alert }}</p>
        </article>
      </section>
    </article>
  </template>

  
<script>
export default {
  name: 'RiskComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  computed: {
    Risks() {
      this.toggle;
      console.log("hi", this.$store.state.risks[this.model][this.id]);
      return this.$store.state.risks[this.model][this.id];
    },
    numRisks: function() {
      return this.item.numFights - this.item.numPeace;
    }
  },
  methods: {
   addFight() {
      /**
       * Creates a user like for a freet (freet must be authored by another user)
       */
      const params = {
        method: 'POST',
        message: 'Successfully alerted freet!',
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.RiskRequest(params);
    },
    removeRisk() {
      /**
       * Removes a user like (Unlike) for a freet (freet must be authored by another user)
       */
      const params = {
        method: 'DELETE',
        message: 'Successfully removed your alert!',
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.RiskRequest(params);
    },
    addPeace() {
      /**
       * Creates a user like for a freet (freet must be authored by another user)
       */
      const params = {
        method: 'POST',
        message: 'Successfully added peace to the freet!',
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.RiskRequest(params);
    },
    removePeace() {
      /**
       * Removes a user like (Unlike) for a freet (freet must be authored by another user)
       */
      const params = {
        method: 'DELETE',
        message: 'Successfully removed the peace!',
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.RiskRequest(params);
    },
  }
};
</script>

<style scoped>
.fight-icon {
  width: 1.3rem;
  height: 1.3rem;
}

</style>