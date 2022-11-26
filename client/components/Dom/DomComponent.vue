<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="dom"
  >
    <header>
      <div class="actions"
      v-if="$store.state.username === dom.author">
        <button
          v-if="editing"
          @click="submitEdit"
        >
          ✅ Save changes
        </button>
        <button
          v-if="editing"
          @click="stopEditing"
        >
          🚫 Discard changes
        </button>
        <button
          v-if="!editing"
          @click="startEditing"
        >
          ✏️ Edit
        </button>
        <button @click="deleteDom">
          🗑️ Delete
        </button>
      </div>
    </header>
    
      <label 
        v-if="editing"
        for="displayedname">
        Displayed Name
      </label>
      <textarea 
        v-if="editing"
        class="displayedname"
        :value="draftdname"
        @input="draftdname = $event.target.value"
      />
      <h3
        v-else
        class="displayedname"
      >
        <router-link :to="`/dom/profile/${dom.author}/${dom.domname}`">
          @{{ dom.displayedname }}
        </router-link>
      </h3>

      <label 
        v-if="editing"
        for="domname">
        Dom Name
      </label>
      <textarea 
        v-if="editing"
        class="domname"
        :value="draftname"
        @input="draftname = $event.target.value"
      />
      <p
        v-else
        class="domname"
      >
        <router-link :to="`/dom/profile/${dom.author}/${dom.domname}`">
          (dom) {{ dom.domname }}
        </router-link>
      </p>

      <div
        v-if="!editing"
        class="followers">
        {{ this.followers.length }} followers
      </div> 
      <div
        v-if="$store.state.username !== dom.author"
        class="follow">
        <FollowComponent
        :dom="dom"/>
      </div>

      <label 
        v-if="editing"
        for="description">
        Description
      </label>
      <textarea 
        v-if="editing"
        class="description"
        :value="draftdescription"
        @input="draftdescription = $event.target.value"
      />
      <p
        v-else
        class="description"
      >
        {{ dom.description }}
      </p>

      <p class="info">
        Created at {{ dom.dateModified }}
        <i v-if="dom.edited">(edited)</i>
      </p>
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
import FollowComponent from '@/components/Follow/FollowComponent.vue';

export default {
  name: 'DomComponent',
  components: {FollowComponent},
  props: {
    // Data from the stored doms
    dom: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // Whether or not this freet is in edit mode
      draftdname: this.dom.displayedname, // Potentially-new content for this freet
      draftname: this.dom.domname, // The content of our current "draft" while being edited
      draftdescription: this.dom.description, // The content of our current "draft" while being edited
      followers:'',
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  created(){
    this.getFollowers();
  },
  methods: {
    async getFollowers() {
         /**
         * Get the followers for a user
         */
        const url = `/api/follows/follower/${this.dom._id}`;
        try {
          const r = await fetch(url);
          const res = await r.json();
          this.followers = res['response'] ? res['response'] : res['message']; //['data']; 
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }, 
    startEditing() {
      /**
       * Enables edit mode on this freet.
       */
      this.editing = true; // Keeps track of if a freet is being edited
      this.draftdname = this.dom.displayedname; // The content of our current "draft" while being edited
      this.draftname = this.dom.domname; // The content of our current "draft" while being edited
      this.draftdescription = this.dom.description; // The content of our current "draft" while being edited
    },
    stopEditing() {
      /**
       * Disables edit mode on this freet.
       */
      this.editing = false;
      this.draftdname = this.dom.displayedname; // The content of our current "draft" while being edited
      this.draftname = this.dom.domname; // The content of our current "draft" while being edited
      this.draftdescription = this.dom.description; // The content of our current "draft" while being edited
    },
    deleteDom() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted dom!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    submitEdit() {
      /**
       * Updates freet to have the submitted draft content.
       */
      if (this.dom.domname === this.draftname && this.dom.displayedname === this.draftdname && this.dom.description === this.draftdescription) {
        const error = 'Error: Edited freet content should be different than current freet content.';
        this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      const params = {
        method: 'PATCH',
        message: 'Successfully edited dom!',
        body: JSON.stringify({domname: this.draftname, displayedname: this.draftdname, description: this.draftdescription}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
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
        const r = await fetch(`/api/doms/${this.dom._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshMyDoms');

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
.dom {
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  background-color: rgb(255, 245, 245);
  box-shadow: 0 0 0.25em rgb(218, 218, 218);
  border-radius: 0.5em;
}

.displayedname, .domname, .description{
  display: block;
}

.description{
  font-size: 90%;
  color:rgb(80, 80, 80);
}
</style>
