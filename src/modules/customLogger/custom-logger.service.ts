import { ConsoleLogger, Injectable } from '@nestjs/common';
import { bgMagenta, white } from 'colors';
import { appendFileSync } from 'fs';

@Injectable()
export class CustomLogger extends ConsoleLogger {

    formatLog(name, quantity, price) {
        return `LOCAL: ${this.context}, NOME: ${name}, QUANTIDADE: ${quantity}, PREÇO: ${price}, TIMESTAMP ${this.getTimestamp()}`;
    }

    colorLog(product) {
        const { name, quantity, price } = product;
        const logFormatado = this.formatLog(name, quantity, price);

        console.log(bgMagenta(white(logFormatado)));
    }

    logInFile(product) {
        const { name, quantity, price } = product;

        const mensagemFormatada =
            this.formatLog(name, quantity, price) + '\n';

        const caminhoDoLog = './src/modules/customLogger/arquivo.log';
        appendFileSync(caminhoDoLog, mensagemFormatada);
    }
}