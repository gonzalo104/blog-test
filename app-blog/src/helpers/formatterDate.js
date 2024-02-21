function formatDateOptions(date) {
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return formatDateOptions(date);
}