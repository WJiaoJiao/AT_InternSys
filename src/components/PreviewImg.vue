<template>
    <el-dialog
        :title="title"
        :visible="visible"
        width="340px"
        @close="close">
        <img :src="src" style="width: 300px;height:auto"/>
    </el-dialog>
</template>

<script>
export default {
  name: 'PreviewImg',
  props: ['title','visible','src'],
  data () {
    return {
      
    }
  },
  methods: {
    close() {
        this.$emit('close');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
