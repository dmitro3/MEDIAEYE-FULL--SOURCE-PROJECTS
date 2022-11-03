export const submitTaskProof = async (Moralis, req) => {
  if (!req.file) {
    throw new Error('Must provide a valid file');
  }
  const airdrop = req.airdrop;
  const media = req.media;
  const task = req.task;
  const user = req.user;
  const proof = new Moralis.File(req.file.name, req.file);

  const AirdropTaskSubmit = Moralis.Object.extend('AirdropTaskSubmit');
  const newTaskSubmit = new AirdropTaskSubmit();

  newTaskSubmit.set('airdrop', airdrop);
  newTaskSubmit.set('media', media);
  newTaskSubmit.set('task', task);
  newTaskSubmit.set('user', user);
  newTaskSubmit.set('proof', proof);
  newTaskSubmit.set('status', true);

  await newTaskSubmit.save();

  return;
};
