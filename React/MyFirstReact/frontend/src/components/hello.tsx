type HelloProps = {
    name: string;
};

function Hello({ name }: HelloProps) {
    return <h1>Hola, {name}!</h1>;
}

export default Hello;