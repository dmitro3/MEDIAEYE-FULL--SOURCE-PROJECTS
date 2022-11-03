import { Injectable } from "@nestjs/common";
import * as fs from 'fs';

import { join } from "path";
import * as pinataSDK from '@pinata/sdk';
//@ts-ignore
const pinata = pinataSDK(process.env.PINATA_APIKEY, process.env.PINATA_SECRET);

const basePath = process.cwd();

@Injectable()
export class PinataService {
  constructor() { }
  async uploadFileWithPath(filename: string) {
    const src = `${basePath}/files`;
    try {
      const file = fs.createReadStream(join(src, filename));
      const options = {
        pinataOptions: {
          cidVersion: 0
        }
      };
      //@ts-ignore
      const response = await pinata.pinFileToIPFS(file, options);
      const baseUri = `ipfs: ${response.IpfsHash}`;
      return baseUri;
    } catch (error) {
      console.log(error);
    }
  }
  async uploadJSONToIPFS(data: {collection: string, metadata: any[]}) {
    await writeJSONFiles(data.collection, data.metadata);
    try {
      const sourcePath = `${basePath}/files/${data.collection}`;
      const options = {
        pinataOptions: {
          cidVersion: 0
        }
      };
      const response = await pinata.pinFromFS(sourcePath, options);
      const baseUri = `ipfs: ${response.IpfsHash}`;
      await fs.promises.rmdir(sourcePath, { recursive: true });
      return baseUri;
    } catch (error) {
      console.log(error);
    }
  }
}

const writeJSONFiles = async (collection: string, metadata: any[]) => {
  console.log(metadata);
  await fs.promises.mkdir(`${basePath}/files/${collection}`);
  for(let i = 0; i < metadata.length; i++) {
    await fs.promises.writeFile(
      `${basePath}/files/${collection}/${i+1}.json`,
      JSON.stringify(metadata[i], null, 2)
    )
  }
}