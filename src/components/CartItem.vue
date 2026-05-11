<script setup>
import { onMounted, ref } from 'vue';
import { useCartStore } from '../stores/cart';

const props = defineProps({
  item: Object
});

const cartStore = useCartStore();
const {removeFromCart} = cartStore; 

</script>

<template>
  <div class="relative flex w-full border border-slate-100 rounded-xl p-4 gap-4">
    <img :src="props.item.img" class="w-16 h-16" alt="" />
    <div class="flex flex-col w-full">
      <p>{{ props.item.name }}</p>
      <div class="flex justify-between mt-5">
        <div class="flex flex-col gap-1">
          <span class="font-bold">Кол-во: {{ props.item.quantity }}</span>
          <span class="font-bold">{{ props.item.price }} руб.</span>
        </div>
        <img
          class="cursor-pointer opacity-30 hover:opacity-100 transition"
          src="/close.svg"
          alt="Close"
          @click="removeFromCart(props.id)"
        />
      </div>
    </div>
  </div>
</template>
