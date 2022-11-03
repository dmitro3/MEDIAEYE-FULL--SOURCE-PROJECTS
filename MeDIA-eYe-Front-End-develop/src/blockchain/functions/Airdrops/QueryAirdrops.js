export const queryAirdrops = async (Moralis, params) => {
  if (!params.chainId) {
    return new Error('Chain ID unspecified');
  }

  const Airdrop = Moralis.Object.extend('Airdrop');
  const query = new Moralis.Query(Airdrop);

  if (params.limit) query.limit(params.limit);
  if (params.page) query.skip(Number(params.page * params.limit));
  if (params.status === 'scheduled')
    query.lessThan('phaseTimes.whitelisting', Date.now());
  if (params.status === 'live') {
    query.greaterThan('phaseTimes.whitelisting', Date.now());
    query.lessThan('phaseTimes.ended', Date.now());
  }

  query.equalTo('valid', true);
  query.equalTo('chainId', params.chainId);
  const result = await query.find();

  return result;
};
