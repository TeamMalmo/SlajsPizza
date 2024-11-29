<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['show-details']);
</script>

<template>
  <div class="menu-section">
    <h2>Drinks</h2>
    <div v-for="item in menuItems" :key="item.id" class="menu-item">
      <h3>{{ item.name }}</h3>
      <p>Price: {{ item.price }}:-</p>
      <button @click="$emit('show-details', item)">More Details</button>
    </div>
  </div>
</template>

<style scoped>
.menu-section {
  margin: 2rem 0;
}

.menu-item {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
}
</style>
