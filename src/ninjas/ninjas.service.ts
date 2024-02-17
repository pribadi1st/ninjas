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
        return 
    }

    public getNinja(id: number){
        const ninja = this.ninjas.find(ninja => ninja.id === id)
        if (!ninja) {
            throw new Error('Ninja not found')
        }
        return ninja
    }

    public createNinja(createNinjaDto: CreateNinjaDto){
        const newNinja = {
            id: this.ninjas.length + 1,
            ...createNinjaDto
        }
        this.ninjas.push(newNinja)
        return 'success'
    }

    public removeNinja(id: number){
        this.ninjas = this.ninjas.filter(ninja => ninja.id !== id)
        return this.ninjas
    }
}
