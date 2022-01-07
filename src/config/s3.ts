import { config } from "~config/config";

export const BUCKETS = {
  USER_AVATARS: `${config.awsBucketName}/${config.awsBucketUserImages}`,
  WORD_IMAGES: `${config.awsBucketName}/${config.awsBucketWordImages}`,
  DICTIONARY_IMAGES: `${config.awsBucketName}/${config.awsBucketDictionaryImages}`,
};
