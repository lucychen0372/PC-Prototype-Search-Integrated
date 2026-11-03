import {
  Button,
  FlexLayout,
  Paragraph,
  StackingLayout,
  Title,
} from '@nutanix-ui/prism-reactjs'
import { useCounterStore } from '../../stores/counter-store'

/**
 * Counter Demo Component
 *
 * Demonstrates basic Zustand store usage:
 * - Reading state from the store
 * - Dispatching actions to update state
 * - Multiple components sharing the same store
 */
export const CounterDemo = () => {
  // Subscribe to the entire store
  const { count, increment, decrement, incrementByAmount, reset } =
    useCounterStore()

  return (
    <StackingLayout itemSpacing="20px">
      <Title size={Title.SIZES.H2}>Zustand Counter Demo</Title>

      <FlexLayout justifyContent="flex-start">
        <Title
          size={Title.SIZES.H1}
          style={{ color: 'var(--color-info-base)' }}
        >
          {count}
        </Title>
      </FlexLayout>

      <FlexLayout itemGap="S" justifyContent="flex-start" flexWrap="wrap">
        <Button type={Button.ButtonTypes.DESTRUCTIVE} onClick={decrement}>
          Decrement
        </Button>

        <Button type={Button.ButtonTypes.PRIMARY} onClick={increment}>
          Increment
        </Button>

        <Button
          type={Button.ButtonTypes.SECONDARY}
          onClick={() => incrementByAmount(5)}
        >
          Add 5
        </Button>

        <Button type={Button.ButtonTypes.SECONDARY} onClick={reset}>
          Reset
        </Button>
      </FlexLayout>
    </StackingLayout>
  )
}

/**
 * Counter Display Component
 *
 * Demonstrates selective subscription:
 * - Only subscribes to the `count` state
 * - Won't re-render when other parts of the store change
 * - More performant for large applications
 */
export const CounterDisplay = () => {
  // Subscribe to only the count value using a selector
  const count = useCounterStore((state) => state.count)

  return (
    <StackingLayout itemSpacing="10px">
      <Title size={Title.SIZES.H3}>Selective Subscription Example</Title>
      <FlexLayout itemGap="S">
        <Paragraph>Current count:</Paragraph>
        <Paragraph>{count}</Paragraph>
      </FlexLayout>
      <Paragraph>
        This component only subscribes to the count value, not the entire store.
      </Paragraph>
    </StackingLayout>
  )
}
