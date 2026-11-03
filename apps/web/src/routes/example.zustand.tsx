import { Title } from '@nutanix-ui/prism-reactjs'
import { createFileRoute } from '@tanstack/react-router'
import { CounterDemo, CounterDisplay } from '~/components/counter-demo'

export const Route = createFileRoute('/example/zustand')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Title size={Title.SIZES.H1}>Global State Management Example</Title>
      <CounterDemo />
      <CounterDisplay />
    </>
  )
}
