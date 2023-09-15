import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WidgetData} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const CryptoDisplay = ({
  title,
  data,
  backgroundColor,
  foregroundColor,
  borderColor,
}: {
  title: string;
  data: any;
  backgroundColor: string;
  foregroundColor: string;
  borderColor: string;
}): JSX.Element => {
  let roundedPrice = Math.round(data?.quote?.USD?.price * 100) / 100;
  let rounded24h = Math.round(data?.quote?.USD?.percent_change_24h * 100) / 100;
  let rounded7d = Math.round(data?.quote?.USD?.percent_change_7d * 100) / 100;
  let rounded1h = Math.round(data?.quote?.USD?.percent_change_1h * 100) / 100;

  return (
    <View
      style={{
        ...styles.cryptoData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}>
      <Text style={{...styles.cryptoDataTitle, color: foregroundColor}}>
        {title}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={{...styles.cryptoDataText, color: foregroundColor}}>
          {roundedPrice} USD
          {rounded24h > 0 && (
            <Text style={{color: 'lightgreen'}}> +{rounded24h}%</Text>
          )}
          {rounded24h < 0 && <Text style={{color: 'red'}}> {rounded24h}%</Text>}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            gap: 6,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{...styles.cryptoDataText, color: foregroundColor}}>
              1h:
            </Text>
            {rounded1h > 0 && (
              <Text style={{color: 'lightgreen'}}> +{rounded1h}%</Text>
            )}
            {rounded1h < 0 && <Text style={{color: 'red'}}> {rounded1h}%</Text>}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{...styles.cryptoDataText, color: foregroundColor}}>
              7d:
            </Text>
            {rounded7d > 0 && (
              <Text style={{color: 'lightgreen'}}> +{rounded7d}%</Text>
            )}
            {rounded7d < 0 && <Text style={{color: 'red'}}> {rounded7d}%</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};

export const CryptoWidget = ({data}: {data: WidgetData}): JSX.Element => {
  const {t} = useTranslation();
  const custom = useSelector(
    (state: any) => state.custom.customState['extern-api-token'],
  );
  const [cryptoData, setCryptoData] = useState({} as any);

  React.useEffect(() => {
    const updateCryptoData = async () => {
      try {
        const url =
          'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin,ethereum,solana';
        const response = await fetch(url, {
          headers: {
            'X-CMC_PRO_API_KEY': custom.stock,
          },
        });
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.log('crypto fetch error', error);
      }
    };

    updateCryptoData();
  }, [custom.stock]);

  return (
    <WidgetFrame
      data={data}
      title={t('widgets.crypto.title')}
      backgroundColor="#332d27"
      foregroundColor="white">
      <View style={styles.container}>
        {cryptoData.data && cryptoData?.data['1'] && (
          <CryptoDisplay
            title="Bitcoin"
            data={cryptoData.data['1']}
            backgroundColor="#4d4d4e"
            foregroundColor="white"
            borderColor="#f7931a"
          />
        )}
        {cryptoData.data && cryptoData?.data['1027'] && (
          <CryptoDisplay
            title="Ethereum"
            data={cryptoData.data['1027']}
            backgroundColor="#3c3c3d"
            foregroundColor="white"
            borderColor="#ecf0f1"
          />
        )}
        {cryptoData.data && cryptoData?.data['5426'] && (
          <CryptoDisplay
            title="Solana"
            data={cryptoData.data['5426']}
            backgroundColor="#000000"
            foregroundColor="white"
            borderColor="#03E1FF"
          />
        )}
      </View>
    </WidgetFrame>
  );
};

export const createCryptoWidget = (): WidgetData => {
  return {
    widgetType: 'CryptoWidget',
    widgetParams: {
      crypto: '',
    },
    key: '',
  };
};

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
  },
  cryptoData: {
    flexDirection: 'column',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  cryptoDataText: {
    fontSize: 14,
  },
  cryptoDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cryptoInput: {
    fontSize: 16,
  },
});
