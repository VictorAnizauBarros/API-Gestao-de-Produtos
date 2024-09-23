    const express = require('express'); 
    const app = express(); 

    const listaProdutos = [];
    app.use(express.json()); 
    //Função para validar informações à respeito do novo produto cadastrado. 
    function validationNewProduct(nome, descricao,marca,categoria,subcategoria,unidade_medida,quantidade_estoque,ponto_reposicao,preco_custo,preco_venda,data_validade,fornecedor,res){
        //Validação de dados - subcategoria, ponto_reposicao e fornecedor são opcionais. 
        if(!nome || !descricao || !marca || !categoria || !unidade_medida || !quantidade_estoque || !preco_custo || !preco_venda || !data_validade){
            return res.status(400).json({message: "Todos os campos devem ser preenchidos."}); 
        }

        if(typeof quantidade_estoque !== 'number'){
            return res.status(400).json({message:"Campo 'quantidade_estoque' deve ser preenchido com dados do tipo number."});
        }

        if(typeof preco_custo !== 'number' || preco_custo <0){
            return res.status(400).json({message:"Campo 'preco_custo' deve ser preenchido com dados do tipo number e ser maior ou igual a zero."});
        }
        if(typeof  preco_venda !== 'number' || preco_venda < 0){
            return res.status(400).json({message:"Campo 'preco_venda' deve ser preenchido com dados do tipo number e ser maior ou igual a zero."});
        }
        if(typeof  ponto_reposicao !== 'number' || ponto_reposicao < 0){
            return res.status(400).json({message:"Campo 'ponto_reposicao' deve ser preenchido com dados do tipo number e ser maior ou igual a zero."});
        }
    }

    //Endpoint para cadastrar novos produtos:
    app.post('/produtos', (req,res)=>{
        const {nome, descricao,marca,categoria,subcategoria,unidade_medida,quantidade_estoque,ponto_reposicao,preco_custo,preco_venda,data_validade,fornecedor} = req.body;

        const validationResponse = validationNewProduct
        (nome, descricao,marca,categoria,subcategoria,unidade_medida,quantidade_estoque,ponto_reposicao,preco_custo,preco_venda,data_validade,fornecedor,res); 

        if(validationResponse) return;
        
        
        const novoProduto = {
            id: listaProdutos.length+1,
            nome, 
            descricao,
            marca,
            categoria,
            subcategoria,
            unidade_medida,
            quantidade_estoque,
            ponto_reposicao,
            preco_custo,
            preco_venda,
            data_validade,
            fornecedor
        }

        const produtoExiste = listaProdutos.find(produto=> produto.nome === nome); 
        if(produtoExiste){
            return res.status(409).json({message:"Este produto já foi cadastrado."})
        }else{
            listaProdutos.push(novoProduto); 
            res.status(201).json({message:"Produto cadastrado com sucesso.", produto:novoProduto}); 
        }


    }); 

    //Endpoint para listar um produto através do seu ID. 
    app.get('/produtos/:id', (req,res)=>{
        const idProduto = parseInt(req.params.id); 
        const produtoExiste = listaProdutos.find(produto=> produto.id === idProduto); 

        if(produtoExiste){
            return res.status(200).json({mensagem:"Dados do produto:" , produto:produtoExiste});
        }else{
            return res.status(404).json({mensagem:"O produto não existe."})
        }
    });

    //Endpoint para listar todos os produtos cadastrados com paginação:

    app.get('/produtos', (req,res)=>{
        const pagina = parseInt(req.query.pagina) || 1; 
        const tamanhoPagina = parseInt(req.query.tamanhoPagina) || 10; 
        const inicio = (pagina-1)*tamanhoPagina;
        const fim = inicio + tamanhoPagina;
        const produtosPaginados = listaProdutos.slice(inicio,fim);

        res.header('X-Total-Count', listaProdutos.length);
        res.json(produtosPaginados); 
    });

    function validarDado(dado,res){
        if(typeof dado !== 'number'){
            return res.status(400).json({mensagem:"Tipo de dado inválido. Dado deve ser do tipo number"}); 
        }

        if(dado < 0 ){
            return res.status(400).json({mensagem:"Dado não pode receber valor negativo."}); 
        }
    }

    //Endpoint atualizar produto:
    app.put('/produtos/:id', (req,res)=>{
        const idProduto = parseInt(req.params.id); 
        const {quantidade_estoque,ponto_reposicao,preco_custo,preco_venda} = req.body;

        if(quantidade_estoque){
            validarDado(quantidade_estoque,res);
        }

        if(ponto_reposicao){
            validarDado(ponto_reposicao,res);
        }

        if(preco_custo){
            validarDado(preco_custo,res);
        }

        if(preco_venda){
            validarDado(preco_venda,res); 
        }

        const dadosAtualizados = req.body; 

        const index = listaProdutos.findIndex(produto => produto.id === idProduto); 

        if(index < 0){
            return res.status(404).json({mensagem:"Produto não encontrado."})
        }else{
            listaProdutos[index] = {...listaProdutos[index], ...dadosAtualizados};
            res.status(200).json({mensagem:"Produto atualizado com sucesso", produto: listaProdutos[index]}); 
        }


    }); 

    app.delete('/produtos/:id',(req,res)=>{
        const idProduto = parseInt(req.params.id); 
        const index = listaProdutos.findIndex(produto=> produto.id === idProduto); 

        if(index < 0 ){
            return res.status(404).json({mensagem:"Produto não encontrado."});''
        }else{
            listaProdutos.splice(index,1);
            res.status(200).json({mensagem:"Produto deletado com sucesso"}); 
        }

    

    })




    const port = 3003; 
    app.listen(port, ()=>{
        console.log('Server runing...')
    })