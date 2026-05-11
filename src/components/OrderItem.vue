<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
	spare_parts_id: Number,
	value: Number,
	status: String,
})

const spare_parts = ref({});

async function getSpareParts()
{
  const response = await fetch(`http://api.shop-spare-parts.com/api/spare_parts/${props.spare_parts_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  spare_parts.value = await response.json();
}

onMounted(async () => {
	await getSpareParts();
});

</script>

<template>
	<div class="relative flex w-full border border-slate-100 rounded-xl p-4 gap-4">
    <img :src="spare_parts.img" class="w-16 h-16" alt="" />
    <div class="flex flex-col w-full">
      <div class="flex justify-between">
        <p>{{ spare_parts.name }}</p>
        <span class="">{{ props.status }}</span>
      </div>
      <div class="flex justify-between mt-5">
        <div class="flex gap-1">
          <!-- <span class="font-bold">Кол-во: {{ props.value }}</span> -->
          <span class="font-bold">{{ props.value }} x {{ spare_parts.price }}</span>
        </div>
        <div class="flex gap-10">
          <span>всего: {{ props.value * spare_parts.price }} руб</span>
        </div>
      </div>
    </div>
  </div>	
</template>