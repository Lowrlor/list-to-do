<template lang="pug">
.list-button
  template(v-if='!editable')
    font-awesome-icon(icon="pen" class='icon')(@click='listEdit(item, index)')
    font-awesome-icon(icon="trash-alt" class='icon')(@click='removelist(index, item._id)')
  template(v-if='editable')
    button(@click='update(editableItem, index, item._id)') Save
    button(@click='listEdit(item)') X
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ListButton',
  data () {
    return {
    }
  },
  props: {
    item: Object,
    index: Number,
    editableItem: String
  },
  computed: mapState({
    editable: state => state.list.editable
  }),
  methods: {
    listEdit (item, index) {
      this.$store.dispatch('list/edit', { index, item })
        .then(() => {
          if (this.editable) {
            document.getElementsByClassName('list-input').[0].focus()
          } else {
            this.$parent.setValueOfItem()
          }
        })
    },
    update (data, index, id) {
      this.$http
        .post('/list/edit/' + id, { name: data })
        .then((response) => {
          this.$store.dispatch('list/edit')
          return response.data
        })
        .then((response) => {
          this.$store.dispatch('list/update', [response, index])
        })
        .catch(err => {
          console.log(err)
          console.log(this.$Err(err))
        })
    },
    removelist (index, id) {
      this.$http
        .delete('/list/remove/' + id)
        .then((response) => {
          this.$store.dispatch('list/removelist', index)
        })
        .catch(err => {
          console.log(this.$Err(err))
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-button {
  opacity: 0;
  .list-header:hover & {
    opacity: 1;
  }
}
</style>
