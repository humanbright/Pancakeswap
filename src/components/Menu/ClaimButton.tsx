import React from 'react'
import { Flex, IconButton, CogIcon, useModal } from '@pancakeswap/uikit'
import ClaimButtonModal from './GlobalSettings/ClaimButtonModal'

const ClaimButton = () => {
  const [onPresentSettingsModal] = useModal(<ClaimButtonModal />)

  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr="8px" style={{color: "white", width: "120px", background: "#866bfe"}}>
        {/* <CogIcon height={22} width={22} color="textSubtle" /> */}
        Claim PUM
      </IconButton>
    </Flex>
  )
}

export default ClaimButton