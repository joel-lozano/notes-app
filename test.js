const date = new Date('2023-01-03T21:30:53.960Z');

console.log(date.toLocaleDateString('en-us', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit'
}));
console.log(date.toLocaleTimeString('en-us', {
    hour: 'numeric',
    minute: 'numeric'
}));