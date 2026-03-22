export function scrollToHashId(hash: string) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}