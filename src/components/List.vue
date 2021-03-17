<template lang="pug">
.list
  transition-group(name='list')
    ul(
      v-for='item, index in list'
      :key='item._id'
      class='ToDoList'
    )
      ListHeader(:item='item' :index='index')
      .form-add-task
        FormTask(:name='item.name' :index='index')
      TaskList(:tasks='item.tasks' :index='index' :_id='item._id' :editItem='item.name')
  .book
    .back
    .page6
    .page5
    .page4
    .page3
    .page2
    .page1
    .front
  FormList
</template>

<script>
import ListHeader from '@/components/ListHeader.vue'
import ListButton from '@/components/ListButton.vue'
import FormList from '@/components/FormList.vue'
import TaskList from '@/components/TaskList.vue'
import FormTask from '@/components/FormTask.vue'

import { mapState } from 'vuex'

export default {
  name: 'List',
  data () {
    return {
      newList: '',
      dropStartIndex: -1,
      number: 1,
      arrayOfTasks: []
    }
  },
  props: {
    tasks: Array,
    item: Object,
    index: Number,
    _id: Number,
    name: String
  },
  components: {
    ListButton,
    ListHeader,
    TaskList,
    FormList,
    FormTask
  },
  computed: mapState({
    show: state => state.list.showForm,
    list: state => state.list.todolist
  }),
  mounted () {
    const book = document.getElementsByClassName('book')[0]
    const pages = book.querySelectorAll('.page1, .page2, .page3, .page4, .page5, .page6, .back, .front')

    setTimeout(function () {
      for (var i = 6; i > 0; i--) {
        pages[i].classList.add('page' + i + '-open')
      }
      pages[0].classList.add('back-open')
      pages[7].classList.add('front-open')
    }, 1)
  }
}
</script>

<style lang="scss">
.book {
  transform-style: preserve-3d;
  position: absolute;
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  width: 280px;
  height: 420px;
  transform: translateY(-50%);
  padding: 10px;
  top: 50%;
  left: 50%;
  perspective: 1200px;
  z-index: -1;
  transition: transform 1s ease-in-out;
}

.front, .back {
  transform-style: preserve-3d;
  position: absolute;
  width: 300px;
  height: 100%;
  top: 0;
  border-radius: 0 12px 12px 0;
  left: 0;
  transform-origin: left center;
  transition: transform 1s ease-in-out, box-shadow .35s ease-in-out;
  background: #F33139;
  background-image: linear-gradient(to right,#D11F2F 48px, #ba0716 50px, transparent 50px);
}

.page1, .page2, .page3, .page4, .page5, .page6 {
  transform-style: preserve-3d;
  position: absolute;
  border-radius: 0 12px 12px 0;
  width: 300px;
  height: 95%;
  top: 3%;
  left: 0;
  transform-origin: left center;
  transition: transform 1s ease-in-out, box-shadow .35s ease-in-out;
}

.page1 {
  background: #efefef;
}

.page2 {
  background: #efefef;
}

.page3 {
  background: #f5f5f5;
}

.page4 {
  background: #f5f5f5;
}

.page5 {
  background: #fafafa;
}

.page6 {
  background: #fdfdfd;
}

.front-open {
  transform: rotateY(-160deg);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.page1-open {
  transform: rotateY(-150deg);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.page2-open {
  transform: rotateY(-25deg);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.page3-open {
  transform: rotateY(-140deg);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.page4-open {
  transform: rotateY(-33deg);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.page5-open {
  transform: rotateY(-130deg);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.page6-open {
  transform: rotateY(-40deg);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.back-open {
  transform: rotateY(-20deg);
}

body {
  background: #8b5a2b
}
.ToDoList {
  border: 3px solid;
  border-radius: 1px 1px 15px 15px;
  margin-bottom: 25px;
  margin-left: 100px;
  margin-right: 100px;
  overflow: hidden;
  transition: all 1s;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.icon {
  padding-left: 2px;
  padding-right: 2px;
}
* ul {
  padding-inline-start: 0;
}
* input {
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
