<template>
  <div>
    <h1>My Name is:</h1>
    <p>{{ name }}</p>
  </div>
</template>

<script setup>
const name = await $fetch("/api/my-name", {
  method: "GET",
  params: {
    firstName: "John",
    lastName: "Doe",
  },
});
</script>
