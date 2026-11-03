import { createFileRoute } from '@tanstack/react-router'
import { ResearchPrototypePage } from '~/components/research-prototype/ResearchPrototypePage'

export const Route = createFileRoute('/research-prototype')({
  component: ResearchPrototypePage,
})
