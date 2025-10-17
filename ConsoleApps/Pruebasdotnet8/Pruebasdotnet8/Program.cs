using System;
using System.Security.Cryptography;
using Pruebasdotnet8.Validadores;
using Pruebasdotnet8.Models;
using FluentValidation.Results;
public static class GuidUtils
{
    public static Guid CreateVersion7()
    {
        long timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        Span<byte> bytes = stackalloc byte[16];

        // Escribir timestamp (48 bits) en *little endian* orden inverso
        bytes[5] = (byte)((timestamp >> 40) & 0xFF);
        bytes[4] = (byte)((timestamp >> 32) & 0xFF);
        bytes[3] = (byte)((timestamp >> 24) & 0xFF);
        bytes[2] = (byte)((timestamp >> 16) & 0xFF);
        bytes[1] = (byte)((timestamp >> 8) & 0xFF);
        bytes[0] = (byte)(timestamp & 0xFF);

        RandomNumberGenerator.Fill(bytes[6..]);

        // Version (7)
        bytes[6] = (byte)((bytes[6] & 0x0F) | 0x70);

        // Variante RFC 4122
        bytes[8] = (byte)((bytes[8] & 0x3F) | 0x80);

        return new Guid(bytes);
    }
    public static void Main()
    {
        var persona = new Persona
        {
            Nombre = "Ma",
            Email = "mateoatehortua1111",
            Edad = -1
        };

        PersonaValidator validadorDePersonas = new();
        ValidationResult validarPersonaResult = validadorDePersonas.Validate(persona);

        if (!validarPersonaResult.IsValid)
        {
            foreach(var error in validarPersonaResult.Errors)
            {
                Console.WriteLine(error);
            }
        }
    }
}
