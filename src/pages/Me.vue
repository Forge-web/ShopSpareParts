<script setup>
import { ref, computed, onMounted } from 'vue';
import Header from '../components/Header.vue';
import OrderItem from '../components/OrderItem.vue';

const user = computed(() => JSON.parse(localStorage.getItem('user')));
const user_token = computed(() => JSON.parse(localStorage.getItem('token')));


const loading = ref(true);
const orders = ref([]);

async function getMyOrders()
{
  const response = await fetch(`http://api.shop-spare-parts.com/api/orders/user/${user.value.id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user_token.value}`,
      'Content-Type': 'application/json'
    },
  });

  if (await response.status == 200)
  {
    orders.value = await response.json();
	  loading.value = false;
  }
}

onMounted(async () => {
  await getMyOrders();
})
</script>

<template>
	<div class="bg-white w-3/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Header />

    <div class="p-10">
      <div class="flex justify-between items-center mb-10">
        
        <div class="flex items-center gap-4">
          <div class="relative">
            <h1 class="text-3xl font-bold">Ваши заказы</h1>
          </div>
        </div>

        <div class="flex">
          <RouterLink :to="{name: 'admin'}">
            <div 
              class="border border-gray-500/50 p-5 rounded-xl cursor-pointer"
              v-if="user.is_admin"
            >
              <span>Админ панель</span>
            </div>
          </RouterLink>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-10">
        <OrderItem 
          v-for="order in orders"
          :spare_parts_id="Number(order.spare_parts_id)"
          :value="Number(order.value)"
          :status="String(order.status)"
        />
      </div>
    </div>
  </div>
</template>