import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { Timeline } from 'react-twitter-widgets'
import { useTranslation } from 'contexts/Localization'

const StyledTwitterCard = styled(Card)`
  padding: 10px;
  border: 2px solid rgb(176, 94, 15);
  border-radius: 10px;
  background: linear-gradient(975deg, #075486 10%, #075486 100%);
  box-shadow: 0px 0px 7px 2px #1f1f1f;
  margin-left: auto;
  margin-right: auto;
  min-height:300px;
`

const CustomCardBody = styled(CardBody)`
  margin-top:auto;
  min-height:300px;
  background: linear-gradient(975deg, #075486 10%, #075486 100%);
`
const StyledHeading = styled(Heading)`
  color: #FFFF;
  font-weight: bold;
`

const TwitterCard = () => {
  const {t} = useTranslation()

  return (
    <StyledTwitterCard>
      <CustomCardBody>
        <StyledHeading>
          {t('Announcements')}
        </StyledHeading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'Pumswap_'
          }}
          options={{
            height: '300',
            chrome: "noheader, nofooter",
          }}
        />
      </CustomCardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
