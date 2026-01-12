export function useConsults() {
  const consults = ref([]);

  const fetchConsults = async () => {
    consults.value = await $fetch("/api/get-consults", {
      method: "POST",
      params: {
        country: "DE",
        language: "de",
      },
    });

    if (consults.value.length > 0) {
      localStorage.setItem("consults", JSON.stringify(consults.value[0]));
    }
  };

  return { consults, fetchConsults };
}
