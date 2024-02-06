# Happy 🤗

Solucão desenvolvida em alguma edicão da nlw, com o intuito de conectar pessoas a orfanatos para que elas podessem fazer a diferenca na vida dessas criancas que ali estavam, podendo levar alegria aquele que ali estão.

## Techs:

|         API          |     WEB     |             APP              |
| :------------------: | :---------: | :--------------------------: |
|      typescript      |    axios    |             expo             |
|       express        |   leaflet   |          expo-font           |
| express-async-errors |    react    |       expo-status-bar        |
|        multer        | react-icons |         react-native         |
|       sqlite3        | typescript  | react-native-gesture-handler |
|       typeorm        |      -      |      react-native-maps       |
|         yup          |      -      |     react-native-screens     |
|          -           |      -      |       react-native-web       |
|          -           |      -      |          typescript          |

## Executando:

Primeiramente irá baixar a aplicacão utilizando-se o seguinte comando:

```bash
❯ gh repo clone Chrystiansantos/Happy-NLW
```

## API

Após baixar o repo, irei acessar o **dir** api, e executar o seguinte comando:

```
❯ cd Happy-NLW/api && yarn && yarn typeorm migration:run && yarn dev
```

Em seguida minha aplicacão estará sendo executada na porta **3333**

## WEB

Após baixar o repo, irei acessar o **dir** web, e executar o seguinte comando:

Irei clonar a file **Example.env** renomeando para **.env**. Em seguida irei acessar este site <a href="https://www.mapbox.com/">Mapbox</a> e criar uma chave para que eu possa utilizar a estilizacão fornecida por eles. Após ter essa chave irei atualizar o meu .env, e executar o seguinte comando.

```bash
❯ cd web && yarn && yarn start
```

## APP

Após baixar o repo, irei acessar o **dir** web, e executar o seguinte comando:

```bash
❯ cd app && yarn && expo start # yarn ios ou yarn android caso deseje executar em um emulador
```

![happy](https://user-images.githubusercontent.com/33062949/178018986-30c79fb4-11fb-4b3b-ad28-fc55059b878e.png)