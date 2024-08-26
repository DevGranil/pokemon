import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'textBold',
    standalone: true
})
export class TextBoldPipe implements PipeTransform {

    transform(value: string, ...args: string[]): unknown {
        const spanWord: string[] = []

        value.split('').forEach(c => {
            const span = document.createElement('span')
            span.textContent = c;
            if(args[0].split('').includes(c)) span.classList.add('txt-bold')
            spanWord.push(span.outerHTML.toString())
        })

        return spanWord.join('')
    }

}
