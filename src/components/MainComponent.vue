
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMenu } from '../composables/useMenu.js';
// import ModalComponent from './ModalComponent.vue';
import MenuSectionComponent from './MenuSectionComponent.vue';

const { menu, isLoading, error, fetchMenu } = useMenu();

const selectedItem = ref(null);
const isSectionOpen = ref({});

onMounted(async () => {
  await fetchMenu();
});

// Ensure defensive coding in menuTypes
const menuTypes = computed(() => {
  return Array.isArray(menu.value) ? [...new Set(menu.value.map(item => item.type))] : [];
});


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
        <h2 
        class="banner"
        @click="toggleSection(type)">
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


</template>

<style scoped>
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

.banner {
  background-color: skyblue;
  padding: 0.5rem;
  border-radius: 6px;
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-family: fantasy;
  letter-spacing: 2px;
  font-weight: 100;
}

.banner:hover {
transform: scale(1.1);
transition: ease.3s;
cursor: pointer;
}
</style>
