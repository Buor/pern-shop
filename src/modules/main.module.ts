import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthorizeMiddleware } from '../utils/Middlewares/authorizeMiddleware'
import { getConfigModules, getRouteModules } from '../utils/mainConfig'

@Module({
    imports: [
        ...getConfigModules(),
        ...getRouteModules()
    ]
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthorizeMiddleware)
            .forRoutes('/auth/is-verify', 'rating', 'basket')
    }
}