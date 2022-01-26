import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 1,
    lpSymbol: 'PUM-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xB9073d2b30F6785843f1eA4426CA8F1294AcCb1c',
    },
    token: tokens.pum,
    quoteToken: tokens.busd,
  },
  {
    pid: 2,
    lpSymbol: 'PUM-USDT LP',
    lpAddresses: {
      97: '',
      56: '0x7383Ed35f96c7c5a0a7581B4138B064e2841B89c',
    },
    token: tokens.pum,
    quoteToken: tokens.usdt,
  },
  {
    pid: 3,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'PUM-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x7A5EAB75AeC036fE189952108Bdc1b457acf6deA',
    },
    token: tokens.pum,
    quoteToken: tokens.wbnb,
  },
]

export default farms
