export const queryApproved = async (Moralis, userAddress) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const ApproveFile = Moralis.Object.extend('ApproveFile');
  const query = new Moralis.Query(ApproveFile);
  query.equalTo('userAddress', userAddress);
  query.equalTo('approval', 3);
  const result = await query.find();
  return result;
};
