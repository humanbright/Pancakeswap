import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@pancakeswap/uikit'

const StyledFarmStakingCard = styled(Card)`
  padding: 10px;
  border: 2px solid rgb(176, 94, 15);
  border-radius: 10px;
  background: linear-gradient(975deg, #075486 10%, #075486 100%);
  box-shadow: 0px 0px 7px 2px #1f1f1f;
  width: 100%;
  margin-top: 16px!important;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const StyledCardBody = styled(CardBody)`
  margin-top:auto;
  background: linear-gradient(975deg, #075486 10%, #075486 100%);
`

const StyledHeading = styled(Heading)`
  font-size: 36px;
  color: #FFFF;
  font-weight: bold;
`
const StyledDescription = styled(Heading)`
  margin: 0px 0;
  line-height: 30px;
  color: rgb(236, 147, 51);
  font-weight: 800;
`

const WinCard = () => {
  return (
    <StyledFarmStakingCard>
      <StyledCardBody>
        <StyledDescription>
          Visit
        </StyledDescription>
        <StyledHeading>
          Marketplace
        </StyledHeading>
        <StyledDescription>
          For Latest NFT
        </StyledDescription>
      </StyledCardBody>
    </StyledFarmStakingCard>
  )
}

export default WinCard
