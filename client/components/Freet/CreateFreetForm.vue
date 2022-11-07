Form for creating freets (block style)
<template>
  <form @submit.prevent="submit">
    <h3>{{ title }}</h3>

    <div class="dom-container">
      <label> Dom: </label>
      <div class="posting-dom"          
      v-for="dom in $store.state.doms">
        <label :for="dom.domname">
          {{ dom.domname }}
        </label>
        <input
            :id="dom.domname"
            :key="dom.id"
            :dom="dom"
            type="checkbox"
            :value="dom._id"
            @input="selectedDomId = dom._id"
          />
      </div>
    </div>

    <article
      v-if="fields.length"
    >
      <div
        v-for="field in fields"
        :key="field.id"
      >
        <label :for="field.id">{{ field.label }}:</label>
        <textarea
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        />
      </div>
    </article>
    <article v-else>
      <p>{{ content }}</p>
    </article>
    <button
      type="submit"
    >
      {{ title }}
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
  </form>
</template>


<script>
// import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFreetForm',
  // mixins: [BlockForm],
  data() {
    return {
      url: '/api/freets',
      method: 'POST',
      fields: [
        {id: 'content', label: 'Content', value: ''}
      ],
      selectedDomId: "",
      title: 'Create a freet',
      refreshFreets: true,
      callback: () => {
        const message = 'Successfully created a freet!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };

      console.log(this.selectedDomId);

      options.body = JSON.stringify({
        domId: this.selectedDomId,
        content: this.fields[0].value,
      })

      try {
        const r = await fetch(this.url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.refreshFreets) {
          this.$store.commit('refreshFreets');
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
form {
  background-color: #f0f4fb;
  box-shadow: 0 0 0.5em rgb(197, 192, 255);
  border-radius: 0.5em;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
}

button{
  background-color: #4166bb;
  padding: 0.3em;
  border-radius: 0.5em;
  font-family: Roboto;
  color: white;
  font-size:100%;
  width: fit-content;
  align-self: flex-end;
}

button:hover{
  background-color: rgb(255, 119, 119);
}

article > div {
  display: flex;
  flex-direction: column;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

textarea {
   font-family: inherit;
   font-size: inherit;
}

.posting-dom{
  display: inline-block;
  margin-right: 0.5em;
  padding-left: 0.75em;
  padding-right: 0.75em;
  background-color:#a5bbed;
  border-radius: 2em;
}
</style>
