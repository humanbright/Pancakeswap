import React, { useState, useCallback } from 'react'
import { Text, Flex, Modal, InjectedModalProps, Button, Skeleton } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import { useMasterchef } from 'hooks/useContract'
import { harvestFarm } from 'utils/calls'
import { useTranslation } from 'contexts/Localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { getEarningsText } from 'views/Home/components/UserBanner/EarningsText'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'


const ClaimButtonModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {

  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const { farmsWithStakedBalance, earningsSum: farmEarningsSum } = useFarmsWithBalance()

  const masterChefContract = useMasterchef()
  const cakePriceBusd = usePriceCakeBusd()
  const earningsBusd = new BigNumber(farmEarningsSum).multipliedBy(cakePriceBusd)
  const numTotalToCollect = farmsWithStakedBalance.length
  const numFarmsToCollect = farmsWithStakedBalance.length
  const hasCakePoolToCollect = numTotalToCollect - numFarmsToCollect > 0

  const earningsText = getEarningsText(numFarmsToCollect, hasCakePoolToCollect, earningsBusd, t)

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
  let isharvest = false
  if(earningsBusd.gt(0)){
    isharvest = true
  }else{
    isharvest = false
  }

  return (
    <Modal
      title={t('Claim PUM')}
      headerBackground="gradients.cardHeader"
      onDismiss={onDismiss}
      style={{ maxWidth: '420px', overflowY: 'auto' }}
    >
        <Flex flexDirection="column">
            <Text color="white" fontWeight="600"> Rewards: </Text>
            {account? 
                <>
                    {
                    cakePriceBusd.gt(0) && earningsBusd.toString() !== "NaN"?
                    <>
                        {isharvest?
                          <Text color="white">{earningsText}</Text>
                          :
                          <Text color="white"  > No rewards at this time. </Text>}
                    </>:
                    <Skeleton />
                    }
                </>
    
                :<Text color="white" > Please connect your wallet to view your rewards. </Text> }
        </Flex>
    </Modal>
  )
}

export default ClaimButtonModal
