import { sign, verify } from 'jsonwebtoken'
import { getMongoRepository } from 'typeorm'
import { AuthenticationError, ForbiddenError } from 'apollo-server-core'

import { UserEntity } from './../../models'

import {
	SECRET_KEY_TOKEN
} from '@environments'

export const generateToken = async (user: UserEntity): Promise<string> => {
	return await sign({
		_id: user._id
	}, SECRET_KEY_TOKEN)
}

export const verifyToken = async (token: string): Promise<UserEntity> => {
	let currentUser

	await verify(token, async (err, data) => {
		if (err) {
			throw new AuthenticationError(
				'Authentication token is invalid, please try again.'
			)
		}
		// console.log(data)

		currentUser = await getMongoRepository(UserEntity).findOne({
			_id: data._id
		})
	})

	return currentUser
}