using FluentValidation;
using Pruebasdotnet8.Models;
namespace Pruebasdotnet8.Validadores
{
    internal class PersonaValidator : AbstractValidator<Persona>
    {
        public PersonaValidator() 
        {
            RuleFor(persona => persona.Nombre)
                .NotEmpty().WithMessage("El nombre no puede estar vacio.")
                .MinimumLength(2).WithMessage("El nombre debe tener mas de 2 caracteres.");

            RuleFor(persona => persona.Email)
                .NotEmpty().WithMessage("El email no puede estar vacio.")
                .EmailAddress().WithMessage("El email no tiene un formato valido.");

            RuleFor(persona => persona.Edad)
                .InclusiveBetween(1, 120).WithMessage("La edad no esta dentro del rango permitido.");
        }
    }
}
