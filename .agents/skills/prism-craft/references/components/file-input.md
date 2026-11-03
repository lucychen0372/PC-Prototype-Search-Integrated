# FileInput

## Figma

- **Library name:** File Input (page: N/A, frame: File Input)
- **Figma spec:** https://www.figma.com/design/KVbKkR0QAFRbTVpwysQLWw/branch/t6cIRFFRoL9PJWEoAQWB3k/Spec-Doc?node-id=38344-14824

## React

Import: `import { FileInput } from '@nutanix-ui/prism-reactjs'`

### Overview

`FileInput` is a thin wrapper around the native `<input type="file" />` element. It masks the hidden input with any node you supply via `content`, so any Prism component (a `Button`, a styled drop-zone, a `FormItemInput`) can become a file-select or drag-and-drop trigger.

The outer `<div>` container accepts a `ref`; use `inputRef` to access the hidden `<input>` directly.

### TSX Examples

#### Basic – Button as trigger (drag-drop + click to select)

```tsx
import { FileInput, Button } from '@nutanix-ui/prism-reactjs'

function MyUpload() {
  const handleFileChange = (files: FileList) => {
    console.log(files)
  }

  return (
    <FileInput
      content={<Button>Click to Select Files or Drag/Drop Here</Button>}
      onFileChange={handleFileChange}
      multiple
    />
  )
}
```

#### With `FormItemProvider` for form-field label/validation

```tsx
import React from 'react'
import {
  TextLabel,
  UnorderedList,
  StackingLayout,
  FlexItem,
  Button,
  FileInput,
  FormItemProvider,
} from '@nutanix-ui/prism-reactjs'

const FormFileInput = FormItemProvider(FileInput)

class MyFileInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { files: [] }
    this.handleOnFileChange = this.handleOnFileChange.bind(this)
  }

  handleOnFileChange(files) {
    const filesArray = []
    for (let i = 0; i < files.length; i++) {
      filesArray.push(files[i])
    }
    this.setState({ files: filesArray })
  }

  render() {
    const { files } = this.state

    let filesNode = <TextLabel>No Files Have Been Selected</TextLabel>
    if (files.length > 0) {
      const fileNames = []
      files.forEach((file) => {
        fileNames.push(file.name)
      })
      filesNode = <UnorderedList data={fileNames} />
    }

    return (
      <StackingLayout itemSpacing="20px">
        <FormFileInput
          multiple={true}
          content={<Button>Click to Select Files or Drag/Drop Here</Button>}
          onFileChange={this.handleOnFileChange}
          label="Upload Files"
        />
        <FlexItem>{filesNode}</FlexItem>
      </StackingLayout>
    )
  }
}
```

#### Advanced – `FormItemInput` as content, programmatic open via `inputRef`

This pattern disables the built-in click-to-select and drag-drop on the `FileInput`
itself so the `FormItemInput` can stay read-only; the icon button inside the
input's suffix opens the file dialog imperatively via `inputRef`.

```tsx
import React from 'react'
import {
  Button,
  FileInput,
  FileUploadProvider,
  FormItemInput,
  UploadIcon,
  CloseIcon,
} from '@nutanix-ui/prism-reactjs'

const defaultState = {
  file: null,
  error: false,
  helpText: 'Select a file to upload',
}

class FileInputWithUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleOnFileChange = this.handleOnFileChange.bind(this)
    this.handleOpenSelectFile = this.handleOpenSelectFile.bind(this)
    this.handleRemoveSelectedFile = this.handleRemoveSelectedFile.bind(this)
    this.inputRef = React.createRef()
    this.uploadButtonRef = React.createRef()
  }

  handleOnFileChange(files) {
    this.setState({ file: files[0] })
    const xhr = FileUploadProvider.FileUpload({
      files,
      action: '/api/upload',
      onDone: () => {
        if (Math.floor(xhr.status / 100) === 2) {
          this.setState({
            error: false,
            helpText: 'File uploaded successfully',
          })
        } else {
          this.setState({
            error: true,
            helpText: `HTTP error ${xhr.status} ${xhr.statusText}`,
          })
        }
      },
    })
  }

  handleOpenSelectFile() {
    this.inputRef.current.click() // programmatically open the file dialog
  }

  handleRemoveSelectedFile() {
    this.setState(defaultState)
    this.inputRef.current.value = null
  }

  render() {
    const { file, error, helpText } = this.state

    const suffixNode = (
      <Button
        innerRef={this.uploadButtonRef}
        type="icon-default"
        appearance="mini"
        onClick={
          file ? this.handleRemoveSelectedFile : this.handleOpenSelectFile
        }
        aria-label={file ? 'Clear selected file' : 'Select a file to upload'}
      >
        {file ? <CloseIcon size="small" /> : <UploadIcon />}
      </Button>
    )

    return (
      <FileInput
        enableDragDrop={false}
        enableFileSelect={false}
        inputRef={this.inputRef}
        onFileChange={this.handleOnFileChange}
        content={
          <FormItemInput
            readOnly={true}
            onFocus={() => {
              if (!file) this.uploadButtonRef.current.focus()
            }}
            label="Upload File"
            errorType="critical"
            name="select-file-upload"
            placeholder="Select file to upload"
            error={error}
            helpText={helpText}
            value={file ? file.name : ''}
            suffix={suffixNode}
          />
        }
      />
    )
  }
}
```

