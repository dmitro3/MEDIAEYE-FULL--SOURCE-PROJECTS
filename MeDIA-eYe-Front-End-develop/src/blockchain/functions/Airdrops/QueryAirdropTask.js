export const queryAirdropTask = async (Moralis, params) => {
  if (!params.airdropObjectId) {
    return new Error('Airdrop Object ID unspecified');
  }

  const AirdropTask = Moralis.Object.extend('AirdropTaskSubmit');
  const query = new Moralis.Query(AirdropTask);
  query.equalTo('status', true);
  query.equalTo('user', params.user);

  // relational query on objectId
  const Airdrop = Moralis.Object.extend('Airdrop');
  const airdrop = new Airdrop();
  airdrop.id = params.airdropObjectId;
  query.equalTo('airdrop', airdrop);
  const res = await query.find();

  return res;
};
