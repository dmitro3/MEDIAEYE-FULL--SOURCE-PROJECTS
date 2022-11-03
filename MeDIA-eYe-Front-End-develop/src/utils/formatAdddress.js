const formatAdddress = (address) => {
  if (!address) {
    return '';
  }
  return (
    address.substring(0, 5) + '...' + address.substring(address.length - 4)
  );
};

export default formatAdddress;
