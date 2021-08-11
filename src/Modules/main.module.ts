import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthorizeMiddleware } from '../Utils/Middlewares/authorizeMiddleware'
import { getConfigModules, getRouteModules } from './getRouteModules'

@Module({
    imports: [
        ...getConfigModules(),
        ...getRouteModules(),
    ],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthorizeMiddleware)
            .forRoutes('/product', '/auth/is-verify', '/brand', '/type')
    }
}