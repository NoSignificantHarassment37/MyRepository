import type { ZodSafeParseResult } from 'zod';
import { testSchema, type TestSchema } from '../Models/Test.schema';
import { getElementOrThrow } from '../utils/GetElements';

const output:HTMLParagraphElement = getElementOrThrow('output', HTMLParagraphElement);
const formularioClientes = getElementOrThrow('clientes-form', HTMLFormElement);

formularioClientes.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data:Object = Object.fromEntries(new FormData(formularioClientes).entries()); 

    const convertedToTestSchema:ZodSafeParseResult<TestSchema> = testSchema.safeParse(data);

    if(convertedToTestSchema.success){
        const response = await fetch('api/Clientes/', {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(convertedToTestSchema)
        })

        console.log(response.ok);
    }
});