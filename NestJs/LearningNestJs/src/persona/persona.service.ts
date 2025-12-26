import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/http/create-persona.dto.js';
import { UpdatePersonaDto } from './dto/http/update-persona.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PersonaService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPersonaDto: CreatePersonaDto) {
    return this.prisma.persona.create({ data: createPersonaDto });
  }

  findAll() {
    return this.prisma.persona.findMany();
  }

  findOne(id: number) {
    return this.prisma.persona.findFirst({ where: { id } });
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return this.prisma.persona.update({
      where: {
        id,
      },
      data: updatePersonaDto,
    });
  }

  remove(id: number) {
    return this.prisma.persona.delete({
      where: {
        id,
      },
    });
  }
}
