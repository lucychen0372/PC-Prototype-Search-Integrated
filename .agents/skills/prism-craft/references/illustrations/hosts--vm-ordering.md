# Hosts & VM ordering

Move, Conversion, VM, Host, Sequence, Stages, Steps

## SVG

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 128"><g clip-path="url(#a)"><path fill="#fff" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m126.953 87.57-4.25 2.35-18.715 10.33v-4.7l-17.019-9.38-1.696-.94 1.696-.93 17.019-9.4z"/><path fill="#fff" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m103.988 95.55-4.26 2.35-4.25 2.35v-4.7l-10.194-5.63-.66-.36-.146-.08-3.454-1.91-4.26-2.34 4.26-2.35 4.25 2.35 1.695.94z"/><path fill="#fff" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M95.478 95.55 91.24 97.9h-.01l-4.25 2.35v-4.7l-5.955-3.28-8.51-4.7-4.26-2.34 4.26-2.35 4.25 2.35 4.26 2.34v.01l3.454 1.9.146.08.66.36z"/><path fill="#1b6dc6" d="M32.51 24.06c-.273 0-.545-.11-.744-.29a.9.9 0 0 1-.22-.33 1 1 0 0 1-.083-.38c0-.13.031-.26.084-.38q.078-.18.22-.33.157-.135.345-.21a1 1 0 0 1 .795 0q.205.075.346.21c.188.19.303.45.303.71 0 .13-.02.26-.084.38a1 1 0 0 1-.22.33 1 1 0 0 1-.345.21.9.9 0 0 1-.397.08m-1.047-6.52c0-.55.47-.99 1.047-.99.575 0 1.046.44 1.046.99 0 .56-.47 1-1.046 1s-1.047-.44-1.047-1m0-5.51c0-.55.47-1 1.047-1 .575 0 1.046.45 1.046 1s-.47 1-1.046 1-1.047-.45-1.047-1m0-5.52c0-.55.47-1 1.047-1 .575 0 1.046.45 1.046 1 0 .56-.47 1-1.046 1s-1.047-.44-1.047-1M32.51 2c-.136 0-.273-.03-.398-.08q-.188-.075-.346-.21a1.2 1.2 0 0 1-.22-.33 1 1 0 0 1-.083-.38c0-.13.031-.26.084-.38.052-.13.125-.23.22-.33q.157-.135.345-.21a1 1 0 0 1 .795 0q.205.075.346.21c.188.19.303.45.303.71 0 .13-.02.26-.084.38q-.078.18-.22.33a1 1 0 0 1-.345.21c-.125.05-.261.08-.397.08m54.449 12.67c-.136 0-.272-.03-.398-.08s-.24-.12-.345-.22a1 1 0 0 1-.22-.32 1 1 0 0 1-.084-.38 1 1 0 0 1 .304-.71c.104-.09.22-.17.345-.22.251-.1.544-.1.795 0 .126.05.241.13.346.22.094.09.178.2.23.32.053.13.073.25.073.39 0 .13-.02.26-.073.38s-.136.23-.23.32c-.105.1-.22.17-.346.22s-.261.08-.397.08m-1.047-7.34c0-.55.471-1 1.047-1 .575 0 1.046.45 1.046 1s-.47 1-1.046 1-1.047-.45-1.047-1M86.959 2c-.136 0-.272-.03-.398-.08a1 1 0 0 1-.345-.22 1 1 0 0 1-.304-.7c0-.13.031-.26.084-.38.052-.13.125-.23.22-.33.104-.09.209-.16.345-.21a1 1 0 0 1 .795 0c.137.05.241.12.346.21.094.1.167.2.22.33.063.12.084.25.084.38 0 .26-.116.52-.304.7-.105.1-.21.17-.346.22-.125.05-.261.08-.397.08"/><path fill="#fff" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m64.005 78.19-4.26 2.34L41.03 90.85l-8.499-4.68L55.506 73.5z"/><path fill="#d5dae0" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M64.006 78.19v4.69L41.031 95.55v-4.7l18.715-10.32z"/><path fill="#fff" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m55.505 68.8-4.26 2.35L32.53 81.47l-8.499-4.69L46.985 64.1z"/><path fill="#d5dae0" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M55.506 68.8v4.7L32.531 86.17v-4.7l18.715-10.32z"/><path fill="#fff" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m86.981 95.55-4.26 2.35-18.715 10.32L45.291 97.9l-4.26-2.35 22.975-12.67 4.25 2.35 4.26 2.34 8.51 4.7z"/><path fill="#f2f4f6" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M64.005 108.22V127L1.047 92.27V59.42l4.26 2.35 18.715 10.32v4.7l8.51 4.68v4.7l8.499 4.69v4.69l4.26 2.35z"/><path fill="#fff" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m46.986 59.42-4.25 2.35-18.714 10.32L5.307 61.77l-4.26-2.35 22.975-12.67z"/><path fill="#d5dae0" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M46.985 59.42v4.68L24.031 76.78v-4.69l18.715-10.32zm79.969 28.15v4.7l-22.975 12.67L64.006 127v-18.78L82.72 97.9l4.25-2.35v4.7l4.249-2.35h.01l4.25-2.35v4.7l4.25-2.35 4.249-2.35v4.7l18.715-10.33zM86.97 37.36v32.85L64.006 82.88v-4.7l-8.51-4.68v-4.7l-8.51-4.7v-4.69z"/><path stroke="#627386" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M126.953 87.57v4.7l-22.974 12.67L63.995 127 1.047 92.27V59.42l22.975-12.67 22.954 12.67h.01v-.01L86.97 37.36v32.85L64.005 82.88l4.25 2.35 4.25-2.35 4.26 2.35 4.26-2.35 4.239 2.35 1.706-.94 17.009-9.39z"/><path fill="#fff" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M86.96 32.67 55.486 50.04l-8.5 4.68L28.273 44.4l-4.26-2.34 8.51-4.7L63.994 20z"/><path fill="#bde4fd" stroke="#91d2fb" stroke-linejoin="round" stroke-width="2" d="M86.96 32.67v4.69L55.486 54.72l-8.5 4.7v-4.7l8.5-4.68z"/><path fill="#e9f6fe" stroke="#91d2fb" stroke-linejoin="round" stroke-width="2" d="M46.987 54.72v4.7L24.012 46.75v-4.69l4.26 2.34z"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M86.96 32.67v4.69L55.486 54.72l-8.5 4.7-22.974-12.67v-4.69l8.51-4.7L63.994 20z"/><path fill="#fff" d="M86.96 13.67v9.38L63.996 35.73l-8.51 4.69-22.964-12.67v-4.69l8.499-4.69v-4.7L63.996 1z"/><path stroke="#d3edfd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M63.996 10.39 32.522 27.75m54.438-4.7-8.51-4.68-14.454-7.98m0 0V1"/><path stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m63.996 31.03-8.51 4.7L36.77 25.4l-4.25-2.34 8.5-4.69z"/><path stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M86.96 13.67v9.38L63.996 35.73l-8.51 4.69v-4.69l8.51-4.7v-4.68L82.71 16.02zM55.486 35.73v4.69L32.522 27.75v-4.69l4.25 2.34z"/><path stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m86.96 13.67-4.249 2.35-18.715 10.33-18.714-10.33-4.26-2.35L63.996 1z"/><path stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M63.996 26.35v4.68L41.022 18.37v-4.7l4.26 2.35z"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M86.96 13.67v9.38L63.996 35.73l-8.51 4.69-22.964-12.67v-4.69l8.499-4.69v-4.7L63.996 1z"/><path fill="#f2f4f6" d="m73.112 96.55-7.296 4.02c-1.005.55-2.753.48-3.904-.15l-6.73-3.71c-1.152-.64-1.277-1.6-.283-2.15l7.296-4.02c1.004-.55 2.752-.48 3.904.15l6.73 3.71c1.151.64 1.277 1.6.283 2.15M33.117 60.42l-7.295 4.02c-1.005.55-2.753.48-3.904-.15l-6.73-3.71c-1.152-.64-1.277-1.6-.283-2.15l7.295-4.02c1.005-.55 2.753-.48 3.905.15l6.73 3.71c1.151.64 1.277 1.6.282 2.15m79.979 28.15-7.295 4.02c-1.005.55-2.753.48-3.905-.15l-6.73-3.71c-1.151-.64-1.277-1.6-.282-2.15l7.295-4.02c1.005-.55 2.753-.48 3.904.15l6.73 3.71c1.152.64 1.277 1.6.283 2.15"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h128v128H0z"/></clipPath></defs></svg>

## React Usage

```tsx
const HostsVMOrderingIllustration = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 128 128"
  >
    <g clip-path="url(#a)">
      <path
        fill="#fff"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m126.953 87.57-4.25 2.35-18.715 10.33v-4.7l-17.019-9.38-1.696-.94 1.696-.93 17.019-9.4z"
      />
      <path
        fill="#fff"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m103.988 95.55-4.26 2.35-4.25 2.35v-4.7l-10.194-5.63-.66-.36-.146-.08-3.454-1.91-4.26-2.34 4.26-2.35 4.25 2.35 1.695.94z"
      />
      <path
        fill="#fff"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M95.478 95.55 91.24 97.9h-.01l-4.25 2.35v-4.7l-5.955-3.28-8.51-4.7-4.26-2.34 4.26-2.35 4.25 2.35 4.26 2.34v.01l3.454 1.9.146.08.66.36z"
      />
      <path
        fill="#1b6dc6"
        d="M32.51 24.06c-.273 0-.545-.11-.744-.29a.9.9 0 0 1-.22-.33 1 1 0 0 1-.083-.38c0-.13.031-.26.084-.38q.078-.18.22-.33.157-.135.345-.21a1 1 0 0 1 .795 0q.205.075.346.21c.188.19.303.45.303.71 0 .13-.02.26-.084.38a1 1 0 0 1-.22.33 1 1 0 0 1-.345.21.9.9 0 0 1-.397.08m-1.047-6.52c0-.55.47-.99 1.047-.99.575 0 1.046.44 1.046.99 0 .56-.47 1-1.046 1s-1.047-.44-1.047-1m0-5.51c0-.55.47-1 1.047-1 .575 0 1.046.45 1.046 1s-.47 1-1.046 1-1.047-.45-1.047-1m0-5.52c0-.55.47-1 1.047-1 .575 0 1.046.45 1.046 1 0 .56-.47 1-1.046 1s-1.047-.44-1.047-1M32.51 2c-.136 0-.273-.03-.398-.08q-.188-.075-.346-.21a1.2 1.2 0 0 1-.22-.33 1 1 0 0 1-.083-.38c0-.13.031-.26.084-.38.052-.13.125-.23.22-.33q.157-.135.345-.21a1 1 0 0 1 .795 0q.205.075.346.21c.188.19.303.45.303.71 0 .13-.02.26-.084.38q-.078.18-.22.33a1 1 0 0 1-.345.21c-.125.05-.261.08-.397.08m54.449 12.67c-.136 0-.272-.03-.398-.08s-.24-.12-.345-.22a1 1 0 0 1-.22-.32 1 1 0 0 1-.084-.38 1 1 0 0 1 .304-.71c.104-.09.22-.17.345-.22.251-.1.544-.1.795 0 .126.05.241.13.346.22.094.09.178.2.23.32.053.13.073.25.073.39 0 .13-.02.26-.073.38s-.136.23-.23.32c-.105.1-.22.17-.346.22s-.261.08-.397.08m-1.047-7.34c0-.55.471-1 1.047-1 .575 0 1.046.45 1.046 1s-.47 1-1.046 1-1.047-.45-1.047-1M86.959 2c-.136 0-.272-.03-.398-.08a1 1 0 0 1-.345-.22 1 1 0 0 1-.304-.7c0-.13.031-.26.084-.38.052-.13.125-.23.22-.33.104-.09.209-.16.345-.21a1 1 0 0 1 .795 0c.137.05.241.12.346.21.094.1.167.2.22.33.063.12.084.25.084.38 0 .26-.116.52-.304.7-.105.1-.21.17-.346.22-.125.05-.261.08-.397.08"
      />
      <path
        fill="#fff"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m64.005 78.19-4.26 2.34L41.03 90.85l-8.499-4.68L55.506 73.5z"
      />
      <path
        fill="#d5dae0"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M64.006 78.19v4.69L41.031 95.55v-4.7l18.715-10.32z"
      />
      <path
        fill="#fff"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m55.505 68.8-4.26 2.35L32.53 81.47l-8.499-4.69L46.985 64.1z"
      />
      <path
        fill="#d5dae0"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M55.506 68.8v4.7L32.531 86.17v-4.7l18.715-10.32z"
      />
      <path
        fill="#fff"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m86.981 95.55-4.26 2.35-18.715 10.32L45.291 97.9l-4.26-2.35 22.975-12.67 4.25 2.35 4.26 2.34 8.51 4.7z"
      />
      <path
        fill="#f2f4f6"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M64.005 108.22V127L1.047 92.27V59.42l4.26 2.35 18.715 10.32v4.7l8.51 4.68v4.7l8.499 4.69v4.69l4.26 2.35z"
      />
      <path
        fill="#fff"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m46.986 59.42-4.25 2.35-18.714 10.32L5.307 61.77l-4.26-2.35 22.975-12.67z"
      />
      <path
        fill="#d5dae0"
        stroke="#b8bfca"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M46.985 59.42v4.68L24.031 76.78v-4.69l18.715-10.32zm79.969 28.15v4.7l-22.975 12.67L64.006 127v-18.78L82.72 97.9l4.25-2.35v4.7l4.249-2.35h.01l4.25-2.35v4.7l4.25-2.35 4.249-2.35v4.7l18.715-10.33zM86.97 37.36v32.85L64.006 82.88v-4.7l-8.51-4.68v-4.7l-8.51-4.7v-4.69z"
      />
      <path
        stroke="#627386"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M126.953 87.57v4.7l-22.974 12.67L63.995 127 1.047 92.27V59.42l22.975-12.67 22.954 12.67h.01v-.01L86.97 37.36v32.85L64.005 82.88l4.25 2.35 4.25-2.35 4.26 2.35 4.26-2.35 4.239 2.35 1.706-.94 17.009-9.39z"
      />
      <path
        fill="#fff"
        stroke="#91d2fb"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M86.96 32.67 55.486 50.04l-8.5 4.68L28.273 44.4l-4.26-2.34 8.51-4.7L63.994 20z"
      />
      <path
        fill="#bde4fd"
        stroke="#91d2fb"
        stroke-linejoin="round"
        stroke-width="2"
        d="M86.96 32.67v4.69L55.486 54.72l-8.5 4.7v-4.7l8.5-4.68z"
      />
      <path
        fill="#e9f6fe"
        stroke="#91d2fb"
        stroke-linejoin="round"
        stroke-width="2"
        d="M46.987 54.72v4.7L24.012 46.75v-4.69l4.26 2.34z"
      />
      <path
        stroke="#1b6dc6"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M86.96 32.67v4.69L55.486 54.72l-8.5 4.7-22.974-12.67v-4.69l8.51-4.7L63.994 20z"
      />
      <path
        fill="#fff"
        d="M86.96 13.67v9.38L63.996 35.73l-8.51 4.69-22.964-12.67v-4.69l8.499-4.69v-4.7L63.996 1z"
      />
      <path
        stroke="#d3edfd"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M63.996 10.39 32.522 27.75m54.438-4.7-8.51-4.68-14.454-7.98m0 0V1"
      />
      <path
        stroke="#91d2fb"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m63.996 31.03-8.51 4.7L36.77 25.4l-4.25-2.34 8.5-4.69z"
      />
      <path
        stroke="#91d2fb"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M86.96 13.67v9.38L63.996 35.73l-8.51 4.69v-4.69l8.51-4.7v-4.68L82.71 16.02zM55.486 35.73v4.69L32.522 27.75v-4.69l4.25 2.34z"
      />
      <path
        stroke="#91d2fb"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m86.96 13.67-4.249 2.35-18.715 10.33-18.714-10.33-4.26-2.35L63.996 1z"
      />
      <path
        stroke="#91d2fb"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M63.996 26.35v4.68L41.022 18.37v-4.7l4.26 2.35z"
      />
      <path
        stroke="#1b6dc6"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M86.96 13.67v9.38L63.996 35.73l-8.51 4.69-22.964-12.67v-4.69l8.499-4.69v-4.7L63.996 1z"
      />
      <path
        fill="#f2f4f6"
        d="m73.112 96.55-7.296 4.02c-1.005.55-2.753.48-3.904-.15l-6.73-3.71c-1.152-.64-1.277-1.6-.283-2.15l7.296-4.02c1.004-.55 2.752-.48 3.904.15l6.73 3.71c1.151.64 1.277 1.6.283 2.15M33.117 60.42l-7.295 4.02c-1.005.55-2.753.48-3.904-.15l-6.73-3.71c-1.152-.64-1.277-1.6-.283-2.15l7.295-4.02c1.005-.55 2.753-.48 3.905.15l6.73 3.71c1.151.64 1.277 1.6.282 2.15m79.979 28.15-7.295 4.02c-1.005.55-2.753.48-3.905-.15l-6.73-3.71c-1.151-.64-1.277-1.6-.282-2.15l7.295-4.02c1.005-.55 2.753-.48 3.904.15l6.73 3.71c1.152.64 1.277 1.6.283 2.15"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h128v128H0z" />
      </clipPath>
    </defs>
  </svg>
)
```
