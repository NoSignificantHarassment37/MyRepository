// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

for(int i = 0; i < 11; i++)
{
    Guid id = Guid.CreateVersion7();
    Console.WriteLine(id);
}