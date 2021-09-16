import { Module } from '@nestjs/common'
import { RatingController } from '../controllers/rating.controller'
import { RatingService } from '../services/reting.service'

@Module({
    controllers: [RatingController],
    providers: [RatingService]
})
export class RatingModule {

}