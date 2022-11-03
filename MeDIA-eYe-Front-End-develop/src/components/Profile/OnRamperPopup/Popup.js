import OnramperWidget from '@onramper/widget';
import './Popup.scss';
import { useMoralis } from 'react-moralis';

export default function WidgetContainer() {
  const { Moralis, user } = useMoralis();

  const wallets = {
    ETH: { address: user?.attributes?.ethAddress },
    BNB: { address: user?.attributes?.ethAddress, memo: 'cryptoTag' }
  };

  const defaultCrypto = 'ETH';

  return (
    <div className="mediaeye-OnRamper-Widget">
      <OnramperWidget
        API_KEY={process.env.REACT_APP_ONRAMPER_PRIVATE_KEY}
        color="#00a2b4"
        fontFamily="'Poppins', sans-serif"
        fontColor="#fff"
        defaultAddrs={wallets}
        defaultAmount={50}
        defaultCrypto={defaultCrypto}
        filters={{
          onlyCryptos: ['ETH', 'USDT', 'BNB', 'BUSD']
        }}
        darkMode={true}
      // isAddressEditable={isAddressEditable}
      // amountInCrypto={amountInCrypto}
      // redirectURL={redirectURL}
      />
    </div>
  );
}
