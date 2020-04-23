import { Tarefa } from '../tarefas/tarefa';

export class Projeto {
    id: number;
    titulo: string;
    previsaoEntrega: String;
    tarefas: Tarefa[];
}
