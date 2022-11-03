export const queryCharities = async (Moralis) => {
  const charities = Moralis.Object.extend('Charity');
  const query = new Moralis.Query(charities);
  // get in order of order variable
  query.ascending('order');
  const result = await query.find();
  return result;
};
