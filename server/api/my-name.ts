export default defineEventHandler(async (event) => {
  const { firstName, lastName } = getQuery(event);

  console.log(firstName, lastName);

  return `${firstName} ${lastName}`;
});
