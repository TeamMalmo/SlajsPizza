<script setup>
import { ref, computed } from "vue";
import { useMenu } from "../composables/useMenu.js";

const { menu, isLoading, error, fetchMenu } = useMenu();

// A computed property that filters only drinks from the fetched menu
const drinks = computed(() => {
  return menu.value.filter((item) => item.type === "drink");
});

// Reactive state to track whether the drinks menu is currently shown
const showDrinks = ref(false);

// Function to toggle the visibility of the drinks menu
const toggleDrinks = async () => {
  if (showDrinks.value) {
    // Hide the drinks menu if it's currently shown
    showDrinks.value = false;
  } else {
    // If not shown, check if the menu data has been fetched
    if (!menu.value.length) {
      // Fetch the menu data only if it's not already loaded
      await fetchMenu();
    }
    // Show the drinks menu
    showDrinks.value = true;
  }
};
</script>

<template>
  <div class="menu-container">
    <!-- Page heading -->
    <h1>Drinks</h1>

    <!-- Button to toggle drinks menu visibility -->
    <button @click="toggleDrinks" :disabled="isLoading">
      {{ showDrinks ? "Hide Drinks" : "Show Drinks" }}
    </button>

    <!-- Loading message shown while the menu is being fetched -->
    <div v-if="isLoading">Loading...</div>

    <!-- Error message displayed if there's an issue fetching the menu -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Drinks menu, shown only if 'showDrinks' is true and drinks are available -->
    <div v-if="showDrinks && drinks.length" class="drink-menu">
      <div v-for="drink in drinks" :key="drink.id" class="drink-item">
        <h2>{{ drink.name }}</h2>
        <p>{{ drink.description }}</p>
        <p>Price: {{ drink.price }}</p>
      </div>
    </div>

    <!-- Message displayed if no drinks are available after fetching the menu -->
    <div v-if="showDrinks && !drinks.length && !isLoading">No drinks available.</div>
  </div>
</template>

<style scoped>
/* Container for the entire menu */
.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Styling for the drinks menu box */
.drink-menu {
  border: 2px solid black;
  width: 60%;
}

/* Styling for individual drink items */
.drink-item {
  margin-bottom: 1rem;
}

/* Styling for error messages */
.error {
  color: red;
}
</style>
