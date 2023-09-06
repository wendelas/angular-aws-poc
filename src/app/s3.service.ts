import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: environment.awsAccessKeyId,
      secretAccessKey: environment.awsSecretAccessKey,
      region: environment.awsRegion,
    });

    this.s3 = new AWS.S3();
  }

  getSignedImageUrl(key: string, expirationSeconds: number): string {
    const params = {
      Bucket: environment.awsBucketName,
      Key: key,
      Expires: expirationSeconds,
    };

    return this.s3.getSignedUrl('getObject', params);
  }
}
