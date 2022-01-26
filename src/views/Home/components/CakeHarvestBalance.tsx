import React, { useState, useCallback } from 'react'
import { Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { ContextApi } from 'contexts/Localization/types'
import BigNumber from 'bignumber.js'
// import useAllEarnings from 'hooks/useAllEarnings'
import useToast from 'hooks/useToast'
import { useMasterchef } from 'hooks/useContract'
import { harvestFarm } from 'utils/calls'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'
import { getEarningsText } from './UserBanner/EarningsText'

const Block = styled.div`
  margin-bottom: 24px;
`

const CakeHarvestBalance = () => {
  
  // const { t } = useTranslation()
  const { account } = useWeb3React()
  // const allEarnings = useAllEarnings()
  // const earningsSum = allEarnings.reduce((accum, earning) => {
  //   return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  // }, 0)
  // const cakePriceBusd = usePriceCakeBusd()
  // const earningsBusd = new BigNumber(earningsSum).multipliedBy(cakePriceBusd).toNumber()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
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
          t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CAKE' }),
        )
      } catch (error) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    }
    setPendingTx(false)
  }, [farmsWithStakedBalance, masterChefContract, toastSuccess, toastError, t])

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      {/* <CardValue value={earningsSum} lineHeight="1.5" />
      {!cakePriceBusd.eq(0) && <CardBusdValue value={earningsBusd} />} */}
      <Text mb={['16px', null, null, '0']} color="textSubtle">
        {toCollectText}
      </Text>
    </Block>
  )
}

export default CakeHarvestBalance
