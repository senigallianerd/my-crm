import {Directive, ElementRef, Input, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
    selector:'[tagDirective]'
})

export class TagDirective{

    @Input() tagDirective: string
    @Output() findUser = new EventEmitter();
    
    constructor(private elementRef: ElementRef){
    }

    ngOnInit() {
        this.tagDirective = this.tagDirective || '';
        let keyword = '@([^ ]+)';
        let regex = new RegExp(`(${keyword})`, "ig");
        this.elementRef.nativeElement.innerHTML = this.tagDirective.replace(regex, '<a class="link" link="$1">$1</a>');
    }

    @HostListener('click', ['$event']) onClick($event){
        if($event.target.innerText.indexOf('@')!==-1)
            this.findUser.emit($event.target.innerText);
    }
    
}