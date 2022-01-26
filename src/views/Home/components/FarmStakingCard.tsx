import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useWalletModal, Text } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
// import useAllEarnings from 'hooks/useAllEarnings'
import useToast from 'hooks/useToast'
import { useMasterchef } from 'hooks/useContract'
import { harvestFarm } from 'utils/calls'
import { useTranslation } from 'contexts/Localization'
// import UnlockButton from 'components/UnlockButton'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { getEarningsText } from './UserBanner/EarningsText'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import useFarmsWithBalance from '../hooks/useFarmsWithBalance'

const StyledFarmStakingCard = styled(Card)`
  padding: 10px;
  border: 2px solid rgb(176, 94, 15);
  border-radius: 10px;
  background: linear-gradient(975deg, #075486 10%, #075486 100%);
  box-shadow: 0px 0px 7px 2px #1f1f1f;
  line-height: 3;
`

const StyledCardBody = styled(CardBody)`
  margin-top:auto;
  min-height:300px;
  background: linear-gradient(975deg, #075486 10%, #075486 100%);
`
const StyledHeading = styled(Heading)`
  font-size: 36px;
  color: #FFFF;
  font-weight: bold;s
`

const Block = styled.div`
  margin-bottom: 40px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: rgb(236, 147, 51);
  font-size: 15px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const {t} = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const { toastSuccess, toastError } = useToast()
  const { farmsWithStakedBalance, earningsSum: farmEarningsSum } = useFarmsWithBalance()

  const masterChefContract = useMasterchef()
  const cakePriceBusd = usePriceCakeBusd()
  const earningsBusd = new BigNumber(farmEarningsSum).multipliedBy(cakePriceBusd)
  const numTotalToCollect = farmsWithStakedBalance.length
  const numFarmsToCollect = farmsWithStakedBalance.length
  const hasCakePoolToCollect = numTotalToCollect - numFarmsToCollect > 0

  const earningsText = getEarningsText(numFarmsToCollect, hasCakePoolToCollect, earningsBusd, t)
  const [preText, toCollectText] = earningsText.split(earningsBusd.toString())
  const earningsSum = new BigNumber(toCollectText) 

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of farmsWithStakedBalance) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await harvestFarm(masterChefContract, farmWithBalance.pid)
        toastSuccess(
          `${t('Harvested')}!`,
          t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'PUM' }),
        )
      } catch (error) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    }
    setPendingTx(false)
  }, [farmsWithStakedBalance, masterChefContract, toastSuccess, toastError, t])
  let isharvest
  if(earningsBusd.gt(0)){
    isharvest = true
  }else{
    isharvest = false
  }

  return (
    <StyledFarmStakingCard>
      <StyledCardBody>
        <StyledHeading>
          {t('Farms & Staking')}
        </StyledHeading>
        {/* <CardImage src="/images/new/chronic_yield.png" alt="chy logo" width={64} height={64} /> */}
        <Block>
          <Label>{t('PUM to Harvest')}:</Label>
          {account? 
            <Text fontWeight="600" fontSize="24px" color="white" > 
              {earningsText} 
            </Text>:
            <Text color="textDisabled" style={{ lineHeight: '54px' }}>
              {t('Locked')}
            </Text>
          }
        </Block>
        <Block>
          <Label>{t('PUM in Wallet')}:</Label>
          <CakeWalletBalance />
        </Block>
        <Block>
          {account?
            <Button onClick={harvestAllFarms} width="100%" disabled={!isharvest}>
              {t('Harvest')}
            </Button>:  
            <Button onClick={onPresentConnectModal} width="100%">
              {t('Connect')}
            </Button>
          }
        </Block>
      </StyledCardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
