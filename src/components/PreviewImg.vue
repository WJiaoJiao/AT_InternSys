<template>
    <el-dialog
        :title="title"
        :visible="visible"
        width="340px"
        @close="close">
        <img :src="shadowSrc+'?t='+(new Date().getTime())" style="width: 300px;height:auto"/>
    </el-dialog>
</template>

<script>
export default {
  name: 'PreviewImg',
  props: ['title','visible','src'],
  data () {
    return {
      shadowSrc: ''
    }
  },
  watch: {
    src () {
      this.init()
    },
    visible () {
      if (this.visible) {
        this.init()
      } else {
        this.shadowSrc = ''
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.shadowSrc = this.src
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
