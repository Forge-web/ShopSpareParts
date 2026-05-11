<template>
  <div class="bg-white w-3/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Header />

    <div class="p-10">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">Все Запчасти</h1>
        <!-- <div class="flex items-center gap-4">
          <select
            class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
          >
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <input
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              placeholder="Поиск..."
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/search.svg" />
            </div>
          </div>
        </div> -->
      </div>

      <div class="grid grid-cols-3 gap-10">
        <Card
          v-for="spare_part in spare_parts"
          :id="spare_part.id"
          :key="spare_part.id"
          :title="spare_part.name"
          :price="spare_part.price"
          :img="spare_part.img"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import Card from '../components/Card.vue';
import Header from '../components/Header.vue';

onMounted(async () => {
  await getSpareParts();
})

const spare_parts = ref([]);

async function getSpareParts() {
    const response = await fetch('http://api.shop-spare-parts.com/api/spare_parts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    spare_parts.value = await response.json();
    console.log(spare_parts.value);
}
</script>
