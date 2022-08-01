export let tunnelsEnabled = true;

export function toggleTunnelsEnabled() {
  tunnelsEnabled = !tunnelsEnabled;
  console.log(`tunnelsEnabled: ${tunnelsEnabled}`);
}
