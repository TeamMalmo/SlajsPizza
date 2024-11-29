
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMenu } from '../composables/useMenu.js';
import ModalComponent from './ModalComponent.vue';
import MenuSectionComponent from './MenuSectionComponent.vue';

const { menu, isLoading, error, fetchMenu } = useMenu();

const selectedItem = ref(null);
const isModalOpen = ref(false);
const isSectionOpen = ref({});

onMounted(async () => {
  await fetchMenu();
});

// Ensure defensive coding in menuTypes
const menuTypes = computed(() => {
  return Array.isArray(menu.value) ? [...new Set(menu.value.map(item => item.type))] : [];
});

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedItem.value = null;
};

const toggleSection = (section) => {
  isSectionOpen.value = {
    ...isSectionOpen.value,
    [section]: !isSectionOpen.value[section], // toggle the specific section
  };
};

</script>


<template>
  <header>
    <h1>Pizza Slajs</h1>
  </header>

  <main>
    <p>Welcome to Pizza Slajs</p>

    <div v-if="isLoading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!isLoading && !error" class="menu">
      <div v-for="type in menuTypes" :key="type">
        <h2 @click="toggleSection(type)">
          {{ isSectionOpen[type] ? 'Hide' : 'Show' }} {{ type }}
        </h2>

        <MenuSectionComponent
          :menuItems="menu.filter(item => item.type === type)"
          :sectionTitle="type"
          @show-details="openModal"
          :isOpen="isSectionOpen[type]"
        />
      </div>
    </div>
  </main>

  <footer>
    <p>Made with 💩 by Malmö</p>
  </footer>

  <ModalComponent :isOpen="isModalOpen" @close="closeModal">
    <template v-if="selectedItem">
      <h2>{{ selectedItem.name }}</h2>
      <img :src="selectedItem.imgUrl" alt="Pizza image">
      <p>{{ selectedItem.description }}</p>
      <h3>Ingredients:</h3>
      <ul>
        <li v-for="ingredient in selectedItem.toppings || []" :key="ingredient">
          {{ ingredient }}
        </li>
      </ul>
    </template>
  </ModalComponent>
</template>


<style scoped>
h2{
  text-align: center;
}

h2:hover{
  cursor: pointer;  
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out; 
}

img {
  max-width: 150px;
}

header {
  background-color: skyblue;
  color: black;
  text-align: center;
}

main {
  background-color: white;
  color: black;
  text-align: center;
}

footer {
  background-color: skyblue;
  color: black;
  text-align: center;
}

</style>

