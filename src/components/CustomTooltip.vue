<template>
  <div class="tooltip-box">
    <slot />
    <div class="tooltip">
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomTooltip",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tooltip-box {
  position: relative;
  width: 100%;
  display: inline-block;
}

.tooltip-box:hover .tooltip {
  opacity: 1;
}

.tooltip {
  color: #ffffff;
  text-align: center;
  padding: 5px 16px 5px 16px;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 1s;
  position: absolute;
  z-index: 1;

  background: #232f34;
}
</style>