import * as React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import useHistory from '../hooks/useHistory';

export const PRINT_RATE_LIMIT = 3;

type PrintContextProps = {
  handlePrint: (uri: string) => {};
  printCount: number;
  getStoredPrintCount: () => void;
};

const PrintContext = React.createContext({});

const PrintProvider = (props: React.PropsWithChildren<PrintContextProps>): React.ReactElement => {
  const { children } = props;
  const [printCount, setPrintCount] = React.useState(0);
  const { addHistoryItem } = useHistory();

  const getStoredPrintCount = async () => {
    const expiry = (await AsyncStorage.getItem(`expiry`)) || 0;
    if (new Date().valueOf() > Number(expiry)) {
      AsyncStorage.setItem('printCount', `0`);
      setPrintCount(0);
    } else {
      const count = (await AsyncStorage.getItem('printCount')) || 0;
      setPrintCount(+count);
    }
  };
  const handlePrint = async (uri: string) => {
    addHistoryItem(uri);
    const printCount = (await AsyncStorage.getItem(`printCount`)) || 0;
    const expiry = (await AsyncStorage.getItem(`expiry`)) || 0;
    if (new Date().valueOf() > +expiry) {
      try {
        await Print.printAsync({
          uri,
        });
        setPrintCount(1);
        AsyncStorage.setItem('printCount', `1`);
        AsyncStorage.setItem('expiry', `${new Date().setHours(new Date().getHours() + 1)}`);
        addHistoryItem(uri);
      } catch (e) {
        console.log(e);
      }
    } else if (+printCount < PRINT_RATE_LIMIT) {
      try {
        await Print.printAsync({
          uri,
        });
        setPrintCount(+printCount + 1);
        AsyncStorage.setItem('printCount', `${+printCount + 1}`);
        addHistoryItem(uri);
      } catch (e) {
        console.log(e);
      }
    } else Alert.alert('Oh No!', 'You are over the print limit for this time period');
  };

  return (
    <PrintContext.Provider value={{ printCount, getStoredPrintCount, handlePrint }}>{children}</PrintContext.Provider>
  );
};

export const usePrintContext = (): PrintContextProps => React.useContext(PrintContext) as PrintContextProps;

export default PrintProvider;
