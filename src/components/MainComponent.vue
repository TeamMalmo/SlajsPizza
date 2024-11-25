<!-- SCRIPTS -->


<script setup>
import { useMenu } from '../composables/useMenu.js';
import DrinkComponent from './DrinkComponent.vue';

const { menu, isLoading, error, fetchMenu } = useMenu();

console.log(menu.value);

const dummyData = { // Changed from "dummmyData" to "dummyData"
  id: 1,
  type: "pizza",
  name: "Romana",
  imgUrl: "https://pizzerialunden.com/wp-content/themes/pizzerialunden/images/default-landingpage-1.jpg",
  description: "Pizza ipsum dolor amet platter mayo pesto, thin crust bianca bacon & tomato...",
  price: 129,
  toppings: ["mozarella", "parmaskinka", "oliver"],
};
</script>


<!-- TEMPLATE -->

    <template>
<header>
  <h1>Pizza Slajs</h1>
</header>

<main>
  <p>Welcome to Pizza Slajs</p>
  <div class="card">
    <img :src="dummyData.imgUrl" alt="Pizza Image" class="card-image" />
    <div class="card-content">
      <h2 class="card-title">{{ dummyData.name }}</h2>
      <p class="card-description">{{ dummyData.description }}</p>
      <ul class="card-toppings">
        <li v-for="topping in dummyData.toppings" :key="topping">{{ topping }}</li>
      </ul>
      <p class="card-price">{{ dummyData.price }} SEK</p>
    </div>
  </div>
  <DrinkComponent/>
</main>

<footer>
  <p>Made with 💩 by Malmö</p>
</footer>
</template>


<!-- STYLE -->
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

img
{
  width: 300px;
  height: auto;
}
</style>
