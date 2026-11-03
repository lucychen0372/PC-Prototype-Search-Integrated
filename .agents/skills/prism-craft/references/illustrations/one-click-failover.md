# One Click Failover

## SVG

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 128"><path fill="#0e3866" d="m64.58 45.282 16.93-29.324L55.656 1.066l-17 29.447-16.975-9.83-11.716 20.29 16.972 9.831-16.862 29.21L35.93 94.907 52.864 65.58l17.041 9.711 11.716-20.293z"/><path fill="#0e3866" d="m57.553 30.308-14.084-8.132-4.814 8.338 14.133 8.049zM21.489 60.243l14.085 8.13 5.493-9.515-14.061-8.171z"/><path fill="#0e3866" stroke="#0e3866" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M24.026 49.147 9.965 40.975 21.68 20.683l14.06 8.17z"/><path stroke="#1856ad" stroke-miterlimit="10" stroke-width="2.2" d="m12.99 79.234 16.859-29.207-16.972-9.83 9.583-16.598 16.975 9.83L56.438 3.98l22.157 12.76L61.66 46.073l17.041 9.715-9.583 16.599-17.041-9.712-16.929 29.32z"/><path fill="#112840" stroke="#112840" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M69.718 9.238 81.51 15.96 64.58 45.283 81.62 55 69.906 75.292l-17.041-9.71L35.93 94.908l-11.792-6.72 16.93-29.33-17.041-9.71 11.716-20.294 17.046 9.71z"/><path stroke="#1856ad" stroke-miterlimit="10" stroke-width="2.2" d="M69.718 9.238 81.51 15.96 64.58 45.283 81.62 55 69.906 75.292l-17.041-9.71L35.93 94.908l-11.792-6.72 16.93-29.33-17.041-9.71 11.716-20.294 17.046 9.71z"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M64.58 45.283 81.51 15.96 55.656 1.067 38.655 30.514l-16.974-9.83-11.716 20.29 16.972 9.831-16.862 29.21 25.854 14.892L52.864 65.58l17.04 9.711L81.622 55z"/><path fill="#22272e" stroke="#15171a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m104.854 59.49-38.06-5.611-1.112 58.382 11.822-15.926L91.5 120.579l15.529-20.92-13.998-24.243z"/><path fill="#22272e" stroke="#15171a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m115.86 65.844-38.059-5.61-1.113 58.381 11.821-15.926 13.998 24.244 15.528-20.919-13.997-24.244z"/><path fill="#37414b" stroke="#37414b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m102.507 126.933-11.006-6.354-7.12-12.33 4.128-5.56z"/><path fill="#4d5969" stroke="#37414b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m76.688 118.615-11.006-6.354 1.113-58.382L77.8 60.233z"/><path fill="#37414b" stroke="#37414b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m115.86 65.844-11.006-6.354-38.06-5.611 11.007 6.354z"/><path stroke="#627386" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m104.038 81.77 11.822-15.926-11.006-6.354-38.06-5.611-1.112 58.382 11.006 6.354 7.694-10.366 7.119 12.33 11.006 6.354 15.528-20.92z"/></svg>

## React Usage

```tsx
const OneClickFailoverIllustration = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 128 128"
  >
    <path
      fill="#0e3866"
      d="m64.58 45.282 16.93-29.324L55.656 1.066l-17 29.447-16.975-9.83-11.716 20.29 16.972 9.831-16.862 29.21L35.93 94.907 52.864 65.58l17.041 9.711 11.716-20.293z"
    />
    <path
      fill="#0e3866"
      d="m57.553 30.308-14.084-8.132-4.814 8.338 14.133 8.049zM21.489 60.243l14.085 8.13 5.493-9.515-14.061-8.171z"
    />
    <path
      fill="#0e3866"
      stroke="#0e3866"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M24.026 49.147 9.965 40.975 21.68 20.683l14.06 8.17z"
    />
    <path
      stroke="#1856ad"
      stroke-miterlimit="10"
      stroke-width="2.2"
      d="m12.99 79.234 16.859-29.207-16.972-9.83 9.583-16.598 16.975 9.83L56.438 3.98l22.157 12.76L61.66 46.073l17.041 9.715-9.583 16.599-17.041-9.712-16.929 29.32z"
    />
    <path
      fill="#112840"
      stroke="#112840"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M69.718 9.238 81.51 15.96 64.58 45.283 81.62 55 69.906 75.292l-17.041-9.71L35.93 94.908l-11.792-6.72 16.93-29.33-17.041-9.71 11.716-20.294 17.046 9.71z"
    />
    <path
      stroke="#1856ad"
      stroke-miterlimit="10"
      stroke-width="2.2"
      d="M69.718 9.238 81.51 15.96 64.58 45.283 81.62 55 69.906 75.292l-17.041-9.71L35.93 94.908l-11.792-6.72 16.93-29.33-17.041-9.71 11.716-20.294 17.046 9.71z"
    />
    <path
      stroke="#1b6dc6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M64.58 45.283 81.51 15.96 55.656 1.067 38.655 30.514l-16.974-9.83-11.716 20.29 16.972 9.831-16.862 29.21 25.854 14.892L52.864 65.58l17.04 9.711L81.622 55z"
    />
    <path
      fill="#22272e"
      stroke="#15171a"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m104.854 59.49-38.06-5.611-1.112 58.382 11.822-15.926L91.5 120.579l15.529-20.92-13.998-24.243z"
    />
    <path
      fill="#22272e"
      stroke="#15171a"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m115.86 65.844-38.059-5.61-1.113 58.381 11.821-15.926 13.998 24.244 15.528-20.919-13.997-24.244z"
    />
    <path
      fill="#37414b"
      stroke="#37414b"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m102.507 126.933-11.006-6.354-7.12-12.33 4.128-5.56z"
    />
    <path
      fill="#4d5969"
      stroke="#37414b"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m76.688 118.615-11.006-6.354 1.113-58.382L77.8 60.233z"
    />
    <path
      fill="#37414b"
      stroke="#37414b"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m115.86 65.844-11.006-6.354-38.06-5.611 11.007 6.354z"
    />
    <path
      stroke="#627386"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m104.038 81.77 11.822-15.926-11.006-6.354-38.06-5.611-1.112 58.382 11.006 6.354 7.694-10.366 7.119 12.33 11.006 6.354 15.528-20.92z"
    />
  </svg>
)
```
