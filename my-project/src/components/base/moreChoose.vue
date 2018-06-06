<template>
  <div class="choose-component">
    <ul class="choose-list">
      <li v-for="(item, index) in selections" :key="item.id" @click="toggleSelection(index)" :title="item.label" :class="{active: checkActive(index)}">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'

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
      nowIndexes: [0]
    }
  },
  methods: {
    toggleSelection (index) {
      if (this.nowIndexes.indexOf(index) === -1) {
        this.nowIndexes.push(index)
      } else {
        this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
          return idx !== index
        })
      }

      let nowObjArr = _.map(this.nowIndexes, (idx) => {
        return this.selections[idx]
      })

      this.$emit('on-change', nowObjArr)
    },
    checkActive (index) {
      return this.nowIndexes.indexOf(index) !== -1
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
