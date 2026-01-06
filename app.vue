<template>
  <div>
    <h1>My Name is:</h1>
    <p>{{ name }}</p>

    <button @click="updateName">Update Name</button>

    <hr />

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
    method: "GET",
    params: {
      country: "DE",
      language: "de",
    },
  });
};

await fetchConsults();

const firstName = ref("John");
const lastName = ref("Doe");

const randomNames = [
  { firstName: "Alice", lastName: "Smith" },
  { firstName: "Bob", lastName: "Johnson" },
  { firstName: "Charlie", lastName: "Williams" },
  { firstName: "Diana", lastName: "Brown" },
  { firstName: "Ethan", lastName: "Jones" },
  { firstName: "Fiona", lastName: "Garcia" },
  { firstName: "George", lastName: "Miller" },
  { firstName: "Hannah", lastName: "Davis" },
  { firstName: "Isaac", lastName: "Rodriguez" },
  { firstName: "Julia", lastName: "Martinez" },
];

const name = ref("");

const fetchName = async () => {
  name.value = await $fetch("/api/my-name", {
    method: "GET",
    params: {
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });
};

await fetchName();

const updateName = () => {
  const randomName =
    randomNames[Math.floor(Math.random() * randomNames.length)];
  firstName.value = randomName.firstName;
  lastName.value = randomName.lastName;

  fetchName();
};
</script>
