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
        let keyword = "@([a-z'A-Z0-9_]+)";
        let regex = new RegExp(`(${keyword})`, "ig");
        this.elementRef.nativeElement.innerHTML = this.tagDirective.replace(regex, '<a class="link" link="$1">$1</a>');
    }
    
}