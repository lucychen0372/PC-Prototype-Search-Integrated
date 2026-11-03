# Backup on S3 object store

Move, Conversion, Steps, S3, Object, Store, Backup, Prism Central, Bucket

## SVG

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 128"><path fill="#e9f6fe" d="M94.922 118.89c-16.91 9.76-44.33 9.76-61.24 0-9.69-5.6-13.83-13.19-12.41-20.48l.04-.19 15.7-81.05.08-.39c.65-3.43 3.25-6.75 7.78-9.39l6.6 3.81v8.27c-.08.04-.15.08-.22.12-.83.49-1.58 1.07-2.3 1.7-.46.44-.9.9-1.27 1.42.98 1.33 2.34 2.48 3.87 3.31 7.09 4.09 18.55 4.09 25.59 0 1.66-.97 2.93-2.07 3.79-3.26-.88-1.2-2.18-2.32-3.87-3.29l-5.99 3.47-5.1-13.67V1l23.61 2.91v8.27l-.19.11c1.11 1.47 1.82 3.01 2.12 4.58l.06.28 15.72 81.07.04.19c1.42 7.29-2.72 14.88-12.41 20.48"/><path fill="#e9f6fe" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M94.923 83.53c16.91 9.76 16.91 25.59 0 35.36s-44.33 9.76-61.24 0-16.91-25.59 0-35.36c16.91-9.76 44.33-9.76 61.24 0"/><path fill="#e9f6fe" d="M89.012 61.33h-46.93l5.25 37.25h.01c.77 5.42 8.61 9.68 18.2 9.68s17.43-4.26 18.2-9.68h.01l5.25-37.25z"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M65.541 106.4c-9.4 0-15.8-4.19-16.35-8.08l-.23-1.6-.07-.41-4.59-32.58-.36-2.67c-.04-.27-.07-.55-.08-.84 0-.74.13-1.45.37-2.13 1.94-5.48 11.1-9.61 21.31-9.61 11.75 0 21.68 5.37 21.68 11.73 0 .3-.04.58-.08.87l-.3 2.12-.05.53-4.61 32.7-.28 1.9c-.55 3.88-6.96 8.08-16.35 8.08z"/><path fill="#fff" d="M65.542 61.33h-23.46l5.25 37.25h.01c.77 5.42 8.61 9.68 18.2 9.68V61.32z"/><path fill="#fff" d="M65.542 73.8c13 0 23.54-6.09 23.54-13.59s-10.54-13.59-23.54-13.59-23.54 6.09-23.54 13.59 10.54 13.59 23.54 13.59"/><path fill="#bde4fd" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M65.542 73.8c13 0 23.54-6.09 23.54-13.59s-10.54-13.59-23.54-13.59-23.54 6.09-23.54 13.59 10.54 13.59 23.54 13.59"/><path fill="#bde4fd" d="M65.542 46.62c-13 0-23.54 6.09-23.54 13.59s10.54 13.59 23.54 13.59z"/><path fill="#e9f6fe" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M65.542 73.8c9.78 0 18.16-3.44 21.72-8.34-2.43-5.63-11.22-9.8-21.72-9.8s-19.29 4.17-21.72 9.8c3.56 4.9 11.94 8.34 21.72 8.34"/><path stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M65.542 73.8c9.78 0 18.16-3.44 21.72-8.34-2.43-5.63-11.22-9.8-21.72-9.8s-19.29 4.17-21.72 9.8c3.56 4.9 11.94 8.34 21.72 8.34"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M65.543 71.67c11.96 0 21.66-5.13 21.66-11.46s-9.7-11.46-21.66-11.46-21.66 5.13-21.66 11.46 9.7 11.46 21.66 11.46"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M89.092 60.21c0-7.51-10.54-13.59-23.54-13.59-11.38 0-20.87 4.66-23.06 10.85-.31.88-.48 1.81-.48 2.74 0 .37.04.75.1 1.12h-.02l5.25 37.25h.01c.77 5.42 8.61 9.68 18.2 9.68s17.43-4.26 18.2-9.68h.01l5.25-37.25h-.02c.06-.37.09-.74.1-1.12M87.523 71.9c2.9 4.5 3.72 8.61 1.46 12.19"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M88.313 85.04c-.94 1.23-2.39 2.43-4.31 3.57-1.37.82-3.15 1.57-5.23 2.22"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m52.643 77.21 6.15 5.78c4.59 4.31 11.59 10.25 19.6 7.95"/><path fill="#bde4fd" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M89.854 114.51v-10.45l9.05-5.23v10.45z"/><path fill="#e9f6fe" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M89.853 114.51v-10.45l-9.05-5.23v10.45z"/><path fill="#fff" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m89.853 104.06-9.05-5.23 9.05-5.23 9.05 5.23z"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m89.853 93.6-9.05 5.23v10.45l9.05 5.23 9.05-5.23V98.83z"/><path fill="#bde4fd" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M38.754 107.57V97.12l9.05-5.23v10.45z"/><path fill="#e9f6fe" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M38.753 107.57V97.12l-9.05-5.23v10.45z"/><path fill="#fff" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m38.753 97.12-9.05-5.23 9.05-5.23 9.05 5.23z"/><path stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m38.753 86.66-9.05 5.23v10.45l9.05 5.23 9.05-5.23V91.89z"/><path fill="#bde4fd" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M47.815 112.79v-10.45l9.05-5.23v10.45z"/><path fill="#e9f6fe" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M47.814 112.79v-10.45l-9.05-5.23v10.45z"/><path fill="#fff" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m47.814 102.34-9.05-5.23 9.05-5.23 9.05 5.23z"/><path stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m47.814 91.89-9.05 5.23v10.45l9.05 5.23 9.05-5.23V97.12z"/><path fill="#bde4fd" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M38.754 97.12V86.67l9.05-5.23v10.45z"/><path fill="#e9f6fe" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M38.753 97.12V86.67l-9.05-5.23v10.45z"/><path fill="#fff" stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m38.753 86.66-9.05-5.23 9.05-5.23 9.05 5.23z"/><path stroke="#91d2fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m38.753 76.21-9.05 5.23v10.45l9.05 5.23 9.05-5.23V81.44z"/><path stroke="#1b6dc6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M56.863 97.12v10.45l-9.06 5.22-9.05-5.22-9.05-5.22V81.44l9.05-5.23 9.05 5.23v10.45z"/><path fill="#d5dae0" d="M77.062 11.2v8.27l-5.99 3.47v-8.27z"/><path fill="#f2f4f6" d="M80.933 22.76c-.88-1.2-2.18-2.32-3.87-3.3v-8.27c5.41 3.12 6.72 7.74 3.87 11.57M64.282 34.48v8.27c-6.97-.02-13.95-1.57-19.28-4.65-5.39-3.11-8.08-7.19-8.08-11.27v-8.27c0 1.39.31 2.78.95 4.13 1.2 2.62 3.58 5.09 7.14 7.14.93.53 1.91 1.03 2.93 1.47 4.83 2.1 10.59 3.17 16.35 3.18z"/><path fill="#d5dae0" d="M91.693 18.66v8.27c0 4.04-2.65 8.08-7.96 11.17-5.36 3.11-12.4 4.66-19.45 4.65v-8.27c5.78 0 11.56-1.03 16.41-3.12 1.07-.46 2.08-.96 3.04-1.53 3.48-2.02 5.82-4.46 7.01-7.04.63-1.35.95-2.75.95-4.13m-40.22-7.46v8.27c-.07.05-.15.08-.22.13-.83.49-1.58 1.07-2.3 1.7-.46.43-.9.9-1.27 1.41-1.3-1.8-1.88-3.93-1.17-6.1.15-.43.34-.85.59-1.29 0-.03.02-.06.05-.07.46-.84 1.1-1.57 1.8-2.21.72-.64 1.47-1.22 2.3-1.7.07-.06.15-.09.22-.14"/><path fill="#f2f4f6" d="M71.073 14.67v8.27l-5.1-13.67V1l3.24 8.66z"/><path fill="#d5dae0" d="M89.582 3.91v8.27l-.19.11c-.04-.06-.07-.1-.11-.15-1.33-1.73-3.22-3.33-5.68-4.75z"/><path stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M64.283 34.48v-.01"/><path fill="#fff" stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M91.692 18.66c0 1.39-.31 2.78-.95 4.13-1.19 2.58-3.53 5.02-7.01 7.04-.96.56-1.98 1.07-3.04 1.53-4.85 2.09-10.63 3.13-16.41 3.12-5.76 0-11.52-1.07-16.35-3.18-1.02-.44-2-.94-2.93-1.47-3.56-2.05-5.93-4.52-7.14-7.14-.63-1.35-.95-2.75-.95-4.13 0-4.04 2.65-8.08 7.96-11.16l6.6 3.8c-.07.05-.15.08-.22.13-.83.49-1.58 1.07-2.3 1.7-.7.65-1.34 1.39-1.8 2.22-.03.02-.04.05-.05.07-.25.43-.44.85-.59 1.29-.72 2.17-.14 4.3 1.17 6.1.97 1.33 2.34 2.48 3.87 3.31 7.09 4.1 18.55 4.1 25.59 0 1.65-.96 2.92-2.07 3.79-3.25 2.85-3.82 1.54-8.44-3.87-11.57l-5.99 3.47-1.86-5.01L65.982 1l23.61 2.91-5.98 3.48c2.45 1.41 4.35 3.02 5.68 4.75.04.05.07.09.11.15 1.53 2.02 2.3 4.2 2.3 6.37z"/><path stroke="#b8bfca" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M71.072 14.67v8.27"/><path stroke="#627386" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M91.692 18.66v8.27c0 4.04-2.65 8.08-7.96 11.17-5.36 3.11-12.4 4.66-19.45 4.65-6.97-.02-13.95-1.57-19.28-4.65-5.39-3.11-8.08-7.19-8.08-11.27v-8.27c0-4.04 2.65-8.08 7.96-11.16l6.6 3.8v8.27c-.07.05-.15.08-.22.13-.83.49-1.58 1.07-2.3 1.7-.46.43-.9.9-1.27 1.41.97 1.33 2.34 2.48 3.87 3.31 7.09 4.1 18.55 4.1 25.59 0 1.65-.96 2.92-2.07 3.79-3.25-.88-1.2-2.18-2.32-3.87-3.3l-5.99 3.47-5.1-13.67V1l23.61 2.91v8.27l-.19.11c1.53 2.02 2.3 4.2 2.3 6.37z"/></svg>

