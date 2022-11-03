export const submitTask = async (Moralis, req) => {
  const airdrop = req.airdrop;
  const media = req.media;
  const task = req.task;
  const user = req.user;

  const AirdropTaskSubmit = Moralis.Object.extend('AirdropTaskSubmit');
  const newTaskSubmit = new AirdropTaskSubmit();

  newTaskSubmit.set('airdrop', airdrop);
  newTaskSubmit.set('media', media);
  newTaskSubmit.set('task', task);
  newTaskSubmit.set('user', user);
  newTaskSubmit.set('status', true);

  await newTaskSubmit.save();

  return;
};
