import { Entity, ObjectIdColumn, Column } from 'typeorm'
import * as uuid from 'uuid'
import * as bcrypt from 'bcrypt'
import { Exclude, Expose, plainToClass } from 'class-transformer'
import { Gender, Role } from './../generator/graphql.schema'

export class UserEntity {
	@Expose()
	@ObjectIdColumn()
	_id: string

	@Expose()
	@Column()
	fullName: string

	@Expose()
	@Column()
	username: string

	@Expose()
	@Column()
	password: boolean

	@Expose()
	@Column()
	role: Role

	@Expose()
	@Column()
	avatar: string

	@Expose()
	@Column()
	gender: Gender

	@Expose()
	@Column()
	isOnline: boolean

	@Expose()
	@Column()
	createdAt: number

	constructor(user: Partial<UserEntity>) {
		if (user) {
			Object.assign(
				this,
				plainToClass(UserEntity, user, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
			this.isOnline = this.isOnline !== undefined ? this.isOnline : false
			this.createdAt = this.createdAt || +new Date()
			this.password = bcrypt.hash(this.password, 10)
		}
	}

	async matchesPassword(password) {
		return await bcrypt.compare(password, this.password)
	}
}