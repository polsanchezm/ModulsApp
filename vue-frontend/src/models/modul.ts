export class Modul {
    // declarem el model del Modul
    public id: number;
    public modul: string;
    public durada: number;
    public hores_de_lliure_disposicio: number;
    public equivalencia_en_credits_ECTS: number;
    public unitats_formatives: number;
    public completades: number;

    constructor(id: number, modul: string, durada: number, hores_de_lliure_dispocicio: number, equivalencia_en_credits_ECTS: number, unitats_formatives: number, completades: number) {
        this.id = id;
        this.modul = modul;
        this.durada = durada;
        this.hores_de_lliure_disposicio = hores_de_lliure_dispocicio;
        this.equivalencia_en_credits_ECTS = equivalencia_en_credits_ECTS;
        this.unitats_formatives = unitats_formatives;
        this.completades = completades;
    }
}
