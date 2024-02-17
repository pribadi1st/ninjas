import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';

@Injectable()
export class NinjasService {
    private ninjas = [
        { id: 1, name: 'naruto', rank: 'genin' },
        { id: 2, name: 'sasuke', rank: 'genin' },
        { id: 3, name: 'sakura', rank: 'genin' },
        { id: 4, name: 'kakashi', rank: 'jounin' },
        { id: 5, name: 'itachi', rank: 'anbu' }
    ]

    public getNinjasRank(rank: string){
        if (rank) {
            return this.ninjas.filter(ninja => ninja.rank === rank)
        }
        return this.ninjas
    }

    public getNinja(id: string){
        return this.ninjas.find(ninja => ninja.id === parseInt(id))
    }

    public createNinja(createNinjaDto: CreateNinjaDto){
        const newNinja = {
            id: this.ninjas.length + 1,
            ...createNinjaDto
        }
        this.ninjas.push(newNinja)
        return 'success'
    }

    public removeNinja(id: string){
        this.ninjas = this.ninjas.filter(ninja => ninja.id !== +id)
        return this.ninjas
    }
}
