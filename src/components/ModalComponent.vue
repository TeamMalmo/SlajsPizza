  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
  });
  
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
  </script>

<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal">
          <div class="modal-content">
            <button class="close-button" @click="close">❌</button>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .modal-content {
    margin-top: 1rem;
  }
  </style>
  