### Anti-patterns

- Don't use `<input type="file">` directly — use `FileInput`.
- Don't pass `onChange` as your primary file handler; use `onFileChange` instead. (`onChange` is also called when files are selected, but `onFileChange` receives the `FileList` directly without needing to dig into the event.)
- Don't set `accept=".csv"` on a `<FileInput>` child — pass `accept` as a prop directly on `FileInput` (it is forwarded to the hidden `<input>`).

<!-- SOURCE-API-START -->

### Import

```tsx
import { FileInput } from '@nutanix-ui/prism-reactjs'
```

Exported from: `src/components/v2/Input/FileInput.tsx`

### Props Interface

#### `FileInputProps`

Extends: `Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'content'>`

All standard HTML `<input type="file">` props (e.g. `accept`, `multiple`, `disabled`, `name`) are forwarded to the hidden input unless documented otherwise below.

| Prop                    | Type                                         | Required | Default | Description                                                                                                                                                                                                                               |
| ----------------------- | -------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`               | `React.ReactNode`                            | **Yes**  | —       | The node rendered as the visible trigger. If a React element, its own `onClick`, `onDragOver`, and `onDrop` handlers are preserved and called in addition to the FileInput handlers. If a plain string/node, it is wrapped in a `<span>`. |
| `onFileChange`          | `(files: FileList) => void`                  | No       | —       | Called every time files are selected via click or drag-and-drop. Receives the `FileList` directly. Prefer this over `onChange`.                                                                                                           |
| `enableDragDrop`        | `boolean`                                    | No       | `true`  | When `true`, attaches `onDragOver` / `onDrop` handlers to the content node. Set to `false` to disable drag-and-drop.                                                                                                                      |
| `enableFileSelect`      | `boolean`                                    | No       | `true`  | When `true`, clicking the content node opens the system file dialog. Set to `false` to disable (useful when you want to open the dialog programmatically via `inputRef`).                                                                 |
| `inputRef`              | `React.Ref<HTMLInputElement>`                | No       | —       | Ref for the hidden `<input type="file">` element. Use to call `.click()` programmatically or reset the value. Accepts a callback ref or an object from `React.createRef()` / `useRef()`.                                                  |
| `ref`                   | `React.Ref<HTMLDivElement>`                  | No       | —       | Forwarded ref for the outer container `<div>`.                                                                                                                                                                                            |
| `className`             | `string`                                     | No       | —       | Additional CSS class applied to the outer container `<div>`.                                                                                                                                                                              |
| `disabled`              | `boolean`                                    | No       | —       | Passed to both the content node (if a React element) and the hidden `<input>`.                                                                                                                                                            |
| `onChange`              | `React.ChangeEventHandler<HTMLInputElement>` | No       | —       | Standard input `onChange` fired after `onFileChange`. Receives the raw `React.ChangeEvent`. Only called when files are actually selected (not on empty selections).                                                                       |
| `data-test`             | `string`                                     | No       | —       | Test selector applied to the outer container.                                                                                                                                                                                             |
| `onPointerEnterCapture` | `any`                                        | No       | —       | React 16/18 compatibility shim; do not use in application code.                                                                                                                                                                           |
| `onPointerLeaveCapture` | `any`                                        | No       | —       | React 16/18 compatibility shim; do not use in application code.                                                                                                                                                                           |

### Behaviour Notes

- **Content cloning**: When `content` is a React element, `FileInput` clones it and injects `disabled`, `onClick`, `onDragOver`, and/or `onDrop` props depending on `enableDragDrop` / `enableFileSelect`. The content element's own handlers for those events are called first and are not replaced.
- **Drag-and-drop**: `handleOnDragOver` calls `e.stopPropagation()`, `e.preventDefault()`, and sets `e.dataTransfer.dropEffect = 'copy'`. `handleOnDrop` also calls `stopPropagation` and `preventDefault` before passing `e.dataTransfer.files` to `onFileChange`.
- **Empty selection guard**: `onChange` and `onFileChange` are only invoked when `currentTarget.files?.length` is truthy — cancelling the dialog without selecting a file does not fire them.
- **Hidden input**: The `<input type="file">` is hidden via CSS inside the outer `<div>`. All `HTMLInputElement` props not consumed by `FileInputProps` (e.g. `accept`, `multiple`, `name`) are spread directly onto it.
- **`ref` vs `inputRef`**: `ref` (via `forwardRef`) targets the outer `<div>`; `inputRef` targets the hidden `<input>`.

### Usage Notes

- Prefer documented enum/static values such as `FileInput.<EnumName>.<VALUE>` over raw strings when the component exposes them.
- Keep labels, help text, and validation visible and persistent for form controls; use `FormItem*` wrappers where available.
- Use Prism layout props (`itemGap`, `padding`, `alignItems`, `justifyContent`) instead of custom CSS for layout and spacing.
- When wrapping with `FormItemProvider`, pass `label`, `helpText`, and `error` as props on the wrapped component — they are not forwarded to the inner `FileInput`.

<!-- SOURCE-API-END -->
