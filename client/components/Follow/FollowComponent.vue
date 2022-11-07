<template>
    <article>
    <section class="followbutton">
      <button 
        @click="addFollow"
      >
        ♡ 
      </button>
      <button 
        v-if="existingfollow && $store.state.username !== null"
        @click="removeFollow"
      >
        ♥ 
      </button>
    </section>

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
    name: 'FollowComponent',
    props: {
      // Data from the stored dom
      dom: {
        type: Object,
        required: true
        }
    },
    data() {
      return {
        alerts: {} // Displays success/error messages encountered during freet modification
      };
    },
    methods: {
        existingfollow() {
        /**
         * Return if user has followed the dom
         */
        const allFollows = this.$store.state.follows;
        const exists = allFollows
                        .filter(follow => follow.user === this.$store.state.username)
                        .filter(filtered =>  filtered.dom === this.freet.dom)
                        .length;
        return exists;
        },
      addFollow() {
        const params = {
          method: 'POST',
          message: 'Successfully followed dom!',
          callback: () => {
            this.$set(this.alerts, params.message, 'success');
            setTimeout(() => this.$delete(this.alerts, params.message), 3000);
          }
        };
        this.FollowRequest(params);
      },
      removeFollow() {
        const params = {
          method: 'DELETE',
          message: 'Successfully unfollowed dom!',
          callback: () => {
            this.$set(this.alerts, params.message, 'success');
            setTimeout(() => this.$delete(this.alerts, params.message), 3000);
          }
        };
        this.FollowRequest(params);
      },
      async FollowRequest(params) {
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
          const r = await fetch('/api/follows', options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }
          this.$store.commit('refreshFollows'); 
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

  </style>