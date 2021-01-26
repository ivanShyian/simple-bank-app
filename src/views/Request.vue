<template>
  <AppLoader v-if="loading"/>
  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Имя</strong>: {{ request.fio }}</p>
    <p><strong>Телефон</strong>: {{ request.phone }}</p>
    <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
    <p><strong>Статус</strong>:
      <AppStatus :type="request.status"/>
    </p>
    <div class="form-control">
      <select v-model="status">
        <option disabled>Выберите статус</option>
        <option value="active">Активен</option>
        <option value="cancelled">Отменен</option>
        <option value="pending">Выполняется</option>
        <option value="done">Завершен</option>
      </select>
    </div>
    <button class="btn danger" @click="deleteRequest">Удалить</button>
    <button class="btn" v-if="beChanged" @click="updateRequest">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">Заявки с id = {{$route.params.id}} не существует </h3>
</template>

<script>
import {ref, onMounted, watch, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader"
import AppStatus from "@/components/ui/AppStatus";
import {currency} from "@/utils/currency";
import {useStore} from "vuex";

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const request = ref({})
    const status = ref()
    const beChanged = computed(() => status.value !== request.value.status)

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadOne', route.params.id)
      status.value = await request.value.status
      loading.value = false
    })
    const deleteRequest = async () => {
      await store.dispatch('request/delete', route.params.id)
      router.push('/')
    }
    const updateRequest = async () => {
      const data = {...request.value, status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = data.status
    }

    return {
      loading, request, currency, status, beChanged,
      deleteRequest, updateRequest
    }
  },
  components: {AppPage, AppLoader, AppStatus}
}
</script>

<style scoped>

</style>
