Moralis.Cloud.job('WatchBSCTest', async (request) => {
  // params: passed in the job call
  // headers: from the request that triggered the job
  // log: the Moralis Server logger passed in the request
  // message: a function to update the status message of the job object
  const logger = Moralis.Cloud.getLogger();

  logger.info(
    '--------------------------------Job Watch BSC--------------------------------'
  );
  // Moralis.Cloud.run('Watch721BurnBSC');
  Moralis.Cloud.run('Watch1155BurnBatchBSCTest');
  //Moralis.cloud.run('nameOfDefineInFile)
  //Moralis.Cloud.run('WatchCollectionRoleBSC');
  //Moralis.Cloud.run('Watch721MintBSC');
  //Moralis.Cloud.run('Watch1155MintBSC');
  //Moralis.Cloud.run('Watch1155MintBatchBSC');
});
