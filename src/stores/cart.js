import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Состояние – массив товаров в корзине
  const items = ref([])

  // Геттеры
  const totalItems = computed(() =>
    	items.value.reduce((sum, item) => sum + item.quantity, 0)
	)

  const totalPrice = computed(() =>
		items.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
	)

  // Действия
  function addToCart(product) {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
	  console.log(items.value);
	//   console.log(this.totalPrice);
    }
    saveToLocalStorage()
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    saveToLocalStorage()
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveToLocalStorage()
    }
  }

  function clearCart() {
    items.value = []
    saveToLocalStorage()
  }

  // Сохранение в localStorage
  function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  // Загрузка из localStorage при инициализации
  function loadFromLocalStorage() {
    const saved = localStorage.getItem('cart')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }

  // Сразу загружаем сохранённую корзину
  loadFromLocalStorage()

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})