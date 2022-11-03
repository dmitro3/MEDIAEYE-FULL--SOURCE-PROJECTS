/*Moralis.Cloud.define('AirdropTaskProof', async (req) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '-------------------------------- Airdrop Task Submit --------------------------------'
  );

  const media = req.params.media;
  const task = req.params.task;
  const user = req.params.user;
// TODO: handle file upload in cloud server

  const AirdropTaskSubmit = Moralis.Object.extend('AirdropTaskSubmit');
  const newTaskSubmit = new AirdropTaskSubmit();

  newTaskSubmit.set('media', media);
  newTaskSubmit.set('task', task);
  newTaskSubmit.set('user', user);
  newTaskSubmit.set('proof', proof); 
  newTaskSubmit.set('status', true);

  await newTaskSubmit.save();

  return;
});*/
