import { Badge, FlexLayout, TextLabel } from '@nutanix-ui/prism-reactjs'

const Hint = ({ keys, label }: { keys: string; label: string }) => (
  <FlexLayout alignItems="center" itemGap="XS">
    <Badge
      type={Badge.BadgeTypes.TAG}
      color={Badge.BadgeColorTypes.GRAY}
      count={keys}
      aria-label={`${keys} ${label}`}
    />
    <TextLabel
      type={TextLabel.TEXT_LABEL_TYPE.SECONDARY}
      size={TextLabel.TEXT_LABEL_SIZE.SMALL}
    >
      {label}
    </TextLabel>
  </FlexLayout>
)

export const KeyboardHintBar = () => {
  return (
    <FlexLayout alignItems="center" itemGap="L" className="search-hint-bar">
      <Hint keys="↑↓" label="move" />
      <Hint keys="↵" label="open" />
      <Hint keys="Esc" label="close" />
    </FlexLayout>
  )
}
