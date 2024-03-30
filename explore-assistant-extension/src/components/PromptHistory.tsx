import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Box, Card, SpaceVertical, Span } from '@looker/components'

interface PromptHistoryProps {
  handleHistorySubmit: (prompt: string) => void
}
const PromptHistory = ({ handleHistorySubmit }: PromptHistoryProps) => {
  const { history } = useSelector((state: RootState) => state.assistant)
  return (
    <SpaceVertical gap='u2'>
      {history.map((item: any, index: number) => {
        return (
          <Card
            width={'100%'}
            border={'ui1'}
            borderRadius={'large'}
            p="u2"
            key={index}
            onClick={() => handleHistorySubmit(item.message)}
          >
            <Box cursor="pointer">
              <Span fontSize={'small'}>{item.message}</Span>
            </Box>
          </Card>
        )
      })}
    </SpaceVertical>
  )
}

export default PromptHistory