import { Component } from '@angular/core';
import { S3Service } from './s3.service';

@Component({
  selector: 'app-root',
  template: `
    <img [src]="imageUrl" loading="lazy" alt="Descrição da imagem">
  `,
})
export class AppComponent {
  imageUrl: string;

  constructor(private s3Service: S3Service) {
    const key = 'storage/news/3d-colourful-low-poly-plexus-design-with-shallow-depth-field-1-1024xauto.png';
    const expirationSeconds = 3600; // Por exemplo, a URL expirará após 1 hora (3600 segundos)
    this.imageUrl = this.s3Service.getSignedImageUrl(key, expirationSeconds);
  }
}
