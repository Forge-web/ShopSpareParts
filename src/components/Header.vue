<script setup>
import {ref, computed} from 'vue';

import AuthModal from './AuthModal.vue';
import Drawer from './Drawer.vue';

import { storeToRefs } from 'pinia';
import { useCartStore } from '../stores/cart';

const isOpen = ref(false);

const cartIsOpen = ref(false);

import CartItem from './CartItem.vue';

const cartStore = useCartStore()

const { items } = storeToRefs(cartStore);

const user = computed(() => JSON.parse(localStorage.getItem('user')));

function logout() {
  localStorage.removeItem('user');
  window.location.reload();
}
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-11" />
        <div>
          <h2 class="font-bold text-xl uppercase">SpareParts-shop</h2>
          <p class="text-slate-400">Магазин запчастей</p>
        </div>
      </div>
    </RouterLink>

    <ul class="flex items-center gap-10">
      <!-- <li class="flex items-center gap-3 cursor-pointer">
        <img src="/cart.svg" alt="Cart" />
        <b>1205 руб.</b>
      </li> -->
      <!-- <li class="flex items-center gap-3 cursor-pointer">
        <img src="/heart.svg" alt="Favorite" />
        <span>Закладки</span>
      </li> -->
      <li class="flex items-center gap-3 cursor-pointer" v-if="!user">
        <img src="/profile.svg" alt="Favorite" />
        <span @click="isOpen = true">Авторизация</span>
      </li>
      
      <!-- Корзина -->
      <li class="flex items-center gap-3 cursor-pointer" v-if="user">
        <img @click="cartIsOpen = true" src="/cart.svg" alt="Favorite">
        <p class="font-bold text-gray-500">{{ items.length }}</p>
      </li>

      <RouterLink :to="{name: 'me'}">
        <li class="flex items-center gap-3 cursor-pointer" v-if="user">
          <img src="/profile.svg" alt="Favorite" />
          <span>{{ user.name }}</span>
        </li>
      </RouterLink>
      
      <li class="flex items-center gap-3 cursor-pointer" v-if="user">
        <img src="/profile.svg" alt="Favorite" />
        <span @click="logout()">Выход</span>
      </li>
    </ul>
  </header>

  <AuthModal
    :isModalOpen="isOpen"
    @closeModal="isOpen = false"
  />

  <Drawer
    :cartItems = "cartItems"
    :isModalOpen="cartIsOpen"
    @closeModal="cartIsOpen = false"
  />

</template>
