import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, ChevronUpIcon, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

export interface ExpandableSectionButtonProps {
  onClick?: () => void
  expanded?: boolean
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white!important;
  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const StyledChevronUpIcon = styled(ChevronUpIcon)`
   color: white !important;
`
const StyledChevronDownIcon = styled(ChevronDownIcon)`
   color: white !important;
`

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded }) => {
  const { t } = useTranslation()

  return (
    <Wrapper aria-label={t('Hide or show expandable content')} role="button" onClick={() => onClick()}>
      <Text color="white" bold>
        {expanded ? t('Hide') : t('Details')}
      </Text>
      {expanded ? <StyledChevronUpIcon /> : <StyledChevronDownIcon />}
    </Wrapper>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
}

export default ExpandableSectionButton
