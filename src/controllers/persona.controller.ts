import type {Request, Response} from 'express';
import * as personaService from '../services/persona.service.js'
import type { CreatePersonaDto, PersonaResponseDto, UpdatePersonaDto } from '../dtos/persona.dto.js';
import { ApiResponse } from '../common/api=response.js'; 
import { createPersonaSchema } from '../schemas/persona.schema.js';

export const getPersonas = (req: Request, res: Response) => {
    const personas = personaService.getPersonas();
    res.json(ApiResponse.success(personas, 'Lista de Personas'));
}

export const getPersonaById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const persona = personaService.getPersonaById(id);
    if (persona) {
        res.json(ApiResponse.success(persona, 'Persona Encotrada'));
    } else {
        res.status(404).json(ApiResponse.error('Persona no Exsite'));
    }
}

export const createPersona = async (req: Request, res: Response) => {
    try {
        const result = createPersonaSchema.safeParse(req.body);
        if (!result.success) {
            console.log(result.error.format());
            return res.status(400).json(ApiResponse.error('Datos invalidos', result.error.format()))
        }
        const payload: CreatePersonaDto = req.body;
        const nuevaPersona = await personaService.createPersona(payload);
        res.status(201).json(ApiResponse.success(nuevaPersona, 'Persona creada exitosamente'));
    } catch (error) {
        res.status(500).json(ApiResponse.error('Error al crear Persona', error));
    }
}

export const updatePersona = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const personaData: UpdatePersonaDto = req.body;
    const personaActualizada = personaService.updatePersona(id, personaData);
    if (personaActualizada) {
        res.json(ApiResponse.success(personaActualizada, 'Persona actualizada correctamente'));
    } else {
        res.status(404).json(ApiResponse.error('Persona no existe'));
    }
}

export const deletePersona = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletePersona = personaService.deletePersona(id);
    if (deletePersona) {
        res.json(ApiResponse.success(null, 'Persona eliminada correctamente'));
    } else {
        res.status(404).json(ApiResponse.error('Persona no existe'));
    }
}
