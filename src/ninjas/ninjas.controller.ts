import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UpdateNinjaDto } from './dto/update-ninja.dto'
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
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
    getSelectedNinja(@Param('id') id: string){
        return this.ninjasService.getNinja(id)
    }
    // Post --colection ninjas
    @Post()
    createNinjas(@Body() createNinjaDto: CreateNinjaDto){
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
    deleteNinjas(@Param('id') id: string){
        return this.ninjasService.removeNinja(id)
    }
}