import { PriceSwapProps } from './PriceSwap.types';
import styles from './PriceSwap.styles';
import { Typography } from 'web3uikit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { tokenValue } from '../../../../../apps/core/src/helpers/formatters';
const { TypographyStyled } = styles;

export const PriceSwap: React.FC<PriceSwapProps> = ({
  quote,
  tokenPricesUSD,
  fromToken,
  toToken,
}) => {
  const Quote = quote;
  if (!Quote || !tokenPricesUSD) return null;
  if (Quote?.statusCode === 400)
    return <Typography>{Quote.message}</Typography>;
  const { fromTokenAmount, toTokenAmount } = Quote;
  if (fromToken && toToken) {
    const { symbol: fromSymbol } = fromToken;
    const { symbol: toSymbol } = toToken;
    const pricePerToken = (
      tokenValue(fromTokenAmount, fromToken['decimals']) /
      tokenValue(toTokenAmount, toToken['decimals'])
    ).toFixed(6);

    return (
      <TypographyStyled variant="body16">
        Price:{' '}
        <Typography variant="body16">{`1 ${toSymbol} = ${pricePerToken} ${fromSymbol} ($${tokenPricesUSD[
          toToken.address
        ].toFixed(6)})`}</Typography>
      </TypographyStyled>
    );
  }
  return null;
};

export default PriceSwap;