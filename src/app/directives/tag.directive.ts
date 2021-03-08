import {Directive, ElementRef, Input, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
    selector:'[tagDirective]'
})

export class TagDirective{

    @Input() tagDirective: string
    @Output() findUser = new EventEmitter();

    tag: string;
    
    constructor(private elementRef: ElementRef){
    }

    ngOnInit() {
        this.tag = this.tagDirective.split('@')[1];
        if(this.tag)
            this.tag = this.tag.split(' ')[0];

        this.elementRef.nativeElement.innerHTML = this.tagDirective;
    }

    @HostListener('click', ['$event']) onClick($event){
        this.findUser.emit(this.tag);
    }
    
}