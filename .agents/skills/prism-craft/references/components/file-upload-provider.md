# FileUploadProvider

## Figma

- **Library name:** N/A
- **Use case:** React-only utility export; not usually mapped directly from a Figma component.

## React

Import: `import { FileUploadProvider } from '@nutanix-ui/prism-reactjs'`

<!-- SOURCE-API-START -->

### Import

```tsx
import { FileUploadProvider } from '@nutanix-ui/prism-reactjs'
```

Only the default export is re-exported from `@nutanix-ui/prism-reactjs`. The named `FileUpload` helper is **not** re-exported from the package root; access it via the static member `FileUploadProvider.FileUpload` or import directly from the source path.

### Props

Source: `components/v2/Utility/FileUploadProvider.jsx` — `static propTypes` / `static defaultProps`.

| Prop             | Type                             | Required | Default   | Description                                                                                                                                                                                                              |
| ---------------- | -------------------------------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `files`          | `File[] \| FileList`             | Yes      | `[]`      | The `FileList` instance or array of `File` objects, typically from `FileInput`'s `onFileChange` callback.                                                                                                                |
| `action`         | `string`                         | Yes      | —         | Upload endpoint URI. Used as the POST target for `XMLHttpRequest`.                                                                                                                                                       |
| `component`      | `React.ComponentType`            | Yes      | —         | Component rendered by the provider (e.g. `Button`). Receives an injected `onClick` and `disabled` prop automatically.                                                                                                    |
| `componentProps` | `object`                         | No       | `{}`      | Additional props forwarded to `component`. Any `onClick` in `componentProps` is called before the upload starts. The provider strips `onClick` and injects its own; all other keys pass through.                         |
| `onStart`        | `(xhr: XMLHttpRequest) => void`  | No       | `() => 0` | Called immediately before `xhr.send()`. Use to add custom headers or attach additional XHR listeners. Receives the live `XMLHttpRequest` instance.                                                                       |
| `onDone`         | `() => void`                     | No       | `() => 0` | Called when the HTTP request completes (`load` event). Does **not** guarantee success — inspect `xhr.status` inside the callback to determine outcome.                                                                   |
| `onProgress`     | `(event: ProgressEvent) => void` | No       | `() => 0` | Called as upload progress changes (`upload.progress` event). Receives the native [`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent); use `event.loaded` / `event.total` for percentage.   |
| `onError`        | `() => void`                     | No       | `() => 0` | Called for non-HTTP networking errors (e.g. connection lost). HTTP-level errors must be handled in `onDone` by checking `xhr.status`.                                                                                    |
| `onAbort`        | `() => void`                     | No       | `() => 0` | Called when the upload is aborted.                                                                                                                                                                                       |
| `abortOnUnMount` | `boolean`                        | No       | `true`    | When `true`, any in-flight XHR is aborted on component unmount. Set to `false` if you want the upload to finish even after unmount (the provider re-attaches `onDone`/`onAbort` listeners to the XHR before unmounting). |

### Render Behaviour

- The provider renders `component` directly — no wrapper element is added to the DOM.
- The injected `onClick` starts the upload. If `isInProgress` is `true`, subsequent clicks are ignored (idempotent while uploading).
- While uploading, `disabled={true}` is automatically passed to `component`. This disables a `Button` without any consumer code.
- `componentProps.onClick`, if provided, is called first, then the upload begins.

### Internal State

| Field          | Type      | Description                                                          |
| -------------- | --------- | -------------------------------------------------------------------- |
| `isInProgress` | `boolean` | `true` while an XHR is in flight; reset to `false` on done or abort. |

### Static Members

| Member                          | Description                                                                                                                                                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FileUploadProvider.FileUpload` | The lower-level `FileUpload(options)` utility function. Builds a `FormData` body, opens a POST XHR, and returns the `XMLHttpRequest` instance. Useful when you need raw XHR control outside of the component lifecycle. |

#### `FileUpload` options

```ts
FileUploadProvider.FileUpload({
  files: FileList | File[],   // required
  action: string,             // required
  onDone?: () => void,
  onProgress?: (event: ProgressEvent) => void,
  onError?: () => void,
  onAbort?: () => void,
  onStart?: (xhr: XMLHttpRequest) => void,
}): XMLHttpRequest
```

### Examples

#### Minimal working example

```tsx
import {
  FileUploadProvider,
  Button,
  FileInput,
} from '@nutanix-ui/prism-reactjs'
import { useState } from 'react'

function UploadButton() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <>
      <FileInput
        multiple
        content={<Button>Select files</Button>}
        onFileChange={(fileList) => setFiles(Array.from(fileList))}
      />
      <FileUploadProvider
        component={Button}
        componentProps={{ children: 'Upload' }}
        files={files}
        action="/api/upload"
      />
    </>
  )
}
```

#### With progress, done, error, and start callbacks

```tsx
import {
  FileUploadProvider,
  Button,
  Progress,
  Alert,
  FileInput,
  FlexItem,
  StackingLayout,
} from '@nutanix-ui/prism-reactjs'
import React, { useState, useRef } from 'react'

function FileUploadWithStatus() {
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>(
    'idle',
  )
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const xhrRef = useRef<XMLHttpRequest | null>(null)

  const handleFileChange = (fileList: FileList) => {
    setFiles(Array.from(fileList))
    setStatus('idle')
  }

  const onStart = (xhr: XMLHttpRequest) => {
    xhrRef.current = xhr
  }

  const onProgress = (evt: ProgressEvent) => {
    setStatus('uploading')
    setProgress((evt.loaded / evt.total) * 100)
  }

  const onDone = () => {
    if (xhrRef.current?.status !== 200) {
      setStatus('error')
      setErrorMsg(xhrRef.current?.response ?? 'Upload failed')
      return
    }
    setStatus('done')
  }

  const onError = () => {
    setStatus('error')
    setErrorMsg('Network error')
  }

  const buttonText =
    status === 'uploading'
      ? 'Uploading…'
      : status === 'done'
        ? 'Upload again'
        : 'Upload'

  return (
    <StackingLayout itemSpacing="20px">
      <FileInput
        multiple
        content={<Button>Select files</Button>}
        onFileChange={handleFileChange}
      />
      <FileUploadProvider
        component={Button}
        componentProps={{ children: buttonText }}
        files={files}
        action="/api/upload"
        onStart={onStart}
        onProgress={onProgress}
        onDone={onDone}
        onError={onError}
      />
      {status === 'uploading' && (
        <FlexItem>
          <Progress
            percent={progress.toPrecision(3)}
            status="active"
            fixedLabelWidth="60px"
          />
        </FlexItem>
      )}
      {status === 'error' && (
        <Alert type={Alert.AlertTypes.ERROR} message={errorMsg} />
      )}
    </StackingLayout>
  )
}
```

#### Single-file upload with `abortOnUnMount={false}`

When the consuming component may unmount mid-upload and you want the request to complete, set `abortOnUnMount={false}`. The provider re-attaches `onDone`/`onAbort` to the XHR before unmounting.

```tsx
<FileUploadProvider
  component={Button}
  componentProps={{ children: 'Upload in background' }}
  files={files}
  action="/api/upload"
  abortOnUnMount={false}
  onDone={handleDone}
  onAbort={handleAbort}
/>
```

#### Using the `FileUpload` utility directly

```tsx
import { FileUploadProvider } from '@nutanix-ui/prism-reactjs'

const xhr = FileUploadProvider.FileUpload({
  files: myFileList,
  action: '/api/upload',
  onStart: (xhrInstance) => {
    xhrInstance.setRequestHeader('Authorization', `Bearer ${token}`)
  },
  onDone: () => console.log('done'),
  onError: () => console.error('network error'),
})

// Cancel later if needed:
xhr.abort()
```

### Usage Notes

- `FileUploadProvider` is a **class component** that wraps any interactive element (typically `Button`) and injects upload-triggering click behaviour.
- It pairs naturally with `FileInput` — use `FileInput`'s `onFileChange` to collect files, then pass the result as `files`.
- `onDone` fires on XHR `load` (any HTTP response), not just 2xx. Always check `xhr.status` inside `onStart` (which holds the XHR ref) or re-check it in `onDone`.
- `onError` fires only for **network-level** failures (no response received), not for HTTP error status codes.
- While `isInProgress` is `true`, extra clicks on the rendered component are silently ignored — the provider prevents double-submissions automatically.
- Keep `files` and `action` in sync before the user triggers the upload. Changing them after click has no effect on the in-flight request.
- For layout and spacing around the provider, use Prism layout components (`FlexLayout`, `StackingLayout`, `FlexItem`) rather than custom CSS.

<!-- SOURCE-API-END -->
