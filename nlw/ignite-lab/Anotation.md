# Graphql

## Fazendo requisicões utilizando graphql.

Primeiro passo irei instalar a seguinte lib:

```bash
❯ yarn add @apollo/client graphql
```

Em seguida irei criar um arquivo chamado apollo dentro do seguinte diretorio. "src/lib/apollo.ts"

```ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'endereco do server graphql',
  // funcao pra estrateja de cache
  cache: new InMemoryCache(),
});
```

Logo a seguir precisarei ir na raiz do meu projeto no componente "main.tsx" e englobar todos meu componentes com o seguite componente importado do apollo. E como props irei passar o client que acabei de criar logo acima.

```tsx
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { client } from './lib/apollo';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
```

Irei realizar a requisicao da seguinte maneira:

```tsx
import { gql, useQuery } from '@apollo/client';
const GET_LESSON_QUERY = gql`
  query lessons {
    lessons {
      id
      title
    }
  }
`;

export function App() {
  const { data } = useQuery(GET_LESSON_QUERY);

  return (
    <ul>
      {data.lessons.map(lesson => (
        <li>{lesson.title}</li>
      ))}
    </ul>
  );
}
```

### Query utilizando filter.

```tsx
// Esse String precisa obrigatoriamente ser camelcase
const GET_LESSON_BY_SLUG = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`;

const { data } = useQuery(GET_LESSON_BY_SLUG, {
    variables: {
    slug: lessonSlug,
  },
});
```

### Persistindo dados com no graphcms com graphql.

Primero precisarei ir no graphcms, e autorizar a permissão de escrita de dados gerando um novo token, em seguida irei copiar-lo e atualizar o meu arquivo apollo.ts da seguinte forma:

```ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.VITE_URL_GRAPHQL,
  headers: {
    Authorization: `Bearer TOKEN_COPIADO_GRAPHQL`,
  },
  cache: new InMemoryCache(),
});


// Em seguida no meu componente farei da seguinte forma:
const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`;

export function Subscribe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // FUncao que fara a persistencia, retorno ao ser persistido
  const [createSubscriber, { data }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

  function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    createSubscriber({
      variables: {
        name,
        email,
      },
    });
  }
}

```

### Usando Graphql Codegen

Para utilizar a tipagem dinamicad vindo do graphcms, irei instalar a seguintes lib:

```bash
❯ yarn add @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo -D
```
Após a instalacão dessas libs irei criar um arquivo na raíz do projeto chamado "codegen.yml".

```yml
schema: ENDERECO_API_GRAPHCMS

# Diretorio que acabei de criar.
documents: documents: ./src/graphql/**/*.graphql

generates:
  ./src/types.ts: #Diretorio onde ira gerar a tipagem
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      reactApolloVersion: 3
      # Vai criar um hook pra cada query que eu criei, somente chamando essa funcao teremos a query executada
      withHooks: true
      withHOC: false
      withComponent: false
```

Em seguida irei criar uma pasta dentro de src chamada "graphql", com duas pastas dentro "mutations", "queries".

A seguir irei criar um arquivo .graphql com o nome da query e salvar dentro da pasta "query"
A seguir irei criar um arquivo .graphql com o nome da mutation e salvar dentro da pasta "mutations"

Agora dentro do meu package.json irei criar o seguinte script:

```json
"codegen": "graphql-codegen"
```

Agora quando for fazer uma requisicao poderei fazer da seguinte forma:
 - useGetLessonsQuery, onde é o nome da file que criei dentro da pasta graphql
```ts
const { data } = useGetLessonsQuery();
const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: lessonSlug,
    },
  });

// Post data
const [createSubscriber, { data, loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      },
    });
    navigate('/event');
  }

```

## Utilizando lib pra rendereizacão de video.

Ireimos instalar a seguinte libe:

```bash
# https://vimejs.com/
❯ yarn add @vime/core @vime/react
```

Em seguida no meu componente onde utilizo o video, irei fazer as seguintes importacões e utilizar os seguintes componentes do vimeo.

```tsx

import { DefaultUi, Player, Youtube } from '@vime/react';
import '@vime/core/themes/default.css';

return (
  <Player>
    <Youtube videoId="KJj70dBgRPo" />
    <DefaultUi />
  </Player>
)

```
