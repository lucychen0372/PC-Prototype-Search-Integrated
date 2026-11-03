# Multi Hypervisor

## SVG

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 128"><path fill="#0e3866" d="m55.275 34.81.026.011-11.718-6.81c-2.583-1.5-6.16-1.29-10.11.99-7.84 4.527-14.188 15.514-14.162 24.53.013 4.48 1.595 7.63 4.145 9.112l11.718 6.81c-.162-.095-.308-.215-.462-.322 2.612 1.823 6.378 1.755 10.572-.666 7.847-4.53 14.187-15.513 14.162-24.53-.013-4.494-1.606-7.65-4.17-9.126"/><path fill="#1856ad" d="m55.276 34.809.025.012-11.718-6.81c-2.583-1.5-6.16-1.29-10.11.99a29.36 29.36 0 0 0-10.42 11.3l31.789 18.354a29.2 29.2 0 0 0 4.604-14.72c-.013-4.494-1.606-7.65-4.17-9.126"/><path fill="#112840" stroke="#15171a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m108.463 63.839.065 23.003L88.509 98.4l-.065-23.003z"/><path fill="#0e3866" stroke="#0e3866" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M88.509 98.4 68.458 86.748l-.065-23.004 20.051 11.653z"/><path fill="#1856ad" stroke="#0e3866" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M88.444 75.397 68.393 63.743l20.019-11.558 20.051 11.654z"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M108.463 63.839 88.412 52.185 68.393 63.744l.065 23.005L88.509 98.4l20.019-11.558z"/><path fill="#22272e" stroke="#15171a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m59.381 92.372.065 23.003-20.019 11.558-.065-23.003z"/><path fill="#37414b" stroke="#37414b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m39.427 126.933-20.051-11.652-.065-23.003 20.051 11.652z"/><path fill="#4d5969" stroke="#37414b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M39.362 103.93 19.311 92.278 39.33 80.72l20.051 11.652z"/><path stroke="#627386" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M59.381 92.372 39.33 80.72 19.311 92.278l.065 23.003 20.051 11.652 20.019-11.558z"/><path fill="#112840" d="M55.268 57.966c5.558-9.564 5.572-19.927.033-23.146-5.54-3.22-14.536 1.924-20.094 11.488s-5.573 19.927-.034 23.146S49.71 67.53 55.268 57.966"/><path stroke="#0e3866" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M55.268 57.966c5.558-9.564 5.572-19.927.033-23.146-5.54-3.22-14.536 1.924-20.094 11.488s-5.573 19.927-.034 23.146S49.71 67.53 55.268 57.966"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m55.275 34.81.026.011-11.718-6.81c-2.583-1.5-6.16-1.29-10.11.99-7.84 4.527-14.188 15.514-14.162 24.53.013 4.48 1.595 7.63 4.145 9.112l11.718 6.81c-.162-.095-.308-.215-.462-.322 2.612 1.823 6.378 1.755 10.572-.666 7.847-4.53 14.187-15.513 14.162-24.53-.013-4.494-1.606-7.65-4.17-9.126"/><path fill="#4d5969" d="M88.398 41.65V1.067L68.106 29.934z"/><path fill="#22272e" d="M88.398 41.65V1.067l20.291 28.867z"/><path stroke="#37414b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M88.398 41.65V1.067l20.291 28.867z"/><path stroke="#627386" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M88.398 1.067 68.106 29.935 88.398 41.65l20.291-11.715z"/></svg>

## React Usage

```tsx
const MultiHypervisorIllustration = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 128 128"
  >
    <path
      fill="#0e3866"
      d="m55.275 34.81.026.011-11.718-6.81c-2.583-1.5-6.16-1.29-10.11.99-7.84 4.527-14.188 15.514-14.162 24.53.013 4.48 1.595 7.63 4.145 9.112l11.718 6.81c-.162-.095-.308-.215-.462-.322 2.612 1.823 6.378 1.755 10.572-.666 7.847-4.53 14.187-15.513 14.162-24.53-.013-4.494-1.606-7.65-4.17-9.126"
    />
    <path
      fill="#1856ad"
      d="m55.276 34.809.025.012-11.718-6.81c-2.583-1.5-6.16-1.29-10.11.99a29.36 29.36 0 0 0-10.42 11.3l31.789 18.354a29.2 29.2 0 0 0 4.604-14.72c-.013-4.494-1.606-7.65-4.17-9.126"
    />
    <path
      fill="#112840"
      stroke="#15171a"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m108.463 63.839.065 23.003L88.509 98.4l-.065-23.003z"
    />
    <path
      fill="#0e3866"
      stroke="#0e3866"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M88.509 98.4 68.458 86.748l-.065-23.004 20.051 11.653z"
    />
    <path
      fill="#1856ad"
      stroke="#0e3866"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M88.444 75.397 68.393 63.743l20.019-11.558 20.051 11.654z"
    />
    <path
      stroke="#1b6dc6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M108.463 63.839 88.412 52.185 68.393 63.744l.065 23.005L88.509 98.4l20.019-11.558z"
    />
    <path
      fill="#22272e"
      stroke="#15171a"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m59.381 92.372.065 23.003-20.019 11.558-.065-23.003z"
    />
    <path
      fill="#37414b"
      stroke="#37414b"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m39.427 126.933-20.051-11.652-.065-23.003 20.051 11.652z"
    />
    <path
      fill="#4d5969"
      stroke="#37414b"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M39.362 103.93 19.311 92.278 39.33 80.72l20.051 11.652z"
    />
    <path
      stroke="#627386"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M59.381 92.372 39.33 80.72 19.311 92.278l.065 23.003 20.051 11.652 20.019-11.558z"
    />
    <path
      fill="#112840"
      d="M55.268 57.966c5.558-9.564 5.572-19.927.033-23.146-5.54-3.22-14.536 1.924-20.094 11.488s-5.573 19.927-.034 23.146S49.71 67.53 55.268 57.966"
    />
    <path
      stroke="#0e3866"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M55.268 57.966c5.558-9.564 5.572-19.927.033-23.146-5.54-3.22-14.536 1.924-20.094 11.488s-5.573 19.927-.034 23.146S49.71 67.53 55.268 57.966"
    />
    <path
      stroke="#1b6dc6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m55.275 34.81.026.011-11.718-6.81c-2.583-1.5-6.16-1.29-10.11.99-7.84 4.527-14.188 15.514-14.162 24.53.013 4.48 1.595 7.63 4.145 9.112l11.718 6.81c-.162-.095-.308-.215-.462-.322 2.612 1.823 6.378 1.755 10.572-.666 7.847-4.53 14.187-15.513 14.162-24.53-.013-4.494-1.606-7.65-4.17-9.126"
    />
    <path fill="#4d5969" d="M88.398 41.65V1.067L68.106 29.934z" />
    <path fill="#22272e" d="M88.398 41.65V1.067l20.291 28.867z" />
    <path
      stroke="#37414b"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M88.398 41.65V1.067l20.291 28.867z"
    />
    <path
      stroke="#627386"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M88.398 1.067 68.106 29.935 88.398 41.65l20.291-11.715z"
    />
  </svg>
)
```
