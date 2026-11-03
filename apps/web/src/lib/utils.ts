// Temporarily suppress legacy API warnings from Nutanix UI library
export const suppressLegacyAPIMessages = () => {
  const ignoreMessages = [
    'Legacy context API has been detected',
    'Support for defaultProps will be removed',
    'findDOMNode is deprecated',
    'Using UNSAFE_componentWillReceiveProps in strict mode',
    'uses the legacy childContextTypes API',
    'i18n Language not set',
  ]

  const shouldSuppress = (args: unknown[]) => {
    const first = args[0]
    return (
      typeof first === 'string' &&
      ignoreMessages.some((message) => first.includes(message))
    )
  }

  const originalError = console.error
  console.error = (...args) => {
    if (shouldSuppress(args)) return
    originalError.apply(console, args)
  }

  const originalWarn = console.warn
  console.warn = (...args) => {
    if (shouldSuppress(args)) return
    originalWarn.apply(console, args)
  }
}
