import { HttpException, Injectable } from '@nestjs/common'
import User from '../entities/User'
import Product from '../entities/Product'
import Basket from '../entities/Basket'
import { ProductDTO } from '../../@types/DTO/productDTOs'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'

@Injectable()
export class BasketService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
                @InjectRepository(Basket) private readonly basketRepository: Repository<Basket>) {
    }

    async addProductToBasket(productId: number, userId: number): Promise<boolean> {
        const user = await User.findOne(userId)
        if (!user)
            throw new HttpException(`User with id ${userId} doesn't exist!`, 400)

        const product = await this.productRepository.findOne(productId)
        if (!product)
            throw new HttpException(`Product with id ${productId} doesn't exist!`, 400)

        const basket = await this.basketRepository.findOne(user.basket.id)
        if (!basket)
            throw new HttpException(`User with id ${user.id} doesn't have basket!`, 400)

        if (basket.products.find(prod => prod.id === product.id))
            return true

        basket.products.push(product)
        await this.basketRepository.save(basket)

        return true
    }

    async getProductsFromUserBasket(userId: number): Promise<ProductDTO[]> {
        const basket = await this._getBasketByUserId(userId)

        if(!basket.products) {
            throw new HttpException(`Basket have no products!`, 400)
        }

        return basket.products.map(product => ({
            id: product.id,
            cost: product.cost,
            count: product.count,
            img: product.img,
            discountCost: product.discountCost,
            name: product.name
        }))
    }

    async deleteProductFromBasket(userId: number, productId: string): Promise<boolean> {
        const numProductId = +productId
        if (!Number.isInteger(numProductId))
            throw new HttpException(`Product id ${productId} is not valid!`, 400)

        const basket = await this._getBasketByUserId(userId)

        basket.products = basket.products.filter(product => product.id !== +productId)
        await this.basketRepository.save(basket)
        return true
    }

    private async _getBasketByUserId(userId: number, options?: FindOneOptions<Basket>) {
        const user = await User.findOne(userId)

        if (!user) {
            throw new HttpException(`No user found with id ${userId}`, 400)
        }

        const basket = await this.basketRepository.findOne(user.basket.id, options)

        if (!basket) {
            throw new HttpException(`User with id ${user.id} have no basket!`, 500)
        }

        return basket
    }
}