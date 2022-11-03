export const queryCategories = async (Moralis) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const categories = Moralis.Object.extend('Category');
  const query = new Moralis.Query(categories);
  // get in order of order variable
  query.ascending('order');
  const result = await query.find();
  return result;
};
