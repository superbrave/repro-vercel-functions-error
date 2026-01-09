<template>
  <div>
    <h1>Consults</h1>
    <ul v-for="consult in consults" :key="consult.id">
      <li>{{ consult.name }}</li>
    </ul>
  </div>
</template>

<script setup>
const consults = ref([]);

const fetchConsults = async () => {
  consults.value = await $fetch("/api/get-consults", {
    method: "POST",
    params: {
      country: "DE",
      language: "de",
    },
  });
};

await fetchConsults();
</script>
