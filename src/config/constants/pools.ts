import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 2,
    stakingToken: tokens.pum,
    earningToken: tokens.pum,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0x83B42735953E529479Fa9427737E2763b857ddd2',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 19,
    stakingToken: tokens.pum,
    earningToken: tokens.bnb,
    contractAddress: {
      97: '',
      56: '0x7D9fAE3E5c0D587190821EB5D984213575eE1FEE',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00000001',
    sortOrder: 999,
    isFinished: false,
  },
  // {
  //   sousId: 20,
  //   stakingToken: tokens.pum,
  //   earningToken: tokens.busd,
  //   contractAddress: {
  //     97: '',
  //     56: '0x360969dc8a1214fbf160337AfB0B3A5348966bda',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '0.00000001',
  //   sortOrder: 20,
  //   isFinished: false,
  // },
]

export default pools
