import React, { createContext, useEffect, useState, useRef } from 'react';
import { useMoralis } from 'react-moralis';
import { ChainName } from '../blockchain/functions/ChangeChain/ChainNames';
import { useSelector, useDispatch } from 'react-redux';
import { changeNetwork } from '../store/app/appSlice';
import { useHistory } from 'react-router-dom';

export const ListenerContext = createContext();
const ListenerProvider = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isInitialized, logout, user, Moralis, web3 } = useMoralis();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const activeNetworkRef = useRef(activeNetwork);
  const [moralisData, setMoralisData] = useState(null);

  useEffect(() => {
    // TODO: user Moralis.onChainChanged listener when Moralis makes it work
    // current issue is that it doesn't properly remove listeners and we have duplicate listeners on rerender
    /*const unsubscribe = Moralis.onChainChanged((chain) => {
      console.log('Chain Changed! ', chain);
      toggleNetwork(ChainName(chain));
    });
    return () => {
      unsubscribe();
    };*/

    // Listen to onWeb3Enabled event on startup
    const web3EnabledUnsubscribe = Moralis.onWeb3Enabled((result) => {
      toggleNetwork(result.chainId);
      setMoralisData(result);
    });

    // Listen to accountChanged event on startup
    const accountChangedUnsubscribe = Moralis.onAccountChanged((account) => {
      logout({
        onSuccess: () => {
          history.push('/connect-wallet');
        }
      });
    });

    // Listen to chainChanged event on startup
    try {
      const chainChanged = window.ethereum.on('chainChanged', (chainId) => {
        toggleNetwork(chainId);
      });
      window.addEventListener('chainChanged', chainChanged);

      return () => {
        // cleans up listeners on effect callback
        window.removeEventListener('chainChanged', chainChanged);
        web3EnabledUnsubscribe();
        accountChangedUnsubscribe();
      };
    } catch (error) { }
  }, []);

  useEffect(() => {
    // update reference to be used to get activeNetwork in a hook/listener
    activeNetworkRef.current = activeNetwork;
  }, [activeNetwork]);

  useEffect(() => {
    // checks if web3 is enabled, if not enable it.
    if (!checkWeb3Enabled()) {
      enableWeb3();
    }
  }, [web3]);

  const checkWeb3Enabled = () => {
    return Moralis.isWeb3Enabled();
  };

  const enableWeb3 = async () => {
    await Moralis.enableWeb3();
  };

  const toggleNetwork = (chainId) => {
    // prevents repeat state changing in redux
    if (activeNetworkRef.current != ChainName(chainId)) {
      dispatch(changeNetwork(ChainName(chainId)));
    }
  };

  return (
    <ListenerContext.Provider value={{ web3, moralisData, enableWeb3 }}>
      {children}
    </ListenerContext.Provider>
  );
};

export default ListenerProvider;
