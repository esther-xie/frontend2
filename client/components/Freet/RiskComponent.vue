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
        v-if="$store.state.riskscore > 3">
        Might be unfriendly contents.
      </p>

      <!-- if the user has not added fight -->
      <button 
        v-if="this.risks==0"
        class="riskbutton"
        @click="() => addRisk('fight')">
        <img class="fight-icon"
          src="../../public/fight0.svg"/>
      </button>
      <!-- else -->
      <button 
        v-else
        @click="removeRisk"
        class="riskbutton"
      >
        <img class="fight-icon"
          src="../../public/fight1.svg"/> 
      </button>

      <!-- only for high risks posts -->
      <!-- if has not added peace -->
      <button 
        v-if="$store.state.numrisks > 3
        && this.risks==0" 
        class="riskbutton"
        @click="() => addRisk('peace')"
        >
        <img class="fight-icon"
          src="../../public/peace0.svg"/> 
      </button>
      <!-- else -->
      <button 
      v-if="$store.state.numrisks > 3
        && this.risks==1" 
        @click="removeRisk"
        class="riskbutton">
        <img class="fight-icon"
          src="../../public/peace1.svg"/> 
      </button>
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
      risks:'',
      value: 'fight',
      alerts: {}, // Displays success/error messages encountered during freet modification
    };
  },
  // computed:{
  //   exists(){
  //       return this.risks.filter(alert => alert.author === this.$store.state.username).length;
  //     }
  //   },
  created(){
    this.getRisks();
  },
  methods: {
    async getRisks() {
         /**
         * Get the followers for a user
         */
        const url = `/api/alerts/${this._id}`;
        try {
          const r = await fetch(url);
          const res = await r.json();
          this.risks = res['response'] ? res['response'] : res['message']; //['data']; 
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }, 
    addRisk(typeofrisk) {
      /**
       * Creates a fight alert/ peace alert for a freet
       */
      const params = {
        method: 'POST',
        body: JSON.stringify({value: typeofrisk}),
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
       * Removes a fight alert/ peace for a freet
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

    async RiskRequest(params) {
      /**
       * Submits a request to the like's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }
      try {
        const r = await fetch(`/api/alerts/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshAllRisk'); //refresh number of alerts
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>

.riskbutton{
  border: none;
  background-color: transparent;
}
.fight-icon {
  width: 1.3rem;
  height: 1.3rem;
}

</style>