# Prontuário Eletrônico - Desafio API

## Como rodar

* Clone esse repositório em sua máquina
* Acesse a pasta onde ele foi clonado
* Rode o comando `npm install`
* Rode o comando para popular o banco de dados `npm run typeorm migration:run`
* Rode o comando `npm run start:dev` para iniciar o projeto localmente
* O projeto estará acessível em `http://localhost:3000`

## Endpoints

### Laboratórios:

#### Criar Laboratório
* Endpoint:

    http://localhost:3000/api/laboratorios

* Verbo HTTP:

    POST

* Exemplo de Payload (JSON):

```
      {
        "nome": "Laboratório A",
        "status": 1,
        "endereco_id": 5
      }
```

* Código HTTP de Resposta:

    202

* Response body example (JSON):

```
    {
        "data": {
            "id": 1,
            "nome": "Laboratório A",
            "status": 1,
            "endereco_id": 5,
            "createdAt": "2021-06-14T12:26:50.000Z",
            "updatedAt": "2021-06-14T14:17:32.000Z",
            "deletedAt": null,
            "endereco": {
                "id": 5,
                "rua": "Rua dos Bobos",
                "numero": 0,
                "complemento": null,
                "cep": 20000001,
                "bairro": "Sé",
                "cidade": "São Paulo",
                "estado": "SP",
                "pais": "Brasil",
                "createdAt": "2021-06-14T02:55:42.000Z",
                "updatedAt": "2021-06-14T03:14:34.000Z",
                "deletedAt": null
            },
            "exames": []
        }
    }
```

#### Atualizar Laboratório
* Endpoint:

    http://localhost:3000/api/laboratorios/:id

* Verbo HTTP:

    PUT

* Exemplo de Payload (JSON):
```
      {
        "nome": "Laboratório A",
        "status": 1,
        "endereco_id": 5
      }
```

* Código HTTP de Resposta:

    204

* Response body example (JSON):

    // Sem Payload

#### Deletar Laboratório
* Endpoint:

    http://localhost:3000/api/laboratorios/:id

* Verbo HTTP:

    DELETE

* Exemplo de Payload (JSON):

    // Sem payload

* Código HTTP de Resposta:

    204

* Response body example (JSON):

    // Sem Payload

#### Listar Laboratório por ID:

* Endpoint:

    http://localhost:3000/api/laboratorios/:id

* Verbo HTTP:

    GET

* Exemplo de Payload (JSON):

    // Sem payload

* Código HTTP de Resposta

    200

* Response body example (JSON):

```
    {
        "data": {
            "id": 1,
            "nome": "Laboratório A",
            "status": 1,
            "endereco_id": 5,
            "createdAt": "2021-06-14T12:26:50.000Z",
            "updatedAt": "2021-06-14T14:17:32.000Z",
            "deletedAt": null,
            "endereco": {
                "id": 5,
                "rua": "Rua dos Bobos",
                "numero": 0,
                "complemento": null,
                "cep": 20000001,
                "bairro": "Sé",
                "cidade": "São Paulo",
                "estado": "SP",
                "pais": "Brasil",
                "createdAt": "2021-06-14T02:55:42.000Z",
                "updatedAt": "2021-06-14T03:14:34.000Z",
                "deletedAt": null
            },
            "exames": []
        }
    }
```

#### Listar Laboratórios:

* Endpoint:

    http://localhost:3000/api/laboratorios

* Verbo HTTP:

    GET

* Exemplo de Payload (JSON):

    // Sem payload

* Código HTTP de Resposta

    206

* Response body example (JSON):

```
    {
        "per_page": 9,
        "total": 1,
        "current_page": 1,
        "data": [{
            "id": 1,
            "nome": "Laboratório A",
            "status": 1,
            "endereco_id": 5,
            "createdAt": "2021-06-14T12:26:50.000Z",
            "updatedAt": "2021-06-14T14:17:32.000Z",
            "deletedAt": null,
            "endereco": {
                "id": 5,
                "rua": "Rua dos Bobos",
                "numero": 0,
                "complemento": null,
                "cep": 20000001,
                "bairro": "Sé",
                "cidade": "São Paulo",
                "estado": "SP",
                "pais": "Brasil",
                "createdAt": "2021-06-14T02:55:42.000Z",
                "updatedAt": "2021-06-14T03:14:34.000Z",
                "deletedAt": null
            },
            "exames": []
        }]
    }
```

### Exames:

#### Criar Exame
* Endpoint:

    http://localhost:3000/api/exames

* Verbo HTTP:

    POST

* Exemplo de Payload (JSON):

```
    {
    "nome": "Sangue",
    "status": 1,
    "tipo": 1
    "laboratorios": [1, 2]
    }
```

* Código HTTP de Resposta:

    202

* Response body example (JSON):

```
    {
        "data": {
            "nome": "Sangue",
            "status": "1",
            "tipo": "1",
            "deletedAt": null,
            "id": 6,
            "createdAt": "2021-06-14T15:46:36.000Z",
            "updatedAt": "2021-06-14T15:46:36.000Z"
        }
    }
```

#### Atualizar Exame
* Endpoint:

    http://localhost:3000/api/exames/:id

* Verbo HTTP:

    PUT