## React Usage

```tsx
const BackupOnS3ObjectStoreIllustration = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 128 128"
  >
    <path
      fill="#e9f6fe"
      d="M94.922 118.89c-16.91 9.76-44.33 9.76-61.24 0-9.69-5.6-13.83-13.19-12.41-20.48l.04-.19 15.7-81.05.08-.39c.65-3.43 3.25-6.75 7.78-9.39l6.6 3.81v8.27c-.08.04-.15.08-.22.12-.83.49-1.58 1.07-2.3 1.7-.46.44-.9.9-1.27 1.42.98 1.33 2.34 2.48 3.87 3.31 7.09 4.09 18.55 4.09 25.59 0 1.66-.97 2.93-2.07 3.79-3.26-.88-1.2-2.18-2.32-3.87-3.29l-5.99 3.47-5.1-13.67V1l23.61 2.91v8.27l-.19.11c1.11 1.47 1.82 3.01 2.12 4.58l.06.28 15.72 81.07.04.19c1.42 7.29-2.72 14.88-12.41 20.48"
    />
    <path
      fill="#e9f6fe"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M94.923 83.53c16.91 9.76 16.91 25.59 0 35.36s-44.33 9.76-61.24 0-16.91-25.59 0-35.36c16.91-9.76 44.33-9.76 61.24 0"
    />
    <path
      fill="#e9f6fe"
      d="M89.012 61.33h-46.93l5.25 37.25h.01c.77 5.42 8.61 9.68 18.2 9.68s17.43-4.26 18.2-9.68h.01l5.25-37.25z"
    />
    <path
      stroke="#fff"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M65.541 106.4c-9.4 0-15.8-4.19-16.35-8.08l-.23-1.6-.07-.41-4.59-32.58-.36-2.67c-.04-.27-.07-.55-.08-.84 0-.74.13-1.45.37-2.13 1.94-5.48 11.1-9.61 21.31-9.61 11.75 0 21.68 5.37 21.68 11.73 0 .3-.04.58-.08.87l-.3 2.12-.05.53-4.61 32.7-.28 1.9c-.55 3.88-6.96 8.08-16.35 8.08z"
    />
    <path
      fill="#fff"
      d="M65.542 61.33h-23.46l5.25 37.25h.01c.77 5.42 8.61 9.68 18.2 9.68V61.32z"
    />
    <path
      fill="#fff"
      d="M65.542 73.8c13 0 23.54-6.09 23.54-13.59s-10.54-13.59-23.54-13.59-23.54 6.09-23.54 13.59 10.54 13.59 23.54 13.59"
    />
    <path
      fill="#bde4fd"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M65.542 73.8c13 0 23.54-6.09 23.54-13.59s-10.54-13.59-23.54-13.59-23.54 6.09-23.54 13.59 10.54 13.59 23.54 13.59"
    />
    <path
      fill="#bde4fd"
      d="M65.542 46.62c-13 0-23.54 6.09-23.54 13.59s10.54 13.59 23.54 13.59z"
    />
    <path
      fill="#e9f6fe"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M65.542 73.8c9.78 0 18.16-3.44 21.72-8.34-2.43-5.63-11.22-9.8-21.72-9.8s-19.29 4.17-21.72 9.8c3.56 4.9 11.94 8.34 21.72 8.34"
    />
    <path
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M65.542 73.8c9.78 0 18.16-3.44 21.72-8.34-2.43-5.63-11.22-9.8-21.72-9.8s-19.29 4.17-21.72 9.8c3.56 4.9 11.94 8.34 21.72 8.34"
    />
    <path
      stroke="#fff"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M65.543 71.67c11.96 0 21.66-5.13 21.66-11.46s-9.7-11.46-21.66-11.46-21.66 5.13-21.66 11.46 9.7 11.46 21.66 11.46"
    />
    <path
      stroke="#1b6dc6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M89.092 60.21c0-7.51-10.54-13.59-23.54-13.59-11.38 0-20.87 4.66-23.06 10.85-.31.88-.48 1.81-.48 2.74 0 .37.04.75.1 1.12h-.02l5.25 37.25h.01c.77 5.42 8.61 9.68 18.2 9.68s17.43-4.26 18.2-9.68h.01l5.25-37.25h-.02c.06-.37.09-.74.1-1.12M87.523 71.9c2.9 4.5 3.72 8.61 1.46 12.19"
    />
    <path
      stroke="#1b6dc6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="4"
      d="M88.313 85.04c-.94 1.23-2.39 2.43-4.31 3.57-1.37.82-3.15 1.57-5.23 2.22"
    />
    <path
      stroke="#1b6dc6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m52.643 77.21 6.15 5.78c4.59 4.31 11.59 10.25 19.6 7.95"
    />
    <path
      fill="#bde4fd"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M89.854 114.51v-10.45l9.05-5.23v10.45z"
    />
    <path
      fill="#e9f6fe"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M89.853 114.51v-10.45l-9.05-5.23v10.45z"
    />
    <path
      fill="#fff"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m89.853 104.06-9.05-5.23 9.05-5.23 9.05 5.23z"
    />
    <path
      stroke="#1b6dc6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m89.853 93.6-9.05 5.23v10.45l9.05 5.23 9.05-5.23V98.83z"
    />
    <path
      fill="#bde4fd"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M38.754 107.57V97.12l9.05-5.23v10.45z"
    />
    <path
      fill="#e9f6fe"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M38.753 107.57V97.12l-9.05-5.23v10.45z"
    />
    <path
      fill="#fff"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m38.753 97.12-9.05-5.23 9.05-5.23 9.05 5.23z"
    />
    <path
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m38.753 86.66-9.05 5.23v10.45l9.05 5.23 9.05-5.23V91.89z"
    />
    <path
      fill="#bde4fd"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M47.815 112.79v-10.45l9.05-5.23v10.45z"
    />
    <path
      fill="#e9f6fe"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M47.814 112.79v-10.45l-9.05-5.23v10.45z"
    />
    <path
      fill="#fff"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m47.814 102.34-9.05-5.23 9.05-5.23 9.05 5.23z"
    />
    <path
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m47.814 91.89-9.05 5.23v10.45l9.05 5.23 9.05-5.23V97.12z"
    />
    <path
      fill="#bde4fd"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M38.754 97.12V86.67l9.05-5.23v10.45z"
    />
    <path
      fill="#e9f6fe"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M38.753 97.12V86.67l-9.05-5.23v10.45z"
    />
    <path
      fill="#fff"
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m38.753 86.66-9.05-5.23 9.05-5.23 9.05 5.23z"
    />
    <path
      stroke="#91d2fb"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m38.753 76.21-9.05 5.23v10.45l9.05 5.23 9.05-5.23V81.44z"
    />
    <path
      stroke="#1b6dc6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M56.863 97.12v10.45l-9.06 5.22-9.05-5.22-9.05-5.22V81.44l9.05-5.23 9.05 5.23v10.45z"
    />
    <path fill="#d5dae0" d="M77.062 11.2v8.27l-5.99 3.47v-8.27z" />
    <path
      fill="#f2f4f6"
      d="M80.933 22.76c-.88-1.2-2.18-2.32-3.87-3.3v-8.27c5.41 3.12 6.72 7.74 3.87 11.57M64.282 34.48v8.27c-6.97-.02-13.95-1.57-19.28-4.65-5.39-3.11-8.08-7.19-8.08-11.27v-8.27c0 1.39.31 2.78.95 4.13 1.2 2.62 3.58 5.09 7.14 7.14.93.53 1.91 1.03 2.93 1.47 4.83 2.1 10.59 3.17 16.35 3.18z"
    />
    <path
      fill="#d5dae0"
      d="M91.693 18.66v8.27c0 4.04-2.65 8.08-7.96 11.17-5.36 3.11-12.4 4.66-19.45 4.65v-8.27c5.78 0 11.56-1.03 16.41-3.12 1.07-.46 2.08-.96 3.04-1.53 3.48-2.02 5.82-4.46 7.01-7.04.63-1.35.95-2.75.95-4.13m-40.22-7.46v8.27c-.07.05-.15.08-.22.13-.83.49-1.58 1.07-2.3 1.7-.46.43-.9.9-1.27 1.41-1.3-1.8-1.88-3.93-1.17-6.1.15-.43.34-.85.59-1.29 0-.03.02-.06.05-.07.46-.84 1.1-1.57 1.8-2.21.72-.64 1.47-1.22 2.3-1.7.07-.06.15-.09.22-.14"
    />
    <path fill="#f2f4f6" d="M71.073 14.67v8.27l-5.1-13.67V1l3.24 8.66z" />
    <path
      fill="#d5dae0"
      d="M89.582 3.91v8.27l-.19.11c-.04-.06-.07-.1-.11-.15-1.33-1.73-3.22-3.33-5.68-4.75z"
    />
    <path
      stroke="#b8bfca"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M64.283 34.48v-.01"
    />
    <path
      fill="#fff"
      stroke="#b8bfca"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M91.692 18.66c0 1.39-.31 2.78-.95 4.13-1.19 2.58-3.53 5.02-7.01 7.04-.96.56-1.98 1.07-3.04 1.53-4.85 2.09-10.63 3.13-16.41 3.12-5.76 0-11.52-1.07-16.35-3.18-1.02-.44-2-.94-2.93-1.47-3.56-2.05-5.93-4.52-7.14-7.14-.63-1.35-.95-2.75-.95-4.13 0-4.04 2.65-8.08 7.96-11.16l6.6 3.8c-.07.05-.15.08-.22.13-.83.49-1.58 1.07-2.3 1.7-.7.65-1.34 1.39-1.8 2.22-.03.02-.04.05-.05.07-.25.43-.44.85-.59 1.29-.72 2.17-.14 4.3 1.17 6.1.97 1.33 2.34 2.48 3.87 3.31 7.09 4.1 18.55 4.1 25.59 0 1.65-.96 2.92-2.07 3.79-3.25 2.85-3.82 1.54-8.44-3.87-11.57l-5.99 3.47-1.86-5.01L65.982 1l23.61 2.91-5.98 3.48c2.45 1.41 4.35 3.02 5.68 4.75.04.05.07.09.11.15 1.53 2.02 2.3 4.2 2.3 6.37z"
    />
    <path
      stroke="#b8bfca"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M71.072 14.67v8.27"
    />
    <path
      stroke="#627386"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M91.692 18.66v8.27c0 4.04-2.65 8.08-7.96 11.17-5.36 3.11-12.4 4.66-19.45 4.65-6.97-.02-13.95-1.57-19.28-4.65-5.39-3.11-8.08-7.19-8.08-11.27v-8.27c0-4.04 2.65-8.08 7.96-11.16l6.6 3.8v8.27c-.07.05-.15.08-.22.13-.83.49-1.58 1.07-2.3 1.7-.46.43-.9.9-1.27 1.41.97 1.33 2.34 2.48 3.87 3.31 7.09 4.1 18.55 4.1 25.59 0 1.65-.96 2.92-2.07 3.79-3.25-.88-1.2-2.18-2.32-3.87-3.3l-5.99 3.47-5.1-13.67V1l23.61 2.91v8.27l-.19.11c1.53 2.02 2.3 4.2 2.3 6.37z"
    />
  </svg>
)
```
