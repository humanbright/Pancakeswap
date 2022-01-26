import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PumSwap',
  description:
    'PumSwap is a DEX Exchanger with 3 Different Type Of Blockchain Binance Smart Chain, Ethereum & OkexChain Network.',
  image: 'https://app.pumswap.org/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  console.log("debug", path)
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('PumSwap')}`,
      }
    case '/swap':
      return {
          title: `${'Exchange'} | ${'PumSwap'}`,
    }
    case '/liquidity':
      return {
          title: `${t('Liquidity')} | ${t('PumSwap')}`,
    }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('PumSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('PumSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('PumSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('PumSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('PumSwap')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('PumSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('PumSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('PumSwap')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('PumSwap')}`,
      }
    // case '/profile':
    //   return {
    //     title: `${t('Your Profile')} | ${t('PumSwap')}`,
    //   }
    default:
      return null
  }
}
