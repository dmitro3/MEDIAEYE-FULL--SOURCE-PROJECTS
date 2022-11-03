export const isAuth = () => {
  const token = localStorage.getItem('token');
  if (token) return true;
  return false;
};

export const isSubscriptionUpdated = () => {
  const subscriptionUpdated = localStorage.getItem('subscriptionUpdated');
  if (subscriptionUpdated) {
    localStorage.removeItem('subscriptionUpdated');
    return true;
  }
  return false;
};
