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

#### Listar Laboratório:

* Endpoint:

    http://localhost:3000/api/laboratorios/:id

* Verbo HTTP:

    GET

* Exemplo de Payload (JSON):

    // Sem payload

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

### List books:

* Endpoint:

    http:/localhost:3000/api/laboratorios?page=<number>&limit=<number>

* Verbo HTTP:

    GET

* Request body example (JSON):

    // Sem payload

* Response body example (JSON):

```
    {
    "per_page": 9,
    "total": 1,
    "current_page": null,
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

### Listar Exames:

* Endpoint:

      http:/localhost:3000/api/exames

* Verbo HTTP:

    GET

* Request body example (JSON):

    // Sem payload

* Response body example (JSON):

```
{
    "per_page": 9,
    "total": 1,
    "current_page": 1,
    "data": [{
        "id": 5,
        "nome": "Sangue",
        "status": 1,
        "tipo": 1,
        "createdAt": "2021-06-14T14:59:53.000Z",
        "updatedAt": "2021-06-14T14:59:53.000Z",
        "deletedAt": null,
        "laboratorios": [{
            "id": 3,
            "exame_id": 4,
            "laboratorio_id": 5,
            "createdAt": "2021-06-14T15:14:03.000Z"
        }]
    }]
}
```
