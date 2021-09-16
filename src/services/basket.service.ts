import { HttpException, Injectable } from '@nestjs/common'
import User from '../entities/User'
import Product from '../entities/Product'
import Basket from '../entities/Basket'
import { ProductDTO } from '../../@types/DTO/productDTOs'

@Injectable()
export class BasketService {
    async addProductToBasket(productId: number, userId: number): Promise<boolean> {
        const user = await User.findOne(userId)
        if (!user)
            throw new HttpException(`User with id ${userId} doesn't exist!`, 400)

        const product = await Product.findOne(productId)
        if (!product)
            throw new HttpException(`Product with id ${productId} doesn't exist!`, 400)

        const basket = await Basket.findOne(user.basket.id)
        if (!basket)
            throw new HttpException(`User with id ${user.id} doesn't have basket!`, 400)

        if (basket.products.find(prod => prod.id === product.id))
            return true

        basket.products.push(product)
        await Basket.save(basket)

        return true
    }

    async getProductsFromUserBasket(userId: number): Promise<ProductDTO[]> {
        const basket = await BasketService._getBasketByUserId(userId)
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
        if(!Number.isInteger(numProductId))
            throw new HttpException(`Product id ${productId} is not valid!`,400)

        const basket = await BasketService._getBasketByUserId(userId)

        basket.products = basket.products.filter(product => product.id !== +productId)
        await Basket.save(basket)
        return true
    }

    private static async _getBasketByUserId(userId: number) {
        const user = await User.findOne(userId)
        return await Basket.findOne(user.basket.id)
    }
}