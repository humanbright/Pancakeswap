import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber, formatLocalisedCompactNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { getCakeAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  padding: 10px;
  border: 2px solid rgb(176, 94, 15);
  border-radius: 10px;
  background: linear-gradient(975deg, #075486 10%, #075486 100%);
  box-shadow: 0px 0px 7px 2px #1f1f1f;
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const StyledHeading = styled(Heading)`
  font-size: 36px;
  color: #FFFF;
  font-weight: bold;
  margin-bottom:10px;
`
const emissionsPerBlock = 1

const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const cakePriceBusd = usePriceCakeBusd()
  const mcap = cakePriceBusd.times(cakeSupply)

  return (
    <StyledCakeStats>
      <CardBody className = "card-backround-color">
        <StyledHeading>
          {t('PumSwap Stats')}
        </StyledHeading>
        <Row>
          <Text color="#FFFF" fontSize="14px">{t('Market Cap')}</Text>
          <CardValue color="#FFFF"  fontSize="14px" decimals={0} value={mcap.toNumber()} />
        </Row>
        <Row>
          <Text color="#FFFF" fontSize="14px">{t('Max Supply')}</Text>
          {totalSupply && <CardValue color="#FFFF" fontSize="14px"  decimals={0} value={getBalanceNumber(totalSupply)} />}
        </Row>
        <Row>
          <Text color="#FFFF" fontSize="14px">{t('Burned PUM')}</Text>
          <CardValue color="#FFFF"  fontSize="14px" decimals={6} value={burnedBalance} />
        </Row>
        <Row>
          <Text color="#FFFF" fontSize="14px">{t('PUM In Circulation')}</Text>
          <CardValue color="#FFFF"  fontSize="14px" decimals={0} value={cakeSupply} />
        </Row>
        <Row>
          <Text color="#FFFF" fontSize="14px">{t('PUM Distributed/Block')}</Text>
          <CardValue color="#FFFF"  fontSize="14px" decimals={0} value={emissionsPerBlock} />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
