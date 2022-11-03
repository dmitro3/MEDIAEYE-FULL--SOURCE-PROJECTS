Moralis.Cloud.define('TestUpload', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Test Upload--------------------------------'
  );

  const file = request.params.file;
  //logger.info(file);
  //logger.info(JSON.stringify(request));
  try {
    // substring at first comma,
    const baseValue = file.substring(file.indexOf(',') + 1);

    const result = await Moralis.Cloud.toIpfs({
      sourceType: 'base64Binary',
      source: file
    });

    logger.info(JSON.stringify(result));
    return result;
  } catch (e) {
    logger.info(JSON.stringify(e));
  }
});
