# Rocketseat Ignite - ReactNative 2023 - Projeto 06
Sexto projeto do curso de React Native da trilha Ignite da Rocketseat

App ***Ignite Fleet***

## Inicialização

`npx expo init ignitefleet --yarn`
ou
`npx create-expo-app ignitefleet --template`


## Configurações de desenvolvimento

### Lint e organização do código (dependências de desenvolvimento)
[eslint](https://eslint.org/docs/latest/use/getting-started)
[prettier](https://prettier.io/docs/en/install.html)
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
```
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-react @typescript-eslint/eslint-plugin
```

[Ciar alias para os imports, evitando passar caminhos complexos - babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)
```
yarn add -D babel-plugin-module-resolver
```

Mapeamento dos diretórios usando o babel-plugin-module-resolver.
Exemplo do que foi feito.

No arquivo `babel.config.js` foi adicionado as seguintes linhas:
```javascript
...
plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@types': './src/@types',
          '@navigation': './src/navigation',
          '@context': './src/context',
          '@services': './src/services',
          '@config': './src/config',
          '@constants': './src/constants',
          '@store': './src/store',
          '@styles': './src/styles',
          '@i18n': './src/i18n',
          '@locales': './src/locales',

        }
      }]
    ]
```

No arquivo `tsconfig.json` foi adicionado as seguintes linhas:
```javascript
...
"baseUrl": "./",
    "paths": {
      "@components/*": ["./src/components/*"],
      "@screens/*": ["./src/screens/*"],
      "@utils/*": ["./src/utils/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@assets/*": ["./src/assets/*"],
      "@types/*": ["./src/@types/*"],
      "@navigation/*": ["./src/navigation/*"],
      "@context/*": ["./src/context/*"],
      "@services/*": ["./src/services/*"],
      "@config/*": ["./src/config/*"],
      "@constants/*": ["./src/constants/*"],
      "@store/*": ["./src/store/*"],
      "@styles/*": ["./src/styles/*"],
      "@i18n/*": ["./src/i18n/*"],
      "@locales/*": ["./src/locales/*"],
    }
```


[Ordenar as importações - eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/)
```
yarn add -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript eslint-import-resolver-babel-module eslint-plugin-module-resolver
```
ver configurações necessárias do `eslint-import-resolver-typescript` para funcionar correto com o path mapping


[Ordenar as importações - @trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports#readme)
```bash
yarn add -D @trivago/prettier-plugin-sort-imports
```
Este plugin pede para que coloque a ordenação que queremos no arquivo `.prettierrc.json` e ficaram estas opções.

```json
  "importOrder": [
    "^react$",
    "^react-native$",
    "^@react-navigation$",
    "^@storage/(.*)$",
    "^@screens/(.*)$",
    "^@components/(.*)$",
    "^@assets/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
```



## Instalações

[Styled-Components](https://styled-components.com/docs/basics#installation)
```bash
yarn add styled-components@^5.0.0   # foi usado esta versão pois já existe uma 6 em rc.

yarn add -D @types/styled-components @types/styled-components-react-native
```

[Fontes do projeto - Expo Fonts](https://docs.expo.dev/develop/user-interface/fonts/#use-a-google-font)
```bash
npx expo install expo-font @expo-google-fonts/roboto
```

[Variáveis de ambiente - react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv)
```bash
yarn add -D react-native-dotenv
```

Aqui ainda foi adicionado o seguinte plugins (com as configurações) no arquivo `babel.config.js`
```javascript
plugins: [
      ["module:react-native-dotenv",
      {
        "moduleName": "@env",
        "allowUndefined": false
      }]
    ],
```

***Para typescript***
Crie um diretório `./src/@types` e um arquivo `env.d.ts` e adicione as seguintes linhas:

```javasctipt
declare module '@env' {
  export const API_BASE: string;
}
```

E em `tsconfig.json`
```javascript
"typeRoots": ["./src/@types"]
```

# Transformação do projeto de Managed Workflow para Development Build

```bash
npx expo prebuild
npx expo run:android
```

Seguindo os passos antesriores e executando o comando `npx expo prebuild` novamente o seguinte alerta é mostrado.
<pre>» android: userInterfaceStyle: Install expo-system-ui in your project to enable this feature.</pre>

Temos duas opções de correção:
 - tirar a entrada `userInterfaceStyle` do arquivo `app.json`
 - instalar o pacote `expo-system-ui`

```bash
npx expo install expo-system-ui
npx expo prebuild
```


# Autenticação social (com Google)

Documentação aprofundada https://efficient-sloth-d85.notion.site/OAuth-2-0-1b447112feef4c6296ae36345b3dc667

Devemos criar um projeto no console do Google Cloud e com o comando abaixo geramos a chave a credencial para adicionar a este projeto

```bash
cd android
./gradlew signinReport  # este comando gerará diversas chaves e peguei a AHS1 da primeira listagem que aparece. Usamos isto no console do Google Cloud para o ID do OAuth
```

[Expo WebBrowser](https://docs.expo.dev/versions/latest/sdk/webbrowser/)
```bash
npx expo install expo-web-browser
```

[Expo AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session/)
```bash
npx expo install expo-auth-session expo-crypto
```

Adicionar um esquema na aplicação inserindo a seguinte linha no arquivo `app.json`
```json
"schema": "ignitefleet",
```



# Instalando o RealmDB no projeto

[RealmDB docs](https://www.mongodb.com/docs/realm/sdk/react-native/install/)
```bash
yarn add realm
yarn add @realm/react
```

Na criação dos objetos de banco pelo Realm colocamos nos IDs valores randômicos e para tal precisamos instalar uma biblioteca.
- [react-native-get-random-values](https://github.com/LinusU/react-native-get-random-values)
```bash
yarn add react-native-get-random-values@1.8.0
npx pod-install   # para iOS
```

Adicionar a linha abaixo no `App.tsx`
`import 'react-native-get-random-values'`


# Instalações extras

- [Ícones com o Phosphor Icons - phosphor-react-native](https://github.com/duongdev/phosphor-react-native)
Aqui vamos utilizar ícones via SVG e para tal precisamos além da biblioteca de ícones o [pacote de transformação dos SVGs](https://docs.expo.dev/ui-programming/using-svgs/)

```bash
npx expo install react-native-svg
yarn add phosphor-react-native
```

- [Uso de imagem via Expo Image - expo-image](https://docs.expo.dev/versions/latest/sdk/image/)

```bash
npx expo install expo-image
```


[Navegação entre as páginas - React Navigation](https://reactnavigation.org/docs/getting-started)

```bash
yarn add @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```


- [Hello React Navigation](https://reactnavigation.org/docs/hello-react-navigation) para usar a estratégia de navegação stack
```bash
yarn add @react-navigation/native-stack
```



[Manipulação de datas - Dayjs](https://day.js.org/docs/en/installation/node-js)

```bash
yarn add dayjs
```



[Scroll View - react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view)

```bash

```


[Verificação de conectividade](https://docs.expo.dev/versions/latest/sdk/netinfo/)

```bash
npx expo install @react-native-community/netinfo
```


[Armazenamento local - AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)

```bash
npx expo install @react-native-async-storage/async-storage
```


[Exibição de mensagens Toast - react-native-toast-message](https://github.com/calintamas/react-native-toast-message)

```bash
yarn add react-native-toast-message
```
