<template>
  <div class="counter-component">
    <div class="counter-btn" @click="minus"> - </div>
    <div class="counter-show">
      <input type="text" v-model="number" @keyup="fixNumber" />
    </div>
    <div class="counter-btn" @click="add"> + </div>
  </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: 20
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: this.min
    }
  },
  watch: {
    number () {
      this.$emit('on-change', this.number)
    }
  },
  methods: {
    minus () {
      if (this.number <= this.min) {
        return
      }

      this.number--
    },
    add () {
      if (this.number >= this.max) {
        return
      }

      this.number++
    },
    fixNumber () {
      let fix
      if (typeof this.number === 'string') {
        fix = Number(this.number.replace(/\D/g, ''))
      } else {
        fix = this.number
      }

      if (fix > this.max || fix < this.min) {
        fix = this.min
      }

      this.number = fix
    }
  }
}
</script>

<style scoped>
  .counter-component {
    display: flex;
    align-items: center;
  }

  .counter-btn {
    cursor: pointer;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border: 1px solid #e3e3e3;
  }

  .counter-btn:hover {
    background: #4fc08d;
    color: #fff;
  }

  .counter-show {
    border: 1px solid #e3e3e3;
    width: 30px;
    height: 20px;
    margin: 0 5px;
  }

  .counter-show input {
    width: 100%;
    height: 100%;
    text-align: center;
  }

</style>
