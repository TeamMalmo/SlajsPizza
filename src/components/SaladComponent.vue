<!-- SCRIPTS -->
<script setup>
import { onMounted, computed, ref } from 'vue'
import { useMenu } from '@/composables/useMenu'

const { menu, isLoading, error, fetchMenu } = useMenu()

onMounted(() => {
  fetchMenu()
})

const salads = computed(() => {
  const correctLinks = [
    {
      'Greek salad': 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0',
    },
    {
      'Caesar salad': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
    },
    {
      'Italian salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    },
    {
      'Shrimp salad': 'https://images.unsplash.com/photo-1551248429-40975aa4de74',
    },
  ]
  // Get an array with only salad items.
  const saladList = menu.value.filter((food) => food.type === 'salad')
  console.log(saladList)

  // Switch out image urls to corresponding link in correctLinks
  correctLinks.forEach((item) => {
    const [key, value] = Object.entries(item)[0]
    saladList.forEach((salad) => {
      if (salad.name === key) salad.imgUrl = value
    })
  })

  return saladList
})

const chosenSalad = ref(null)

const saladWasChosen = (salad) => {
  chosenSalad.value = salad
  console.log(chosenSalad.value)
}
</script>

<template>
  <div>
    <div v-if="isLoading" class="loading-div">Loading...</div>
    <div v-if="error" class="error-div">{{ error }}</div>
    <div v-else class="salad-div">
      <ul class="salad-ul">
        <li v-for="salad in salads" :key="salad.id" class="salad-li" @click="saladWasChosen(salad)">
          <div class="li-header-div">
            {{ salad.name }}
          </div>
          <img :src="salad.imgUrl" />
        </li>
      </ul>

      <div v-if="!chosenSalad" class="salad-unchosen">
        <h2>{{ '<- Choose a salad...' }}</h2>
      </div>
      <div v-else class="salad-details-div">
        <img :src="chosenSalad.imgUrl" alt="Where's the meat?" class="image-presentation" />
        <div class="salad-details-title">
          {{ chosenSalad.name }}
        </div>
        <p class="description">
          {{ chosenSalad.description }}
        </p>

        <div class="ingredients-container">
          <div class="ingredients-top">
            <p class="ingredients-title w-60">INGREDIENTS:</p>
            <p class="ingredients-title w-40">PRICE:</p>
          </div>
          <div class="ingredients-bottom">
            <div class="ingredient-list w-60">
              <span v-for="(ingredient, i) in chosenSalad.ingredients" :key="i">{{
                ingredient + ', '
              }}</span>
            </div>
            <div class="price w-40">
              {{ chosenSalad.price + ' €' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@400..800&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

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
