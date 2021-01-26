<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Поиск по имени" v-model="name">
    </div>
    <div class="form-control">
      <select v-model="status">
        <option disabled>Выберите статус</option>
        <option value="active">Активен</option>
        <option value="cancelled">Отменен</option>
        <option value="pending">Выполняется</option>
        <option value="done">Завершен</option>
      </select>
    </div>
    <button class="btn warning"
            v-if="isActive"
            @click="clear">Сбросить</button>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup (_, {emit}) {
    const name = ref()
    const status = ref('Выберите статус')
    const isActive = computed(() => name.value || status.value !== 'Выберите статус')

    watch([name, status], (value) => {
      emit('update:modelValue', {
        name: value[0],
        status: value[1]
      })
    })
    return {
      name, status,
      isActive,
      clear: () => {
        name.value = ''
        status.value = 'Выберите статус'
      }
    }
  }
}
</script>

<style scoped>

</style>