* Exemplo de Payload (JSON):
```
    {
        "nome": "Sangue",
        "status": 1,
        "tipo": 1
        "laboratorios": [1]
    }
```

* Código HTTP de Resposta:

    204

* Response body example (JSON):

    // Sem Payload

#### Deletar Exame
* Endpoint:

    http://localhost:3000/api/exames/:id

* Verbo HTTP:

    DELETE

* Exemplo de Payload (JSON):

    // Sem payload

* Código HTTP de Resposta:

    204

* Response body example (JSON):

    // Sem Payload

#### Listar Exame por ID:

* Endpoint:

    http://localhost:3000/api/exames/:id

* Verbo HTTP:

    GET

* Exemplo de Payload (JSON):

    // Sem payload

* Código HTTP de Resposta

    200

* Response body example (JSON):

```
    {
        "data": {
            "id": 6,
            "nome": "Sangue",
            "status": 1,
            "tipo": 1,
            "createdAt": "2021-06-14T15:46:36.000Z",
            "updatedAt": "2021-06-14T15:47:26.000Z",
            "deletedAt": null,
            "laboratorios": []
        }
    }
```


#### Listar Exames:

* Endpoint:

    http://localhost:3000/api/exames

* Verbo HTTP:

    GET

* Exemplo de Payload (JSON):

    // Sem payload

* Código HTTP de Resposta

    206

* Response body example (JSON):

```
    {
        "per_page": 9,
        "total": 1,
        "current_page": 1,
        "data": [
            {
                "id": 6,
                "nome": "Sangue",
                "status": 1,
                "tipo": 1,
                "createdAt": "2021-06-14T15:46:36.000Z",
                "updatedAt": "2021-06-14T15:47:26.000Z",
                "deletedAt": null,
                "laboratorios": []
            }
        ]
    }
```


### Endereços:

#### Criar Endereço
* Endpoint:

    http://localhost:3000/api/enderecos

* Verbo HTTP:

    POST

* Exemplo de Payload (JSON):

```
    {
        "rua": "Rua Zero",
        "numero": "1",
        "complemento": "Casa Azul"
        "cep": "20000001",
        "bairro": "Sé",
        "cidade": "São Paulo",
        "estado": "RJ",
        "pais": "Brasil"
    }
```

* Código HTTP de Resposta:

    202

* Response body example (JSON):

```
    {
        "data": {
            "rua": "Rua Zero",
            "numero": "1",
            "cep": "20000001",
            "bairro": "Sé",
            "cidade": "São Paulo",
            "estado": "RJ",
            "pais": "Brasil",
            "complemento": "Casa Azul",
            "deletedAt": null,
            "id": 1,
            "createdAt": "2021-06-14T15:52:45.000Z",
            "updatedAt": "2021-06-14T15:52:45.000Z"
        }
    }
```

#### Atualizar Endereço
* Endpoint:

    http://localhost:3000/api/enderecos/:id

* Verbo HTTP:

    PUT

* Exemplo de Payload (JSON):
```
    {
        "rua": "Rua Zero",
        "numero": "1",
        "complemento": "Casa Azul"
        "cep": "20000001",
        "bairro": "Sé",
        "cidade": "São Paulo",
        "estado": "RJ",
        "pais": "Brasil"
    }
```

* Código HTTP de Resposta:

    204

* Response body example (JSON):

    // Sem Payload

#### Deletar Endereço
* Endpoint:

    http://localhost:3000/api/enderecos/:id

* Verbo HTTP:

    DELETE

* Exemplo de Payload (JSON):

    // Sem payload

* Código HTTP de Resposta:

    204

* Response body example (JSON):

    // Sem Payload

#### Listar Endereço por ID:

* Endpoint:

    http://localhost:3000/api/enderecos/:id

* Verbo HTTP:

    GET

* Exemplo de Payload (JSON):

    // Sem payload

* Código HTTP de Resposta

    200

* Response body example (JSON):

```
    {
        "data": {
            "rua": "Rua Zero",
            "numero": "1",
            "cep": "20000001",
            "bairro": "Sé",
            "cidade": "São Paulo",
            "estado": "RJ",
            "pais": "Brasil",
            "complemento": "Casa Azul",
            "deletedAt": null,
            "id": 1,
            "createdAt": "2021-06-14T15:52:45.000Z",
            "updatedAt": "2021-06-14T15:52:45.000Z"
        }
    }
```


#### Listar Endereços:

* Endpoint:

    http://localhost:3000/api/enderecos

* Verbo HTTP:

    GET

* Exemplo de Payload (JSON):

    // Sem payload

* Código HTTP de Resposta

    206

* Response body example (JSON):

```
    {
        "per_page": 9,
        "total": 1,
        "current_page": 1,
        "data": [
            {
                "rua": "Rua Zero",
                "numero": "1",
                "cep": "20000001",
                "bairro": "Sé",
                "cidade": "São Paulo",
                "estado": "RJ",
                "pais": "Brasil",
                "complemento": "Casa Azul",
                "deletedAt": null,
                "id": 1,
                "createdAt": "2021-06-14T15:52:45.000Z",
                "updatedAt": "2021-06-14T15:52:45.000Z"
            }
        ]
    }
```
