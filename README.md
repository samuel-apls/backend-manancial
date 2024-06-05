<h1 align="center"> API de cadastro de membros </h1>

O objetivo desta aplicação é cadastrar usuários, na qualidade de membro da igreja, viabilizando um processo de autenticação e de autorização de acesso aos recursos das plataformas da igreja.

Para mais informação do projeto, clique aqui! ```<em desenvolvimento>```

## Exemplo da Authenticação usada na API

![alt text](https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbDksQ6ZcHqIF5TXBrKLahSbeYthbsGy9INyayfnxW_5juaia76YufT76lSZxYQcHyJsKX0NpHV6p5jeYeh3pSUbMqH=w1850-h968)

## Lista de endpoints

Abaixo segue as rodas como também contratos para acessar seus principais métodos

### GET

* [GetMember](#get-member)
* [GetAllMembers](#get-all-members)

### POST

* [Login](#fazer-login)
* [Member](#criar-membro)
* [QualificationsMember](#criar-qualificações-para-membros)

### Métodos GET

#### Get Member

`GET /getMember`

    curl --request GET \ --url 'http://localhost:3000/getMember?Id=1'\
    --header 'Authorization: Bearer {token}' \

* Resposta: `200`

   ```
   {
      "data": {
       "member_id": int,
       "full_name": string,
       "email": string,
       "birth_date": DateTime,
       "phone_number": string,
       "entry_membership_date": DateTime,
       "exit_membership_date": null
        }
      }
    ```

#### Get All Members

`GET /getAllMembers`

    curl --request GET \ --url 'http://localhost:3000/getAllMembers'\
    --header 'Authorization: Bearer {token}' \

* Resposta: `200`

   ```
    {
        "data": [
            {
                "member_id": int,
                "full_name": string,
                "email": string,
                "birth_date": DateTime,
                "phone_number": string,
                "entry_membership_date": DateTime,
                "exit_membership_date": null
            },
            {
                "member_id": int,
                "full_name": string,
                "email": string,
                "birth_date": DateTime,
                "phone_number": string,
                "entry_membership_date": DateTime,
                "exit_membership_date": null
            }
        ]
    }
    ```

### Métodos POST

#### Fazer Login

`POST /login`

    curl --request POST \
        --url https://localhost:3000/login \
        --header 'Content-Type: application/json' \
        --data '{
            "emailOrPhone": string,
            "password": string
        }'

* Resposta: `200`

   ```
    {
        "message": "Login efetuado com sucesso",
        "jwt": string,
        "role": int
    }
    ```

* Resposta de erro: `400`

    ```
    {
     "message": string
    }
    ```

#### Criar Membro

`POST /member`

    curl --request POST \
    --url https://localhost:3000/member \
    --header 'Authorization: Bearer {token}' \
    --header 'Content-Type: application/json' \
    --data '{
        "member":{
            "full_name": string,
            "email": string,
            "password": string,
            "role": string
            "birth_date": DateTime,
            "phone_number": string,
            "entry_membership_date": DateTime
        }
    }'

* Resposta: `201`

   ```
    {
     "message": "Membro cadastrado com sucesso"
    }
    ```

* Resposta de erro: `400`

    ```
    {
     "message": string
    }
    ```

    **Obs**: O campo **role** não é obrigatório.

#### Criar Qualificações para membros

`POST /qualificationsMember`

    curl --request POST \
    --url http://localhost:3000/qualificationsMember \
    --header 'Authorization: Bearer {token}' \
    --header 'Content-Type: application/json' \
    --data '{
        "classifications":{
            "occupation": string,
            "role_church": string,
            "marital_status": string,
            "cpf": string,
            "rg": string,
            "address": string,
            "member_id": int
        }
    }'

* Resposta: `201`

   ```
    {
     "message": "Qualificação cadastrada com sucesso!"
    }
    ```

* Resposta de erro: `400`

    ```
    {
     "message": string
    }
    ```
---
<a href="https://www.youtube.com/user/IgrejaBManancial"> <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white"></a>
<a href="https://www.instagram.com/igreja.batista.manancial"> <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"></a>