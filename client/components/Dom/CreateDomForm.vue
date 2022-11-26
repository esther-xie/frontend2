<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateDomForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/doms',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'domname', label: 'Dom Name', value: ''},
        {id: 'displayedname', label: 'Displayed Name', value: ''},
        {id: 'description', label: 'Description', value: ''}
      ],
      title: 'Create a dom',
      // refreshFreets: true,
      callback: () => {
        const message = 'Successfully created a dom!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
