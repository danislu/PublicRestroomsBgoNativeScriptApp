import { Component } from "@angular/core";
import { Router } from "@angular/router";

export class Glyph {
    icon: string;
    code: string;
}

@Component({
    moduleId: module.id,
    selector: "glyph",
    templateUrl: "./index.html",
    styleUrls: [ "./index.css" ]
})
export class GlyphComponent {
    public firstName: string = "John";
    public lastName: string = "Doe";
    public glyphs: Glyph[] = [];

    constructor(private router: Router) {
        let charCode = 5000;
        for (; charCode <= 5500; charCode++) {
            const glyph = new Glyph();
            glyph.icon = String.fromCharCode(charCode);
            glyph.code = charCode.toString(16);

            this.addGlyph(glyph);
        }
    }

    private addGlyph(glyph: Glyph) {
        this.glyphs.push(glyph);
    }

    click(): void {
        this.router.navigate(["/map"]);
    }
}