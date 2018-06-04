<template>
  <div class="choose-component">
    <ul class="choose-list">
      <li v-for="(item, index) in selections" :key="item.id" @click="chooseSelection(index)" :title="item.label" :class="{active:index === nowIndex}">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default () {
        return [{
          label: 'test',
          value: 0
        }]
      }
    }
  },
  data () {
    return {
      nowIndex: 0
    }
  },
  methods: {
    chooseSelection (index) {
      this.nowIndex = index
      this.$emit('on-change', this.nowIndex)
    }
  }
}
</script>

<style scoped>
.choose-component {
  display: inline-block;
  position: relative;
}

.choose-component ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.choose-component ul li {
  padding: 5px 15px;
  margin-right: 5px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  cursor: pointer;
  background: #e3e3e3;
}

.choose-component ul li.active {
  background: #4fc08d;
  color: #fff;
}
</style>
