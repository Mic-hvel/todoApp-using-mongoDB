export async function getTasks() {
  try {
    const res = await fetch("/");
    const data = await res.json();
    return data.recipes;
  } catch (error) {
    console.log(error);
  }
}
