const { fetchURL } = require("../helper/utils");
const { toUSDTBalances } = require("../helper/balances");

const tvl = (chain) => async () => {
  const response = await fetchURL(
    `https://backend-api-prod.frfi.io/autofarm?chainId=${chain}&$limit=100`
  );
  const data = response?.data?.data;
  const result =
    data?.reduce((acc, item) => acc + (item?.strategyTVL ?? 0), 0) ?? 0;
  return toUSDTBalances(result);
};

module.exports = {
  timetravel: false,
  bsc: { tvl: tvl('56') },
  polygon: { tvl: tvl('137') },
};
