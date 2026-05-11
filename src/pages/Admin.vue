<script setup>
import { computed, onMounted, ref } from 'vue';
import Header from '../components/Header.vue';
import OrderItemsAdmin from '../components/OrderItemsAdmin.vue';

const user = computed(() => JSON.parse(localStorage.getItem('user')));
const user_token = computed(() => JSON.parse(localStorage.getItem('token')));

const orders = ref([]);
const loading = ref(true);


async function getOrders() {
	const response = await fetch(`http://api.shop-spare-parts.com/api/orders`, {
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

onMounted(
	async () => {
		if (user.value.is_admin)
		{
			await getOrders();
		}
	}
);

</script>

<template>

<div class="bg-white w-3/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Header />

    <div class="p-10" v-if="user.is_admin">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">Заказы пользователей</h1>
        <div class="flex items-center gap-4">
        </div>
      </div>

      <div class="grid grid-cols-1 gap-10">
		<OrderItemsAdmin
			v-for="order in orders"
			:order_id="order.id"
			:spare_parts_id="order.spare_parts_id"
			:value="order.value"
			:status="order.status"
		/>
	  </div>
    </div>

	<div class="p-10 items-center" v-else>
		<h1 class="text-center text-xl text-red-600">Вы не являетесь админом</h1>
	</div>
</div>
</template>