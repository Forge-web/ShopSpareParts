<script setup>
const props = defineProps({
	id: String
});
import { ref, onMounted } from 'vue';
import Header from '../components/Header.vue';
import { useCartStore } from '../stores/cart';

const spare_parts = ref({});

const cartStore = useCartStore()
const { addToCart } = cartStore

async function getSpareParts() {
    const response = await fetch(`http://api.shop-spare-parts.com/api/spare_parts/${props.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    spare_parts.value = await response.json();
    console.log(spare_parts.value);
}

onMounted(async () => {
  await getSpareParts();
})

</script>

<template>
  <div class="bg-white w-3/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Header />

    <div class="p-10">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">{{ spare_parts.name }}</h1>
        <div class="flex items-center gap-4">
          <div class="relative">
			<p class="text-lg font-bold">{{ spare_parts.price }} ₽</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-10">
		<div>
			<img 
				class="w-100 h-auto rounded-xl mb-10"
				:src="spare_parts.img" 
				:alt="spare_parts.name"
			>
			<p class="text-lg">{{ spare_parts.description }}</p>
		</div>
		<div class="flex justify-self-end">
			<button 
        @click="addToCart(spare_parts)" 
        class="self-end px-4 py-2 border-b-4 border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200" 
        type="submit"
      >
        Добавить в корзину
      </button>
		</div>
      </div>
    </div>
  </div>
</template>


