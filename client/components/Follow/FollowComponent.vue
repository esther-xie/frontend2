<template>
    <article>
    <section class="followsection">
      <button class="followbutton"
        v-if="$store.state.username !== null && allFollows==0"
        @click="addFollow"
      >
        follow
      </button>
      <button class="followbutton"
      v-if="$store.state.username !== null && allFollows==1"
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
        },
    },
    data() {
      return {
        exists: [],
        alerts: {} // Displays success/error messages encountered during freet modification
      };
    },
    computed:{
      allFollows(){
        return this.$store.state.following.filter(follow => follow.followingdom === this.dom._id).length;
      }
    },
    methods: {
    //   existingfollow() {
    //   /**
    //    * Return if user has liked freet
    //    */
    //   this.$store.commit('refreshAllFollowingDom');
    //   const allFollows = this.$store.state.following;
    //   console.log(this.$store.state.following);
    //   const exists = allfollows
    //                    .filter(follow => follow.followingdom === this.dom._id).length;
    //   this.exists = exists;
    // },
      async addFollow() {
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
          this.$store.commit('refreshAllFollowingDom'); 
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
        
      }
    },
    // created(){
    //   this.existingfollow();
    // }
  };
  </script>
  
  <style scoped>

  </style>