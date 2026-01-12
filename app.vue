<template>
  <div>
    <h1>Consults</h1>
    <ul v-for="consult in consults" :key="consult.id">
      <li>{{ consult.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useConsults } from "@/app/composables/consults";

const { consults, fetchConsults } = useConsults();

onMounted(async () => {
  await fetchConsults();
});
</script>
