<script setup>
import { ref, computed } from "vue";
import { useMenu } from "../composables/useMenu.js";
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const { menu, isLoading, error, fetchMenu } = useMenu();

const drinks = computed(() => {
  return menu.value.filter((item) => item.type === "drink");
});

const showDrinks = ref(false);

const toggleDrinks = async () => {
  if (showDrinks.value) {
    showDrinks.value = false;
  } else {
    if (!menu.value.length) {
      await fetchMenu();
    }
    showDrinks.value = true;
  }
};
</script>

<template>
  <div class="drinks-menu">
    <div class="container">
      <h1 class="title">Exotic Drinks Menu</h1>

      <button 
        @click="toggleDrinks" 
        :disabled="isLoading"
        class="toggle-button"
      >
        <span>{{ showDrinks ? "Hide Drinks" : "Show Drinks" }}</span>
        <ChevronDown v-if="!showDrinks" class="icon" />
        <ChevronUp v-else class="icon" />
      </button>

      <div v-if="isLoading" class="loading">
        <div class="spinner"></div>
        <span>Loading...</span>
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <transition name="fade">
        <div v-if="showDrinks && drinks.length" class="drinks-list">
          <div 
            v-for="drink in drinks" 
            :key="drink.id" 
            class="drink-card"
          >
            <h2 class="drink-name">{{ drink.name }}</h2>
            <p class="drink-description">{{ drink.description }}</p>
            <p class="drink-price">{{ drink.price }}</p>
          </div>
        </div>
      </transition>

      <div v-if="showDrinks && !drinks.length && !isLoading" class="no-drinks">
        No drinks available at the moment. Check back later!
      </div>
    </div>
  </div>
</template>

<style scoped>
.drinks-menu {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #4a1d96, #312e81);
  color: white;
  padding: 2rem;
}

.container {
  max-width: 48rem;
  margin: 0 auto;
}

.title {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.toggle-button {
  width: 100%;
  background-color: #4f46e5;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-button:hover {
  background-color: #4338ca;
  transform: scale(1.05);
}

.toggle-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.5);
}

.toggle-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  margin-left: 0.5rem;
  height: 1.25rem;
  width: 1.25rem;
}

.loading {
  margin-top: 2rem;
  text-align: center;
  font-size: 1.25rem;
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
  border-top: 2px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  border-left: 2px solid transparent;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin-right: 0.75rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  margin-top: 2rem;
  background-color: #dc2626;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.drinks-list {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.drink-card {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  transition: transform 0.3s ease-in-out;
}

.drink-card:hover {
  transform: scale(1.05);
}

.drink-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.drink-description {
  color: #d1d5db;
  margin-bottom: 1rem;
}

.drink-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #93c5fd;
}

.no-drinks {
  margin-top: 2rem;
  text-align: center;
  font-size: 1.25rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>