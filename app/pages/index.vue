<template>
  <div>
    <h1>Consults</h1>
    <ul v-for="consult in consults" :key="consult.id">
      <li>{{ consult.name }}</li>
    </ul>

    <button @click="fetchConsults(400)">Fetch Consults 400 error</button>

    <br /><br />
    <NuxtLink external to="/nl-nl/winkelwagen/">
      Link to a proxy page
    </NuxtLink>
  </div>
</template>

<script setup>
const { consults, fetchConsults } = useConsults();

await fetchConsults(200);
await fetchConsults(201);
</script>
