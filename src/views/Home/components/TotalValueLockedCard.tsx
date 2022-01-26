import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap/uikit'
import { useTotalValue } from 'state/farms/hooks'
import { useGetStats } from 'hooks/api'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  padding: 10px;
  border: 2px solid rgb(176, 94, 15);
  border-radius: 10px;
  background: linear-gradient(975deg, #075486 10%, #075486 100%);
  box-shadow: 0px 0px 7px 2px #1f1f1f;  
`

const CustomCardBody = styled(CardBody)`
  min-height:120px;
  background: #065283;
`

const StyledHeading = styled(Heading)`
  font-size: 36px;
  color: #FFFF;
  font-weight: bold;
  margin-bottom: 20px;
`

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const tvl = useTotalValue()
  // const data = useGetStats()
  // const tvlString = data ? formatLocalisedCompactNumber(data.tvl) : '-'
  // const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CustomCardBody>
        <StyledHeading>
          {t('Total Value Locked')}
        </StyledHeading>
        {tvl ? (
          <>
            <Text fontSize="40px" fontWeight="800" color="rgb(236, 147, 51)">${tvl.toFixed(2)}</Text>
            <Text fontSize="20px" color="rgb(189, 194, 196)">{t('Across all LPs')}</Text>
          </>
        ) : (
          <Skeleton height={66} />
        )}
      </CustomCardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
