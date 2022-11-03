Moralis.Cloud.define('queryFileType', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------QUERY FILE TYPE--------------------------------'
  );
  const file = await Moralis.Cloud.httpRequest({ url: request.params.url });
  logger.info(file.headers['content-type']);

  return file.headers['content-type'];
});
