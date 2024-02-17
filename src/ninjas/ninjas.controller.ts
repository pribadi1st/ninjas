import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UpdateNinjaDto } from './dto/update-ninja.dto'
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { VillageGuard } from 'src/village/village.guard';

@Controller('ninjas')
@UseGuards(VillageGuard)
export class NinjasController {
    // Get --colection ninjas
    constructor(private readonly ninjasService: NinjasService){}
    @Get()
    getNinjas(@Query('rank') rank: string){
        const service = new NinjasService()
        return this.ninjasService.getNinjasRank(rank)
    }
    
    // Get --colection ninjas/:id
    @Get(':id')
    getSelectedNinja(@Param('id', ParseIntPipe) id: number){
        try {
            return this.ninjasService.getNinja(id)
        }catch(error){
            throw new NotFoundException(error.message)
        }
        
    }
    // Post --colection ninjas
    @Post()
    createNinjas(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto){
        return {
            name: createNinjaDto.name,
            rank: createNinjaDto.rank
        }
    }
    // Put --colection ninjas/:id
    @Put(':id')
    updateNinjas(@Param('id') id: string, @Body() updateNinjasDto: UpdateNinjaDto){
        return {
            id: id,
            ninja: {
                name: updateNinjasDto.name,
                rank: updateNinjasDto.rank
            }
        }
    }
    // Delete --colection ninjas/:id
    @Delete(':id')
    deleteNinjas(@Param('id', ParseIntPipe) id: number){
        return this.ninjasService.removeNinja(id)
    }
}