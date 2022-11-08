<template>
    <article>
    <section class="followbutton">
      <button 
        v-if="$store.state.username !== null"
        @click="addFollow"
      >
        follow
      </button>
      <button 
      v-if="$store.state.username !== null
        "
        @click="removeFollow"
      >
        unfollow
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
       * Return if user has liked freet
       */
      const allfollows = this.$store.state.follows;
      const exists = allfollows
                       .filter(follow => follow.domId === this.dom._id)
                       .length === 1;
      return exists;
    },
      async addFollow() {
        console.log(this.dom._id);
        console.log(this.$store.state.username);
        const requestOptions = {
          method: 'POST'
        };
          const url =`/api/follows/${this.dom._id}`;
          try {
          const r = await fetch(url, requestOptions);
          const res = await r.json();
          if (!r.ok) {
            throw new Error(res.error);
          }
          const message = 'Successfully followed dom!';
          this.$set(this.alerts, message, 'success');
          setTimeout(() => this.$delete(this.alerts, message), 3000);
          // this.$store.commit('alert', {
          //     message: `Successfully followed ${this.user.username}!`, status: 'success'
          //   });
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      },
      async removeFollow() {
         /**
         * Logged in user unfollows another user
         */
         const requestOptions = {
              method: 'DELETE'
          };
        const url = `/api/follows/${this.dom._id}`;
        try {
          const r = await fetch(url, requestOptions);
          const res = await r.json();
          if (!r.ok) {
            throw new Error(res.error);
          }
          const message = `Successfully unfollowed dom!`;
          this.$set(this.alerts, message, 'success');
          setTimeout(() => this.$delete(this.alerts, message), 3000);
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
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