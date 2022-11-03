export const queryAirdrop = async (Moralis, params) => {
  if (!(params.chainId || params.airdropId)) {
    return new Error('Chain ID or Airdrop ID unspecified');
  }

  const Airdrop = Moralis.Object.extend('Airdrop');
  const query = new Moralis.Query(Airdrop);
  query.equalTo('valid', true);
  query.equalTo('chainId', params.chainId);
  query.equalTo('airdropId', params.airdropId);
  const result = await query.first();

  return result;
};
