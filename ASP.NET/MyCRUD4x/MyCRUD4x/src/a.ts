type Persona = {
    nombre:string,
    edad:number
};
const Mateo:Persona = {
    nombre: "Mateo",
    edad: 17
}
const props:Array<unknown> = Object.entries(Mateo);
props.forEach(prop => { console.log(prop) });