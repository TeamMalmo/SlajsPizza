<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
  sectionTitle: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['show-details']);
</script>

<template>
  <!-- <h2 @click="$emit('toggle-section')"> {{ sectionTitle.toUpperCase() }}</h2> -->
  <div v-show="isOpen" class="menu-section">
    <div v-for="item in menuItems" :key="item.id" class="menu-item">
      <h3>{{ item.name }}</h3>
      <p>Price: {{ item.price }}:-</p>
      <button @click="$emit('show-details', item)">More Details</button>
    </div>
  </div>
</template>

<style scoped>
h2{
  text-align: center;
}

.menu-section {
  gap: 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.menu-item {
  width: 40%;
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: left;
  border-radius: 0.5rem;
  background-color: rgba(135, 207, 235, 0.224);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
