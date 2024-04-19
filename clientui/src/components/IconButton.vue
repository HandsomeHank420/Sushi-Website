<template>
  <b-button :variant="variant" @click="$emit('click')">
    <b-icon :icon="icon" :animation="animation"/>
    <slot>
    </slot>
  </b-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component

export default class IconButton extends Vue {
  @Prop() private readonly variant!: string;

  @Prop({ default: 'camera-fill' }) private readonly icon!: string;

  // Note this is a gotcha for later
  @Prop({ default: 'spin' }) private readonly animationStyle!: string;

  @Prop() private readonly animate!: boolean;

  // Add a method
  // this is a computed property - Declared like a Method but used as a property
  // get is how typescript knows it's a computed property
  get animation() : string {
    return this.animate ? this.animationStyle : '';
  }
}
</script>
