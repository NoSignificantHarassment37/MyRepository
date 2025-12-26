import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PersonaService } from './persona.service.js';
import { CreatePersonaDto } from './dto/http/create-persona.dto.js';
import { UpdatePersonaDto } from './dto/websockets/update-persona.dto.js';

// para desarrollo local, esta es la manera que descubri para evitar que se bloquee la conexion por culpa de CORS
@WebSocketGateway({
  cors: {
    origin: '*', // 🔥 Permitir todos en desarrollo
    // origin: ['http://127.0.0.1:5500', 'http://localhost:*'],
    credentials: true,
  },
  transports: ['websocket', 'polling'], // Importante para Socket.IO
})
export class PersonaGateway {
  constructor(private readonly personaService: PersonaService) {}

  @SubscribeMessage('createCat')
  create(@MessageBody() createCatDto: CreatePersonaDto) {
    return this.personaService.create(createCatDto);
  }

  @SubscribeMessage('findAllCat')
  findAll() {
    return this.personaService.findAll();
  }

  @SubscribeMessage('findOneCat')
  findOne(@MessageBody() id: number) {
    return this.personaService.findOne(id);
  }

  @SubscribeMessage('updateCat')
  update(@MessageBody() updateCatDto: UpdatePersonaDto) {
    return this.personaService.update(updateCatDto.id, updateCatDto);
  }

  @SubscribeMessage('removeCat')
  remove(@MessageBody() id: number) {
    return this.personaService.remove(id);
  }
}
