<script setup>
import CartItem from './CartItem.vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '../stores/cart';
import { computed, ref } from 'vue';

const cartStore = useCartStore()

const { items, totalItems, totalPrice } = storeToRefs(cartStore);
const { removeFromCart, updateQuantity, clearCart } = cartStore

const props = defineProps({
  isModalOpen: Boolean,
  cartItems: Array,
});

const emit = defineEmits(['closeModal']);

const closeModal = () => {
  emit('closeModal');
};


const user = computed(() => JSON.parse(localStorage.getItem('user')));
const user_token = computed(() => JSON.parse(localStorage.getItem('token')));

const order_placed = ref(false);

async function createOrder()
{
  const response = await fetch('http://api.shop-spare-parts.com/api/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user_token.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: items.value,
      user_id: user.value.id
    })
  });

  if (response.status == 201)
  {
    clearCart();
    order_placed.value = true;
  }
} 

</script>

<template>
  <div 
    class="fixed z-10 top-0 left-0 h-full w-full bg-black opacity-70" 
    :class="{'show': isModalOpen}"
    v-if="isModalOpen"
    @click="emit('closeModal')"
  />
  <div
    class="flex flex-col justify-between fixed h-full z-10 top-0 h-full right-0 w-96 bg-white px-10 py-7"
    :class="{'show': isModalOpen}"
    v-if="isModalOpen"
  >
    <h2 class="text-2xl font-bold mb-10 flex items-center gap-5">
      <svg
        @click="emit('closeModal')"
        class="rotate-180 hover:-translate-x-1 opacity-30 hover:opacity-100 transition cursor-pointer"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H14.7143"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Корзина
    </h2>
    <div class="flex flex-col flex-1 justify-between">
      <div class="flex flex-col gap-5">
        <!-- <CartItem
          title="Мужские Кроссовки Nike Blazer Mid Suede"
          price="1000"
          img="/sneakers/sneakers-1.jpg"
        /> -->
        <div class="flex justify-between p-5 bg-green-200/60 border border-green-600 rounded-xl text-green-800/80" v-if="order_placed">
          <p>Заказ создан</p>
          <img class="cursor-pointer" @click="order_placed = false" src="/close.svg" alt="">
        </div>

        <CartItem v-for="item in items" :key="item.id"
          :item="item"
        >
          
        </CartItem>
      </div>

      <div>
        <div class="flex flex-col gap-5">
          <div class="flex items-end gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ totalPrice }} руб.</span>
          </div>

          <!-- <div class="flex items-end gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ totalPrice * 0.05 }} руб.</span>
          </div> -->
        </div>

        <button 
          class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
          @click="clearCart" v-if="items.length">Очистить корзину
        </button>

        <button
          class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
          @click="createOrder"
        >
          Оформить заказ
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>
