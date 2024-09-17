
# API de Gestão de Produtos

Esta é uma API desenvolvida com Express.js para a gestão de produtos. Ela permite criar, listar e gerenciar produtos com validação de dados básica.

## Funcionalidades

- **Cadastrar Produtos**: Adiciona novos produtos à lista com validação dos campos obrigatórios.
- **Listar Produtos**: Recupera a lista de produtos cadastrados (não implementado ainda, mas uma boa sugestão para expansão futura).

## Endpoints

### 1. Cadastrar Novo Produto

- **URL**: `/produtos`
- **Método**: `POST`
- **Descrição**: Adiciona um novo produto à lista de produtos.
- **Request Body**:
    ```json
    {
      "nome": "Nome do Produto",
      "descricao": "Descrição do Produto",
      "marca": "Marca do Produto",
      "categoria": "Categoria do Produto",
      "subcategoria": "Subcategoria do Produto (opcional)",
      "unidade_medida": "Unidade de Medida",
      "quantidade_estoque": 10,
      "ponto_reposicao": "Ponto de Reposição (opcional)",
      "preco_custo": 20.50,
      "preco_venda": 30.75,
      "data_validade": "2024-12-31",
      "fornecedor": "Fornecedor (opcional)"
    }
    ```
- **Respostas**:
  - **Sucesso** (201 Created):
    ```json
    {
      "message": "Produto cadastrado com sucesso",
      "produto": {
        "id": 1,
        "nome": "Nome do Produto",
        "descricao": "Descrição do Produto",
        "marca": "Marca do Produto",
        "categoria": "Categoria do Produto",
        "subcategoria": "Subcategoria do Produto",
        "unidade_medida": "Unidade de Medida",
        "quantidade_estoque": 10,
        "ponto_reposicao": "Ponto de Reposição",
        "preco_custo": 20.50,
        "preco_venda": 30.75,
        "data_validade": "2024-12-31",
        "fornecedor": "Fornecedor"
      }
    }
    ```
  - **Erro** (400 Bad Request):
    ```json
    {
      "message": "Preencha todos os campos obrigatórios."
    }
    ```

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/username/repository.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd repository
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```

## Execução

Para iniciar o servidor, use o comando:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3003`.

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/feature-name`).
3. Faça suas alterações e teste-as.
4. Commit e envie suas mudanças (`git commit -am 'Add new feature'` e `git push origin feature/feature-name`).
5. Crie um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Este README cobre a configuração básica e os detalhes da API. Dependendo do seu projeto e das funcionalidades adicionais que você implementar, você pode precisar adicionar mais seções, como uma lista de requisitos, detalhes sobre outros endpoints, ou instruções de configuração adicionais.