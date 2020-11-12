import React, {useCallback, useEffect, useState} from "react";
import {Produtos} from '../../models/produtos';
import axios from 'axios';
import Link from "next/link";
import { Button, Card, Col, Row } from "react-bootstrap";

type ProdutosPublicList = Produtos & {
    path: string;
}

export default function PublicProductList() {
    const [ produtos, setProdutos ] = useState<ProdutosPublicList[]>();

    useEffect(() => {
        buscarProdutos().then(console.log);
    }, []);

    const buscarProdutos = useCallback(async () => {
        const response = await axios.get('/api/produtos-ativos');

        console.log(response);

        setProdutos(response.data);

        return response;
    }, []);

    if (!produtos) {
        return (<p>Nenhum produto encontrado.</p>)
    }

    return (
        <div>
            <h1>Seja Bem-Vindo ao The Bulldog!</h1>
            <Row>
                
                    {
                        produtos.map((produto) => {
                            return (
                                <Col md={4} lg={4} sm={12} style={{ padding: '1em' }} key={produto.idproduto}>
                                    <Card>
                                        <img 
                                            src={
                                                produto.imagem ? 
                                                    `http://localhost:3000/api/produtos/image?file=${produto.imagem}` 
                                                    : '/img/no-image-found.png'
                                            } 
                                            alt={produto.nome}
                                            className="card-img-top"
                                        />
                                        <Card.Body>
                                            <h5 className="card-title text-center">
                                                {produto.nome}
                                                {/* <span className="badge badge-danger">39% Off</span> */}
                                            </h5>
                                            <div className="d-flex justify-content-center align-items-center text-center">
                                                {/* <p className="text-center" style={{color: 'red', paddingRight: '1em'}}><del>R$ 100,00</del></p> */}
                                                <p className="blockquote text-center" style={{color: 'red'}}>R$ {produto.valor}</p>
                                            </div>
                                            <p className="card-text">{produto.descricao}</p>
                                        </Card.Body>
                                        <Card.Footer className="justify-content-between align-items-center">
                                            <a href="#" className="btn btn-success">
                                                Comprar
                                                <i className="fas fa-shopping-cart"></i>
                                            </a>
                                            <Link href={`/produto/${produto.idproduto}`}>
                                                <Button variant="secondary">
                                                    Detalhes
                                                    <i className="fas fa-info-circle"></i>
                                                </Button>
                                            </Link>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            );
                        })
                    }
            </Row>
        </div>
    )
}
