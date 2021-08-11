import { Module } from '@nestjs/common'
import { RatingController } from '../Controllers/rating.controller'
import { RatingService } from '../Services/reting.service'

@Module({
    controllers: [RatingController],
    providers: [RatingService]
})
export class RatingModule {

}