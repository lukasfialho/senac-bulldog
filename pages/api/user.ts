import {NowRequest, NowResponse} from "@vercel/node";
import crypto from 'crypto';
import { User } from "../../shared/models/user";
import { encryptPassword } from "./encryptPassword";
import { queryPromiseGet, queryPromiseSave } from "./produtos_old";

async function show(request: NowRequest, response: NowResponse) {
    const { idusuario } = request.query;

    const query = await queryPromiseGet(`SELECT * FROM Usuario WHERE idusuario=${idusuario}`);

    return response.json(query);
}

async function store(request: NowRequest, response: NowResponse) {
    const user: User = request.body;

    user.senha = await encryptPassword(user.senha);

    const query = await queryPromiseSave(
        'INSERT INTO Usuario SET ?', user
    );

    return response.json(query);
}

async function update(request: NowRequest, response: NowResponse) {
    const user: User = request.body;

    const updateObject: any = { 
        status: user.status,
        nome: user.nome,
        sobrenome: user.sobrenome,
        perfil: user.perfil,
        cpf: user.cpf
    };

    if (user.senha) {
        updateObject.senha = await encryptPassword(user.senha);
    }

    const query = await queryPromiseSave(
        `UPDATE Usuario SET ? WHERE idusuario=${user.idusuario}`,
        updateObject
    );

    return response.json(query);
}

async function remove(request: NowRequest, response: NowResponse) {
    const { idusuario } = request.query;

    const query = await queryPromiseSave(
        `UPDATE Usuario SET ? WHERE idusuario=${idusuario}`,
        { status: 'BLOQUEADO' }
    );

    return response.json(query);
}

export default async (request: NowRequest, response: NowResponse) => {
    switch(request.method){
        case 'GET':
            return await show(request, response);
        case 'POST':
            return await store(request, response);
        case 'PUT':
            return await update(request, response);
        case 'DELETE':
            return await remove(request, response);
        default:
            response.status(405).end();
            break;
    }
}
