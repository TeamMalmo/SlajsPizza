<script setup>
import { defineProps, defineEmits, ref } from 'vue';

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
const chosenItem = ref(null);

const itemWasChosen = (item) => {
  chosenItem.value = item

}

const emit = defineEmits(['show-details']);
</script>

<template>
  <!-- <h2 @click="$emit('toggle-section')"> {{ sectionTitle.toUpperCase() }}</h2> -->
  <div v-show="isOpen" class="salad-div">
    <ul class="salad-ul">
      <li 
      v-for="item in menuItems" 
      :key="item.id" 
      class="salad-li"
      @click="itemWasChosen(item)"
      >
      <div class="li-header-div">
            {{ item.name }}
          </div>
          <img :src="item.imgUrl" />
      </li>
    </ul>

<div v-if="!chosenItem" class="salad-unchosen">
      </div>
      <div v-else class="salad-details-div">
        <img :src="chosenItem.imgUrl" alt="Where's the meat?" class="image-presentation" />
        <div class="salad-details-title">
          {{ chosenItem.name }}
        </div>
        <p class="description">
          {{ chosenItem.description }}
        </p>

        <div v-if="!chosenItem" class="salad-unchosen">
  <h2>{{ '<- Choose an item...' }}</h2>
</div>
<div v-else class="salad-details-div">
  <img :src="chosenItem.imgUrl" alt="Item image" class="image-presentation" />
  <div class="salad-details-title">
    {{ chosenItem.name }}
  </div>
  <p class="description">
    {{ chosenItem.description }}
  </p>

  <div class="ingredients-container" v-if="chosenItem.type === 'pizza' || chosenItem.type === 'salad'">
    <div class="ingredients-top">
      <p class="ingredients-title w-60">INGREDIENTS:</p>
      <p class="ingredients-title w-40">PRICE:</p>
    </div>
    <div class="ingredients-bottom">
      <div class="ingredient-list w-60">
        <!-- Show toppings for pizza -->
        <span v-if="chosenItem.type === 'pizza'" v-for="(topping, i) in chosenItem.toppings" :key="i">
          {{ topping }}<span v-if="i !== chosenItem.toppings.length - 1">, </span>
        </span>
        <!-- Show ingredients for salad -->
        <span v-if="chosenItem.type === 'salad'" v-for="(ingredient, i) in chosenItem.ingredients" :key="i">
          {{ ingredient }}<span v-if="i !== chosenItem.ingredients.length - 1">, </span>
        </span>
      </div>
      <div class="price w-40">
        {{ chosenItem.price + ' €' }}
      </div>
    </div>
  </div>

  <!-- Price only for drinks, no ingredients or toppings -->
  <div v-if="chosenItem.type === 'drink'" class="drink-details">
    <p class="ingredients-title">PRICE:</p>
    <p class="price">{{ chosenItem.price + ' €' }}</p>
  </div>
</div>

      </div>
    </div>

</template>

<style scoped>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  color: black;
  font-family: 'Roboto Condensed', sans-serif;
}

.description {
  margin: 10px 0;
}

.price {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
}

.ingredient-list {
  font-size: 0.7rem;
}

.ingredients-bottom {
  display: flex;
}

.w-60 {
  width: 60%;
}

.w-40 {
  width: 40%;
}

.ingredients-right {
  font-size: 0.7rem;
}

.ingredients-top {
  display: flex;
  gap: 2px;
}

.ingredients-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  margin-top: auto;
}

.salad-details-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  top: 50px;
  width: 100%;
  height: 2.2rem;
  backdrop-filter: blur(4px);
  background-color: rgba(135, 207, 235, 0.562);
  text-align: center;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
}

.salad-unchosen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.salad-unchosen > h2 {
  color: skyblue;
}

.ingredients-title {
  background-color: skyblue;
  /* width: 100%; */
  color: white;
  font-weight: 100;
}

.image-presentation {
  object-fit: cover;
  height: 30%;
  max-height: 180px;
}

.salad-div,
.loading-div,
.error-div {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 6px;
  padding: 0.3rem;
}

.salad-div {
  display: flex;
  height: min-content;
  gap: 0.2rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.salad-ul,
.salad-details-div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.salad-details-div {
  display: flex;
  flex-direction: column;
  position: relative;
  height: fit-content;
  overflow: hidden;
  background-color: transparent;
  border-radius: 6px;
  border-bottom: 1px solid skyblue;
}

.salad-ul {
  display: flex;
  gap: 0.3rem;
  height: fit-content;
  flex-wrap: wrap;
}

.salad-li {
  position: relative;
  width: calc(50% - 4px);
  height: 150px;
  font-size: 0.8rem;
  text-transform: uppercase;
  overflow: hidden;
  background-color: skyblue;
  border-radius: 6px;
  transition: all 0.3s;
  /* border: 1px solid rgba(0, 0, 0, 0.044); */
  /* border: 1px dotted skyblue; */
}

.salad-li:hover {
  cursor: pointer;
  transform: scale(0.95);
}

.li-header-div {
  position: absolute;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.8rem;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 0.2rem;
  top: 65%;
  width: calc(100% + 1px);
  background-color: rgba(135, 207, 235, 0.562);
  font-weight: 700;
  color: whitesmoke;
  /*If we want the salad name band top center. */
  /* left: 50%;
  transform: translateX(-50%); */
  /* border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px; */
}
</style>
