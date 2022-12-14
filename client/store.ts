import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    doms: [],
    alldoms: [],
    following: [],
    riskscore: null, // the value related to each freet (fight - peace)
    allrisks: [], //All the alerts (risks) the user has posted
    username: null, // Username of the logged in user
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    updateDoms(state, doms) {
      /**
       * Update the stored freets to the provided freets.
       * @param doms - Freets to store
       */
      state.doms = doms;
    },
    updateFollowing(state, following) {
      /**
       * Update the stored freets to the provided freets.
       * @param doms - Freets to store
       */
      state.following = following;
    },
    updateRisk(state, allrisks) {
      /**
       * Update the stored freets to the provided freets.
       * @param doms - Freets to store
       */
      state.allrisks = allrisks;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    async refreshMyDoms(state) {
      /**
       * Request the server for the currently available doms.
       */
      const url = state.username ? `/api/doms?author=${state.username}` : '/api/doms';
      const res = await fetch(url).then(async r => r.json());
      state.doms = res;
    },
    async refreshAllDoms(state) {
      /**
       * Request the server for the currently available doms.
       */
      const url = '/api/doms';
      const res = await fetch(url).then(async r => r.json());
      state.alldoms = res;
    },
    async refreshAllFollowingDom(state) {
      /**
       * Request the server for all the doms the user is currently following.
       */
      const url = '/api/follows/following';
      const res = await fetch(url).then(async r => r.json());
      state.following = res.following;
    },
    async refreshAllRisk(state) {
      /**
       * Request the server for all the alerts (risks) the user posted.
       */
      const url = '/api/alerts/';
      const res = await fetch(url).then(async r => r.json());
      console.log(res);
      state.allrisks = res;
    },
    async refreshRiskScore(state){
      const url = state.freets ? `/api/alerts/num?freet=${state.freets}` : '/api/alerts';
      const res = await fetch(url).then(async r => r.json());
      state.riskscore = res;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
