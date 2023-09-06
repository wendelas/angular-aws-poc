# angular-aws-poc
Projeto com angular e aws, a ideia é mostrar como visualizar imagens de um bucket s3 privado sem precisar torna-lo público


 Certifique-se de que você já possui o Node.js e o Angular CLI instalados em seu sistema. Se não, você pode instalá-los seguindo as instruções em https://angular.io/guide/setup-local.

Aqui estão os passos:

**Passo 1: Crie um novo projeto Angular**

1. Abra o terminal e navegue até a pasta onde você deseja criar seu projeto Angular.

2. Execute o seguinte comando para criar um novo projeto Angular:

   ```bash
   ng new nome-do-seu-projeto
   ```

   Substitua `nome-do-seu-projeto` pelo nome que você deseja dar ao seu projeto.

3. Durante a criação do projeto, o Angular CLI fará algumas perguntas. Você pode escolher as opções padrão ou personalizá-las conforme desejar.

4. Após a conclusão da criação do projeto, navegue até a pasta do projeto:

   ```bash
   cd nome-do-seu-projeto
   ```

**Passo 2: Configure as credenciais AWS**

1. Abra o arquivo `src/environments/environment.ts` em seu editor de código.

2. Configure as variáveis de ambiente relacionadas à AWS no arquivo `environment.ts` com suas próprias credenciais e informações do bucket S3:

   ```typescript
   export const environment = {
     production: false,
     awsAccessKeyId: 'SUA_ACCESS_KEY_ID',
     awsSecretAccessKey: 'SUA_SECRET_ACCESS_KEY',
     awsRegion: 'SUA_REGIAO',
     awsBucketName: 'NOME_DO_BUCKET',
   };
   ```

   Substitua `'SUA_ACCESS_KEY_ID'`, `'SUA_SECRET_ACCESS_KEY'`, `'SUA_REGIAO'` e `'NOME_DO_BUCKET'` pelas informações da sua conta AWS e do seu bucket S3.

**Passo 3: Crie o serviço AWS S3**

1. Crie um serviço Angular para o AWS S3, como mencionado nos passos anteriores. Você pode criar o serviço usando o Angular CLI:

   ```bash
   ng generate service s3
   ```

2. Substitua o código no arquivo `src/app/s3.service.ts` com o código que forneci anteriormente. Certifique-se de que o serviço esteja configurado corretamente com as credenciais AWS e o bucket S3.

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


**Passo 4: Use o serviço no componente**

1. Abra o arquivo `src/app/app.component.ts` em seu editor de código.

2. Substitua o código no componente `AppComponent` com o código que forneci anteriormente. Isso usará o serviço S3 para obter uma URL assinada da imagem no S3.

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


**Passo 5: Execute o projeto**

1. No terminal, execute o seguinte comando para iniciar o servidor de desenvolvimento do Angular:

   ```bash
   ng serve
   ```

2. Abra um navegador da web e acesse `http://localhost:4200/` para ver o seu projeto Angular em ação.

Se tudo foi configurado corretamente e suas credenciais AWS estão corretas, a imagem do bucket S3 será carregada e exibida no seu aplicativo Angular.

Lembre-se de que este é um exemplo básico e você pode personalizá-lo conforme necessário para atender às suas necessidades específicas. Certifique-se de que suas credenciais AWS estejam protegidas e não compartilhadas publicamente no código-fonte do seu projeto.
